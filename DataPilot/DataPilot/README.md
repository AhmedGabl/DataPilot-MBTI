# DataPilot MBTI Assessment Application

A comprehensive MBTI (Myers-Briggs Type Indicator) personality assessment application built with Next.js, TypeScript, and Prisma.

## Features

- 🧠 Complete MBTI personality assessment with 60 questions
- 📊 Detailed personality analysis and results
- 👥 User authentication and profile management
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔒 Secure JWT-based authentication
- 📈 Progress tracking and result history
- 🤖 AI-powered insights and recommendations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Deployment**: Railway, Docker
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedGabl/DataPilot-MBTI.git
   cd DataPilot-MBTI/DataPilot/DataPilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@hostname:port/database"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   OPENROUTER_API_KEY="your-openrouter-api-key" # Optional
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Railway

### Step 1: Prepare Your Repository

Ensure your repository has the following files (already included):
- `railway.json` - Railway deployment configuration
- `Dockerfile` - Container configuration
- `.dockerignore` - Docker build optimization
- `package.json` - Updated with deployment scripts

### Step 2: Deploy to Railway

1. **Connect to Railway**
   - Go to [Railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `DataPilot-MBTI` repository
   - Choose the `DataPilot/DataPilot` directory as the root

2. **Add a PostgreSQL Database**
   - In your Railway project dashboard
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically create a database and provide connection details

3. **Configure Environment Variables**
   
   In your Railway project settings, add these environment variables:
   
   ```env
   DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/railway
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=https://your-app.railway.app
   NODE_ENV=production
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```
   
   **Important Notes:**
   - Railway will automatically provide the `DATABASE_URL` when you add PostgreSQL
   - Generate secure random strings for `JWT_SECRET` and `NEXTAUTH_SECRET`
   - Update `NEXTAUTH_URL` with your Railway app URL
   - `OPENROUTER_API_KEY` is optional (for AI features)

4. **Deploy**
   - Railway will automatically build and deploy your application
   - The build process will:
     - Install dependencies
     - Generate Prisma client
     - Build the Next.js application
     - Run database migrations
     - Start the application

### Step 3: Verify Deployment

1. Check the deployment logs in Railway dashboard
2. Visit your Railway app URL
3. Test user registration and login
4. Take a sample MBTI assessment

## Troubleshooting Railway Deployment

### Common Issues and Solutions

1. **Build Fails with "command not found"**
   - Ensure `package.json` has correct scripts
   - Check that all dependencies are listed in `dependencies`, not `devDependencies`

2. **Database Connection Issues**
   - Verify `DATABASE_URL` environment variable
   - Ensure PostgreSQL service is running in Railway
   - Check database migrations ran successfully

3. **Environment Variables Missing**
   - Double-check all required environment variables are set
   - Ensure no typos in variable names
   - Generate new secrets if needed

4. **Build Timeout**
   - Railway has build time limits
   - Optimize dependencies and build process
   - Consider using Docker for more control

### Manual Deployment Steps

If automatic deployment fails, try these manual steps:

1. **Force Rebuild**
   ```bash
   # In Railway dashboard, trigger a manual redeploy
   ```

2. **Check Logs**
   ```bash
   # Review build and runtime logs in Railway dashboard
   ```

3. **Database Migration**
   ```bash
   # If migrations fail, run manually:
   npx prisma migrate deploy
   ```

## Project Structure

```
DataPilot/DataPilot/
├── components/          # Reusable UI components
├── data/               # Static data and configurations
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   └── ...            # Page components
├── prisma/             # Database schema and migrations
├── server/             # Server-side utilities
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
├── public/             # Static assets
├── .env.example        # Environment variables template
├── railway.json        # Railway deployment config
├── Dockerfile          # Container configuration
└── package.json        # Dependencies and scripts
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user
- `GET /api/questions` - Get assessment questions
- `POST /api/test/start` - Start new assessment
- `POST /api/test/answer` - Submit answer
- `POST /api/test/complete` - Complete assessment
- `GET /api/results` - Get user results
- `GET /api/profile` - Get user profile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues during deployment or development, please:

1. Check the troubleshooting section above
2. Review Railway deployment logs
3. Ensure all environment variables are correctly set
4. Verify database connectivity

For additional support, please open an issue in the GitHub repository.