# 🚀 Deployment Quick Guide

## Prerequisites
- GitHub repository connected to Netlify
- Supabase project created
- Environment variables ready

## Step-by-Step Deployment

### 1️⃣ Database Setup (One-time)
```sql
-- Run in Supabase SQL Editor
-- Copy entire contents of: supabase/setup-access-codes.sql
```

### 2️⃣ Environment Variables (Netlify Dashboard)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_APP_URL=https://your-netlify-url.netlify.app
NEXT_PUBLIC_ENV=production
```

### 3️⃣ Deploy Command
```bash
# Local testing first
npm run build

# Then push to GitHub
git push origin main
```

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Build fails with missing module | `npm install [module-name]` and commit |
| API route errors | Add `export const dynamic = 'force-dynamic'` |
| useSearchParams error | Wrap component in `<Suspense>` |
| Access code not working | Run SQL setup script in Supabase |
| Node version warnings | Set `NODE_VERSION = "20"` in netlify.toml |

## Emergency Rollback

### Option 1: Use Mock Service
Add to Netlify environment variables:
```
NEXT_PUBLIC_USE_MOCK_ACCESS=true
```

### Option 2: Revert Deployment
In Netlify Dashboard:
1. Go to Deploys
2. Find last working deployment
3. Click "Publish deploy"

## Testing Checklist

After deployment, test these critical paths:

- [ ] Homepage loads
- [ ] Access code `CLOCK-DEMO-2025` works
- [ ] Questionnaire starts and progresses
- [ ] API routes respond (check Network tab)
- [ ] Report generation completes

## Support Resources

- **Build Logs**: Netlify Dashboard → Deploys → View logs
- **Runtime Logs**: Netlify Dashboard → Functions → View logs
- **Database Logs**: Supabase Dashboard → Logs → API logs
- **Error Tracking**: Browser Console + Network tab

## Quick SQL Queries

```sql
-- Check if access codes exist
SELECT * FROM access_codes WHERE code LIKE 'CLOCK-%';

-- Reset demo code if needed
UPDATE access_codes 
SET status = 'active', current_uses = 0 
WHERE code = 'CLOCK-DEMO-2025';

-- View recent access attempts
SELECT * FROM access_logs 
ORDER BY created_at DESC LIMIT 10;
```

---

📝 **Note**: Full documentation in `/docs/stories/1.5.story.md`