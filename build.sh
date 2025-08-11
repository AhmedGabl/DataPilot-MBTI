#!/bin/bash

# Build script for DataPilot MBTI application
# This script ensures proper dependency installation and build process

set -e  # Exit on any error

echo "Starting DataPilot MBTI build process..."

# Navigate to the application directory
cd DataPilot/DataPilot

echo "Installing dependencies with npm install..."
# Use npm install instead of npm ci to avoid workspace conflicts
npm install

# Ensure Prisma schema exists and generate client
if [ -f "prisma/schema.prisma" ]; then
    echo "Found Prisma schema, generating client..."
    npx prisma generate
else
    echo "Warning: Prisma schema not found at prisma/schema.prisma"
    exit 1
fi

echo "Building the application..."
npm run build

echo "Build completed successfully!"
echo "To start the application, run: npm start"
echo "To run database migrations, run: npx prisma migrate deploy"