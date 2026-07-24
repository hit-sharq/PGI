# Pakakumi Growth Intelligence - System Design Document

## 1. Executive Summary

Pakakumi Growth Intelligence is a premium analytics platform for marketing teams to identify which acquisition channels, campaigns, ads, keywords, and landing pages produce **qualified First-Time Depositors (FTDs)** at the lowest cost per acquisition.

The platform is built around one core principle: **Optimize for verified FTDs, not vanity metrics.** Traffic and clicks are meaningless without confirming they convert to profitable business outcomes.

## 2. Core Business Logic

### 2.1 The FTD Definition

An **FTD (First-Time Depositor)** is defined as:
- A user who completes email verification
- AND makes their first successful deposit
- Counted only ONCE per user, even if they deposit multiple times

### 2.2 The Central Funnel

```
Traffic → Clicks → Registrations → Verified Users → First Deposits → Repeat Activity
```

Each stage tracks:
- **Volume**: Count of users at that stage
- **Conversion Rate**: % from previous stage
- **Drop-off**: Users lost at each step

### 2.3 Attribution Flow

1. **Click Capture**: User clicks marketing asset
   - GCLID (Google Click ID) captured
   - UTM parameters (source, medium, campaign, content, term)
   - Campaign/Ad Group/Keyword IDs
   - Landing page URL and referrer

2. **Registration**: User creates account
   - Linked to original click's acquisition source
   - Email, IP address, user agent captured

3. **Deposit Event**: User makes first deposit
   - Amount and currency recorded
   - Marked as `isFirstDeposit = true`
   - Subsequent deposits have `isFirstDeposit = false`

4. **Verification**: System confirms business outcome
   - Matches user ID with internal deposit data
   - Verifies deposit status (completed)
   - Records FTD attribution to source/campaign

### 2.4 Cost per FTD Calculation

```
Cost per FTD = Total Campaign Spend ÷ Count(isFirstDeposit = true)
```

This is the **PRIMARY optimization metric**. All budget decisions flow from this.

### 2.5 Performance Categories

Based on FTD volume and Cost/FTD efficiency:

| Category | FTD Volume | Cost/FTD | Action |
|----------|-----------|----------|--------|
| **SCALE** | >100 | <500 KES | Increase budget gradually (25-50%) |
| **OPTIMIZE** | 50-100 | 500-800 KES | Improve targeting, refine creatives |
| **INVESTIGATE** | <50 | >1000 KES | Audit tracking, reduce budget |
| **PAUSE** | 0 | N/A | Suspend campaign for 2 weeks or sunset |

## 3. Data Architecture

### 3.1 Database Schema Design

**Authentication & Users**
```
User
├── id (primary key)
├── email (unique)
├── name
├── emailVerified
├── password (hashed)
└── timestamps

Session
├── sessionId
├── userId (FK)
└── expiresAt
```

**Acquisition & Attribution**
```
AcquisitionSource
├── id
├── sourceName (e.g., "Google Ads", "Opera")
└── sourceType

Campaign
├── id
├── name
├── sourceId (FK)
├── status
├── dailyBudget
├── totalSpend
├── impressions, clicks, registrations, ftdCount

AttributionEvent
├── userId (FK)
├── source, medium, campaign
├── gclid, utm_*
├── landingPage
├── clickedAt

Registration
├── userId (unique, FK)
├── sourceId (FK)
├── registeredAt
├── verifiedAt

Deposit
├── userId (FK)
├── amount
├── isFirstDeposit (TRUE only once per user)
├── depositedAt
└── status (pending/completed/failed)
```

**Analytics & Monitoring**
```
LandingPage
├── url (unique)
├── sessions, clicks, registrations, ftdCount
└── lastTrafficAt

SEOMetric
├── query, pageUrl
├── impressions, clicks, ctr, position
├── registrations, ftdCount

Alert
├── title, description
├── severity (critical/warning/info)
├── type (ftd_drop/cost_increase/tracking_issue/etc)
├── metadata (JSON)

ConversionAction
├── name
├── category (purchase/signup/registration)
├── isPrimary
├── conversionCount, totalValue
└── dataSource (google_ads/internal/pixel/api)
```

### 3.2 Critical Design Principles

