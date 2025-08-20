-- Fix RLS recursion issue by temporarily disabling problematic policies

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins have full access to profiles" ON user_profiles;

-- For now, we'll manage admin access through application logic
-- instead of database policies to avoid recursion