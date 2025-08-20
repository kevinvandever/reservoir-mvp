-- Fix RLS policy infinite recursion
-- Remove the problematic admin policy that causes recursion

-- Drop the problematic admin policy
DROP POLICY IF EXISTS "Admins have full access to profiles" ON user_profiles;

-- Create a simpler admin policy that doesn't cause recursion
-- We'll use auth.jwt() to check for admin role instead of querying user_profiles
CREATE POLICY "Admins have full access to profiles" ON user_profiles
  FOR ALL USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
  );

-- Also update other similar policies to avoid potential recursion issues

-- Drop and recreate questionnaire session policies if they reference user_profiles
DROP POLICY IF EXISTS "Admins can view all questionnaire sessions" ON questionnaire_sessions;
CREATE POLICY "Admins can view all questionnaire sessions" ON questionnaire_sessions
  FOR SELECT USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
  );

-- Drop and recreate other admin policies that might cause issues
DROP POLICY IF EXISTS "Admins can view all user automations" ON user_automations;
CREATE POLICY "Admins can view all user automations" ON user_automations
  FOR ALL USING (
    (auth.jwt() ->> 'user_metadata' ->> 'role') = 'admin'
  );