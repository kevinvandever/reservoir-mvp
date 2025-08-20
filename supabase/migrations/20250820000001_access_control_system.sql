-- Access Control System for Premium Questionnaire
-- Migration: 20250820000001_access_control_system.sql

-- Create access code status enum
CREATE TYPE access_code_status AS ENUM ('active', 'expired', 'disabled', 'used');

-- Access codes table for premium access control
CREATE TABLE access_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  member_name TEXT,
  member_email TEXT,
  source TEXT DEFAULT 'direct',
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  status access_code_status DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  session_ids TEXT[] DEFAULT '{}', -- Track all sessions using this code
  created_by UUID REFERENCES user_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member sessions table for tracking premium access sessions
CREATE TABLE member_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  access_code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
  member_data JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  questionnaire_session_id UUID REFERENCES questionnaire_sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Access logs for audit trail
CREATE TABLE access_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  access_code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('validate', 'use', 'expire', 'disable', 'reject')),
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  result BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_access_codes_code ON access_codes(code);
CREATE INDEX idx_access_codes_status ON access_codes(status);
CREATE INDEX idx_access_codes_expires_at ON access_codes(expires_at);
CREATE INDEX idx_access_codes_member_email ON access_codes(member_email);
CREATE INDEX idx_member_sessions_session_id ON member_sessions(session_id);
CREATE INDEX idx_member_sessions_access_code ON member_sessions(access_code_id);
CREATE INDEX idx_access_logs_access_code ON access_logs(access_code_id);
CREATE INDEX idx_access_logs_created_at ON access_logs(created_at);

