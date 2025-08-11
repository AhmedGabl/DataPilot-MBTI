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

echo "Generating Prisma client..."
npx prisma generate

echo "Building the application..."
npm run build

echo "Build completed successfully!"
echo "To start the application, run: npm start"
echo "To run database migrations, run: npx prisma migrate deploy"