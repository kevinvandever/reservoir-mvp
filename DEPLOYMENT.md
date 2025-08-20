# Deployment Guide - Reservoir MVP

## Overview
This guide covers deploying the Reservoir MVP application to Netlify with continuous deployment from Git.

## Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Netlify account
- Production Supabase project
- OpenAI API key

## Quick Start

### 1. Connect to Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in with your Git provider

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select the repository containing this project

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18
   - Netlify will automatically detect `netlify.toml` configuration

### 2. Set Environment Variables

In Netlify dashboard, go to Site settings → Environment variables and add:

```bash
# Required - Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Required - OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Required - App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.netlify.app
NEXT_PUBLIC_ENV=production

# Optional - Monitoring
SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ID=your-analytics-id
```

### 3. Deploy

1. **Trigger First Deploy**
   - Push code to your main branch
   - Netlify will automatically build and deploy
   - Check build logs for any errors

2. **Verify Deployment**
   - Visit your Netlify app URL
   - Test questionnaire functionality
   - Verify API routes work
   - Check database connections

## Branch Strategy

### Production
- **Branch**: `main`
- **URL**: Your custom domain or `your-app.netlify.app`
- **Auto-deploy**: Enabled

### Staging (Optional)
- **Branch**: `develop`
- **URL**: `develop--your-app.netlify.app`
- **Auto-deploy**: Enabled

### Preview Deployments
- **Branches**: Feature branches
- **URL**: `deploy-preview-{pr-number}--your-app.netlify.app`
- **Trigger**: Pull requests

## Domain Setup

### Custom Domain
1. Go to Domain settings in Netlify
2. Add your custom domain
3. Configure DNS:
   - CNAME: `your-domain.com` → `your-app.netlify.app`
   - Or A record: `your-domain.com` → Netlify IP
4. SSL certificate will be auto-generated

### Redirects
Common redirects are configured in `netlify.toml`:
- `/api/*` → Netlify Functions
- Security headers applied

## Build Optimizations

### Enabled Features
- ✅ Build caching for `node_modules`
- ✅ Edge Functions for API routes
- ✅ Image optimization
- ✅ Security headers
- ✅ ISR (Incremental Static Regeneration)

### Performance
- Build time: ~3-5 minutes
- Cold start: <500ms
- Image optimization: Automatic
- CDN: Global edge network

## Monitoring & Notifications

### Build Notifications
1. Go to Site settings → Build & deploy → Deploy notifications
2. Add integrations:
   - Email notifications
   - Slack webhooks
   - Discord webhooks

### Deploy Status Badge
Add to your README.md:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
```

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node version (should be 18)
- Verify all environment variables are set
- Check build logs for missing dependencies

**API Routes Don't Work**
- Ensure `netlify.toml` redirects are configured
- Check function deployment in Netlify dashboard
- Verify environment variables in production

**Database Connection Issues**
- Verify Supabase URLs and keys
- Check Supabase project is accessible
- Ensure RLS policies allow production access

**Images Not Loading**
- Check `next.config.mjs` image domains
- Verify Supabase storage bucket permissions
- Check CDN configuration

### Debug Steps
1. Check Netlify deploy logs
2. Test build locally: `npm run build`
3. Verify environment variables
4. Check function logs in Netlify dashboard
5. Use Netlify CLI for local testing

## Security

### Environment Variables
- ✅ Never commit real keys to Git
- ✅ Use different keys for production/development
- ✅ Rotate keys regularly
- ✅ Limit Supabase RLS policies

### Headers
Security headers configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Maintenance

### Regular Tasks
- Monitor build times
- Check security updates
- Review function usage
- Update dependencies
- Monitor error rates

### Backup Strategy
- Database: Supabase automatic backups
- Code: Git repository
- Environment variables: Document separately

## Support

### Resources
- [Netlify Documentation](https://docs.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Supabase Documentation](https://supabase.com/docs)

### Getting Help
- Netlify Support: support@netlify.com
- Community: Netlify Discord
- Issues: Create issue in this repository