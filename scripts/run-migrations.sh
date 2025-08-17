#!/bin/bash

# Reservoir MVP Migration Runner
# This script runs all migration files in order

set -e  # Exit on any error

echo "🚀 Starting Reservoir MVP database migrations..."

# Check if we're in the correct directory
if [ ! -d "supabase/migrations" ]; then
    echo "❌ Error: supabase/migrations directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check if Supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "❌ Error: Supabase CLI not found!"
    echo "Please install it: npm install -g supabase"
    echo "Or use the web SQL editor in your Supabase dashboard."
    exit 1
fi

# Check if we have a local Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "⚠️  Warning: No local Supabase project found."
    echo "You can either:"
    echo "1. Run 'supabase init' to set up a local project"
    echo "2. Copy and paste migration files into your Supabase SQL editor"
    exit 1
fi

echo "📁 Found migration files:"
ls -1 supabase/migrations/*.sql | sort

echo ""
echo "🔄 Running migrations..."

# Run migrations in order
supabase db push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All migrations completed successfully!"
    echo ""
    echo "📊 Database schema is now ready for:"
    echo "   • User profiles and authentication"
    echo "   • Questionnaire system"
    echo "   • Automation library"
    echo "   • Progress tracking"
    echo "   • Weekly discoveries"
    echo "   • Subscription management"
    echo ""
    echo "🧪 Sample data has been loaded for testing."
    echo "🔒 Row Level Security policies are active."
    echo "⚡ Performance indexes have been created."
else
    echo ""
    echo "❌ Migration failed!"
    echo "Please check the error messages above and fix any issues."
    exit 1
fi