-- Reservoir MVP Seed Data
-- Migration: 20250817000004_seed_data.sql

-- Insert sample automations for development and testing
INSERT INTO automations (
  id,
  title,
  description,
  summary,
  category,
  tags,
  difficulty,
  estimated_time_minutes,
  business_size,
  current_tools,
  required_tools,
  roi_potential,
  popularity_score,
  status,
  published_at
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Automated Email Marketing Sequences',
  'Set up automated email sequences that nurture leads and convert them into customers using behavioral triggers and personalized content.',
  'Create drip campaigns that automatically send targeted emails based on user actions, increasing conversion rates by up to 40%.',
  'Marketing Automation',
  ARRAY['email marketing', 'lead nurturing', 'automation', 'conversion'],
  'medium',
  180,
  ARRAY['small-team', 'large-team'],
  ARRAY['email platform', 'CRM'],
  ARRAY['Mailchimp', 'HubSpot', 'Zapier'],
  85.50,
  4.7,
  'published',
  NOW() - INTERVAL '30 days'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Social Media Content Scheduler',
  'Automate your social media posting across multiple platforms with AI-generated content suggestions and optimal timing.',
  'Schedule weeks of social media content in advance with AI assistance, saving 10+ hours per week.',
  'Social Media',
  ARRAY['social media', 'content creation', 'scheduling', 'AI'],
  'easy',
  60,
  ARRAY['solo', 'small-team'],
  ARRAY['social media accounts'],
  ARRAY['Buffer', 'Hootsuite', 'ChatGPT'],
  92.30,
  4.5,
  'published',
  NOW() - INTERVAL '15 days'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Customer Support Ticket Automation',
  'Automatically categorize, prioritize, and route customer support tickets using AI, reducing response time by 60%.',
  'Transform your customer support with intelligent ticket routing and automated responses for common issues.',
  'Customer Service',
  ARRAY['customer support', 'AI', 'ticket management', 'efficiency'],
  'hard',
  240,
  ARRAY['small-team', 'large-team'],
  ARRAY['helpdesk software', 'CRM'],
  ARRAY['Zendesk', 'Intercom', 'OpenAI API'],
  78.90,
  4.2,
  'published',
  NOW() - INTERVAL '7 days'
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'Inventory Management Alerts',
  'Set up automated alerts for low inventory, reorder points, and sales velocity tracking to prevent stockouts.',
  'Never run out of stock again with intelligent inventory monitoring and automatic reorder suggestions.',
  'Inventory Management',
  ARRAY['inventory', 'alerts', 'automation', 'e-commerce'],
  'medium',
  120,
  ARRAY['small-team', 'large-team'],
  ARRAY['e-commerce platform', 'inventory system'],
  ARRAY['Shopify', 'Google Sheets', 'Zapier'],
  95.20,
  4.8,
  'published',
  NOW() - INTERVAL '20 days'
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'Personal Task Automation with AI',
  'Use AI to automatically categorize, prioritize, and schedule your daily tasks based on deadlines and importance.',
  'Let AI manage your to-do list, automatically scheduling tasks and sending reminders for optimal productivity.',
  'Personal Productivity',
  ARRAY['productivity', 'AI', 'task management', 'personal'],
  'easy',
  45,
  ARRAY['solo'],
  ARRAY['task management app'],
  ARRAY['Todoist', 'Google Calendar', 'ChatGPT'],
  67.40,
  4.3,
  'published',
  NOW() - INTERVAL '5 days'
);

-- Insert automation tools for the sample automations
INSERT INTO automation_tools (automation_id, tool_name, tool_category, is_required, setup_complexity, monthly_cost, free_tier_available, integration_notes, tool_url) VALUES
-- Email Marketing Tools
('550e8400-e29b-41d4-a716-446655440001', 'Mailchimp', 'Email Marketing', true, 'easy', 20.00, true, 'Free tier allows up to 2,000 contacts', 'https://mailchimp.com'),
('550e8400-e29b-41d4-a716-446655440001', 'HubSpot CRM', 'Customer Management', true, 'medium', 45.00, true, 'Free CRM with paid marketing automation', 'https://hubspot.com'),
('550e8400-e29b-41d4-a716-446655440001', 'Zapier', 'Automation Platform', true, 'easy', 19.99, true, 'Free tier includes 100 tasks/month', 'https://zapier.com'),

