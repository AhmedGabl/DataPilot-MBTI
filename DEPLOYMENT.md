# DataPilot MBTI Application Deployment Guide

This guide provides comprehensive instructions for deploying the DataPilot MBTI application across different platforms.

## 🚀 Quick Deployment Fixes

### Recent Issues Resolved
- ✅ Fixed npm workspace conflicts by using `npm install` instead of `npm ci`
- ✅ Updated Dockerfile to properly handle subdirectory structure
- ✅ Added .dockerignore for optimized builds
- ✅ Configured proper build commands for all deployment platforms

## 📁 Project Structure

```
DataPilot-MBTI/
├── DataPilot/
│   └── DataPilot/          # Main Next.js application
│       ├── package.json    # App dependencies
│       ├── next.config.js  # Next.js configuration
│       ├── prisma/         # Database schema
│       └── src/           # Source code
├── package.json           # Root package.json with deployment scripts
├── vercel.json           # Vercel deployment config
├── railway.json          # Railway deployment config
├── Dockerfile            # Docker configuration
├── .dockerignore         # Docker ignore file
└── DEPLOYMENT.md         # This file
```

## 🔧 Platform-Specific Deployment

### Vercel Deployment

**Configuration**: `vercel.json` is already configured.

```json
{
  "buildCommand": "cd DataPilot/DataPilot && npm install && npm run build",
  "outputDirectory": "DataPilot/DataPilot/.next",
  "installCommand": "cd DataPilot/DataPilot && npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

**Deploy Steps**:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically use the `vercel.json` configuration
3. Set environment variables in Vercel dashboard
4. Deploy!

### Railway Deployment

**Configuration**: `railway.json` is already configured.

**Deploy Steps**:
1. Connect your GitHub repository to Railway
2. Railway will automatically use the `railway.json` configuration
3. Set environment variables in Railway dashboard
4. Deploy!

### Docker Deployment

**Build and Run**:
```bash
# Build the Docker image
docker build -t datapilot-mbti .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e NEXTAUTH_SECRET="your_secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  datapilot-mbti
```

### Other Platforms (Netlify, Render, etc.)

**Build Settings**:
- **Build Command**: `cd DataPilot/DataPilot && npm install && npm run build`
- **Publish Directory**: `DataPilot/DataPilot/.next`
- **Install Command**: `cd DataPilot/DataPilot && npm install`

## 🔐 Environment Variables

Required environment variables for all deployments:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Optional: Analytics
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
```

## 🗄️ Database Setup

### For Production Deployments:

1. **Set up a PostgreSQL database** (recommended providers):
   - Supabase (free tier available)
   - Railway PostgreSQL
   - Neon (serverless PostgreSQL)
   - PlanetScale (MySQL alternative)

2. **Run database migrations**:
   ```bash
   cd DataPilot/DataPilot
   npx prisma migrate deploy
   ```

3. **Generate Prisma client** (usually done automatically during build):
   ```bash
   npx prisma generate
   ```

## 🐛 Troubleshooting Common Issues

### Issue: "next: not found" Error
**Solution**: This was caused by deployment services trying to build from the root directory. Fixed by:
- Updated root `package.json` with proper build scripts
- Added platform-specific configuration files

### Issue: npm workspace conflicts
**Solution**: 
- Changed from `npm ci` to `npm install` in all deployment configurations
- This resolves workspace-related dependency installation issues

### Issue: Build fails with "Cannot find module"
**Solutions**:
1. Ensure all dependencies are listed in `DataPilot/DataPilot/package.json`
2. Check that the build command navigates to the correct directory
3. Verify Node.js version compatibility (use Node.js 18+)

### Issue: Database connection errors
**Solutions**:
1. Verify `DATABASE_URL` environment variable is set correctly
2. Ensure database is accessible from your deployment platform
3. Check if database migrations have been run

### Issue: NextAuth.js authentication not working
**Solutions**:
1. Set `NEXTAUTH_SECRET` environment variable
2. Update `NEXTAUTH_URL` to match your deployment URL
3. Configure OAuth providers if using social login

### Issue: Static files not loading
**Solutions**:
1. Ensure `output: 'standalone'` is set in `next.config.js` (already configured)
2. Check that static files are being copied correctly in Docker builds
3. Verify CDN/static file serving configuration

## ✅ Deployment Checklist

Before deploying:

- [ ] Environment variables are set
- [ ] Database is set up and accessible
- [ ] `DATABASE_URL` points to production database
- [ ] `NEXTAUTH_URL` matches your domain
- [ ] `NEXTAUTH_SECRET` is set to a secure random string
- [ ] Database migrations are ready to run
- [ ] Build process tested locally

After deployment:

- [ ] Application loads without errors
- [ ] Database connection works
- [ ] Authentication flow works
- [ ] MBTI test functionality works
- [ ] Results are saved correctly
- [ ] All pages are accessible

## 🔄 Continuous Deployment

All configuration files are set up for automatic deployment:
- **Vercel**: Deploys automatically on push to main branch
- **Railway**: Deploys automatically on push to main branch
- **Docker**: Can be integrated with CI/CD pipelines

## 📞 Support

If you encounter issues not covered in this guide:
1. Check the deployment platform's logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure the database is accessible and migrations are applied
4. Test the build process locally first

---

**Last Updated**: January 2025
**Application Version**: DataPilot MBTI v1.0