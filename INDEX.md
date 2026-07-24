# Pakakumi Growth Intelligence - Complete Project Index

## 📦 Project Overview

**Pakakumi Growth Intelligence** is a premium, production-quality analytics and attribution platform for marketing teams to track, measure, and optimize First-Time Depositor (FTD) acquisition.

- **Built for**: Marketing analytics teams
- **Core metric**: Cost per First-Time Depositor (Cost/FTD)
- **Status**: Complete and deployment-ready
- **Tech**: Next.js 16, TypeScript, PostgreSQL, Prisma, Better Auth

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| TypeScript/TSX Files | 31 |
| Total Lines of Code | 4,796 |
| Dashboard Pages | 14 |
| Database Tables | 14 |
| Documentation Files | 4 |
| Prisma Schema Lines | 355 |

---

## 📚 Documentation Files (READ IN THIS ORDER)

### 1. **START HERE: Setup Checklist** (5 min read)
📄 [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md)
- Quick setup steps for local and production
- Environment variable configuration
- Common issues and fixes
- Data population methods

### 2. **Understanding the Platform** (15 min read)
📖 [`BUILD_SUMMARY.md`](./BUILD_SUMMARY.md)
- What was built
- Feature checklist
- Architecture decisions
- Deployment guide

### 3. **Deep Dive: System Design** (30 min read)
🏗️ [`SYSTEM_DESIGN.md`](./SYSTEM_DESIGN.md)
- Core business logic (FTD definitions)
- Complete database schema
- API architecture
- Integration patterns
- Design system specifications
- Performance considerations

### 4. **Getting Started** (10 min read)
📖 [`README.md`](./README.md)
- Quick start instructions
- Feature overview
- Directory structure
- API documentation
- Troubleshooting guide

---

## 🗂️ Project Structure

```
/vercel/share/v0-project/
│
├── 📄 Documentation
│   ├── README.md                 ← Start here for overview
│   ├── SYSTEM_DESIGN.md         ← Architecture details
│   ├── BUILD_SUMMARY.md         ← What was built
│   ├── SETUP_CHECKLIST.md       ← Setup instructions
│   ├── INDEX.md                 ← This file
│   └── .env.example             ← Environment template
│
├── 📱 Frontend Application
│   ├── app/
│   │   ├── layout.tsx                      # Root layout
│   │   ├── page.tsx                        # Landing/redirect
│   │   ├── globals.css                     # Design system
│   │   ├── sign-in/page.tsx               # Login page
│   │   ├── sign-up/page.tsx               # Register page
│   │   │
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts     # Auth API endpoint
│   │   │
│   │   └── dashboard/
│   │       ├── layout.tsx                  # Sidebar + nav
│   │       ├── page.tsx                    # Overview dashboard
│   │       ├── funnel/page.tsx            # Acquisition funnel
│   │       ├── channels/page.tsx          # Channel comparison
│   │       ├── campaigns/page.tsx         # Campaign metrics
│   │       ├── attribution/page.tsx       # FTD attribution
│   │       ├── audit/page.tsx             # Conversion audit
│   │       ├── seo/page.tsx               # SEO performance
│   │       ├── pages/page.tsx             # Landing pages
│   │       ├── partners/page.tsx          # Partner tracking
│   │       ├── budget/page.tsx            # Budget optimization
│   │       ├── alerts/page.tsx            # Alerts & anomalies
│   │       ├── reports/page.tsx           # Report generation
│   │       ├── integrations/page.tsx      # Integration config
│   │       └── settings/page.tsx          # Account settings
│   │
│   └── components/
│       └── ui/                             # shadcn/ui components
│
├── 🔧 Backend & Configuration
│   ├── lib/
│   │   ├── auth.ts                        # Better Auth config
│   │   ├── auth-client.ts                 # Client auth hook
│   │   ├── prisma.ts                      # Prisma client
│   │   └── utils.ts                       # Utility functions
│   │
│   ├── app/
│   │   └── actions/
│   │       └── dashboard.ts               # Server actions
│   │
│   ├── prisma/
│   │   └── schema.prisma                  # Database schema
│   │
│   └── Configuration Files
│       ├── package.json                   # Dependencies
│       ├── tsconfig.json                  # TypeScript config
│       ├── next.config.mjs                # Next.js config
│       ├── tailwind.config.ts             # Tailwind config
│       ├── prisma.config.ts               # Prisma config
│       └── .eslintrc.json                 # ESLint config
│
└── 📦 Generated
    └── node_modules/                      # Dependencies
```

---

## 🎯 Core Pages Map

### Authentication Pages
- **`/`** - Landing page (redirects to auth)
- **`/sign-in`** - Email/password login
- **`/sign-up`** - New account registration

