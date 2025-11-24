# Team Form Tracker

A Next.js application for tracking form completions by team members with Supabase authentication and team management.

## Features

- ✅ Supabase authentication (email/password)
- ✅ User onboarding flow
- ✅ Team members table with sortable columns
- ✅ Profile management
- ✅ Responsive design with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, React
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Database & Auth**: Supabase
- **Charts**: shadcn/ui charts (for future use)

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 2. Database Setup

You need to run the SQL migration to create the profiles table and set up the necessary triggers and policies.

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_create_profiles_table.sql`
4. Run the migration

This will:
- Create the `profiles` table
- Set up Row Level Security (RLS) policies
- Create a trigger to auto-create profiles when users sign up
- Create a trigger to auto-update the `last_updated` field

### 3. Environment Variables

The `.env.local` file is already configured with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fkpbglbmhqwurfzlxifq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Flow

1. **Landing Page** (`/`) - Redirects based on auth status:
   - Not authenticated → `/auth`
   - Authenticated but no profile → `/onboarding`
   - Authenticated with profile → `/dashboard`

2. **Auth Page** (`/auth`) - Supabase Auth UI for sign up and login

3. **Onboarding** (`/onboarding`) - Captures first name and last name after signup

4. **Dashboard** (`/dashboard`) - Displays team members table with all profiles

## Database Schema

### Profiles Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (references auth.users) |
| `email` | TEXT | User's email (synced from auth) |
| `first_name` | TEXT | First name (captured during onboarding) |
| `last_name` | TEXT | Last name (captured during onboarding) |
| `title` | TEXT | Job title (optional, for future bulk upload) |
| `team` | TEXT | Team name (optional, for future bulk upload) |
| `phone_number` | TEXT | Phone number (optional, for future bulk upload) |
| `shiftboard_id` | TEXT | Shiftboard ID (optional, for future bulk upload) |
| `hlsr_scheduling_id` | TEXT | HLSR Scheduling ID (optional, for future bulk upload) |
| `last_updated` | TIMESTAMP | Auto-updated on row changes |
| `created_at` | TIMESTAMP | Creation timestamp |

## File Structure

```
app.rodeocxc/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page with redirect logic
│   ├── auth/
│   │   ├── page.tsx            # Supabase Auth UI
│   │   └── callback/
│   │       └── route.ts        # Auth callback handler
│   ├── onboarding/
│   │   └── page.tsx            # Onboarding form
│   └── dashboard/
│       └── page.tsx            # Team members dashboard
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── team-members-table.tsx # Team table component
├── utils/
│   └── supabase/
│       ├── server.ts           # Server-side Supabase client
│       ├── client.ts           # Client-side Supabase client
│       └── middleware.ts       # Supabase middleware utilities
├── types/
│   └── database.ts             # TypeScript database types
├── supabase/
│   └── migrations/
│       └── 001_create_profiles_table.sql
├── middleware.ts               # Next.js auth middleware
└── .env.local                  # Environment variables
```

## Future Enhancements

- Bulk CSV upload for team member data
- Form creation and assignment system
- Notification system for overdue forms
- User profile/settings pages
- Form completion tracking
- Dashboard with charts for metrics
- Email notifications

## Development Notes

- All authentication is handled by Supabase Auth
- Row Level Security (RLS) ensures users can only update their own profiles
- All users can view all team members (for the team table)
- The database trigger automatically creates a profile when a user signs up
- Client components use `@/utils/supabase/client.ts`
- Server components use `@/utils/supabase/server.ts`

## Support

For issues or questions, refer to the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
