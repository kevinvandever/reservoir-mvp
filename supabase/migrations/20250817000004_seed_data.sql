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
  'medium'::difficulty_level,
  180,
  ARRAY['small-team', 'large-team']::business_size[],
  ARRAY['email platform', 'CRM'],
  ARRAY['Mailchimp', 'HubSpot', 'Zapier'],
  85.50,
  4.7,
  'published'::automation_status,
  NOW() - INTERVAL '30 days'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Social Media Content Scheduler',
  'Automate your social media posting across multiple platforms with AI-generated content suggestions and optimal timing.',
  'Schedule weeks of social media content in advance with AI assistance, saving 10+ hours per week.',
  'Social Media',
  ARRAY['social media', 'content creation', 'scheduling', 'AI'],
  'easy'::difficulty_level,
  60,
  ARRAY['solo', 'small-team']::business_size[],
  ARRAY['social media accounts'],
  ARRAY['Buffer', 'Hootsuite', 'ChatGPT'],
  92.30,
  4.5,
  'published'::automation_status,
  NOW() - INTERVAL '15 days'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Customer Support Ticket Automation',
  'Automatically categorize, prioritize, and route customer support tickets using AI, reducing response time by 60%.',
  'Transform your customer support with intelligent ticket routing and automated responses for common issues.',
  'Customer Service',
  ARRAY['customer support', 'AI', 'ticket management', 'efficiency'],
  'hard'::difficulty_level,
  240,
  ARRAY['small-team', 'large-team']::business_size[],
  ARRAY['helpdesk software', 'CRM'],
  ARRAY['Zendesk', 'Intercom', 'OpenAI API'],
  78.90,
  4.2,
  'published'::automation_status,
  NOW() - INTERVAL '7 days'
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'Inventory Management Alerts',
  'Set up automated alerts for low inventory, reorder points, and sales velocity tracking to prevent stockouts.',
  'Never run out of stock again with intelligent inventory monitoring and automatic reorder suggestions.',
  'Inventory Management',
  ARRAY['inventory', 'alerts', 'automation', 'e-commerce'],
  'medium'::difficulty_level,
  120,
  ARRAY['small-team', 'large-team']::business_size[],
  ARRAY['e-commerce platform', 'inventory system'],
  ARRAY['Shopify', 'Google Sheets', 'Zapier'],
  95.20,
  4.8,
  'published'::automation_status,
  NOW() - INTERVAL '20 days'
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'Personal Task Automation with AI',
  'Use AI to automatically categorize, prioritize, and schedule your daily tasks based on deadlines and importance.',
  'Let AI manage your to-do list, automatically scheduling tasks and sending reminders for optimal productivity.',
  'Personal Productivity',
  ARRAY['productivity', 'AI', 'task management', 'personal'],
  'easy'::difficulty_level,
  45,
  ARRAY['solo']::business_size[],
  ARRAY['task management app'],
  ARRAY['Todoist', 'Google Calendar', 'ChatGPT'],
  67.40,
  4.3,
  'published'::automation_status,
  NOW() - INTERVAL '5 days'
);

-- Insert automation tools for the sample automations
INSERT INTO automation_tools (automation_id, tool_name, tool_category, is_required, setup_complexity, monthly_cost, free_tier_available, integration_notes, tool_url) VALUES
-- Email Marketing Tools
('550e8400-e29b-41d4-a716-446655440001', 'Mailchimp', 'Email Marketing', true, 'easy'::difficulty_level, 20.00, true, 'Free tier allows up to 2,000 contacts', 'https://mailchimp.com'),
('550e8400-e29b-41d4-a716-446655440001', 'HubSpot CRM', 'Customer Management', true, 'medium'::difficulty_level, 45.00, true, 'Free CRM with paid marketing automation', 'https://hubspot.com'),
('550e8400-e29b-41d4-a716-446655440001', 'Zapier', 'Automation Platform', true, 'easy'::difficulty_level, 19.99, true, 'Free tier includes 100 tasks/month', 'https://zapier.com'),

-- Social Media Tools
('550e8400-e29b-41d4-a716-446655440002', 'Buffer', 'Social Media Management', true, 'easy'::difficulty_level, 15.00, true, 'Free plan for 3 social accounts', 'https://buffer.com'),
('550e8400-e29b-41d4-a716-446655440002', 'ChatGPT Plus', 'AI Content Generation', false, 'easy'::difficulty_level, 20.00, false, 'Optional for AI content suggestions', 'https://openai.com'),

-- Customer Support Tools
('550e8400-e29b-41d4-a716-446655440003', 'Zendesk', 'Customer Support', true, 'medium'::difficulty_level, 55.00, true, 'Free trial for 14 days', 'https://zendesk.com'),
('550e8400-e29b-41d4-a716-446655440003', 'OpenAI API', 'AI Processing', true, 'hard'::difficulty_level, 10.00, false, 'Pay-per-use pricing', 'https://openai.com/api'),

-- Inventory Management Tools
('550e8400-e29b-41d4-a716-446655440004', 'Shopify', 'E-commerce Platform', true, 'medium'::difficulty_level, 29.00, true, '14-day free trial', 'https://shopify.com'),
('550e8400-e29b-41d4-a716-446655440004', 'Google Sheets', 'Spreadsheet', true, 'easy'::difficulty_level, 0.00, true, 'Completely free with Google account', 'https://sheets.google.com'),

-- Personal Productivity Tools
('550e8400-e29b-41d4-a716-446655440005', 'Todoist', 'Task Management', true, 'easy'::difficulty_level, 4.00, true, 'Free tier with basic features', 'https://todoist.com'),
('550e8400-e29b-41d4-a716-446655440005', 'Google Calendar', 'Calendar', true, 'easy'::difficulty_level, 0.00, true, 'Free with Google account', 'https://calendar.google.com');

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

-- Note: User-specific data (user_profiles, questionnaire_sessions, user_automations, etc.)
-- will be created when real users sign up through the authentication flow.
-- This seed data focuses on the core automation content only.