-- Social Media Tools
('550e8400-e29b-41d4-a716-446655440002', 'Buffer', 'Social Media Management', true, 'easy', 15.00, true, 'Free plan for 3 social accounts', 'https://buffer.com'),
('550e8400-e29b-41d4-a716-446655440002', 'ChatGPT Plus', 'AI Content Generation', false, 'easy', 20.00, false, 'Optional for AI content suggestions', 'https://openai.com'),

-- Customer Support Tools
('550e8400-e29b-41d4-a716-446655440003', 'Zendesk', 'Customer Support', true, 'medium', 55.00, true, 'Free trial for 14 days', 'https://zendesk.com'),
('550e8400-e29b-41d4-a716-446655440003', 'OpenAI API', 'AI Processing', true, 'hard', 10.00, false, 'Pay-per-use pricing', 'https://openai.com/api'),

-- Inventory Management Tools
('550e8400-e29b-41d4-a716-446655440004', 'Shopify', 'E-commerce Platform', true, 'medium', 29.00, true, '14-day free trial', 'https://shopify.com'),
('550e8400-e29b-41d4-a716-446655440004', 'Google Sheets', 'Spreadsheet', true, 'easy', 0.00, true, 'Completely free with Google account', 'https://sheets.google.com'),

-- Personal Productivity Tools
('550e8400-e29b-41d4-a716-446655440005', 'Todoist', 'Task Management', true, 'easy', 4.00, true, 'Free tier with basic features', 'https://todoist.com'),
('550e8400-e29b-41d4-a716-446655440005', 'Google Calendar', 'Calendar', true, 'easy', 0.00, true, 'Free with Google account', 'https://calendar.google.com');

-- Insert implementation steps for the first automation (Email Marketing)
INSERT INTO implementation_steps (
  automation_id,
  step_number,
  title,
  description,
  estimated_duration_minutes,
  required_tools,
  step_type,
  prerequisites,
  success_criteria,
  troubleshooting_tips
) VALUES
('550e8400-e29b-41d4-a716-446655440001', 1, 'Set up Mailchimp Account', 
 'Create a Mailchimp account and configure your basic settings including sender information and branding.',
 30, ARRAY['Mailchimp'], 'setup',
 ARRAY['Valid email address', 'Business information'],
 ARRAY['Account created and verified', 'Sender information configured', 'Basic branding applied'],
 ARRAY['Check spam folder for verification email', 'Use business email for better deliverability']),

('550e8400-e29b-41d4-a716-446655440001', 2, 'Import Contact Lists',
 'Upload your existing contact lists and segment them based on customer behavior and preferences.',
 45, ARRAY['Mailchimp'], 'action',
 ARRAY['Customer email list in CSV format', 'Permission to email contacts'],
 ARRAY['Contacts imported successfully', 'Segments created for different customer types'],
 ARRAY['Ensure CSV headers match Mailchimp fields', 'Remove duplicates before import']),

('550e8400-e29b-41d4-a716-446655440001', 3, 'Design Email Templates',
 'Create responsive email templates that match your brand and include proper call-to-action buttons.',
 60, ARRAY['Mailchimp'], 'action',
 ARRAY['Brand guidelines', 'Logo and images'],
 ARRAY['Templates created for welcome, nurture, and promotional emails', 'Templates tested on mobile'],
 ARRAY['Use Mailchimp template gallery for inspiration', 'Keep designs simple for better deliverability']),

('550e8400-e29b-41d4-a716-446655440001', 4, 'Set Up Automation Triggers',
 'Configure behavioral triggers such as signup, purchase, and engagement to automatically send targeted emails.',
 45, ARRAY['Mailchimp', 'Zapier'], 'configuration',
 ARRAY['Website with tracking pixels', 'Integration with e-commerce platform'],
 ARRAY['Triggers configured for key user actions', 'Test emails sent successfully'],
 ARRAY['Test triggers with sample data', 'Set up proper tracking in Google Analytics']);

