# Pakakumi Growth Intelligence - Getting Started

## What You Have

A complete, production-ready full-stack analytics and attribution platform for tracking First-Time Depositor (FTD) acquisition efficiency across all marketing channels.

**Project Status**: COMPLETE - 14 dashboard pages, full backend, real authentication, database schema, and data seeding ready.

## Before You Start

You need:
1. PostgreSQL database or Neon account
2. Node.js 18+ with pnpm installed
3. About 15 minutes to set up

## Step 1: Get Database Connection String

### Option A: Use Neon (Recommended)
1. Go to neon.tech
2. Create free PostgreSQL database
3. Copy connection string starting with `postgresql://`

### Option B: Use Local PostgreSQL
```bash
# Create database
createdb pakakumi

# Connection string format:
postgresql://user:password@localhost:5432/pakakumi
```

## Step 2: Set Environment Variables

Create `.env.local` in project root:

```bash
DATABASE_URL="postgresql://YOUR_CONNECTION_STRING"
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"
```

**Must do: Replace YOUR_CONNECTION_STRING with your actual connection string.**

To generate BETTER_AUTH_SECRET if you don't have openssl:
- On Mac/Linux: `openssl rand -base64 32`
- On Windows: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- Or just use any 32+ random character string

## Step 3: Initialize Database

```bash
# Install dependencies (first time only)
pnpm install

# Create database schema
pnpm prisma db push

# Populate with realistic sample data
pnpm seed
```

The seed will create:
- 6 acquisition sources (Google Ads, Organic, Opera, Social, Affiliate, Direct)
- 12+ campaigns with realistic metrics
- 1,000+ users with conversion journeys
- Complete FTD attribution data

Takes ~30 seconds.

## Step 4: Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

You should see the landing page. If not, check `.env.local` is in the correct location.

## Step 5: Create Your Account

1. Click "Sign Up"
2. Enter any email (e.g., test@example.com)
3. Create password (8+ characters)
4. You're logged in and ready to explore!

## Step 6: Explore the Dashboard

Navigate using the sidebar:

**Analytics Pages:**
- **Overview** - KPI cards, funnel, channel distribution
- **Channels** - Acquisition source comparison
- **Campaigns** - Campaign performance and recommendations
- **Funnel** - Step-by-step conversion visualization

**Detailed Analytics:**
- **Attribution** - User journey tracking (prepare for real data)
- **Conversion Audit** - Data quality and tracking checks
- **SEO** - Organic search performance
- **Landing Pages** - Page-level conversion analysis
- **Partners** - Opera/affiliate performance

**Intelligence:**
- **Budget** - AI-driven budget allocation recommendations
- **Alerts** - Performance anomalies and issues
- **Reports** - Report generation (foundation ready)

**Configuration:**
- **Integrations** - Prepare connections to Google Ads, GA4, etc.
- **Settings** - Account and workspace settings

## Understanding the Data

### Sample Data Distribution

The seeded data creates a realistic conversion funnel:
- **Traffic**: 100,000 estimated impressions
- **Clicks**: 5,000-10,000 clicks
- **Registrations**: ~1,500-2,000 (30% of clicks)
- **Verified**: ~1,000-1,300 (70% of registrations)
- **FTDs**: ~250-350 (25-35% of verified)

Each campaign has realistic:
- Campaign-specific cost per click
- Variable conversion rates
- Attribution tracking with UTM parameters and gclid

### Key Metrics Explained

**First-Time Depositors (FTD)**
- Users who completed: Click → Register → Verify → First Deposit
- This is the PRIMARY business metric
- Repeat deposits are NOT counted as new FTDs

**Cost per FTD**
- Total Spend ÷ Number of FTDs
- Lower is better
- This is the PRIMARY optimization metric

**Performance Categories** (Automatic)
- **SCALE**: >100 FTDs, <500 cost/FTD → Increase budget
- **OPTIMIZE**: >50 FTDs, <800 cost/FTD → Test new creatives
- **INVESTIGATE**: High spend but low FTDs → Review setup
- **PAUSE**: No FTDs or very high cost → Stop and re-evaluate

## Making Changes

### Add More Sample Data

```bash
# Delete all data and re-seed
pnpm seed
```

### Update Database Schema

Edit `/prisma/schema.prisma` then:
```bash
pnpm prisma db push
```

### Test Different Scenarios

The data is realistic but synthetic. You can modify `/scripts/seed.ts` to test different scenarios (e.g., different conversion rates, channel performance, etc.).