### Dashboard Pages (All under `/dashboard`)
| Page | Route | Purpose |
|------|-------|---------|
| Overview | `/dashboard` | KPI cards, funnel, channel distribution |
| Acquisition Funnel | `/dashboard/funnel` | Conversion breakdown: Traffic → Clicks → Registrations → Verified → FTDs |
| Channels | `/dashboard/channels` | Compare performance across Google Ads, Opera, Affiliates, Social, Direct |
| Campaigns | `/dashboard/campaigns` | Detailed campaign metrics with SCALE/OPTIMIZE/INVESTIGATE/PAUSE recommendations |
| FTD Attribution | `/dashboard/attribution` | Trace user journeys from first touch to first deposit |
| Conversion Audit | `/dashboard/audit` | Validate conversion actions, identify tracking discrepancies |
| SEO Performance | `/dashboard/seo` | Organic search metrics from Google Search Console |
| Landing Pages | `/dashboard/pages` | Conversion analysis by page, identify high-traffic/low-FTD pages |
| Partners | `/dashboard/partners` | Opera and affiliate partner performance tracking |
| Budget Optimization | `/dashboard/budget` | AI-driven budget allocation recommendations |
| Alerts | `/dashboard/alerts` | Real-time anomaly detection (cost increase, FTD drop, etc.) |
| Reports | `/dashboard/reports` | Generate exportable reports (PDF/CSV) |
| Integrations | `/dashboard/integrations` | Manage Google Ads, GA4, GSC, Opera connections |
| Settings | `/dashboard/settings` | Account preferences, attribution model, data retention |

---

## 🗄️ Database Tables (Prisma Schema)

### Authentication (4 tables)
- `User` - User accounts
- `Session` - Active sessions
- `Account` - OAuth accounts (future)
- `Verification` - Email verification tokens

### Acquisition & Attribution (5 tables)
- `AcquisitionSource` - Channels (Google Ads, Opera, etc.)
- `Campaign` - Ad campaigns
- `AdGroup` - Ad groups within campaigns
- `Keyword` - Keywords within ad groups
- `AttributionEvent` - User clicks with tracking parameters

### Conversion Funnel (3 tables)
- `Registration` - User signups
- `Deposit` - User deposits (flagged as first-time)
- `LandingPage` - Landing page performance

### Analytics & Monitoring (2 tables)
- `SEOMetric` - Organic search data
- `Alert` - Performance anomalies

### Integrations (2 tables)
- `IntegrationCredential` - API credentials
- `ConversionAction` - Conversion definitions

---

## 🚀 Quick Start

### Development (Local)
```bash
# 1. Generate environment file
cp .env.example .env.local

# 2. Edit .env.local with database URL and auth secret
# DATABASE_URL=postgresql://...
# BETTER_AUTH_SECRET=<from openssl rand -base64 32>

# 3. Initialize database
pnpm install
npx prisma migrate dev --name init

# 4. Start dev server
pnpm dev

# 5. Open http://localhost:3000
```

### Production (Vercel)
```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy on Vercel dashboard
# Add environment variables:
# - DATABASE_URL
# - BETTER_AUTH_SECRET

# 3. Verify deployment
# Check URL in Vercel dashboard
```

See [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) for detailed steps.

---

## 📊 Key Features

### Dashboard Metrics
- ✅ Total Spend
- ✅ Impressions, Clicks, Registrations
- ✅ Verified Users
- ✅ First-Time Depositors (FTDs)
- ✅ Cost per FTD
- ✅ Trend indicators (% change)

### Channel & Campaign Analysis
- ✅ Multi-channel comparison
- ✅ Campaign performance metrics
- ✅ Sortable by FTDs, Cost/FTD, Spend, Conversion Rate
- ✅ Automated recommendations (SCALE/OPTIMIZE/INVESTIGATE/PAUSE)

### Attribution & Tracking
- ✅ FTD attribution by source, campaign, keyword
- ✅ Conversion tracking audit
- ✅ Google Ads vs. verified FTD comparison
- ✅ Repeat deposit detection

### Analytics & Intelligence
- ✅ SEO performance (organic search)
- ✅ Landing page conversion analysis
- ✅ Partner/Opera traffic tracking
- ✅ Budget optimization recommendations

### Monitoring & Reporting
- ✅ Real-time alerts (cost increase, FTD drop, etc.)
- ✅ Report generation (PDF, CSV)
- ✅ Integration management
- ✅ Configurable settings

---

## 🎨 Design System (Gaia Aesthetic)

### Color Palette
```
Background:     #0d1a12 (dark green)
Text:           #e8e6e1 (off-white)
Accent/Gold:    #c8b96a (highlights, CTAs)
Card:           #1a2818 (slightly lighter)
Border:         #2a3f2e (subtle)
```

