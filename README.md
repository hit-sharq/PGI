# Pakakumi Growth Intelligence

A production-quality analytics and attribution platform for marketing teams to track qualified First-Time Depositors (FTDs), measure acquisition efficiency, and optimize campaign budgets.

## 🎯 Core Business Objective

Optimize for **verified First-Time Depositors (FTDs)**, not vanity metrics. The platform connects marketing spend and acquisition sources to actual user registration and first deposit events.

## 📋 Tech Stack

- **Frontend**: Next.js 16 with App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes and Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with email/password
- **Visualizations**: Recharts for data visualization
- **Design System**: Gaia aesthetic (dark theme, gold accents, serif fonts)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Neon PostgreSQL database (or any PostgreSQL instance)
- BETTER_AUTH_SECRET environment variable

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Add required env vars:
# DATABASE_URL=postgresql://...
# BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>

# Initialize database
npx prisma migrate dev --name init

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Core Features

### Dashboard Pages

1. **Overview** - KPI cards, funnel visualization, channel distribution
2. **Acquisition Funnel** - Traffic → Clicks → Registrations → Verified → FTDs
3. **Channels** - Compare performance across Google Ads, Opera, Affiliates, Social, Direct
4. **Campaigns** - Detailed campaign metrics with performance recommendations (SCALE/OPTIMIZE/INVESTIGATE/PAUSE)
5. **FTD Attribution** - Trace user journeys from first touch to first deposit
6. **Conversion Tracking Audit** - Validate conversion actions, identify tracking discrepancies
7. **SEO Performance** - Organic search metrics from Google Search Console
8. **Landing Pages** - Conversion analysis by page, identify high-traffic/low-FTD pages
9. **Partners** - Opera and affiliate partner performance tracking
10. **Budget Optimization** - AI-driven recommendations for budget allocation
11. **Alerts** - Real-time anomaly detection (cost increase, FTD drop, conversion divergence)
12. **Reports** - Generate exportable reports (PDF/CSV)

### Key Metrics

- **Total Spend** - Cumulative marketing investment
- **First-Time Depositors (FTDs)** - Core success metric
- **Cost per FTD** - Primary optimization target
- **Impressions, Clicks, Registrations** - Funnel metrics
- **Verified Users** - Users who completed email verification
- **Conversion Rates** - By source, campaign, and landing page

## 🔐 Business Logic

### FTD Calculation

Only the **first successful deposit** per user is counted as an FTD. Subsequent deposits are recorded but do not increase the FTD count.

### Performance Categorization

- **SCALE**: High FTD volume (>100) and efficient Cost/FTD (<500)
- **OPTIMIZE**: Moderate potential, room for improvement
- **INVESTIGATE**: High spend with weak FTD results
- **PAUSE**: Poor performance, minimal FTD generation

### Attribution Flow

1. User clicks marketing campaign (tracking parameters captured: gclid, utm_*)
2. Attribution event recorded with source, campaign, ad group, keyword
3. User registers (associated with original acquisition source)
4. User makes deposit
5. System verifies first deposit → marks user as FTD
6. Subsequent deposits do not create new FTDs

## 📁 Directory Structure

```
app/
  ├── dashboard/                 # Main dashboard pages
  │   ├── layout.tsx            # Sidebar navigation
  │   ├── page.tsx              # Overview/KPI dashboard
  │   ├── channels/
  │   ├── campaigns/
  │   ├── funnel/
  │   ├── attribution/
  │   ├── audit/
  │   ├── seo/
  │   ├── pages/
  │   ├── partners/
  │   ├── budget/
  │   ├── alerts/
  │   ├── reports/
  │   ├── integrations/
  │   └── settings/
  ├── api/auth/[...all]/         # Better Auth handler
  ├── sign-in/
  ├── sign-up/
  └── page.tsx                   # Root redirects to auth flow

lib/
  ├── auth.ts                    # Better Auth configuration
  ├── auth-client.ts             # Client-side auth
  ├── prisma.ts                  # Prisma client instance
  └── utils.ts                   # Utility functions

prisma/
  └── schema.prisma              # Database schema
  
components/
  └── ui/                        # shadcn/ui components
```

## 🗄️ Database Schema

### Core Tables

- **User** - User accounts with registration and deposit tracking
- **AcquisitionSource** - Channels (Google Ads, Organic, Opera, Affiliate, Social, Direct)
- **Campaign** - Ad campaigns with spend and performance metrics
- **AdGroup** - Ad groups within campaigns
- **Keyword** - Keywords within ad groups
- **AttributionEvent** - User clicks with tracking parameters
- **Registration** - User registrations linked to acquisition source
- **Deposit** - User deposits, marked with `isFirstDeposit` flag
- **LandingPage** - Landing page performance metrics
- **SEOMetric** - Organic search performance from Google Search Console
- **Alert** - Performance anomalies and tracking issues
- **ConversionAction** - Conversion action definitions and tracking methods
- **IntegrationCredential** - API credentials for external integrations

## 🔌 Integration Architecture

The platform is designed for future integration with:

- **Google Ads API** - Campaign data, keywords, conversions
- **Google Analytics 4 Data API** - User behavior and funnel analysis
- **Google Search Console API** - Organic search performance
- **Opera API** - Partner traffic data
- **Internal Registration API** - User signup events
- **Internal Deposit API** - Transaction and FTD data

## 🎨 Design System

**Gaia Aesthetic** - Premium, luxury internal platform

- **Dark Theme**: `#0d1a12` (background), `#e8e6e1` (text)
- **Accent Color**: `#c8b96a` (gold)
- **Secondary**: `#2a3f2e` (deep green)
- **Typography**: Cormorant Garamond (display), Inter (body)
- **Layout**: Clean borders, responsive cards, minimal animations

## 🔑 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=https://yourdomain.com  # Optional, auto-detects in prod

# Optional integrations
GOOGLE_ADS_API_KEY=...
GA4_API_KEY=...
GSC_API_KEY=...
```

## 🚀 Deployment

The application is production-ready for deployment on Vercel:

```bash
# Connect GitHub repository
git remote add origin <your-repo>
git push -u origin main

# Deploy to Vercel (automatic on push)
# Environment variables configured in Vercel dashboard
```

## 🔒 Security

- Role-based access control (future: admin/viewer/editor roles)
- Server-side authorization on all API routes
- Parameterized queries to prevent SQL injection
- Anonymized user identifiers in analytics
- Audit logs for sensitive changes
- No API keys in frontend code
- Session-based authentication with Better Auth

## 📈 Key Principles

1. **Optimize for FTDs, Not Vanity Metrics** - Traffic and clicks are meaningless without verified deposits
2. **Real Data Architecture** - Complete separation of tracking sources and actual business outcomes
3. **Transparent Attribution** - Show Google Ads conversions vs. verified FTDs side-by-side
4. **Actionable Insights** - Budget recommendations based on actual efficiency, not arbitrary flags
5. **Data Quality** - Alerts for conversion anomalies, tracking issues, and verification mismatches

## 📚 API Documentation

### Server Actions (lib/actions/)

- `getDashboardMetrics()` - KPI metrics for date range
- `getAcquisitionFunnel()` - Funnel stage breakdown
- `getChannelPerformance()` - Channel comparison data
- `getCampaignPerformance()` - Campaign metrics with recommendations

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npm run prisma:studio

# Reset database (development only)
npx prisma migrate reset
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

## 📄 License

Internal use only.

## 🤝 Contributing

For team members building additional features:

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -am "Add feature description"`
4. Push and create pull request

## 📞 Support

For issues or questions, contact the Growth Analytics team.
