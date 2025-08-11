import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import { QuestionCard } from '../components/QuestionCard';
import TopProgress from '../components/ui/TopProgress';
import { StageBreak } from '../components/StageBreak';

interface Question {
  id: number;
  text: string;
  options: Array<{ label: string; value: string }>;
}

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [showStageBreak, setShowStageBreak] = useState(false);
  const [loading, setLoading] = useState(true);

  const QUESTIONS_PER_STAGE = 15;
  const currentStage = Math.floor(currentIndex / QUESTIONS_PER_STAGE) + 1;
  
  useEffect(() => {
    const initTest = async () => {
      try {
        // Get questions using existing API
        const seedParam = router.query.seed || Date.now().toString();
        const questionsRes = await fetch(`/api/questions?seed=${seedParam}`);
        if (questionsRes.ok) {
          const questionsData = await questionsRes.json();
          setQuestions(questionsData.questions);
        }

        // Try to get welcome message from existing endpoint
        try {
          const welcomeRes = await fetch('/api/ai/welcome', { method: 'POST' });
          if (welcomeRes.ok) {
            const welcomeData = await welcomeRes.json();
            if (welcomeData.message) {
              setWelcomeMessage(welcomeData.message);
            }
          }
        } catch {
          // Ignore welcome message errors
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to load test:', error);
        setLoading(false);
      }
    };

    initTest();
  }, [router.query.seed]);

  const handleAnswer = async (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    // Check if we need a stage break (every 15 questions, but not on the last)
    if ((currentIndex + 1) % QUESTIONS_PER_STAGE === 0 && currentIndex + 1 < questions.length) {
      setShowStageBreak(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    // If this was the last question, submit
    if (currentIndex + 1 >= questions.length) {
      await submitTest(newAnswers);
    }
  };

  const submitTest = async (finalAnswers: string[]) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers })
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        throw new Error('Submit failed');
      }
    } catch (error) {
      console.error('Failed to submit test:', error);
      alert('Failed to submit test. Please try again.');
    }
  };

  const handleContinueFromStageBreak = () => {
    setShowStageBreak(false);
    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
            <div className="text-gray-600">Loading assessment...</div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Top Progress Bar */}
        <TopProgress percentage={progress} />
        
        {/* Progress Info */}
        <div className="pt-6 pb-4">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center"
            >
              <div className="bg-white rounded-xl px-4 py-2 shadow-card">
                <span className="text-sm font-semibold text-ink">Question {currentIndex + 1} / {questions.length}</span>
              </div>
              <div className="bg-secondary-400 text-ink px-4 py-2 rounded-xl font-semibold">
                <span className="text-sm">Stage {currentStage} of 4</span>
              </div>
            </motion.div>
          </div>
        </div>

        <main className="max-w-2xl mx-auto px-6 pb-8">
          {/* Welcome message on first question */}
          {welcomeMessage && currentIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-card p-6 text-center mb-6"
            >
              <p className="text-ink text-lg leading-relaxed">{welcomeMessage}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {showStageBreak ? (
              <StageBreak
                stage={currentStage}
                onContinue={handleContinueFromStageBreak}
              />
            ) : currentQuestion ? (
              <QuestionCard
                key={currentQuestion.id}
                text={currentQuestion.text}
                optionA={currentQuestion.options[0].label}
                optionB={currentQuestion.options[1].label}
                onAnswer={handleAnswer}
              />
            ) : null}
          </AnimatePresence>
        </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}