-- Insert implementation steps for the social media automation
INSERT INTO implementation_steps (
  automation_id,
  step_number,
  title,
  description,
  estimated_duration_minutes,
  required_tools,
  step_type,
  prerequisites,
  success_criteria,
  troubleshooting_tips
) VALUES
('550e8400-e29b-41d4-a716-446655440002', 1, 'Connect Social Media Accounts',
 'Link your Facebook, Twitter, Instagram, and LinkedIn accounts to Buffer for centralized management.',
 20, ARRAY['Buffer'], 'setup',
 ARRAY['Admin access to social media accounts'],
 ARRAY['All accounts connected successfully', 'Posting permissions granted'],
 ARRAY['Use business/creator accounts for better features', 'Check account permissions if connection fails']),

('550e8400-e29b-41d4-a716-446655440002', 2, 'Create Content Calendar',
 'Plan your content themes and posting schedule using Buffer''s calendar feature.',
 40, ARRAY['Buffer'], 'action',
 ARRAY['Content strategy', 'Brand guidelines'],
 ARRAY['Monthly content calendar created', 'Posting times optimized for audience'],
 ARRAY['Research audience active hours', 'Plan content around industry events']),

('550e8400-e29b-41d4-a716-446655440002', 3, 'Set Up AI Content Generation',
 'Integrate ChatGPT or similar AI tools to help generate post ideas and content variations.',
 45, ARRAY['ChatGPT Plus', 'Buffer'], 'configuration',
 ARRAY['OpenAI account', 'Content guidelines'],
 ARRAY['AI prompts created for different post types', 'Content generation workflow established'],
 ARRAY['Create specific prompts for your industry', 'Always review AI-generated content before posting']);

-- Create a sample test user profile (for development only)
-- Note: This would normally be created through the auth flow
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  company_name,
  industry,
  business_size,
  experience_level,
  role,
  onboarding_completed
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'test@reservoir-mvp.com',
  'Test User',
  'Reservoir MVP',
  'Software Development',
  'small-team',
  'intermediate',
  'admin',
  true
) ON CONFLICT (id) DO NOTHING;

-- Insert sample questionnaire session for the test user
INSERT INTO questionnaire_sessions (
  id,
  user_id,
  session_status,
  current_step,
  total_steps,
  session_data,
  completion_percentage,
  completed_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440010',
  '550e8400-e29b-41d4-a716-446655440000',
  'completed',
  10,
  10,
  '{"business_type": "saas", "team_size": 5, "main_challenges": ["time_management", "customer_acquisition"]}',
  100.00,
  NOW() - INTERVAL '1 day'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample user automation (test user working on email marketing)
INSERT INTO user_automations (
  user_id,
  automation_id,
  status,
  progress_percentage,
  current_step,
  notes,
  started_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '550e8400-e29b-41d4-a716-446655440001',
  'in_progress',
  50.00,
  2,
  'Making good progress on email automation setup. Mailchimp account configured.',
  NOW() - INTERVAL '3 days'
) ON CONFLICT (user_id, automation_id) DO NOTHING;

-- Insert sample weekly discovery for the test user
INSERT INTO weekly_discoveries (
  user_id,
  week_of,
  discovery_criteria,
  ai_reasoning
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  DATE_TRUNC('week', NOW()),
  '{"business_size": "small-team", "experience_level": "intermediate", "focus_areas": ["marketing", "productivity"]}',
  'Based on user profile and current automation progress, focusing on marketing automation and productivity tools that complement their existing email marketing efforts.'
) ON CONFLICT (user_id, week_of) DO NOTHING;

-- Insert discovered automations for the weekly discovery
INSERT INTO discovered_automations (
  discovery_id,
  automation_id,
  relevance_score,
  ai_explanation,
  display_order
) VALUES (
  (SELECT id FROM weekly_discoveries WHERE user_id = '550e8400-e29b-41d4-a716-446655440000' AND week_of = DATE_TRUNC('week', NOW())),
  '550e8400-e29b-41d4-a716-446655440002',
  95.50,
  'Perfect complement to email marketing - social media automation will help create a comprehensive marketing funnel.',
  1
),
(
  (SELECT id FROM weekly_discoveries WHERE user_id = '550e8400-e29b-41d4-a716-446655440000' AND week_of = DATE_TRUNC('week', NOW())),
  '550e8400-e29b-41d4-a716-446655440004',
  78.30,
  'Inventory management automation could help streamline operations as the business grows.',
  2
) ON CONFLICT (discovery_id, automation_id) DO NOTHING;