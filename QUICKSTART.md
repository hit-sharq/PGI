# Pakakumi Growth Intelligence - Quick Start Guide

## Prerequisites
- Node.js 18+ and pnpm installed
- PostgreSQL database access or Neon account
- Git (for version control)

## Step 1: Clone and Install

```bash
# Install dependencies
pnpm install
```

## Step 2: Set Up Environment Variables

Create `.env.local` in the project root:

```bash
# Database Connection - Get from Neon or your PostgreSQL instance
DATABASE_URL="postgresql://user:password@host:5432/pakakumi"

# Authentication Secret - Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET="your-generated-secret-here"
```

## Step 3: Initialize Database

```bash
# Push schema to database
pnpm prisma db push

# Seed with realistic sample data
pnpm seed
```

This will create:
- 6 acquisition sources (Google Ads, Organic, Opera, Social, Affiliate, Direct)
- 12-20 campaigns with realistic metrics
- 1,000+ users with complete conversion journeys
- Realistic distribution across the funnel

## Step 4: Start Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Step 5: Create Account

1. Click "Sign Up"
2. Enter email and password (any valid email, password >= 8 chars)
3. Click "Get Started"
4. You'll be redirected to the dashboard

## Step 6: Explore the Dashboard

Navigate through the main sections:

- **Overview** - KPI cards and acquisition funnel
- **Channels** - Performance by acquisition source
- **Campaigns** - Detailed campaign metrics and recommendations
- **Funnel** - Step-by-step conversion visualization
- **Attribution** - FTD user journeys (setup required)
- **Conversion Audit** - Tracking verification and warnings
- **SEO** - Organic search performance
- **Landing Pages** - Page-level conversion analysis
- **Partners** - Opera and affiliate performance
- **Budget** - AI-driven optimization recommendations
- **Alerts** - Performance anomalies and issues
- **Reports** - Report generation (setup required)

## Key Metrics Explained

### First-Time Depositors (FTD)
The primary business metric - users who make their first successful deposit after registering and verifying their account.

### Cost per FTD
Total spend divided by number of FTDs. Lower is better. This is the key optimization metric.

### Funnel Stages
1. **Traffic** - Estimated impressions
2. **Clicks** - Actual ad clicks captured
3. **Registrations** - Users who signed up
4. **Verified** - Users who completed verification
5. **FTDs** - Users who made first deposit

### Performance Categories
- **SCALE** - High FTDs (>100), low cost (<500). Increase budget.
- **OPTIMIZE** - Good potential (>50 FTDs, <800 cost). A/B test new creatives.
- **INVESTIGATE** - High spend but low FTDs. Review tracking and landing pages.
- **PAUSE** - Poor efficiency. Pause and re-evaluate.

## Data Integration Points (Ready for Real Data)

The system is structured to accept real data from:

1. **Google Ads API** - Campaign metrics, keywords, conversions
2. **Google Analytics 4** - User behavior and conversion data
3. **Webhooks** - Real-time data sync from ad platforms
4. **Direct Database** - API endpoints for registration and deposit data

## API Routes for Integration

All dashboard data flows through these server actions in `/app/actions/`:

- `getDashboardMetrics()` - KPI summary
- `getAcquisitionFunnel()` - Conversion stages
- `getChannelPerformance()` - Channel comparison
- `getCampaignPerformance()` - Campaign details
- `getSeoPerformance()` - Organic data
- `getLandingPagePerformance()` - Page analytics
- `getPartnerPerformance()` - Partner metrics
- `getBudgetRecommendations()` - Optimization suggestions
- `getAlerts()` - Performance anomalies
- `getFTDAttribution()` - User journey tracking

## Troubleshooting

### Database Connection Error
```bash
# Verify connection
psql $DATABASE_URL

# Check Prisma schema
pnpm prisma validate
```

### Auth Issues
- Verify BETTER_AUTH_SECRET is >= 32 characters
- Clear browser cookies
- Restart dev server

### Missing Data
```bash
# Re-seed database (deletes existing data)
pnpm seed

# Check Prisma schema
pnpm prisma studio
```

## Next Steps

1. Connect real data sources (Google Ads, GA4)
2. Set up webhook handlers for real-time updates
3. Deploy to Vercel
4. Configure production environment
5. Add team collaboration features

## Support

- Check `README.md` for comprehensive documentation
- See `SYSTEM_DESIGN.md` for architecture details
- Review `DEPLOYMENT.md` for production setup
- Consult `INDEX.md` for file structure guide

## Commands Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm prisma db push        # Sync schema with database
pnpm seed                   # Populate with sample data
pnpm prisma studio         # Open Prisma Studio (GUI)

# Code Quality
pnpm lint                   # Run linter
pnpm tsc --noEmit          # Check TypeScript
```