1. **No Foreign Key Constraints by Default**
   - Better Auth tables keep their FKs
   - App tables use `userId` column for scoping without FK constraint
   - Allows flexible schema iteration during development

2. **Per-User Data Scoping**
   - Every query that touches user data must filter by `userId`
   - There is no Row Level Security (RLS) on Neon
   - Authorization happens in server actions via `getUserId()` helper

3. **First Deposit Flag**
   - `Deposit.isFirstDeposit` is the source of truth
   - Set to TRUE only on first successful deposit
   - Never updated retroactively
   - Prevents double-counting FTDs

4. **Attribution Immutability**
   - `AttributionEvent` records are never deleted
   - New events add to history, don't replace
   - Allows accurate historical analysis

## 4. API & Server Actions Architecture

### 4.1 Server Actions Pattern

All data operations use server actions with the `getUserId()` helper:

```typescript
'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getMetrics(dateFrom: Date, dateTo: Date) {
  const userId = await getUserId()
  
  // Admin-only check can be added here if needed
  // const user = await prisma.user.findUnique({ where: { id: userId } })
  // if (user?.role !== 'admin') throw new Error('Forbidden')
  
  return prisma.campaign.findMany({
    where: {
      createdAt: { gte: dateFrom, lte: dateTo }
    }
  })
}
```

### 4.2 API Routes

Better Auth handler mounted at `/api/auth/[...all]`:
- Sign-in: POST `/api/auth/sign-in/email`
- Sign-up: POST `/api/auth/sign-up/email`
- Sign-out: POST `/api/auth/sign-out`
- Session: GET `/api/auth/session`

## 5. Dashboard Page Architecture

### 5.1 Overview Page

**KPI Cards**:
- Total Spend
- Impressions
- Clicks
- Registrations
- Verified Users
- First-Time Depositors
- Cost per FTD
- Total First Deposit Value

Each card shows:
- Current value
- % change vs. previous period
- Small trend visualization

**Visualizations**:
- Acquisition Funnel (stacked bar chart)
- Channel Distribution (pie chart)
- Recent Metrics (summary cards)

### 5.2 Channels Page

**Comparison Table**:
- Channel name and type
- Total spend
- Traffic (clicks)
- Registrations
- FTDs (highlighted)
- Cost per FTD
- Conversion rate

**Sorting**:
- By FTDs (default)
- By Cost per FTD
- By Spend
- By Conversion Rate

**Highlighting**:
- Best performer highlighted in gold accent color

### 5.3 Campaigns Page

**Campaign Table**:
- Campaign name and source
- Status (active/paused/ended)
- Spend
- Impressions, Clicks
- CTR (Click-Through Rate)
- CPC (Cost per Click)
- Registrations
- Verified users
- FTDs
- Cost per FTD
- Total deposit value
- **Performance badge** (SCALE/OPTIMIZE/INVESTIGATE/PAUSE)

**Summary Stats**:
- Total campaigns
- Total spend
- Total FTDs
- Average Cost per FTD

### 5.4 Funnel Page

**Visualization**:
- 5-stage horizontal funnel
- Each stage shows:
  - Volume (user count)
  - Conversion rate from previous stage
  - Drop-off percentage
  - Percentage bar width proportional to volume

**Stages**:
1. Traffic (starting point)
2. Clicks (from ads)
3. Registrations (accounts created)
4. Verified (email confirmed)
5. FTDs (first deposit completed)

### 5.5 FTD Attribution Page

**Planned Features**:
- User journey visualization
- Attribution models:
  - **First Click**: All credit to first touch
  - **Last Click**: All credit to final source before registration
  - **Data-Driven**: Weighted attribution (future)
- FTD count by model comparison
- Detailed user list with anonymized IDs
- Time from registration to first deposit

### 5.6 Conversion Tracking Audit Page

**Alerts Section**:
- HIGH PRIORITY issues:
  - Conversion rate >100%
  - Repeated conversions from same user
  - Conversion tracking includes repeat deposits
  - Google Ads conversions significantly differ from verified FTDs
  - Missing conversion values
  - Conversion tracking not linked to campaign IDs

**Conversion Actions Table**:
- Action name and category
- Primary/secondary status
- Counting method (pixel/API/manual)
- Conversion count
- Average value
- Last recorded conversion
- Data source

