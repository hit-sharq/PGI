# Pakakumi Growth Intelligence - Deployment Guide

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (or Neon connection string)
- Vercel account (for deployment)

### 2. Environment Setup

Create a `.env.local` file in the project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pakakumi"

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-key-here-minimum-32-characters"

# Optional: Custom auth URL (usually not needed)
# BETTER_AUTH_URL=https://yourdomain.com
```

### 3. Database Initialization

```bash
# Create schema in database
pnpm prisma db push

# Seed with sample data
pnpm seed
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 and sign up for an account.

## Deployment to Vercel

### 1. Connect GitHub Repository

1. Push your code to GitHub
2. Go to vercel.com and click "New Project"
3. Import your GitHub repository
4. Select the framework: Next.js

### 2. Configure Environment Variables

In Vercel project settings, add:

```
DATABASE_URL=<your-neon-connection-string>
BETTER_AUTH_SECRET=<run-openssl-rand-base64-32>
```

### 3. Configure Build Settings

The project should auto-detect Next.js. Ensure:
- **Framework**: Next.js
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install`

### 4. Database Migration

After first deployment, you need to run migrations on production:

```bash
# From your local machine, with production DATABASE_URL
pnpm prisma db push
```

Or add a `postdeploy` script in Vercel dashboard:

```bash
npx prisma db push
```

### 5. Deploy

Click "Deploy" to trigger the deployment.

## Production Best Practices

### Security
- Never commit `.env.local` files
- Use Vercel's environment variables for secrets
- Enable HTTPS (automatic with Vercel)
- Regularly rotate `BETTER_AUTH_SECRET`

### Database
- Use Neon for production PostgreSQL
- Enable automated backups
- Monitor connection limits
- Set up connection pooling for high traffic

### Monitoring
- Enable Vercel Analytics
- Monitor error logs in Vercel Dashboard
- Set up email alerts for errors
- Use Prisma's metrics dashboard

### Performance
- Enable ISR (Incremental Static Regeneration) where possible
- Use Vercel's Edge Functions for authentication
- Cache API responses
- Optimize images with Next.js Image component

## Troubleshooting

### Database Connection Errors
```bash
# Test connection
psql $DATABASE_URL

# Check Prisma schema
pnpm prisma validate
```

### Authentication Issues
- Verify `BETTER_AUTH_SECRET` is set and >= 32 characters
- Check `DATABASE_URL` is correct
- Clear browser cookies and try again
- Check Vercel logs: `vercel logs`

### Build Failures
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Test build locally
pnpm build

# Check for TypeScript errors
pnpm tsc --noEmit
```

## Scaling the Application

### Database Optimization
1. Add indexes on frequently queried columns
2. Implement query caching with Redis
3. Archive old data to cold storage
4. Use read replicas for analytics queries

### Application Optimization
1. Implement ISR for static dashboard
2. Use API route caching headers
3. Implement session management with Redis
4. Use Vercel's Redis for caching

### Real-Time Data Integration
1. Set up webhooks for Google Ads
2. Schedule API sync jobs with Vercel Cron
3. Use Prisma events for real-time updates
4. Implement WebSockets for live dashboards

## Next Steps

1. **Integrate Google Ads API** - Connect real campaign data
2. **Add GA4 Integration** - Import analytics data
3. **Set up Webhooks** - Real-time data sync from ad platforms
4. **Custom Reports** - Build automated report generation
5. **Data Export** - Add CSV/PDF export functionality
6. **Team Collaboration** - Add multi-user workspace support
