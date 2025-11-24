# Setup Guide - Team Form Tracker

This guide will walk you through setting up the Team Form Tracker application from scratch.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Git installed (optional)

## Step 1: Database Setup

### 1.1 Access Your Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Your project is already set up at: `https://fkpbglbmhqwurfzlxifq.supabase.co`
3. Click on your project to open the dashboard

### 1.2 Enable Email Authentication

1. In the left sidebar, click on **Authentication**
2. Click on **Providers**
3. Find **Email** in the list and ensure it's enabled
4. Under **Email Auth** settings:
   - Enable "Enable email provider"
   - You can customize confirmation settings as needed
   - Click **Save** if you made any changes

### 1.3 Run the Database Migration

This is the most important step! The migration will create the profiles table and all necessary triggers.

1. In the left sidebar, click on **SQL Editor**
2. Click the **New query** button (or the "+" icon)
3. Open the file `supabase/migrations/001_create_profiles_table.sql` in your code editor
4. Copy the entire contents of the file
5. Paste it into the SQL Editor in Supabase
6. Click the **Run** button (or press Ctrl+Enter / Cmd+Enter)

You should see a success message. This migration creates:
- ✅ The `profiles` table with all required columns
- ✅ Row Level Security (RLS) policies
- ✅ A trigger to auto-create profiles when users sign up
- ✅ A trigger to auto-update the `last_updated` timestamp

### 1.4 Verify the Migration

1. In the left sidebar, click on **Table Editor**
2. You should see a `profiles` table in the list
3. Click on it to view the schema
4. Verify it has these columns:
   - id (uuid)
   - email (text)
   - first_name (text)
   - last_name (text)
   - title (text)
   - team (text)
   - phone_number (text)
   - shiftboard_id (text)
   - hlsr_scheduling_id (text)
   - last_updated (timestamptz)
   - created_at (timestamptz)

## Step 2: Application Setup

### 2.1 Environment Variables

The `.env.local` file is already configured with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fkpbglbmhqwurfzlxifq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** Never commit `.env.local` to version control!

### 2.2 Install Dependencies (Already Done)

The dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 2.3 Start the Development Server

```bash
npm run dev
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

## Step 3: Test the Application

### 3.1 Create Your First User

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You'll be redirected to the `/auth` page
3. Click on **"Sign up"** (or the signup tab)
4. Enter your email and create a password
5. Click **"Sign up"**

**Note:** By default, Supabase may require email confirmation. Check your email inbox for a confirmation link.

If you want to disable email confirmation for development:
1. Go to Supabase Dashboard > Authentication > Providers
2. Find Email provider settings
3. Disable "Confirm email"
4. Click Save

### 3.2 Complete Onboarding

After signing up (and confirming your email if required):

1. You'll be redirected to the `/onboarding` page
2. Enter your **First Name** and **Last Name**
3. Click **"Continue"**
4. You'll be redirected to the `/dashboard` page

### 3.3 View the Team Members Table

On the dashboard, you should see:
- A table with all team members
- Your profile should appear in the table
- Columns for all profile fields (most will show "-" since they're empty)
- Sortable columns (click any header to sort)

### 3.4 Create Additional Users (Optional)

To test the team table with multiple users:

1. Sign out (you'll need to add a sign-out button, or clear your browser cookies)
2. Create another account with a different email
3. Complete the onboarding
4. You should now see both users in the dashboard table

## Step 4: Populate Additional Profile Data

Currently, users only provide their email, first name, and last name during signup. The other fields (title, team, phone_number, etc.) are designed for bulk upload later.

For now, you can manually add data via the Supabase dashboard:

1. Go to Supabase Dashboard > Table Editor
2. Click on the `profiles` table
3. Click on a row to edit it
4. Fill in additional fields like:
   - Title (e.g., "Team Lead")
   - Team (e.g., "Operations")
   - Phone Number
   - Shiftboard ID
   - HLSR Scheduling ID
5. Click **Save**
6. Refresh your dashboard to see the updated data

## Troubleshooting

### Issue: Can't sign up / Email not confirmed

**Solution:** Disable email confirmation in Supabase:
1. Supabase Dashboard > Authentication > Providers
2. Email provider > Disable "Confirm email"
3. Save

### Issue: Profile not created after signup

**Solution:** Check if the database trigger is working:
1. Go to Supabase Dashboard > SQL Editor
2. Run: `SELECT * FROM profiles;`
3. You should see profiles for all users
4. If not, re-run the migration from `supabase/migrations/001_create_profiles_table.sql`

### Issue: Can't see other team members

**Solution:** Check RLS policies:
1. Supabase Dashboard > Authentication
2. Make sure you're logged in
3. Go to Table Editor > profiles
4. Check the RLS policies are enabled
5. Re-run the migration if needed

### Issue: Build errors

**Solution:**
```bash
# Clean build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Issue: "middleware" file convention deprecated warning

This is just a warning in Next.js 16. The middleware still works correctly. To fix:
- Rename `middleware.ts` to `proxy.ts` (when you're ready to migrate to the new convention)
- Update the Next.js docs for the latest middleware/proxy conventions

## Next Steps

Now that your application is set up and running, here are some next steps:

1. **Add a Sign Out button** to the dashboard
2. **Create a profile settings page** where users can update their own information
3. **Implement bulk CSV upload** for team member data
4. **Build the forms system** to track form completions
5. **Add notifications** for overdue forms
6. **Create charts and metrics** on the dashboard

## Getting Help

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Project Structure Reference

```
app.rodeocxc/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page (redirects)
│   ├── auth/
│   │   ├── page.tsx            # Sign up / Log in page
│   │   └── callback/
│   │       └── route.ts        # Auth callback handler
│   ├── onboarding/
│   │   └── page.tsx            # First/last name capture
│   └── dashboard/
│       └── page.tsx            # Team members table
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── team-members-table.tsx # Main table component
├── utils/
│   └── supabase/
│       ├── server.ts           # Server-side client
│       ├── client.ts           # Client-side client
│       └── middleware.ts       # Middleware utilities
├── types/
│   └── database.ts             # TypeScript types
├── supabase/
│   └── migrations/
│       └── 001_create_profiles_table.sql
└── middleware.ts               # Auth middleware
```
