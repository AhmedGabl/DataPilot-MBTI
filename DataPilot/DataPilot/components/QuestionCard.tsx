import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface QuestionCardProps {
  text: string
  optionA: string
  optionB: string
  onAnswer: (value: string) => void
  disabled?: boolean
}

export function QuestionCard({ text, optionA, optionB, onAnswer, disabled }: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return
      
      if (e.key.toLowerCase() === 'a') {
        onAnswer('A')
      } else if (e.key.toLowerCase() === 'b') {
        onAnswer('B')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onAnswer, disabled])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-card p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
              {text}
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Option A */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => onAnswer('A')}
              disabled={disabled}
              className="w-full p-6 rounded-2xl text-left transition-all duration-200 font-medium bg-secondary-400 hover:bg-secondary-500 text-ink shadow-card hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-secondary-400/40"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/50 text-ink flex items-center justify-center text-xl font-bold">
                  A
                </div>
                <span className="text-lg font-semibold flex-1 leading-relaxed">{optionA}</span>
              </div>
            </motion.button>

            {/* Option B */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => onAnswer('B')}
              disabled={disabled}
              className="w-full p-6 rounded-2xl text-left transition-all duration-200 font-medium bg-gray-100 hover:bg-gray-200 text-ink shadow-card hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white text-ink flex items-center justify-center text-xl font-bold">
                  B
                </div>
                <span className="text-lg font-semibold flex-1 leading-relaxed">{optionB}</span>
              </div>
            </motion.button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-4 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
              <span className="font-medium">Press</span>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">A</kbd>
                <span className="text-gray-400">or</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">B</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}