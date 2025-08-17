-- Reservoir MVP Initial Database Schema
-- Migration: 20250817000001_initial_schema.sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom enums for controlled vocabularies
CREATE TYPE business_size AS ENUM ('solo', 'small-team', 'large-team');
CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'expert');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE automation_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE session_status AS ENUM ('active', 'completed', 'abandoned');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed', 'paused');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'trialing');

-- User profiles table (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  industry TEXT,
  business_size business_size,
  experience_level experience_level DEFAULT 'beginner',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questionnaire sessions table
CREATE TABLE questionnaire_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_status session_status DEFAULT 'active',
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER DEFAULT 10,
  session_data JSONB DEFAULT '{}',
  ai_context JSONB DEFAULT '{}',
  completion_percentage DECIMAL(5,2) DEFAULT 0.00,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questionnaire responses table
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES questionnaire_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  question_text TEXT NOT NULL,
  response_data JSONB NOT NULL,
  ai_analysis JSONB,
  step_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automations library table
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty difficulty_level DEFAULT 'medium',
  estimated_time_minutes INTEGER,
  business_size business_size[],
  current_tools TEXT[] DEFAULT '{}',
  required_tools TEXT[] DEFAULT '{}',
  roi_potential DECIMAL(5,2),
  popularity_score DECIMAL(3,2) DEFAULT 0.00,
  status automation_status DEFAULT 'draft',
  ai_embedding vector(1536),
  author_id UUID REFERENCES user_profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automation tools table
CREATE TABLE automation_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_category TEXT,
  is_required BOOLEAN DEFAULT TRUE,
  setup_complexity difficulty_level DEFAULT 'medium',
  monthly_cost DECIMAL(10,2),
  free_tier_available BOOLEAN DEFAULT FALSE,
  integration_notes TEXT,
  tool_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Implementation steps table
CREATE TABLE implementation_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_duration_minutes INTEGER,
  required_tools TEXT[] DEFAULT '{}',
  step_type TEXT DEFAULT 'action' CHECK (step_type IN ('action', 'verification', 'setup', 'configuration')),
  prerequisites TEXT[],
  success_criteria TEXT[],
  troubleshooting_tips TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step media table
CREATE TABLE step_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID REFERENCES implementation_steps(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'gif', 'document')),
  media_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly discoveries table
CREATE TABLE weekly_discoveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  week_of DATE NOT NULL,
  discovery_criteria JSONB NOT NULL,
  ai_reasoning TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, week_of)
);

-- Discovered automations table
CREATE TABLE discovered_automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discovery_id UUID REFERENCES weekly_discoveries(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  relevance_score DECIMAL(5,2) NOT NULL,
  ai_explanation TEXT,
  display_order INTEGER DEFAULT 1,
  user_feedback INTEGER CHECK (user_feedback BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(discovery_id, automation_id)
);

-- User automations table (tracking user's automation library)
CREATE TABLE user_automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  status progress_status DEFAULT 'not_started',
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,
  current_step INTEGER,
  notes TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, automation_id)
);

-- Automation progress table (detailed step tracking)
CREATE TABLE automation_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_automation_id UUID REFERENCES user_automations(id) ON DELETE CASCADE,
  step_id UUID REFERENCES implementation_steps(id) ON DELETE CASCADE,
  status progress_status DEFAULT 'not_started',
  completion_notes TEXT,
  time_spent_minutes INTEGER,
  issues_encountered TEXT[],
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_automation_id, step_id)
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status subscription_status DEFAULT 'trialing',
  plan_name TEXT NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  price_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage metrics table
CREATE TABLE usage_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value INTEGER NOT NULL DEFAULT 0,
  metric_data JSONB,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, metric_name, period_start)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER questionnaire_sessions_updated_at
  BEFORE UPDATE ON questionnaire_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER questionnaire_responses_updated_at
  BEFORE UPDATE ON questionnaire_responses
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER automations_updated_at
  BEFORE UPDATE ON automations
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER implementation_steps_updated_at
  BEFORE UPDATE ON implementation_steps
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_automations_updated_at
  BEFORE UPDATE ON user_automations
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER automation_progress_updated_at
  BEFORE UPDATE ON automation_progress
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Auto-create user profile trigger (from previous implementation)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();