-- Reservoir MVP Performance Indexes
-- Migration: 20250817000003_add_indexes.sql

-- User Profiles Indexes
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_role_idx ON user_profiles(role);
CREATE INDEX IF NOT EXISTS user_profiles_business_size_idx ON user_profiles(business_size);
CREATE INDEX IF NOT EXISTS user_profiles_experience_level_idx ON user_profiles(experience_level);
CREATE INDEX IF NOT EXISTS user_profiles_created_at_idx ON user_profiles(created_at DESC);

-- Questionnaire Sessions Indexes
CREATE INDEX IF NOT EXISTS questionnaire_sessions_user_id_idx ON questionnaire_sessions(user_id);
CREATE INDEX IF NOT EXISTS questionnaire_sessions_status_idx ON questionnaire_sessions(session_status);
CREATE INDEX IF NOT EXISTS questionnaire_sessions_user_status_idx ON questionnaire_sessions(user_id, session_status);
CREATE INDEX IF NOT EXISTS questionnaire_sessions_last_activity_idx ON questionnaire_sessions(last_activity_at DESC);

-- Questionnaire Responses Indexes
CREATE INDEX IF NOT EXISTS questionnaire_responses_session_id_idx ON questionnaire_responses(session_id);
CREATE INDEX IF NOT EXISTS questionnaire_responses_user_id_idx ON questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS questionnaire_responses_step_number_idx ON questionnaire_responses(step_number);
CREATE INDEX IF NOT EXISTS questionnaire_responses_session_step_idx ON questionnaire_responses(session_id, step_number);

-- Automations Indexes
CREATE INDEX IF NOT EXISTS automations_status_idx ON automations(status);
CREATE INDEX IF NOT EXISTS automations_category_idx ON automations(category);
CREATE INDEX IF NOT EXISTS automations_difficulty_idx ON automations(difficulty);
CREATE INDEX IF NOT EXISTS automations_author_id_idx ON automations(author_id);
CREATE INDEX IF NOT EXISTS automations_published_at_idx ON automations(published_at DESC);
CREATE INDEX IF NOT EXISTS automations_popularity_idx ON automations(popularity_score DESC);
CREATE INDEX IF NOT EXISTS automations_status_category_idx ON automations(status, category);
CREATE INDEX IF NOT EXISTS automations_status_popularity_idx ON automations(status, popularity_score DESC);

-- GIN indexes for array fields
CREATE INDEX IF NOT EXISTS automations_tags_gin_idx ON automations USING GIN(tags);
CREATE INDEX IF NOT EXISTS automations_business_size_gin_idx ON automations USING GIN(business_size);
CREATE INDEX IF NOT EXISTS automations_current_tools_gin_idx ON automations USING GIN(current_tools);
CREATE INDEX IF NOT EXISTS automations_required_tools_gin_idx ON automations USING GIN(required_tools);

-- Vector index for AI embeddings (cosine similarity)
CREATE INDEX IF NOT EXISTS automations_embedding_idx ON automations 
  USING ivfflat (ai_embedding vector_cosine_ops) WITH (lists = 100);

-- Automation Tools Indexes
CREATE INDEX IF NOT EXISTS automation_tools_automation_id_idx ON automation_tools(automation_id);
CREATE INDEX IF NOT EXISTS automation_tools_tool_name_idx ON automation_tools(tool_name);
CREATE INDEX IF NOT EXISTS automation_tools_is_required_idx ON automation_tools(is_required);
CREATE INDEX IF NOT EXISTS automation_tools_monthly_cost_idx ON automation_tools(monthly_cost);

-- Implementation Steps Indexes
CREATE INDEX IF NOT EXISTS implementation_steps_automation_id_idx ON implementation_steps(automation_id);
CREATE INDEX IF NOT EXISTS implementation_steps_step_number_idx ON implementation_steps(step_number);
CREATE INDEX IF NOT EXISTS implementation_steps_automation_step_idx ON implementation_steps(automation_id, step_number);
CREATE INDEX IF NOT EXISTS implementation_steps_step_type_idx ON implementation_steps(step_type);

-- GIN index for array fields in implementation_steps
CREATE INDEX IF NOT EXISTS implementation_steps_required_tools_gin_idx ON implementation_steps USING GIN(required_tools);
CREATE INDEX IF NOT EXISTS implementation_steps_prerequisites_gin_idx ON implementation_steps USING GIN(prerequisites);

-- Step Media Indexes
CREATE INDEX IF NOT EXISTS step_media_step_id_idx ON step_media(step_id);
CREATE INDEX IF NOT EXISTS step_media_media_type_idx ON step_media(media_type);
CREATE INDEX IF NOT EXISTS step_media_step_order_idx ON step_media(step_id, display_order);

