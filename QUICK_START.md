# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Run Database Migration (5 minutes)

1. Go to https://supabase.com/dashboard
2. Open your project
3. Click **SQL Editor** → **New query**
4. Copy/paste contents of `supabase/migrations/001_create_profiles_table.sql`
5. Click **Run**

**✅ Done when you see "Success. No rows returned"**

### Step 2: Enable Email Auth (2 minutes)

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. (Optional) Disable "Confirm email" for easier testing

### Step 3: Start the App (1 minute)

```bash
npm run dev
```

Open http://localhost:3000

**✅ Done when you see the auth page**

---

## First Use

1. Click **Sign up**
2. Enter email and password
3. Click **Sign up** button
4. Check email for confirmation (if enabled)
5. Enter first name and last name
6. See the team members table!

---

## What You Built

- ✅ **Authentication**: Supabase email/password
- ✅ **Onboarding**: Capture first/last name
- ✅ **Team Table**: View all team members with sortable columns
- ✅ **Database**: Profiles table with auto-triggers
- ✅ **Security**: Row Level Security policies

---

## Project Files

- `app/auth/page.tsx` - Login/signup page
- `app/onboarding/page.tsx` - Name capture
- `app/dashboard/page.tsx` - Team table
- `components/team-members-table.tsx` - Table component
- `supabase/migrations/001_create_profiles_table.sql` - Database setup

---

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check
```

---

## Troubleshooting

**Can't sign up?**
- Check email auth is enabled in Supabase
- Try disabling email confirmation

**No team members showing?**
- Make sure database migration ran
- Check Supabase Table Editor for profiles

**Build errors?**
- Delete `.next` folder
- Run `npm install`
- Run `npm run build`

---

## Next Steps

1. Add sign-out button to dashboard
2. Create profile settings page
3. Implement bulk CSV upload
4. Build forms tracking system
5. Add notifications for overdue items

---

## Documentation

- 📖 [README.md](./README.md) - Full documentation
- 📋 [SETUP.md](./SETUP.md) - Detailed setup guide
- 💾 [DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md) - DB setup
- 📊 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - What's been built

---

## Support

- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- shadcn/ui: https://ui.shadcn.com

---

**Ready to code!** 🎉