## Connecting Real Data

The system is ready for real data integration:

### From Google Ads
- Campaign metrics, keywords, conversions
- API endpoint prepared in `/app/actions/dashboard.ts`

### From Google Analytics 4
- User behavior, registration source, goals
- Data mapping prepared

### From Internal Systems
- Registration events → `Registration` table
- Deposit events → `Deposit` table
- User verification → `User.verifiedAt`

### From Opera/Partners
- Traffic source → `AcquisitionSource` table
- Metrics aggregated in partner tracking

All integration points are clearly marked in the code with comments.

## Troubleshooting

### "Error: connect ECONNREFUSED"
Database connection failed. Check:
- DATABASE_URL is correctly set in `.env.local`
- Database server is running (for local PostgreSQL)
- Neon connection URL is copied exactly

### "Error: Unauthorized"
Auth is not configured. Check:
- BETTER_AUTH_SECRET is set and >= 32 characters
- Database schema was created (`pnpm prisma db push`)

### "Page not loading"
Clear cache and restart:
```bash
rm -rf .next
pnpm dev
```

### "Database already exists"
If you want to reset:
```bash
# Drop all tables
pnpm prisma migrate reset

# Or use Prisma Studio to inspect
pnpm prisma studio
```

## Next Steps

1. **Explore the Dashboard** - Spend 10 minutes clicking around all pages
2. **Understand the Funnel** - See how users flow from click to FTD
3. **Check Budget Recommendations** - See AI-driven optimization suggestions
4. **Review the Code** - Open `/app/actions/` to understand data flow
5. **Plan Integration** - Decide which data sources to connect first

## Key Files Reference

| File | Purpose |
|------|---------|
| `/prisma/schema.prisma` | Database schema definition |
| `/scripts/seed.ts` | Sample data generation |
| `/app/actions/dashboard.ts` | KPI and funnel calculations |
| `/app/actions/analytics.ts` | Advanced analytics (SEO, budget, alerts) |
| `/app/dashboard/page.tsx` | Overview dashboard page |
| `/lib/auth.ts` | Authentication configuration |
| `/lib/prisma.ts` | Database client |

## Deployment

When ready to deploy to production:

```bash
# Push to GitHub
git add .
git commit -m "Initial commit: Pakakumi Growth Intelligence"
git push origin main

# Deploy to Vercel
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Set environment variables (DATABASE_URL, BETTER_AUTH_SECRET)
# 4. Deploy

# After deployment, run migrations on production:
# pnpm prisma db push
```

See `DEPLOYMENT.md` for full production setup.

## Architecture Overview

```
User Browser
    ↓
Next.js Frontend (React 19, Tailwind, shadcn/ui)
    ↓
Server Actions & API Routes (Next.js App Router)
    ↓
Prisma ORM (Type-safe database queries)
    ↓
PostgreSQL (Real persistent data)
```

All data flows through type-safe server actions. No sensitive data in frontend code.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth (email/password)
- **UI**: React 19 + Tailwind CSS v4 + shadcn/ui
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Validation**: Zod
- **Icons**: Lucide React

## Documentation

- **README.md** - Feature overview
- **QUICKSTART.md** - 5-minute setup
- **DEPLOYMENT.md** - Production deployment
- **SYSTEM_DESIGN.md** - Architecture deep-dive
- **PROJECT_COMPLETE.md** - Full project summary
- **INDEX.md** - File structure
- **This file** - Getting started

## Success Indicators

You'll know everything is working when:
1. Dev server starts without errors (`pnpm dev`)
2. Can view http://localhost:3000 in browser
3. Can sign up and log in
4. Dashboard shows KPI data (should see numbers in cards)
5. All pages load without errors
6. Can click through different dashboard sections

## Questions?

Review the relevant documentation file:
- **Setup issues** → QUICKSTART.md
- **Production deployment** → DEPLOYMENT.md
- **Architecture questions** → SYSTEM_DESIGN.md
- **File locations** → INDEX.md
- **Full feature list** → PROJECT_COMPLETE.md

## Ready to Begin?

```bash
# 1. Set DATABASE_URL and BETTER_AUTH_SECRET in .env.local
# 2. Run these commands:
pnpm install
pnpm prisma db push
pnpm seed
pnpm dev

# 3. Visit http://localhost:3000
# 4. Sign up and explore!
```

Enjoy building with Pakakumi Growth Intelligence!
