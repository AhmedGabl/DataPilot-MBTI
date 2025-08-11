import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAuth, setShowAuth] = useState(false);
  const { user, login, register, logout } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const startTest = () => {
    if (user) {
      router.push('/test');
    } else {
      setShowAuth(true);
      setAuthMode('signup');
    }
  };

  const AuthForm = ({ mode }: { mode: 'login' | 'signup' }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        if (mode === 'signup') {
          await register(formData);
        } else {
          await login({ email: formData.email, password: formData.password });
        }
        // User will be redirected by useEffect
      } catch (err: any) {
        setError(err.message || `${mode} failed`);
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto bg-gradient-to-br from-white via-white to-secondary-50/40 backdrop-blur-md rounded-3xl shadow-card-hover border border-white/60 p-10 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary-200/30 to-secondary-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary-200/20 to-accent-purple/10 rounded-full blur-xl animate-float"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-400 via-accent-orange to-secondary-400 rounded-3xl mx-auto mb-6 shadow-glow-yellow">
              <span className="text-white font-bold text-2xl">DP</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
              {mode === 'signup' ? '🚀 Join DataPilot' : '👋 Welcome Back'}
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              {mode === 'signup' ? 'Create your account to start your journey' : 'Sign in to continue your assessment'}
            </p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-5 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium flex items-center space-x-3"
            >
              <span className="text-red-500 text-lg">⚠️</span>
              <span>{error}</span>
            </motion.div>
          )}

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                  <span>👤</span>
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary-400/50 focus:border-secondary-400 transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder-slate-400"
                  placeholder="Enter your full name"
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mode === 'signup' ? 0.6 : 0.5 }}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span>📧</span>
                <span>Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary-400/50 focus:border-secondary-400 transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder-slate-400"
                placeholder="Enter your email address"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mode === 'signup' ? 0.7 : 0.6 }}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span>🔒</span>
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary-400/50 focus:border-secondary-400 transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg font-medium placeholder-slate-400"
                placeholder="Enter your password"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mode === 'signup' ? 0.8 : 0.7 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-secondary-400 via-accent-orange to-secondary-400 hover:from-accent-orange hover:via-secondary-400 hover:to-accent-orange text-white py-5 px-6 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow-yellow hover:shadow-card-hover relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
              <div className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span>{mode === 'signup' ? '🎉' : '✨'}</span>
                    <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                  </div>
                )}
              </div>
            </motion.button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setAuthMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-slate-600 hover:text-slate-800 font-semibold text-lg transition-colors duration-200 bg-gradient-to-r from-slate-100 to-primary-50 px-6 py-3 rounded-2xl border border-slate-200 hover:border-slate-300"
            >
              {mode === 'signup' ? '🔄 Already have an account? Sign in' : "🆕 Don't have an account? Sign up"}
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: -3 }}
              onClick={() => setShowAuth(false)}
              className="text-slate-500 hover:text-slate-700 text-base font-medium transition-all duration-200 flex items-center space-x-2 mx-auto bg-white/60 px-4 py-2 rounded-xl border border-white/40 hover:bg-white/80"
            >
              <span>←</span>
              <span>Back to Home</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-secondary-200/30 to-secondary-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-primary-200/20 to-accent-purple/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <AuthForm mode={authMode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative circles matching the reference */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-yellow-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200/25 to-amber-200/15 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-2xl w-full relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl bg-white shadow-lg border border-gray-100 p-12 text-center relative overflow-hidden"
        >
          {/* Browser-like header */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-3xl flex items-center px-4 space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold text-slate-700 mb-4"
            >
              51Talk Work Style
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-slate-600 mb-8"
            >
              Explore how you teach, decide, collaborate
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTest}
                className="bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-base shadow-sm"
              >
                Start Assessment
              </motion.button>
            </motion.div>

            {/* What to Expect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-between items-start max-w-md mx-auto"
            >
              <div className="text-left">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">What to Expect</h3>
                <div className="space-y-1 text-slate-600 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    <span>10– 10 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    <span>4 stages</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-slate-600 text-sm">
                  <span className="text-sm">🔒</span>
                  <span>Private by default</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}