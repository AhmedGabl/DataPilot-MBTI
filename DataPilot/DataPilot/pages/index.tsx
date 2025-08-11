import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Eye, EyeOff, ArrowLeft, User, Mail, Lock } from 'lucide-react';

interface AuthFormData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthErrors {
  fullName?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    fullName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<AuthErrors>({});

  const validateForm = (): boolean => {
    const newErrors: AuthErrors = {};
    
    if (authMode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (authMode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      if (authMode === 'signin') {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        
        if (result?.error) {
          setErrors({ general: 'Invalid email or password' });
        } else {
          router.push('/test');
        }
      } else {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setErrors({ general: data.message || 'Registration failed' });
        } else {
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          
          if (result?.error) {
            setErrors({ general: 'Registration successful, but login failed' });
          } else {
            router.push('/test');
          }
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const startTest = () => {
    if (session) {
      router.push('/test');
    } else {
      setShowAuth(true);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', email: '', password: '' });
    setErrors({});
    setShowPassword(false);
  };

  const switchAuthMode = () => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  const handleBackToHome = () => {
    setShowAuth(false);
    resetForm();
  };

  useEffect(() => {
    if (session) {
      setShowAuth(false);
      resetForm();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
        >
          <button
            onClick={handleBackToHome}
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {authMode === 'signin' 
                ? 'Sign in to continue your assessment' 
                : 'Join us to discover your work style'
              }
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <AnimatePresence>
              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                authMode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={switchAuthMode}
                className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
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