-- Reservoir MVP Row Level Security Policies
-- Migration: 20250817000002_add_rls_policies.sql

-- Enable RLS on all user-related tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE implementation_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE step_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_discoveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_metrics ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Questionnaire Sessions Policies
CREATE POLICY "Users can view own questionnaire sessions" ON questionnaire_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own questionnaire sessions" ON questionnaire_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questionnaire sessions" ON questionnaire_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own questionnaire sessions" ON questionnaire_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Questionnaire Responses Policies
CREATE POLICY "Users can view own questionnaire responses" ON questionnaire_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own questionnaire responses" ON questionnaire_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questionnaire responses" ON questionnaire_responses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own questionnaire responses" ON questionnaire_responses
  FOR DELETE USING (auth.uid() = user_id);

-- Automations Policies (Public read for published, author can edit)
CREATE POLICY "Anyone can view published automations" ON automations
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view own automations" ON automations
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can create automations" ON automations
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own automations" ON automations
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete own automations" ON automations
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Admins have full access to automations" ON automations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Automation Tools Policies
CREATE POLICY "Anyone can view tools for published automations" ON automation_tools
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = automation_tools.automation_id
      AND automations.status = 'published'
    )
  );

CREATE POLICY "Authors can manage automation tools" ON automation_tools
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = automation_tools.automation_id
      AND automations.author_id = auth.uid()
    )
  );

-- Implementation Steps Policies
CREATE POLICY "Anyone can view steps for published automations" ON implementation_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = implementation_steps.automation_id
      AND automations.status = 'published'
    )
  );

CREATE POLICY "Authors can manage implementation steps" ON implementation_steps
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM automations
      WHERE automations.id = implementation_steps.automation_id
      AND automations.author_id = auth.uid()
    )
  );

-- Step Media Policies
CREATE POLICY "Anyone can view media for published steps" ON step_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM implementation_steps
      JOIN automations ON automations.id = implementation_steps.automation_id
      WHERE implementation_steps.id = step_media.step_id
      AND automations.status = 'published'
    )
  );

CREATE POLICY "Authors can manage step media" ON step_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM implementation_steps
      JOIN automations ON automations.id = implementation_steps.automation_id
      WHERE implementation_steps.id = step_media.step_id
      AND automations.author_id = auth.uid()
    )
  );

-- Weekly Discoveries Policies
CREATE POLICY "Users can view own weekly discoveries" ON weekly_discoveries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own weekly discoveries" ON weekly_discoveries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weekly discoveries" ON weekly_discoveries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own weekly discoveries" ON weekly_discoveries
  FOR DELETE USING (auth.uid() = user_id);

-- Discovered Automations Policies
CREATE POLICY "Users can view own discovered automations" ON discovered_automations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM weekly_discoveries
      WHERE weekly_discoveries.id = discovered_automations.discovery_id
      AND weekly_discoveries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own discovered automations" ON discovered_automations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM weekly_discoveries
      WHERE weekly_discoveries.id = discovered_automations.discovery_id
      AND weekly_discoveries.user_id = auth.uid()
    )
  );

-- User Automations Policies
CREATE POLICY "Users can view own automation library" ON user_automations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own automation library" ON user_automations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own automation progress" ON user_automations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can remove from own automation library" ON user_automations
  FOR DELETE USING (auth.uid() = user_id);

-- Automation Progress Policies
CREATE POLICY "Users can view own automation progress" ON automation_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_automations
      WHERE user_automations.id = automation_progress.user_automation_id
      AND user_automations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own automation progress" ON automation_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_automations
      WHERE user_automations.id = automation_progress.user_automation_id
      AND user_automations.user_id = auth.uid()
    )
  );

-- Subscriptions Policies
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can manage subscriptions" ON subscriptions
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Usage Metrics Policies
CREATE POLICY "Users can view own usage metrics" ON usage_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage usage metrics" ON usage_metrics
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Grant permissions to authenticated users
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON questionnaire_sessions TO authenticated;
GRANT ALL ON questionnaire_responses TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON automations TO authenticated;
GRANT SELECT ON automation_tools TO authenticated;
GRANT SELECT ON implementation_steps TO authenticated;
GRANT SELECT ON step_media TO authenticated;
GRANT ALL ON weekly_discoveries TO authenticated;
GRANT ALL ON discovered_automations TO authenticated;
GRANT ALL ON user_automations TO authenticated;
GRANT ALL ON automation_progress TO authenticated;
GRANT SELECT, UPDATE ON subscriptions TO authenticated;
GRANT ALL ON usage_metrics TO authenticated;

-- Grant read access to anonymous users for public content
GRANT SELECT ON automations TO anon;
GRANT SELECT ON automation_tools TO anon;
GRANT SELECT ON implementation_steps TO anon;
GRANT SELECT ON step_media TO anon;