### 5.7 SEO Performance Page

**Metrics**:
- Total organic impressions
- Organic clicks
- Organic registrations
- Organic FTDs

**Top Queries Table**:
- Query text
- Impressions and clicks
- CTR and average position
- Registrations and FTDs from organic

**Key Insight**:
- Not all organic traffic converts equally
- Identifies high-volume, low-conversion queries
- Guides content optimization

### 5.8 Landing Pages Performance

**Page Performance Table**:
- Page URL
- Sessions
- Clicks
- Registrations
- FTDs
- Registration rate
- FTD conversion rate

**Key Analysis**:
- Identifies high-traffic, low-conversion pages
- Prioritizes optimization opportunities
- Tracks page-level impact on FTDs

### 5.9 Partners/Opera Page

**Partner Performance Table**:
- Partner/channel name
- Traffic volume
- Registrations
- FTDs
- Spend
- Cost per FTD
- Conversion rate

**Key Distinction**:
- High traffic ≠ high quality
- Partners are ranked by FTD efficiency, not volume

### 5.10 Budget Optimization Page

**Recommendation Cards**:
- Campaign name and metrics
- Spend, FTDs, Cost per FTD
- Recommendation badge (INCREASE/MAINTAIN/INVESTIGATE/PAUSE)
- Reason for recommendation

**Recommendations**:
- **INCREASE**: "Efficient acquisition with strong FTD volume. Recommend gradual 25% budget increase."
- **MAINTAIN**: "Stable performance. Monitor for optimization opportunities."
- **INVESTIGATE**: "High cost per FTD. Audit tracking or reduce by 40% pending review."
- **PAUSE**: "Poor FTD efficiency. Pause for 2 weeks and re-evaluate or reallocate budget."

### 5.11 Alerts Page

**Alert List**:
- Title, description, severity badge
- Timestamp
- Action link

**Severity Levels**:
- **CRITICAL**: Issues affecting major metrics
- **WARNING**: Performance degradation
- **INFO**: Informational items

**Example Alerts**:
- Cost per FTD increased 35%
- FTD volume dropped 22% today
- Google Ads conversions diverge from verified FTDs
- Campaign budget limited

### 5.12 Reports Page

**Report Options**:
- Monthly Performance Summary
- Campaign Deep Dive
- Attribution Report
- Conversion Tracking Audit

**Export Formats**:
- PDF (formatted for stakeholders)
- CSV (raw data for analysis)

### 5.13 Integrations Page

**Connected Integrations**:
- Google Ads (campaigns, keywords, conversions)
- Google Search Console (organic search)
- Google Analytics 4 (user behavior)
- Opera (partner traffic)
- Internal Registration API
- Internal Deposit API

**Status**: Connected / Disconnected
**Last Sync**: Timestamp
**Actions**: Sync, Connect, Disconnect

### 5.14 Settings Page

**Profile Settings**:
- Organization name
- User email

**Attribution Model**:
- First Click
- Last Click
- Data-Driven (beta)

**Notifications**:
- Critical alerts
- Daily summary
- Weekly reports

**Data & Privacy**:
- Data retention policy
- Account deletion

## 6. Integration Architecture

### 6.1 Google Ads Integration

**Data Captured**:
- Campaigns (ID, name, status, daily budget)
- Ad Groups (keywords, performance)
- Keywords (match type, bid, performance)
- Search Terms (what users actually searched)
- Impressions, Clicks, CTR, CPC
- Google Ads conversions and conversion value

**Key Insight**:
- Google Ads "conversions" may include repeat deposits
- Must be validated against verified FTDs
- Divergence indicates tracking setup issues

### 6.2 Google Analytics 4 Integration

**Data Captured**:
- User behavior funnels
- Event tracking (registration, deposit)
- Conversion tracking
- User demographics and segments

### 6.3 Google Search Console Integration

**Data Captured**:
- Search queries (impressions, clicks, CTR)
- Average position in search results
- Organic click-through to site

### 6.4 Internal APIs

**Registration API**:
- Endpoint: POST /api/registrations
- Body: { userId, email, registeredAt }
- Links user click to registration event

**Deposit API**:
- Endpoint: POST /api/deposits
- Body: { userId, amount, depositedAt, status, isFirstDeposit }
- Marks user as FTD on first successful deposit