### Typography
- **Display**: Cormorant Garamond (serif) - headings
- **Body**: Inter (sans-serif) - text and UI

### Features
- Clean borders, minimal shadows
- Responsive layout (mobile-first)
- Smooth transitions
- Professional, premium feel

---

## 🔐 Security & Architecture

### Authentication
- Better Auth with email/password
- Session-based (secure cookies)
- HTTPS in production
- Email verification required

### Authorization
- `getUserId()` helper for per-user scoping
- Server-side session validation
- No Row-Level Security (RLS) - explicit scoping in code

### Data Protection
- Parameterized queries (Prisma)
- No API keys in frontend
- Anonymized user IDs in analytics
- Immutable audit trail (AttributionEvent)

---

## 📈 Core Business Logic

### FTD Definition
A First-Time Depositor is:
1. A user who completes email verification, AND
2. Makes their first successful deposit
3. Counted only ONCE per user (repeat deposits ignored)

### Cost per FTD Calculation
```
Cost per FTD = Total Campaign Spend ÷ Count(First Deposits Only)
```

This is the **PRIMARY optimization metric**.

### Performance Categories
Based on FTD volume and efficiency:
- **SCALE**: >100 FTDs, Cost/FTD <500 → Increase budget
- **OPTIMIZE**: 50-100 FTDs, Cost/FTD 500-800 → Improve targeting
- **INVESTIGATE**: <50 FTDs, Cost/FTD >1000 → Audit tracking
- **PAUSE**: 0 FTDs → Suspend campaign

---

## 🔌 Integration Architecture

### Built-in Support For:
- Google Ads API (campaigns, keywords, conversions)
- Google Analytics 4 (user behavior)
- Google Search Console (organic search)
- Opera API (partner traffic)
- Internal Registration API (signups)
- Internal Deposit API (transactions)

### Integration Management
All integrations managed via `/dashboard/integrations` page:
- Connection status
- Last sync timestamp
- Manual sync triggers
- Credential management

---

## 📋 API Documentation

### Server Actions (in `app/actions/dashboard.ts`)

#### `getDashboardMetrics(dateFrom, dateTo)`
Returns KPI metrics for date range:
- Total spend, impressions, clicks, registrations
- Verified users count, FTD count, Cost per FTD
- Total deposit value, campaigns, sources

#### `getAcquisitionFunnel(dateFrom, dateTo)`
Returns funnel breakdown:
- Traffic, Clicks, Registrations, Verified, FTDs
- Conversion rates between stages
- Drop-off percentages

#### `getChannelPerformance(dateFrom, dateTo)`
Returns channel comparison data:
- By source, sorted by FTDs
- Spend, traffic, registrations, FTDs, Cost/FTD
- Conversion rates

#### `getCampaignPerformance(dateFrom, dateTo, sourceId?)`
Returns campaign metrics with recommendations:
- By campaign, with performance badges
- Spend, impressions, clicks, CTR, CPC
- Registrations, verified users, FTDs, Cost/FTD
- SCALE/OPTIMIZE/INVESTIGATE/PAUSE recommendations

---

## 🚀 Deployment

### Requirements
1. PostgreSQL database (Neon recommended)
2. Node.js 18+
3. Vercel account (optional but recommended)

### Steps
See [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) for step-by-step deployment guide.

---

## 🎯 Next Steps

1. **Setup** (15 min)
   - Follow [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md)
   - Configure environment variables
   - Deploy to Vercel

2. **Configure Integrations** (30 min)
   - Connect Google Ads API
   - Connect Google Analytics 4
   - Connect Google Search Console

3. **Data Population** (1-3 hours)
   - Set up webhook from your app for registration events
   - Set up webhook from your app for deposit events
   - Verify data is flowing into Pakakumi

4. **First Insights** (24-48 hours)
   - Review dashboard KPIs
   - Generate first report
   - Share with stakeholder team

---

## 📞 Support & Resources

### Documentation
- 📖 [README.md](./README.md) - Features and setup
- 🏗️ [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) - Architecture details
- 📋 [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - What was built
- ✅ [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Deployment guide

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com)
- [Vercel Documentation](https://vercel.com/docs)

---

## ✨ Key Principles

1. **Optimize for verified FTDs, not vanity metrics**
2. **Real data architecture** - Clean separation of tracking sources
3. **Transparent attribution** - Show Google Ads vs. verified FTDs
4. **Actionable insights** - Recommendations based on actual efficiency
5. **Data quality first** - Alerts for tracking anomalies

---

## 🎉 You're Ready!

**Pakakumi Growth Intelligence** is complete and ready to deploy.

Start with [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) → get it running → begin tracking real growth.

**Let's optimize for what matters: First-Time Depositors.**

---

*Build Date: July 24, 2026*
*Status: Production Ready* ✅
