# Deployment Guide for DataPilot MBTI

This guide covers various deployment options for the DataPilot MBTI application.

## 🚀 Quick Fix for Current Deployment Issues

The deployment failure you're seeing is likely due to the subdirectory structure. Here are the solutions:

### For Vercel Deployment
1. The `vercel.json` configuration file has been added to handle the subdirectory structure
2. Make sure your Vercel project is connected to the GitHub repository
3. Vercel will automatically use the configuration to build from the correct directory

### For Railway Deployment
1. The `railway.json` configuration file has been added
2. Connect your Railway project to this GitHub repository
3. Railway will use the configuration to build and deploy correctly

### For Docker/Container Deployment
1. Use the provided `Dockerfile` which handles the subdirectory structure
2. Build command: `docker build -t datapilot-mbti .`
3. Run command: `docker run -p 3000:3000 datapilot-mbti`

## 📁 Project Structure

The application code is located in `DataPilot/DataPilot/` subdirectory, which requires special handling during deployment.

```
├── DataPilot/
│   └── DataPilot/          # ← Actual Next.js application
│       ├── package.json    # ← Dependencies and scripts
│       ├── next.config.js  # ← Next.js configuration
│       ├── pages/          # ← Application pages
│       └── ...
├── package.json            # ← Root package.json with deployment scripts
├── vercel.json            # ← Vercel deployment configuration
├── railway.json           # ← Railway deployment configuration
└── Dockerfile             # ← Docker deployment configuration
```

## 🔧 Environment Variables

Make sure to set these environment variables in your deployment platform:

```bash
NODE_ENV=production
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_deployment_url
```

## 🗄️ Database Setup

The application uses Prisma with SQLite by default. For production:

1. **For Railway**: Use Railway's PostgreSQL addon
2. **For Vercel**: Use Vercel's PostgreSQL or connect to external database
3. **For Docker**: Mount a volume for SQLite or use external database

### Migration Commands
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (if needed)
npx prisma db seed
```

## 🚨 Troubleshooting Common Issues

### "next: not found" Error
- **Cause**: Deployment service trying to run `next` command from wrong directory
- **Solution**: Use the provided configuration files (vercel.json, railway.json) or Dockerfile

### "npm run build failed" Error
- **Cause**: Dependencies not installed in correct directory
- **Solution**: The root package.json now includes `postinstall` script to handle this

### Database Connection Issues
- **Cause**: Missing environment variables or incorrect DATABASE_URL
- **Solution**: Ensure all environment variables are set correctly

### Build Timeout
- **Cause**: Large dependencies or slow build process
- **Solution**: The Next.js config includes optimizations to reduce build time

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database URL set correctly
- [ ] Prisma migrations ready
- [ ] Build configuration files present
- [ ] Domain/subdomain configured (if needed)
- [ ] SSL certificate configured (automatic on most platforms)

## 🔄 Continuous Deployment

All configuration files support automatic deployment when you push to the main branch:

1. **Vercel**: Automatically deploys on git push
2. **Railway**: Automatically deploys on git push
3. **Docker**: Can be integrated with CI/CD pipelines

## 📞 Support

If you encounter issues:
1. Check the deployment logs for specific error messages
2. Verify all environment variables are set
3. Ensure the database is accessible
4. Check that the build configuration matches your platform

---

**Note**: The configuration files in this repository are optimized for the subdirectory structure and should resolve most deployment issues automatically.