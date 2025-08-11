import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface StageBreakProps {
  stage: number
  onContinue: () => void
}

const stageNames = ["Warm-up", "Focus", "Decisions", "Workflow"]
const stageEmojis = ["🚀", "🎯", "💡", "⚡"]

export function StageBreak({ stage, onContinue }: StageBreakProps) {
  const [encouragement, setEncouragement] = useState<string>("")

  useEffect(() => {
    // Try to fetch encouragement from existing endpoint
    fetch('/api/ai/encourage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stageIndex: stage - 1 })
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data?.message) {
        setEncouragement(data.message)
      } else {
        // Fallback default lines
        const defaults = [
          "Great start! You're building momentum.",
          "Excellent focus! Keep that energy going.", 
          "Smart thinking! You're doing really well.",
          "Almost there! Finish strong!"
        ]
        setEncouragement(defaults[stage - 1] || "You're doing great!")
      }
    })
    .catch(() => {
      // Fallback on error
      setEncouragement("You're making great progress!")
    })
  }, [stage])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-card p-12 text-center">
        <div>
          {/* Stage Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-secondary-400 rounded-2xl mx-auto mb-6"
          >
            <span className="text-3xl">{stageEmojis[stage - 1]}</span>
          </motion.div>
          
          {/* Stage Complete Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-bold text-ink mb-3"
          >
            Stage {stage} Complete!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8"
          >
            {stageNames[stage - 1]} phase finished successfully
          </motion.p>
          
          {/* Encouragement Message */}
          {encouragement && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center">
                  <span className="text-ink text-sm font-bold">💬</span>
                </div>
              </div>
              <p className="text-ink font-medium text-lg italic leading-relaxed">"{encouragement}"</p>
            </motion.div>
          )}
          
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-3">
              {[1, 2, 3, 4].map((stageNum) => (
                <div
                  key={stageNum}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    stageNum <= stage 
                      ? 'bg-secondary-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {stage} of 4 stages completed
            </p>
          </motion.div>
          
          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="bg-secondary-400 hover:bg-secondary-500 text-ink font-bold px-12 py-4 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 text-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <span>Continue</span>
              <span className="text-xl">→</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}