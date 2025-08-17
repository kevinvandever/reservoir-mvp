# Supabase Setup Guide

This guide will help you set up a Supabase project for the Reservoir MVP application.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `reservoir-mvp`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

## Step 2: Get Project Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (save as `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role secret** key (save as `SUPABASE_SERVICE_ROLE_KEY`)

## Step 3: Configure Environment Variables

Update your `.env.local` file with the actual values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OpenAI API (for future use)
OPENAI_API_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Set Up Database Schema

You have two options for setting up the database schema:

### Option A: Run Migration Files (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the migration files in order:

   **Migration 1: Initial Schema**
   - Click "New query"
   - Copy and paste the contents of `supabase/migrations/20250817000001_initial_schema.sql`
   - Click "Run"

   **Migration 2: RLS Policies**
   - Click "New query"
   - Copy and paste the contents of `supabase/migrations/20250817000002_add_rls_policies.sql`
   - Click "Run"

   **Migration 3: Performance Indexes**
   - Click "New query"  
   - Copy and paste the contents of `supabase/migrations/20250817000003_add_indexes.sql`
   - Click "Run"

   **Migration 4: Seed Data**
   - Click "New query"
   - Copy and paste the contents of `supabase/migrations/20250817000004_seed_data.sql`
   - Click "Run"

### Option B: Use Supabase CLI (If Available)

```bash
# From project root
./scripts/run-migrations.sh
```

### What Gets Created:

- **13 core tables** for the complete platform
- **User profiles** with business attributes and experience levels
- **Questionnaire system** for AI-driven discovery
- **Automation library** with step-by-step implementations
- **Progress tracking** for user automation journeys
- **Weekly discoveries** with AI recommendations
- **Subscription management** with Stripe integration
- **Comprehensive RLS policies** for data security
- **50+ performance indexes** including vector search
- **Sample data** for testing and development

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add your domain:
   - For development: `http://localhost:3000`
   - For production: Your actual domain
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth-test` (for testing)
   - Any other redirect URLs you need

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth-test`
3. Try signing up with a test email
4. Verify that:
   - User is created in Supabase Auth
   - User profile is automatically created in `user_profiles` table
   - Authentication state persists across page refreshes

## Additional Configuration (Optional)

### Email Templates
1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirmation emails
   - Password reset emails
   - Magic link emails

### Row Level Security (RLS)
The setup script automatically enables RLS with these policies:
- Users can only view/update their own profiles
- Automatic profile creation on user signup
- Admin users (when implemented) can access other profiles

## Troubleshooting

### Common Issues:

1. **"Missing environment variables" error**
   - Verify all environment variables are set in `.env.local`
   - Restart your development server after updating env vars

2. **Database connection errors**
   - Check that your project URL and keys are correct
   - Ensure your Supabase project is active (not paused)

3. **Authentication not working**
   - Verify redirect URLs are configured correctly
   - Check browser console for any JavaScript errors

4. **Profile creation fails**
   - Ensure the database setup script ran successfully
   - Check the Supabase logs for any SQL errors

## Security Notes

- Never commit your `.env.local` file or expose service role keys
- Use the anon key for client-side operations only
- Service role key should only be used server-side
- Always use RLS policies to protect user data
- Regularly rotate your API keys in production

## Next Steps

Once Supabase is configured:
1. The authentication system will be fully functional
2. You can proceed with Story 1.3: Implement Basic Auth Flow
3. The auth test page will work for testing signup/login/logout
4. API routes with authentication middleware will be operational