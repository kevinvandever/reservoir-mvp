# Supabase Setup for Access Code System

## Quick Setup Instructions

To enable the access code system (including the CLOCK-DEMO-2025 code), you need to run a SQL script in your Supabase project.

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### Step 2: Run the Setup Script

Copy and paste the entire contents of `/supabase/setup-access-codes.sql` into the SQL editor and click "Run".

This script will:
- Create the necessary tables (`access_codes`, `member_sessions`, `access_logs`)
- Create the validation function
- Insert demo access codes including `CLOCK-DEMO-2025`
- Set up proper permissions

### Step 3: Verify Setup

After running the script, you should see a success message and a table showing the demo codes that were created:

```
code              | member_name | status | max_uses | current_uses
CLOCK-DEMO-2025   | Demo User   | active | 100      | 0
CLOCK-TEST-2025   | Test Member | active | 10       | 0
```

### Step 4: Environment Variables

Make sure your Netlify deployment has these environment variables set:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (if needed)

### Optional: Force Mock Service

If you want to temporarily use the mock service instead of Supabase, add this environment variable to Netlify:
- `NEXT_PUBLIC_USE_MOCK_ACCESS=true`

## Troubleshooting

### Access Code Not Working?

1. **Check the database**: Run this query in Supabase SQL editor:
   ```sql
   SELECT * FROM access_codes WHERE code = 'CLOCK-DEMO-2025';
   ```
   
2. **Reset the demo code** if needed:
   ```sql
   UPDATE access_codes 
   SET status = 'active', 
       current_uses = 0, 
       expires_at = NOW() + INTERVAL '90 days'
   WHERE code = 'CLOCK-DEMO-2025';
   ```

3. **Check function exists**:
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'validate_and_use_access_code';
   ```

4. **View recent access attempts**:
   ```sql
   SELECT * FROM access_logs ORDER BY created_at DESC LIMIT 10;
   ```

### Need More Access Codes?

Generate new codes directly in the database:
```sql
INSERT INTO access_codes (code, member_name, member_email, source, max_uses, expires_at, status)
VALUES ('CLOCK-CUSTOM-2025', 'Your Name', 'your@email.com', 'manual', 5, NOW() + INTERVAL '30 days', 'active');
```

## Production Considerations

1. **Regular Cleanup**: Set up a cron job to clean expired codes:
   ```sql
   UPDATE access_codes 
   SET status = 'expired' 
   WHERE expires_at < NOW() AND status = 'active';
   ```

2. **Monitor Usage**: Check usage patterns:
   ```sql
   SELECT code, member_name, current_uses, max_uses 
   FROM access_codes 
   WHERE status = 'active' 
   ORDER BY current_uses DESC;
   ```

3. **Security**: The access codes table has RLS enabled. Consider adding more restrictive policies based on your needs.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs for database errors
3. Verify environment variables are set correctly
4. Try using mock service temporarily with `NEXT_PUBLIC_USE_MOCK_ACCESS=true`