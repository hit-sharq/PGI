#!/bin/bash

set -e

echo "🚀 Initializing Pakakumi Growth Intelligence Database"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo "Please set DATABASE_URL in your environment or .env file"
    exit 1
fi

echo "📊 Creating database schema..."
pnpm prisma db push

echo ""
echo "🌱 Seeding database with sample data..."
pnpm seed

echo ""
echo "✅ Database initialization complete!"
echo ""
echo "Next steps:"
echo "1. Set BETTER_AUTH_SECRET in your .env file (run: openssl rand -base64 32)"
echo "2. Start the dev server with: pnpm dev"
echo "3. Navigate to http://localhost:3000 and sign up for an account"
echo "4. Access the dashboard at http://localhost:3000/dashboard"
