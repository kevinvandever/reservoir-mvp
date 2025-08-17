-- Reservoir MVP Database Reset Script
-- WARNING: This script will DROP ALL TABLES and data
-- Only use in development environments!

-- Check environment (this should fail in production)
DO $$
BEGIN
  -- This will prevent accidental runs in production
  -- Production should have this variable set to 'production'
  IF current_setting('app.environment', true) = 'production' THEN
    RAISE EXCEPTION 'Cannot reset database in production environment!';
  END IF;
END $$;

-- Drop all tables in reverse dependency order
DROP TABLE IF EXISTS usage_metrics CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS automation_progress CASCADE;
DROP TABLE IF EXISTS user_automations CASCADE;
DROP TABLE IF EXISTS discovered_automations CASCADE;
DROP TABLE IF EXISTS weekly_discoveries CASCADE;
DROP TABLE IF EXISTS step_media CASCADE;
DROP TABLE IF EXISTS implementation_steps CASCADE;
DROP TABLE IF EXISTS automation_tools CASCADE;
DROP TABLE IF EXISTS automations CASCADE;
DROP TABLE IF EXISTS questionnaire_responses CASCADE;
DROP TABLE IF EXISTS questionnaire_sessions CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS subscription_status CASCADE;
DROP TYPE IF EXISTS progress_status CASCADE;
DROP TYPE IF EXISTS session_status CASCADE;
DROP TYPE IF EXISTS automation_status CASCADE;
DROP TYPE IF EXISTS difficulty_level CASCADE;
DROP TYPE IF EXISTS experience_level CASCADE;
DROP TYPE IF EXISTS business_size CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS handle_updated_at() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Drop triggers (should be dropped with tables, but just in case)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Clean up any remaining objects
DROP INDEX IF EXISTS automations_embedding_idx;

-- Reset sequences (if any were created)
-- Note: UUID generation doesn't use sequences, so this is mainly for completeness

NOTIFY pgrst, 'reload schema';

-- Confirmation message
DO $$
BEGIN
  RAISE NOTICE 'Database reset completed successfully!';
  RAISE NOTICE 'You can now run the migration files to recreate the schema.';
END $$;