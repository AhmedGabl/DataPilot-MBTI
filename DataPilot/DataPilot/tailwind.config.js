/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern sophisticated palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006'
        },
        accent: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          emerald: '#10b981',
          orange: '#f97316'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        // Legacy support
        brand: {
          yellow: "#facc15",
          'yellow-light': "#fef9c3",
          'yellow-dark': "#ca8a04",
          orange: "#f97316",
          blue: "#0ea5e9",
          'blue-light': "#e0f2fe",
          green: "#10b981",
          purple: "#8b5cf6",
          'purple-light': "#f3e8ff"
        },
        ink: "#171717"
      },
      boxShadow: {
        'glow-yellow': '0 0 20px rgba(251, 217, 75, 0.3)',
        'glow-blue': '0 0 20px rgba(74, 144, 226, 0.3)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'inner-glow': 'inset 0 2px 4px rgba(255, 255, 255, 0.1)',
        'card': '0 6px 24px rgba(0, 0, 0, 0.06)'
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.875rem"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        '51talk': 'radial-gradient(ellipse at center, #F8D34B 0%, #FDF4C4 50%, #FFFBF0 100%)'
      }
    },
  },
  plugins: [],
}