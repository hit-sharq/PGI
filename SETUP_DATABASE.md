# Database Setup - Pakakumi Growth Intelligence

The complete database schema has been built and is ready to deploy to your Neon PostgreSQL database. No manual schema creation is needed - just connect your database and run the setup command.

## What's Already Built

The Prisma schema includes all 14 models:
- User management (via Better Auth)
- Acquisition channels and campaigns
- Ad groups and keywords
- Attribution events
- User registration and deposits (FTD tracking)
- Landing page analytics
- SEO metrics
- Alerts system
- Integration credentials
- Conversion actions

## Setup Steps

### 1. Create a Neon Database

If you don't have one yet:
1. Go to https://console.neon.tech
2. Sign up or log in
3. Create a new project
4. Copy your connection string from "Connection string" section

The connection string looks like:
```
postgresql://user:password@ep-xxxxx.region.neon.tech/dbname?sslmode=require
```

### 2. Update .env.local

Edit `.env.local` in the project root:

```bash
# Replace the DATABASE_URL with your Neon connection string
DATABASE_URL="postgresql://user:password@ep-xxxxx.region.neon.tech/dbname?sslmode=require"

# Keep BETTER_AUTH_SECRET as is (or generate a new one with: openssl rand -base64 32)
BETTER_AUTH_SECRET="zluLR5xp4DZkPjrMA+nbJTRdu3Hx4TsVJwM9ATI0y7o="

BETTER_AUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

**Important**: Never commit `.env.local` to git. It contains secrets.

### 3. Install Dependencies

```bash
npm install
```

### 4. Push Schema to Database

This creates all tables in your Neon database:

```bash
npm run prisma:push
```

You'll see output like:
```
Prisma schema loaded from prisma/schema.prisma.

✔ Your database is now in sync with your Prisma schema.

✨ 14 tables created
   - acquisition_source
   - campaign
   - ad_group
   - keyword
   - attribution_event
   - registration
   - deposit
   - landing_page
   - seo_metric
   - alert
   - integration_credential
   - conversion_action
```

### 5. Seed Sample Data (Optional)

To populate the database with realistic sample data for testing:

```bash
npm run seed
```

This creates:
- 6 acquisition sources
- 12+ campaigns
- 1,000+ sample users
- Complete conversion journeys with FTD attribution

**Note**: This is optional. You can skip this and start with an empty database.

### 6. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and sign up!

## Verifying Setup

### Check Tables in Neon

1. Go to https://console.neon.tech
2. Select your project
3. Open SQL Editor
4. Run: `SELECT * FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`

You should see all 12 tables in the public schema.

### Test Database Connection

```bash
npm run prisma:studio
```

Opens Prisma Studio at http://localhost:5555 - a visual database explorer.

You can browse all tables and their data here.

## Troubleshooting

### "Error: connect ECONNREFUSED"

**Problem**: Can't connect to database

**Solution**:
1. Check DATABASE_URL is correct in `.env.local`
2. Ensure you copied the full connection string from Neon including `?sslmode=require`
3. Verify your Neon project is active
4. Check your IP is whitelisted in Neon (if using IP restrictions)

### "Error: permission denied for schema public"

**Problem**: Neon user doesn't have permission

**Solution**:
1. Use the default user (not a role)
2. Or in Neon, grant permissions: `GRANT ALL PRIVILEGES ON SCHEMA public TO your_user;`

### "Error: relation "acquisition_source" does not exist"

**Problem**: Schema not pushed to database

**Solution**:
```bash
npm run prisma:push
```

### "Can't migrate, database already exists"

**Problem**: Tables already exist from previous setup

**Solution**:
Option A - Keep existing data:
```bash
npm run prisma:push
```

Option B - Start fresh:
```bash
npm run prisma:migrate reset
# OR manually drop tables in Neon SQL Editor
```

## Database Structure

### Public Schema (Analytics Data)

**Acquisition Channels**
- `acquisition_source` - Marketing channels (Google Ads, Organic, etc.)
- `campaign` - Individual campaigns with performance metrics
- `ad_group` - Ad groups within campaigns
- `keyword` - Keywords within ad groups

**User Journey**
- `attribution_event` - Click/impression tracking with UTM params
- `registration` - User registrations
- `deposit` - User deposits (FTD tracking here)

**Analytics**
- `landing_page` - Landing page performance
- `seo_metric` - SEO query performance
- `alert` - Performance alerts

**Integration**
- `integration_credential` - OAuth tokens for Google Ads, GSC, etc.
- `conversion_action` - Conversion tracking actions

### neon_auth Schema (Authentication)

Better Auth manages these tables automatically:
- `user` - User accounts
- `session` - Login sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

## Next Steps

After database setup:

1. **Explore the Dashboard** - Sign up and browse all pages
2. **Load Sample Data** - Run `npm run seed` to populate with realistic data
3. **Review Code** - Check `/app/actions/` to understand data flow
4. **Connect Real Data** - Start integrating with Google Ads API, GA4, etc.

## More Help

- **Connection issues** → Check `.env.local` and Neon console
- **Schema questions** → Read `SYSTEM_DESIGN.md`
- **Architecture questions** → Read `INDEX.md`
- **General setup** → Read `GETTING_STARTED.md`

## Commands Reference

```bash
# Install dependencies
npm install

# Push schema to database
npm run prisma:push

# Populate with sample data
npm run seed

# Open database explorer
npm run prisma:studio

# Start development server
npm run dev

# Reset database (careful!)
npm run prisma:migrate reset
```

Ready to build? Let's go! 🚀
