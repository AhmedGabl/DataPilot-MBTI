# DataPilot MBTI Assessment Application

A comprehensive MBTI (Myers-Briggs Type Indicator) personality assessment application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🧠 **Interactive MBTI Assessment**: Complete personality questionnaire with 60+ questions
- 📊 **Detailed Results**: Comprehensive personality analysis with strengths and recommendations
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and Framer Motion
- 💾 **Data Persistence**: User profiles and results stored securely
- 📄 **PDF Export**: Download your personality assessment results

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Prisma ORM
- **Authentication**: JWT tokens with bcrypt
- **UI Components**: Radix UI, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AhmedGabl/DataPilot-MBTI.git
cd DataPilot-MBTI
```

2. Navigate to the main application directory:
```bash
cd DataPilot/DataPilot
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your database and JWT configurations.

5. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
DataPilot/DataPilot/
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
├── lib/                # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── data/               # Static data and configurations
└── hooks/              # Custom React hooks
```

## Key Features

### MBTI Assessment
- Comprehensive 60+ question personality test
- Four personality dimensions: E/I, S/N, T/F, J/P
- Detailed explanations for each personality type

### User Dashboard
- Personal profile management
- Assessment history
- Results visualization
- Progress tracking

### Results Analysis
- Detailed personality breakdown
- Strengths and development areas
- Career recommendations
- Relationship insights

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Ahmed Gabl** - [@AhmedGabl](https://github.com/AhmedGabl)

Project Link: [https://github.com/AhmedGabl/DataPilot-MBTI](https://github.com/AhmedGabl/DataPilot-MBTI)
