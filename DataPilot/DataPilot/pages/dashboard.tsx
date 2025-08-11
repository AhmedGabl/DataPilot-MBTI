import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import { TypeChip } from '../components/TypeChip';
import { PercentBars } from '../components/PercentBars';
import { useAuth } from '../hooks/useAuth';
import { UserResult } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionPlan, setActionPlan] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchResults();
    }
  }, [user]);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await response.json();
      setResults(data);
      
      // Try to fetch action plan for current user (optional)
      const userResult = data.find((r: UserResult) => r.userId === user?.id);
      if (userResult) {
        fetch('/api/ai/action-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: userResult.type,
            work_style: userResult.summary,
            strengths: userResult.strengths || [],
            weaknesses: userResult.weaknesses || []
          })
        }).then(res => res.ok ? res.json() : null)
          .then(data => data?.actionPlan && setActionPlan(data.actionPlan))
          .catch(() => {}); // Action plan is optional
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const userResult = results.find(r => r.userId === user?.id);

  // Filter team results
  const filteredResults = results.filter(result => {
    const matchesSearch = !searchTerm || 
      result.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(result.mbtiType);
    
    return matchesSearch && matchesType;
  });

  // Get unique types for filter
  const allTypes = Array.from(new Set(results.map(r => r.mbtiType))).sort();

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-neutral-50 to-primary-50 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-secondary-400/8 to-accent-orange/4 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-600/6 to-accent-purple/3 rounded-full blur-2xl animate-float" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-accent-emerald/8 to-accent-pink/4 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </div>

          <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col justify-center items-center py-20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-slate-600 font-medium">Loading your results...</div>
              </motion.div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 shadow-card"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-10">
                {/* User's Result Card */}
                {userResult ? (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gradient-to-br from-white via-white to-secondary-100/50 backdrop-blur-md border-2 border-primary-300/40 rounded-3xl shadow-card-hover p-10 relative overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary-300/5 to-transparent rounded-full blur-2xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex items-center space-x-4">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                              >
                                <TypeChip type={userResult.mbtiType} size="lg" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent-emerald to-primary-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">✓</span>
                                </div>
                              </motion.div>
                              <div className="bg-gradient-to-r from-primary-100/80 to-secondary-100/60 px-4 py-2 rounded-xl border border-primary-300/30">
                                <div className="text-sm font-semibold text-slate-700">
                                  {typeof userResult.confidence === 'number' ? userResult.confidence : '75'}% confidence
                                </div>
                              </div>
                            </div>
                          </div>
                          <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={`/api/results/${userResult.id}/pdf`}
                            className="group bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 hover:from-secondary-500 hover:via-primary-600 hover:to-secondary-500 text-white font-bold px-8 py-4 rounded-2xl shadow-glow-blue hover:shadow-card-hover transition-all duration-300 text-lg relative overflow-hidden inline-flex items-center space-x-3"
                          >
                            <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                            <div className="relative z-10 flex items-center space-x-3">
                              <span>📄</span>
                              <span>Download PDF</span>
                            </div>
                          </motion.a>
                        </div>
                      
                        {userResult.percentages && (
                          <PercentBars axes={{
                            E: userResult.percentages.EI.E,
                            I: userResult.percentages.EI.I,
                            S: userResult.percentages.SN.S,
                            N: userResult.percentages.SN.N,
                            T: userResult.percentages.TF.T,
                            F: userResult.percentages.TF.F,
                            J: userResult.percentages.JP.J,
                            P: userResult.percentages.JP.P
                          }} />
                        )}
                        
                        <div className="mt-8 p-6 bg-gradient-to-r from-secondary-100/60 via-white to-primary-100/40 border-2 border-primary-300/30 rounded-2xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600"></div>
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white text-lg font-bold">📝</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Your Work Style Summary</h3>
                          </div>
                          <p className="text-slate-700 leading-relaxed text-lg font-medium">{userResult.summary}</p>
                        </div>
                      </div>

                      {/* Action Plan */}
                      {actionPlan && (
                        <div className="bg-gradient-to-br from-secondary-100/60 via-primary-100/40 to-secondary-100/60 border-2 border-secondary-300/50 rounded-3xl p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary-300/20 to-transparent rounded-full blur-xl"></div>
                          <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xl">💡</span>
                              </div>
                              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Your Work Style Tips</span>
                            </h3>
                            <div className="text-slate-700 leading-relaxed space-y-3">
                              {actionPlan.split('\n').map((line, index) => (
                                <p key={index} className="text-lg font-medium bg-white/60 p-4 rounded-xl border border-secondary-300/30">{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-white via-white to-secondary-100/40 backdrop-blur-md border-2 border-primary-300/40 rounded-3xl shadow-card-hover p-12 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-300/10 to-transparent rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                        className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-glow-blue"
                      >
                        <span className="text-4xl">🌟</span>
                      </motion.div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">Ready to discover your work style?</h3>
                      <p className="text-xl text-slate-600 mb-8 font-medium">Take the assessment to get personalized insights about how you work and collaborate.</p>
                      <motion.a
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        href="/test"
                        className="group bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 hover:from-secondary-500 hover:via-primary-600 hover:to-secondary-500 text-white font-bold px-10 py-5 rounded-2xl shadow-glow-blue hover:shadow-card-hover transition-all duration-300 text-xl relative overflow-hidden inline-flex items-center space-x-3"
                      >
                        <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center space-x-3">
                          <span>🚀</span>
                          <span>Start Assessment</span>
                        </div>
                      </motion.a>
                    </div>
                  </motion.div>
                )}

                {/* Team Grid */}
                <div className="bg-gradient-to-br from-white via-white to-secondary-100/50 backdrop-blur-md border-2 border-primary-300/40 rounded-3xl shadow-card-hover overflow-hidden">
                  <div className="bg-gradient-to-r from-secondary-100/60 via-white to-primary-100/40 px-10 py-8 border-b-2 border-primary-300/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center">
                          <span className="text-white text-xl font-bold">👥</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Team Profiles</h2>
                          <p className="text-lg text-slate-600 mt-1 font-medium">All team member work styles</p>
                        </div>
                      </div>
                      
                      {/* Search */}
                      <div className="flex-1 max-w-md">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 border-2 border-primary-300/50 rounded-2xl focus:ring-4 focus:ring-primary-200/40 focus:border-primary-500 bg-white/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium placeholder-slate-400"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Type Filters */}
                    {allTypes.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-slate-600 mr-2">Filter by type:</span>
                          {allTypes.map(type => (
                            <button
                              key={type}
                              onClick={() => toggleTypeFilter(type)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                selectedTypes.includes(type)
                                  ? 'bg-secondary-400 text-slate-900'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                          {selectedTypes.length > 0 && (
                            <button
                              onClick={() => setSelectedTypes([])}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {results.length > 0 ? (
                    <div className="p-6">
                      <AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredResults.map((result) => (
                            <motion.div
                              key={result.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -20 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                              className="bg-gradient-to-br from-white via-white to-secondary-100/50 border-2 border-primary-300/40 rounded-3xl p-6 hover:shadow-card-hover hover:border-primary-400/60 transition-all duration-300 relative overflow-hidden"
                            >
                              {/* Decorative element */}
                              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-xl"></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-glow-blue">
                                    {result.userName?.charAt(0)?.toUpperCase() || '?'}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-slate-900 truncate text-lg">{result.userName || 'Unknown'}</div>
                                    <div className="text-sm text-slate-500 truncate font-medium">{result.userEmail || ''}</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between mb-4">
                                  <TypeChip type={result.mbtiType} size="sm" />
                                  <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                                    {new Date(result.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-primary-100/80 to-secondary-100/60 px-4 py-2 rounded-xl border border-primary-300/30">
                                  <div className="text-sm font-semibold text-slate-700">
                                    {typeof result.confidence === 'number' ? result.confidence : '75'}% confidence
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatePresence>
                      
                      {filteredResults.length === 0 && results.length > 0 && (
                        <div className="text-center py-8">
                          <div className="text-slate-400 mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-slate-600">No results match your search criteria.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="text-slate-400 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No team results yet</h3>
                      <p className="text-slate-600">Once team members complete their assessments, their results will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}