-- Access Code System Migration
-- This creates all tables and functions needed for the premium access control system

-- Create access_codes table
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  member_name VARCHAR(255),
  member_email VARCHAR(255),
  source VARCHAR(100) DEFAULT 'direct',
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'disabled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create member_sessions table
CREATE TABLE IF NOT EXISTS member_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL UNIQUE,
  access_code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
  member_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create access_logs table for tracking
CREATE TABLE IF NOT EXISTS access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  action VARCHAR(50),
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_status ON access_codes(status);
CREATE INDEX IF NOT EXISTS idx_member_sessions_session_id ON member_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_member_sessions_access_code_id ON member_sessions(access_code_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_access_code_id ON access_logs(access_code_id);

-- Function to generate access codes
CREATE OR REPLACE FUNCTION generate_access_code(
  p_member_name VARCHAR DEFAULT NULL,
  p_member_email VARCHAR DEFAULT NULL,
  p_source VARCHAR DEFAULT 'direct',
  p_max_uses INTEGER DEFAULT 1,
  p_expires_in_days INTEGER DEFAULT 30
)
RETURNS VARCHAR AS $$
DECLARE
  v_code VARCHAR;
  v_exists BOOLEAN;
BEGIN
  -- Generate a unique code
  LOOP
    -- Generate code in format CLOCK-XXXX-YYYY
    v_code := 'CLOCK-' || 
              UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 4)) || '-' || 
              EXTRACT(YEAR FROM NOW());
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM access_codes WHERE code = v_code) INTO v_exists;
    
    EXIT WHEN NOT v_exists;
  END LOOP;
  
  -- Insert the new access code
  INSERT INTO access_codes (
    code, 
    member_name, 
    member_email, 
    source, 
    max_uses, 
    expires_at
  ) VALUES (
    v_code,
    p_member_name,
    p_member_email,
    p_source,
    p_max_uses,
    NOW() + (p_expires_in_days || ' days')::INTERVAL
  );
  
  RETURN v_code;
END;
$$ LANGUAGE plpgsql;