## 7. Authentication & Authorization

### 7.1 Better Auth Setup

- Email + password authentication only
- No OAuth or social login (unless explicitly added)
- Session-based with secure cookies
- Email verification required before accessing dashboard

### 7.2 Security

- HTTPS only in production
- Secure, HttpOnly cookies
- SameSite=None, Secure in development (iframe compatibility)
- CSRF protection via session tokens
- All API routes require valid session

### 7.3 Access Control

**Current**: Single user role (authenticated = can see all data)

**Future Enhancement**:
- Admin: Full access, settings, user management
- Viewer: Read-only dashboard access
- Editor: Can adjust budgets and pause campaigns

## 8. Design System (Gaia Aesthetic)

### 8.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background | #0d1a12 | Page background |
| Foreground | #e8e6e1 | Text |
| Card | #1a2818 | Card backgrounds |
| Accent | #c8b96a | Gold highlights, CTAs |
| Secondary | #2a3f2e | Secondary elements |
| Muted | #3d4e42 | Disabled states |
| Border | #2a3f2e | Card borders |

### 8.2 Typography

- **Display**: Cormorant Garamond (serif)
  - Headings (h1, h2, h3)
  - Page titles
  - Card headers
  
- **Body**: Inter (sans-serif)
  - Body text
  - Labels
  - Buttons

### 8.3 Components

- Clean borders (not subtle shadows)
- Hover effects with accent color overlay
- Smooth transitions (200-300ms)
- Consistent spacing using 4px scale
- No unnecessary rounded corners
- Professional, minimal aesthetic

## 9. Performance Considerations

### 9.1 Data Loading

- Server actions used for all data fetching
- Results cached in component state
- Client-side filters and sorting
- Real-time data optional (future WebSocket support)

### 9.2 Database Optimization

- Indexes on frequently filtered columns:
  - `userId` (all lookups)
  - `depositedAt`, `isFirstDeposit` (FTD queries)
  - `campaignId` (campaign reports)
  - `sourceId` (channel analysis)

### 9.3 UI Optimization

- Lazy loading for large tables
- Pagination (future)
- Date range filters to limit dataset
- Recharts for efficient visualizations

## 10. Deployment

### 10.1 Vercel Deployment

- Automatic deployments on git push
- Environment variables via Vercel dashboard
- Database migrations via Prisma
- Zero-downtime deployments

### 10.2 Production Checklist

- [ ] DATABASE_URL configured in Vercel
- [ ] BETTER_AUTH_SECRET set (min 32 chars)
- [ ] HTTPS enforced
- [ ] Cookies configured for production domain
- [ ] Database backups enabled
- [ ] Monitoring/error tracking setup (Sentry, etc.)
- [ ] Rate limiting on auth endpoints
- [ ] Audit logging for sensitive actions

## 11. Future Roadmap

### Phase 2: Advanced Analytics
- Multi-touch attribution (first-click, last-click, weighted)
- Cohort analysis (user segments by acquisition source)
- Retention curves (repeat purchase tracking)
- LTV (lifetime value) calculations

### Phase 3: Automation
- Automated budget scaling
- Machine learning for prediction
- Bid optimization suggestions
- Anomaly detection alerts

### Phase 4: Integrations
- Facebook Ads API
- TikTok Ads API
- Snapchat Ads API
- Webhook support for custom integrations

### Phase 5: Team Features
- User roles and permissions
- Shared dashboards
- Bulk actions
- API for custom tools

## 12. Monitoring & Maintenance

### 12.1 Key Metrics to Track

- Page load times
- API response times
- Database query performance
- Error rates and types
- User session duration

### 12.2 Alerts to Set Up

- Database connectivity issues
- High error rates (>1%)
- Slow API responses (>2s)
- Failed deployments
- Unusual spike in traffic

## Conclusion

Pakakumi Growth Intelligence is built around a single truth: **only verified FTDs matter**. By treating FTD acquisition as the core business metric and carefully separating data sources (Google Ads, GA4, internal APIs), the platform enables marketing teams to make data-driven budget decisions and systematically improve acquisition efficiency.

The clean architecture, comprehensive schema, and thoughtful UI design make it production-ready while maintaining flexibility for future integrations and enhancements.
