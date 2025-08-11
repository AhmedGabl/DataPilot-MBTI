import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/test', label: 'Assessment', icon: '🧠' },
    { href: '/people', label: 'People', icon: '👥' },
    { href: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-primary-200/50 shadow-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/dashboard" className="flex items-center group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white font-bold text-lg">⚡</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">DataPilot</h1>
                    <p className="text-xs text-neutral-500 font-medium">Team Insights</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = router.pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-card'
                          : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                      {false && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-neutral-600">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}