-- Weekly Discoveries Indexes
CREATE INDEX IF NOT EXISTS weekly_discoveries_user_id_idx ON weekly_discoveries(user_id);
CREATE INDEX IF NOT EXISTS weekly_discoveries_week_of_idx ON weekly_discoveries(week_of DESC);
CREATE INDEX IF NOT EXISTS weekly_discoveries_user_week_idx ON weekly_discoveries(user_id, week_of DESC);
CREATE INDEX IF NOT EXISTS weekly_discoveries_generated_at_idx ON weekly_discoveries(generated_at DESC);

-- Discovered Automations Indexes
CREATE INDEX IF NOT EXISTS discovered_automations_discovery_id_idx ON discovered_automations(discovery_id);
CREATE INDEX IF NOT EXISTS discovered_automations_automation_id_idx ON discovered_automations(automation_id);
CREATE INDEX IF NOT EXISTS discovered_automations_relevance_idx ON discovered_automations(relevance_score DESC);
CREATE INDEX IF NOT EXISTS discovered_automations_discovery_order_idx ON discovered_automations(discovery_id, display_order);

-- User Automations Indexes
CREATE INDEX IF NOT EXISTS user_automations_user_id_idx ON user_automations(user_id);
CREATE INDEX IF NOT EXISTS user_automations_automation_id_idx ON user_automations(automation_id);
CREATE INDEX IF NOT EXISTS user_automations_status_idx ON user_automations(status);
CREATE INDEX IF NOT EXISTS user_automations_user_status_idx ON user_automations(user_id, status);
CREATE INDEX IF NOT EXISTS user_automations_last_activity_idx ON user_automations(last_activity_at DESC);
CREATE INDEX IF NOT EXISTS user_automations_user_activity_idx ON user_automations(user_id, last_activity_at DESC);
CREATE INDEX IF NOT EXISTS user_automations_progress_idx ON user_automations(progress_percentage DESC);

-- Automation Progress Indexes
CREATE INDEX IF NOT EXISTS automation_progress_user_automation_idx ON automation_progress(user_automation_id);
CREATE INDEX IF NOT EXISTS automation_progress_step_id_idx ON automation_progress(step_id);
CREATE INDEX IF NOT EXISTS automation_progress_status_idx ON automation_progress(status);
CREATE INDEX IF NOT EXISTS automation_progress_user_automation_status_idx ON automation_progress(user_automation_id, status);
CREATE INDEX IF NOT EXISTS automation_progress_completed_at_idx ON automation_progress(completed_at DESC);

-- GIN index for array field in automation_progress
CREATE INDEX IF NOT EXISTS automation_progress_issues_gin_idx ON automation_progress USING GIN(issues_encountered);

-- Subscriptions Indexes
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_subscription_idx ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);
CREATE INDEX IF NOT EXISTS subscriptions_plan_name_idx ON subscriptions(plan_name);
CREATE INDEX IF NOT EXISTS subscriptions_current_period_end_idx ON subscriptions(current_period_end);
CREATE INDEX IF NOT EXISTS subscriptions_trial_ends_at_idx ON subscriptions(trial_ends_at);

-- Usage Metrics Indexes
CREATE INDEX IF NOT EXISTS usage_metrics_user_id_idx ON usage_metrics(user_id);
CREATE INDEX IF NOT EXISTS usage_metrics_metric_name_idx ON usage_metrics(metric_name);
CREATE INDEX IF NOT EXISTS usage_metrics_period_start_idx ON usage_metrics(period_start DESC);
CREATE INDEX IF NOT EXISTS usage_metrics_user_metric_period_idx ON usage_metrics(user_id, metric_name, period_start DESC);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS user_activity_composite_idx ON user_automations(user_id, status, last_activity_at DESC);
CREATE INDEX IF NOT EXISTS automation_discovery_composite_idx ON discovered_automations(discovery_id, relevance_score DESC, display_order);
CREATE INDEX IF NOT EXISTS questionnaire_session_composite_idx ON questionnaire_sessions(user_id, session_status, last_activity_at DESC);

-- Performance monitoring - create statistics for query planning
ANALYZE user_profiles;
ANALYZE questionnaire_sessions;
ANALYZE questionnaire_responses;
ANALYZE automations;
ANALYZE automation_tools;
ANALYZE implementation_steps;
ANALYZE step_media;
ANALYZE weekly_discoveries;
ANALYZE discovered_automations;
ANALYZE user_automations;
ANALYZE automation_progress;
ANALYZE subscriptions;
ANALYZE usage_metrics;