-- Function to validate and use access code
CREATE OR REPLACE FUNCTION validate_and_use_access_code(
  p_code VARCHAR,
  p_session_id VARCHAR,
  p_ip_address VARCHAR DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS TABLE (
  valid BOOLEAN,
  access_code_id UUID,
  member_name VARCHAR,
  member_email VARCHAR,
  source VARCHAR,
  error_message TEXT
) AS $$
DECLARE
  v_access_code RECORD;
  v_error_message TEXT;
BEGIN
  -- Find the access code
  SELECT * INTO v_access_code
  FROM access_codes
  WHERE UPPER(TRIM(code)) = UPPER(TRIM(p_code));
  
  -- Check if code exists
  IF v_access_code.id IS NULL THEN
    RETURN QUERY SELECT 
      FALSE::BOOLEAN,
      NULL::UUID,
      NULL::VARCHAR,
      NULL::VARCHAR,
      NULL::VARCHAR,
      'Invalid access code. Please check your code and try again.'::TEXT;
    RETURN;
  END IF;
  
  -- Check if code is active
  IF v_access_code.status != 'active' THEN
    IF v_access_code.status = 'used' THEN
      v_error_message := 'This access code has already been fully used.';
    ELSIF v_access_code.status = 'expired' THEN
      v_error_message := 'This access code has expired.';
    ELSIF v_access_code.status = 'disabled' THEN
      v_error_message := 'This access code has been disabled.';
    ELSE
      v_error_message := 'This access code is no longer valid.';
    END IF;
    
    -- Log the failed attempt
    INSERT INTO access_logs (access_code_id, session_id, action, ip_address, user_agent, details)
    VALUES (v_access_code.id, p_session_id, 'validation_failed', p_ip_address::INET, p_user_agent, 
            jsonb_build_object('reason', v_access_code.status));
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN,
      v_access_code.id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      v_error_message;
    RETURN;
  END IF;
  
  -- Check if code has expired
  IF v_access_code.expires_at IS NOT NULL AND v_access_code.expires_at < NOW() THEN
    -- Update status to expired
    UPDATE access_codes SET status = 'expired' WHERE id = v_access_code.id;
    
    -- Log the failed attempt
    INSERT INTO access_logs (access_code_id, session_id, action, ip_address, user_agent, details)
    VALUES (v_access_code.id, p_session_id, 'validation_failed', p_ip_address::INET, p_user_agent, 
            jsonb_build_object('reason', 'expired'));
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN,
      v_access_code.id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      'This access code has expired.'::TEXT;
    RETURN;
  END IF;
  
  -- Check usage limits
  IF v_access_code.current_uses >= v_access_code.max_uses THEN
    -- Update status to used
    UPDATE access_codes SET status = 'used' WHERE id = v_access_code.id;
    
    -- Log the failed attempt
    INSERT INTO access_logs (access_code_id, session_id, action, ip_address, user_agent, details)
    VALUES (v_access_code.id, p_session_id, 'validation_failed', p_ip_address::INET, p_user_agent, 
            jsonb_build_object('reason', 'max_uses_reached'));
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN,
      v_access_code.id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      'This access code has reached its usage limit.'::TEXT;
    RETURN;
  END IF;
  
  -- Code is valid! Increment usage
  UPDATE access_codes 
  SET current_uses = current_uses + 1,
      status = CASE 
        WHEN current_uses + 1 >= max_uses THEN 'used'
        ELSE 'active'
      END
  WHERE id = v_access_code.id;
  
  -- Create or update member session
  INSERT INTO member_sessions (
    session_id,
    access_code_id,
    member_data,
    ip_address,
    user_agent
  ) VALUES (
    p_session_id,
    v_access_code.id,
    jsonb_build_object(
      'member_name', v_access_code.member_name,
      'member_email', v_access_code.member_email,
      'source', v_access_code.source
    ),
    p_ip_address::INET,
    p_user_agent
  )
  ON CONFLICT (session_id) 
  DO UPDATE SET 
    last_activity_at = NOW(),
    is_active = true;
  
  -- Log successful validation
  INSERT INTO access_logs (access_code_id, session_id, action, ip_address, user_agent)
  VALUES (v_access_code.id, p_session_id, 'validation_success', p_ip_address::INET, p_user_agent);
  
  -- Return success
  RETURN QUERY SELECT 
    TRUE::BOOLEAN,
    v_access_code.id,
    v_access_code.member_name,
    v_access_code.member_email,
    v_access_code.source,
    NULL::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Insert initial demo access codes
INSERT INTO access_codes (code, member_name, member_email, source, max_uses, expires_at, status)
VALUES 
  ('CLOCK-DEMO-2025', 'Demo User', 'demo@clockworkcoaching.com', 'demo', 100, NOW() + INTERVAL '90 days', 'active'),
  ('CLOCK-TEST-2025', 'Test Member', 'test@example.com', 'testing', 5, NOW() + INTERVAL '30 days', 'active'),
  ('CLOCK-VIP1-2025', 'Marcus Rivera', 'marcus@example.com', 'clockwork_coaching', 1, NOW() + INTERVAL '60 days', 'active')
ON CONFLICT (code) DO UPDATE SET
  expires_at = EXCLUDED.expires_at,
  status = 'active',
  current_uses = CASE 
    WHEN access_codes.current_uses < access_codes.max_uses THEN access_codes.current_uses
    ELSE 0
  END;

-- Grant necessary permissions (adjust based on your Supabase setup)
GRANT ALL ON access_codes TO authenticated;
GRANT ALL ON member_sessions TO authenticated;
GRANT ALL ON access_logs TO authenticated;
GRANT EXECUTE ON FUNCTION generate_access_code TO authenticated;
GRANT EXECUTE ON FUNCTION validate_and_use_access_code TO authenticated;

-- Enable Row Level Security (optional but recommended)
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for anonymous access to validate codes
CREATE POLICY "Allow anonymous to validate access codes" 
  ON access_codes FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous to create sessions" 
  ON member_sessions FOR ALL 
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous to create logs" 
  ON access_logs FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Add update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_access_codes_updated_at
  BEFORE UPDATE ON access_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();