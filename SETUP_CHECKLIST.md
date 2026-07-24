# Pakakumi Growth Intelligence - Setup Checklist

## Pre-Deployment Setup (5-10 minutes)

### Step 1: Generate Better Auth Secret
```bash
# Generate a secure random string (minimum 32 characters)
openssl rand -base64 32

# Output example:
# xK9mZl2pQwRvNjFhT5bU3eCdLsX8yWqV+9KjP4MoGh6=

# Save this value for Step 3
```

### Step 2: Create PostgreSQL Database
- [ ] Go to [Neon.tech](https://neon.tech) or use your PostgreSQL provider
- [ ] Create a new project/database
- [ ] Copy the connection string (looks like: `postgresql://user:password@host/database`)
- [ ] Keep this handy for Step 3

### Step 3: Configure Environment Variables
```bash
# Option A: Local Development
# Copy .env.example to .env.local
cp .env.example .env.local

# Edit .env.local with your values:
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
BETTER_AUTH_SECRET="xK9mZl2pQwRvNjFhT5bU3eCdLsX8yWqV+9KjP4MoGh6="
NODE_ENV="development"

# Option B: Vercel Production (see Step 5)
```

### Step 4: Initialize Database (Local Development)
```bash
# Install dependencies (if not already done)
pnpm install

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# (Optional) Seed with demo data
# npx prisma db seed
```

### Step 5: Run Locally
```bash
# Start development server
pnpm dev

# Open browser
open http://localhost:3000

# You should see:
# - Redirect to /sign-in
# - Sign-up/Sign-in form
# - Gaia dark theme with gold accents
```

---

## Production Deployment on Vercel

### Step 1: Prepare Repository
- [ ] Initialize Git (if not already done)
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Pakakumi Growth Intelligence"
  ```

- [ ] Push to GitHub
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/pakakumi.git
  git push -u origin main
  ```

### Step 2: Connect to Vercel
- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Click "Import Git Repository"
- [ ] Select your GitHub repo
- [ ] Click "Import"

### Step 3: Configure Vercel Environment Variables
In the Vercel dashboard, set these environment variables:

```
DATABASE_URL = postgresql://user:password@host.neon.tech/database?sslmode=require
BETTER_AUTH_SECRET = xK9mZl2pQwRvNjFhT5bU3eCdLsX8yWqV+9KjP4MoGh6=
NODE_ENV = production
```

- [ ] Click "Deploy"
- [ ] Wait 3-5 minutes for build to complete
- [ ] You should see "Deployment Successful" ✅

### Step 4: Verify Deployment
- [ ] Click the deployment URL
- [ ] Verify you see the sign-in page
- [ ] Check that the Gaia theme loads correctly
- [ ] Try signing up with a test account

---

## Integration Setup (Optional but Recommended)

### Google Ads API (Optional)
- [ ] Enable Google Ads API in Google Cloud Console
- [ ] Create OAuth 2.0 credentials
- [ ] Add credentials to dashboard settings

### Google Analytics 4 (Optional)
- [ ] Create GA4 property if not exists
- [ ] Note your GA4 Property ID
- [ ] Add to dashboard integrations

### Google Search Console (Optional)
- [ ] Verify domain ownership
- [ ] Add to dashboard integrations

### Internal APIs (Required for Real Data)
- [ ] Set up registration webhook from your app
- [ ] Set up deposit webhook from your app
- [ ] Test data flow into Pakakumi database

---

## Post-Deployment Checks

### Security Audit
- [ ] Verify HTTPS is enabled (should be automatic on Vercel)
- [ ] Test session cookie behavior
- [ ] Verify unauthenticated users cannot access /dashboard
- [ ] Check that sensitive data is not exposed in URLs

### Functionality Checks
- [ ] Sign-in works
- [ ] Sign-up works
- [ ] Dashboard loads
- [ ] All 14 dashboard pages accessible
- [ ] Sidebar navigation works on mobile

### Data Verification
- [ ] Database connection is working
- [ ] Tables are created (verify in Prisma Studio)
- [ ] Metrics display (even if values are 0)
- [ ] No console errors in browser DevTools

---

## Common Issues & Fixes

### "DATABASE_URL is not set"
**Fix**: Make sure the environment variable is set in Vercel dashboard, not just locally.

### "BETTER_AUTH_SECRET is missing"
**Fix**: Generate a new secret with `openssl rand -base64 32` and add to Vercel dashboard.

### "Session cookie not persisting"
**Fix**: Check that HTTPS is enabled and domain is correctly configured.

### "Empty dashboard metrics"
**Fix**: This is normal - no data exists yet. Begin sending registration and deposit events via webhooks.

### "Database migration failed"
**Fix**: 
```bash
# Check migration status
npx prisma migrate status

# Reset database (development only)
npx prisma migrate reset

# Retry deployment
git push
```

---

## Data Population

Once deployed, you can populate the database:

### Option 1: Manual Testing
```bash
# In Prisma Studio
npx prisma studio

# Create:
# - AcquisitionSource entries
# - Campaign entries
# - Sample Registration/Deposit records
```

### Option 2: API Webhooks
From your registration and deposit systems, POST to:

```
POST /api/auth/registration
{
  "userId": "user123",
  "email": "user@example.com",
  "sourceId": "google_ads_1",
  "registeredAt": "2026-07-24T10:00:00Z"
}

POST /api/auth/deposit
{
  "userId": "user123",
  "amount": 2500,
  "currency": "KES",
  "depositedAt": "2026-07-24T10:30:00Z",
  "isFirstDeposit": true,
  "status": "completed"
}
```

### Option 3: Integration Setup
Connect to Google Ads, GA4, GSC to automatically import campaign and conversion data.

---

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check alerts dashboard for anomalies
- [ ] Review cost per FTD trends
- [ ] Verify integrations are syncing

### Monthly Tasks
- [ ] Generate and share monthly report
- [ ] Review budget optimization recommendations
- [ ] Audit conversion tracking accuracy

### Production Health Checks
- [ ] Monitor database query performance
- [ ] Review error logs
- [ ] Check deployment health on Vercel

---

## Scaling Considerations

### When to Optimize
- [ ] Database grows to >100k records - add indexes
- [ ] Dashboard slow - implement pagination
- [ ] High traffic - enable caching

### When to Add Features
- [ ] After 1 month of stable operation - add alerts
- [ ] After 3 months - add multi-touch attribution
- [ ] After 6 months - consider team features

---

## Support & Documentation

### Quick Links
- 📖 [README.md](./README.md) - Setup and features
- 🏗️ [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) - Architecture details
- 📋 [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - What was built

### Troubleshooting Resources
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
- Better Auth Docs: https://www.better-auth.com

---

## Success! 🎉

Once you've completed this checklist:
1. ✅ Pakakumi Growth Intelligence is deployed and live
2. ✅ Users can sign in and access the dashboard
3. ✅ Database is configured and ready for data
4. ✅ Integrations are set up for data flow

**Next Steps**:
- Start sending registration/deposit events
- Configure integrations for Google Ads, GA4, GSC
- Train team on dashboard usage
- Set up alerts and monitoring
- Generate first reports

---

**Estimated Setup Time**: 15-30 minutes
**Estimated First Data**: 1-3 hours after webhooks configured
**Time to First Insights**: 24-48 hours

Good luck! 🚀
