# 8. Database Schema

## PostgreSQL Schema (Supabase)

```sql
-- Users and Authentication (handled by Supabase Auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_size TEXT CHECK (business_size IN ('solo', 'small-team', 'large-team')),
  industry TEXT,
  experience TEXT CHECK (experience IN ('beginner', 'intermediate', 'expert')),
  current_tools TEXT[],
  pain_points TEXT[],
  goals TEXT[],
  completed_questionnaire BOOLEAN DEFAULT FALSE,
  questionnaire_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questionnaire System
CREATE TABLE questionnaire_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('in_progress', 'completed', 'abandoned')) DEFAULT 'in_progress',
  current_question_index INTEGER DEFAULT 0,
  total_questions INTEGER,
  business_analysis TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES questionnaire_sessions(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  question_category TEXT,
  ai_context JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Automation Library
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  time_saved INTEGER, -- hours per week
  revenue_impact INTEGER, -- dollars per month
  implementation_time INTEGER, -- hours
  tags TEXT[],
  target_business_size TEXT[],
  target_experience TEXT[],
  target_industries TEXT[],
  published BOOLEAN DEFAULT FALSE,
  embedding VECTOR(1536), -- OpenAI Ada-2 embedding
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE automation_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_category TEXT,
  required BOOLEAN DEFAULT TRUE,
  signup_url TEXT
);

CREATE TABLE implementation_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  estimated_time TEXT,
  required_tools TEXT[]
);

CREATE TABLE step_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id UUID REFERENCES implementation_steps(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  alt TEXT,
  caption TEXT
);

-- Discovery and Recommendations
CREATE TABLE weekly_discoveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_of DATE NOT NULL,
  personalized_message TEXT,
  viewed BOOLEAN DEFAULT FALSE,
  viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE discovered_automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discovery_id UUID REFERENCES weekly_discoveries(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES automations(id),
  relevance_score NUMERIC(3,2),
  personalized_reason TEXT,
  status TEXT CHECK (status IN ('new', 'saved', 'dismissed', 'implemented')) DEFAULT 'new',
  status_changed_at TIMESTAMPTZ
);

-- User Progress Tracking
CREATE TABLE user_automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES automations(id),
  status TEXT CHECK (status IN ('saved', 'in_progress', 'completed', 'dismissed')),
  actual_time_saved INTEGER,
  actual_revenue_impact INTEGER,
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE automation_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_automation_id UUID REFERENCES user_automations(id) ON DELETE CASCADE,
  step_id UUID REFERENCES implementation_steps(id),
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  completed_at TIMESTAMPTZ
);

-- Subscription Management
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  plan_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_questionnaire_sessions_user_id ON questionnaire_sessions(user_id);
CREATE INDEX idx_questionnaire_responses_session_id ON questionnaire_responses(session_id);
CREATE INDEX idx_automations_category ON automations(category);
CREATE INDEX idx_automations_published ON automations(published);
CREATE INDEX idx_weekly_discoveries_user_id ON weekly_discoveries(user_id);
CREATE INDEX idx_weekly_discoveries_week_of ON weekly_discoveries(week_of);
CREATE INDEX idx_user_automations_user_id ON user_automations(user_id);
CREATE INDEX idx_user_automations_status ON user_automations(status);

-- Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_discoveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only access their own data)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for other user-specific tables...
```

---
