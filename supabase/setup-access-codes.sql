-- SETUP ACCESS CODE SYSTEM FOR RESERVOIR
-- Run this script in your Supabase SQL Editor to set up the access code system

-- Step 1: Create the tables
-- ===========================

-- Drop existing tables if needed (be careful in production!)
-- DROP TABLE IF EXISTS access_logs CASCADE;
-- DROP TABLE IF EXISTS member_sessions CASCADE;
-- DROP TABLE IF EXISTS access_codes CASCADE;

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
  status VARCHAR(20) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create member_sessions table  
CREATE TABLE IF NOT EXISTS member_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL UNIQUE,
  access_code_id UUID REFERENCES access_codes(id),
  member_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create access_logs table
CREATE TABLE IF NOT EXISTS access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code_id UUID REFERENCES access_codes(id),
  session_id VARCHAR(255),
  action VARCHAR(50),
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create the validation function
-- =======================================

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
BEGIN
  -- Find the access code (case-insensitive)
  SELECT * INTO v_access_code
  FROM access_codes
  WHERE UPPER(TRIM(code)) = UPPER(TRIM(p_code));
  
  -- Check if code exists
  IF v_access_code.id IS NULL THEN
    RETURN QUERY SELECT 
      FALSE, NULL::UUID, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR,
      'Invalid access code. Please check your code and try again.'::TEXT;
    RETURN;
  END IF;
  
  -- Check if expired
  IF v_access_code.expires_at < NOW() THEN
    UPDATE access_codes SET status = 'expired' WHERE id = v_access_code.id;
    RETURN QUERY SELECT 
      FALSE, v_access_code.id, v_access_code.member_name, 
      v_access_code.member_email, v_access_code.source,
      'This access code has expired.'::TEXT;
    RETURN;
  END IF;
  
  -- Check usage limit
  IF v_access_code.current_uses >= v_access_code.max_uses THEN
    UPDATE access_codes SET status = 'used' WHERE id = v_access_code.id;
    RETURN QUERY SELECT 
      FALSE, v_access_code.id, v_access_code.member_name,
      v_access_code.member_email, v_access_code.source,
      'This access code has reached its usage limit.'::TEXT;
    RETURN;
  END IF;
  
  -- Check status
  IF v_access_code.status != 'active' THEN
    RETURN QUERY SELECT 
      FALSE, v_access_code.id, v_access_code.member_name,
      v_access_code.member_email, v_access_code.source,
      'This access code is no longer active.'::TEXT;
    RETURN;
  END IF;
  
  -- Success! Update usage count
  UPDATE access_codes 
  SET current_uses = current_uses + 1
  WHERE id = v_access_code.id;
  
  -- Create session
  INSERT INTO member_sessions (
    session_id, access_code_id, member_data, ip_address, user_agent
  ) VALUES (
    p_session_id, v_access_code.id,
    jsonb_build_object(
      'member_name', v_access_code.member_name,
      'member_email', v_access_code.member_email,
      'source', v_access_code.source
    ),
    p_ip_address::INET, p_user_agent
  )
  ON CONFLICT (session_id) 
  DO UPDATE SET last_activity_at = NOW(), is_active = true;
  
  -- Log the access
  INSERT INTO access_logs (
    access_code_id, session_id, action, ip_address, user_agent
  ) VALUES (
    v_access_code.id, p_session_id, 'validation_success', 
    p_ip_address::INET, p_user_agent
  );
  
  -- Return success
  RETURN QUERY SELECT 
    TRUE, v_access_code.id, v_access_code.member_name,
    v_access_code.member_email, v_access_code.source, NULL::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Insert demo access codes
-- =================================

INSERT INTO access_codes (
  code, member_name, member_email, source, 
  max_uses, current_uses, expires_at, status
) VALUES 
  (
    'CLOCK-DEMO-2025', 
    'Demo User', 
    'demo@clockworkcoaching.com', 
    'demo',
    100,  -- Allow 100 uses
    0,    -- Reset to 0 uses
    NOW() + INTERVAL '90 days',
    'active'
  ),
  (
    'CLOCK-TEST-2025',
    'Test Member',
    'test@example.com',
    'testing', 
    10,   -- Allow 10 uses
    0,
    NOW() + INTERVAL '30 days',
    'active'
  )
ON CONFLICT (code) DO UPDATE SET
  expires_at = EXCLUDED.expires_at,
  status = 'active',
  max_uses = EXCLUDED.max_uses,
  current_uses = 0;  -- Reset usage count

-- Step 4: Set up permissions
-- ===========================

-- Grant permissions for anonymous users (required for validation)
GRANT SELECT ON access_codes TO anon;
GRANT ALL ON member_sessions TO anon;
GRANT INSERT ON access_logs TO anon;
GRANT EXECUTE ON FUNCTION validate_and_use_access_code TO anon;

-- Grant permissions for authenticated users
GRANT ALL ON access_codes TO authenticated;
GRANT ALL ON member_sessions TO authenticated;
GRANT ALL ON access_logs TO authenticated;

-- Step 5: Verify the setup
-- ========================

-- Check that demo codes exist
SELECT code, member_name, status, max_uses, current_uses, expires_at 
FROM access_codes 
WHERE code LIKE 'CLOCK-%'
ORDER BY created_at DESC;

-- Test the validation function (optional)
-- SELECT * FROM validate_and_use_access_code('CLOCK-DEMO-2025', 'test-session-123');