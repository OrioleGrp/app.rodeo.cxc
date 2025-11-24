# Database Migration Instructions

## Quick Start

**You must run this SQL migration before the application will work!**

### Step-by-Step Instructions

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project (URL: https://fkpbglbmhqwurfzlxifq.supabase.co)

2. **Open SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **New query** button

3. **Run the Migration**
   - Open the file: `supabase/migrations/001_create_profiles_table.sql`
   - Copy ALL the SQL code
   - Paste it into the SQL Editor
   - Click **Run** (or press Ctrl+Enter / Cmd+Enter)

4. **Verify Success**
   - You should see "Success. No rows returned"
   - Go to **Table Editor** in the left sidebar
   - You should see a `profiles` table

## What This Migration Creates

### 1. Profiles Table
A table to store team member information with these columns:
- `id` - User ID (links to Supabase Auth)
- `email` - User email
- `first_name` - First name
- `last_name` - Last name
- `title` - Job title
- `team` - Team name
- `phone_number` - Phone number
- `shiftboard_id` - Shiftboard ID
- `hlsr_scheduling_id` - HLSR Scheduling ID
- `last_updated` - Auto-updated timestamp
- `created_at` - Creation timestamp

### 2. Database Triggers

**Auto-create profile trigger:**
- Automatically creates a profile when a user signs up
- Copies the email from auth.users
- Sets creation timestamp

**Auto-update timestamp trigger:**
- Automatically updates `last_updated` when profile is modified

### 3. Row Level Security (RLS) Policies

**View all profiles:**
- Any authenticated user can view all team members
- Enables the team table functionality

**Update own profile:**
- Users can only update their own profile
- Prevents unauthorized modifications

**Insert own profile:**
- Users can create their own profile
- Backup for the trigger system

## Troubleshooting

### Migration fails with "already exists" error
The migration has already been run. You can skip this step.

### Migration fails with permission error
Make sure you're logged into the correct Supabase project and have owner/admin access.

### No profiles table after migration
1. Check the SQL Editor output for errors
2. Try running the migration again
3. Check that you copied the entire SQL file

### Users can't sign up
1. Make sure the migration ran successfully
2. Check that email authentication is enabled:
   - Dashboard > Authentication > Providers
   - Email should be enabled

### Profiles not auto-created on signup
1. Verify the trigger exists:
   ```sql
   SELECT * FROM information_schema.triggers
   WHERE trigger_name = 'on_auth_user_created';
   ```
2. If it doesn't exist, re-run the migration

## Manual Verification

To check if everything is set up correctly, run this SQL in the SQL Editor:

```sql
-- Check if profiles table exists
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'profiles';

-- Check if triggers exist
SELECT trigger_name
FROM information_schema.triggers
WHERE trigger_schema = 'public';

-- Check RLS policies
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'profiles';

-- View all profiles (should be empty initially)
SELECT * FROM profiles;
```

## Resetting the Database

If you need to start over:

```sql
-- Drop the profiles table (this will delete all data!)
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop the triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Now re-run the migration
```

**Warning:** This will delete all profile data! Use with caution.