-- Function to validate and use access code
CREATE OR REPLACE FUNCTION validate_and_use_access_code(
  p_code TEXT,
  p_session_id TEXT,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS TABLE (
  valid BOOLEAN,
  access_code_id UUID,
  member_name TEXT,
  member_email TEXT,
  source TEXT,
  error_message TEXT
) AS $$
DECLARE
  v_access_code RECORD;
  v_error_message TEXT;
BEGIN
  -- Find the access code
  SELECT * INTO v_access_code
  FROM access_codes
  WHERE UPPER(code) = UPPER(p_code);
  
  -- Check if code exists
  IF NOT FOUND THEN
    -- Log the failed attempt
    INSERT INTO access_logs (action, session_id, ip_address, user_agent, result, error_message)
    VALUES ('reject', p_session_id, p_ip_address, p_user_agent, FALSE, 'Invalid access code');
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN as valid,
      NULL::UUID as access_code_id,
      NULL::TEXT as member_name,
      NULL::TEXT as member_email,
      NULL::TEXT as source,
      'Invalid access code. Please check your code and try again.'::TEXT as error_message;
    RETURN;
  END IF;
  
  -- Check if code is active
  IF v_access_code.status != 'active' THEN
    v_error_message := CASE v_access_code.status
      WHEN 'expired' THEN 'This access code has expired.'
      WHEN 'disabled' THEN 'This access code has been disabled.'
      WHEN 'used' THEN 'This access code has already been fully used.'
      ELSE 'This access code is no longer active.'
    END;
    
    INSERT INTO access_logs (access_code_id, action, session_id, ip_address, user_agent, result, error_message)
    VALUES (v_access_code.id, 'reject', p_session_id, p_ip_address, p_user_agent, FALSE, v_error_message);
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN as valid,
      v_access_code.id as access_code_id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      v_error_message;
    RETURN;
  END IF;
  
  -- Check expiration
  IF v_access_code.expires_at < NOW() THEN
    -- Update status to expired
    UPDATE access_codes 
    SET status = 'expired', updated_at = NOW()
    WHERE id = v_access_code.id;
    
    INSERT INTO access_logs (access_code_id, action, session_id, ip_address, user_agent, result, error_message)
    VALUES (v_access_code.id, 'expire', p_session_id, p_ip_address, p_user_agent, FALSE, 'Code expired');
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN as valid,
      v_access_code.id as access_code_id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      'This access code has expired. Please contact support for a new code.'::TEXT as error_message;
    RETURN;
  END IF;
  
  -- Check usage limits
  IF v_access_code.current_uses >= v_access_code.max_uses THEN
    -- Update status to used if fully utilized
    UPDATE access_codes 
    SET status = 'used', updated_at = NOW()
    WHERE id = v_access_code.id;
    
    INSERT INTO access_logs (access_code_id, action, session_id, ip_address, user_agent, result, error_message)
    VALUES (v_access_code.id, 'reject', p_session_id, p_ip_address, p_user_agent, FALSE, 'Usage limit reached');
    
    RETURN QUERY SELECT 
      FALSE::BOOLEAN as valid,
      v_access_code.id as access_code_id,
      v_access_code.member_name,
      v_access_code.member_email,
      v_access_code.source,
      'This access code has reached its usage limit.'::TEXT as error_message;
    RETURN;
  END IF;
  
  -- Valid code - increment usage
  UPDATE access_codes 
  SET 
    current_uses = current_uses + 1,
    last_used_at = NOW(),
    session_ids = array_append(session_ids, p_session_id),
    status = CASE 
      WHEN current_uses + 1 >= max_uses THEN 'used'::access_code_status
      ELSE status
    END,
    updated_at = NOW()
  WHERE id = v_access_code.id;
  
  -- Create member session
  INSERT INTO member_sessions (
    session_id,
    access_code_id,
    member_data,
    started_at,
    is_active
  ) VALUES (
    p_session_id,
    v_access_code.id,
    jsonb_build_object(
      'name', v_access_code.member_name,
      'email', v_access_code.member_email,
      'source', v_access_code.source
    ),
    NOW(),
    TRUE
  );
  
  -- Log successful use
  INSERT INTO access_logs (access_code_id, action, session_id, ip_address, user_agent, result)
  VALUES (v_access_code.id, 'use', p_session_id, p_ip_address, p_user_agent, TRUE);
  
  RETURN QUERY SELECT 
    TRUE::BOOLEAN as valid,
    v_access_code.id as access_code_id,
    v_access_code.member_name,
    v_access_code.member_email,
    v_access_code.source,
    NULL::TEXT as error_message;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate unique access code
CREATE OR REPLACE FUNCTION generate_access_code(
  p_member_name TEXT DEFAULT NULL,
  p_member_email TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'direct',
  p_max_uses INTEGER DEFAULT 1,
  p_expires_in_days INTEGER DEFAULT 30,
  p_created_by UUID DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
  v_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate code in format CLOCK-XXXX-YYYY
    v_code := 'CLOCK-' || 
              UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4)) || '-' ||
              EXTRACT(YEAR FROM NOW())::TEXT;
    
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
    expires_at,
    created_by
  ) VALUES (
    v_code,
    p_member_name,
    p_member_email,
    p_source,
    p_max_uses,
    NOW() + (p_expires_in_days || ' days')::INTERVAL,
    p_created_by
  );
  
  RETURN v_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply updated_at triggers
CREATE TRIGGER access_codes_updated_at
  BEFORE UPDATE ON access_codes
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER member_sessions_updated_at
  BEFORE UPDATE ON member_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS Policies
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Admin users can manage access codes
CREATE POLICY "Admins can manage access codes" ON access_codes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Anyone can validate codes (through function)
CREATE POLICY "Public can validate codes" ON access_codes
  FOR SELECT USING (TRUE);

-- Sessions are accessible by code validation
CREATE POLICY "Sessions accessible via validation" ON member_sessions
  FOR ALL USING (TRUE);

-- Logs are admin-only
CREATE POLICY "Admins can view access logs" ON access_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Insert some sample access codes for testing
INSERT INTO access_codes (code, member_name, member_email, source, max_uses, expires_at) VALUES
  ('CLOCK-DEMO-2025', 'Demo User', 'demo@clockworkcoaching.com', 'demo', 100, NOW() + INTERVAL '90 days'),
  ('CLOCK-TEST-2025', 'Test Member', 'test@example.com', 'testing', 5, NOW() + INTERVAL '30 days');

-- Grant necessary permissions
GRANT SELECT ON access_codes TO anon, authenticated;
GRANT EXECUTE ON FUNCTION validate_and_use_access_code TO anon, authenticated;
GRANT EXECUTE ON FUNCTION generate_access_code TO authenticated;
GRANT INSERT ON access_logs TO anon, authenticated;
GRANT INSERT ON member_sessions TO anon, authenticated;