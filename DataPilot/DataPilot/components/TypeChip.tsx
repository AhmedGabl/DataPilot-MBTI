import { motion } from 'framer-motion'

interface TypeChipProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

const typeStyles: Record<string, { bg: string; text: string; border: string; icon: string; shadow: string }> = {
  // Analysts (NT) - Purple/Violet theme
  'INTJ': { bg: 'bg-gradient-to-r from-purple-500 to-purple-600', text: 'text-white', border: 'border-purple-400', icon: '🧠', shadow: 'shadow-lg shadow-purple-500/30' },
  'INTP': { bg: 'bg-gradient-to-r from-purple-400 to-purple-500', text: 'text-white', border: 'border-purple-300', icon: '🔬', shadow: 'shadow-lg shadow-purple-400/30' },
  'ENTJ': { bg: 'bg-gradient-to-r from-purple-600 to-purple-700', text: 'text-white', border: 'border-purple-500', icon: '👑', shadow: 'shadow-lg shadow-purple-600/30' },
  'ENTP': { bg: 'bg-gradient-to-r from-purple-500 to-indigo-500', text: 'text-white', border: 'border-purple-400', icon: '💡', shadow: 'shadow-lg shadow-purple-500/30' },
  
  // Diplomats (NF) - Green/Emerald theme
  'INFJ': { bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600', text: 'text-white', border: 'border-emerald-400', icon: '🌟', shadow: 'shadow-lg shadow-emerald-500/30' },
  'INFP': { bg: 'bg-gradient-to-r from-emerald-400 to-emerald-500', text: 'text-white', border: 'border-emerald-300', icon: '🎨', shadow: 'shadow-lg shadow-emerald-400/30' },
  'ENFJ': { bg: 'bg-gradient-to-r from-emerald-600 to-green-600', text: 'text-white', border: 'border-emerald-500', icon: '🤝', shadow: 'shadow-lg shadow-emerald-600/30' },
  'ENFP': { bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', text: 'text-white', border: 'border-emerald-400', icon: '🎭', shadow: 'shadow-lg shadow-emerald-500/30' },
  
  // Sentinels (SJ) - Blue theme
  'ISTJ': { bg: 'bg-gradient-to-r from-blue-500 to-blue-600', text: 'text-white', border: 'border-blue-400', icon: '📋', shadow: 'shadow-lg shadow-blue-500/30' },
  'ISFJ': { bg: 'bg-gradient-to-r from-blue-400 to-blue-500', text: 'text-white', border: 'border-blue-300', icon: '🛡️', shadow: 'shadow-lg shadow-blue-400/30' },
  'ESTJ': { bg: 'bg-gradient-to-r from-blue-600 to-blue-700', text: 'text-white', border: 'border-blue-500', icon: '⚖️', shadow: 'shadow-lg shadow-blue-600/30' },
  'ESFJ': { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white', border: 'border-blue-400', icon: '❤️', shadow: 'shadow-lg shadow-blue-500/30' },
  
  // Explorers (SP) - Accent Orange/Yellow theme  
  'ISTP': { bg: 'bg-gradient-to-r from-secondary-400 to-accent-orange', text: 'text-white', border: 'border-secondary-400', icon: '🔧', shadow: 'shadow-lg shadow-secondary-400/30' },
  'ISFP': { bg: 'bg-gradient-to-r from-accent-orange to-red-400', text: 'text-white', border: 'border-accent-orange', icon: '🎪', shadow: 'shadow-lg shadow-orange-500/30' },
  'ESTP': { bg: 'bg-gradient-to-r from-secondary-400 to-yellow-500', text: 'text-white', border: 'border-secondary-400', icon: '⚡', shadow: 'shadow-lg shadow-secondary-400/30' },
  'ESFP': { bg: 'bg-gradient-to-r from-accent-orange to-pink-400', text: 'text-white', border: 'border-accent-orange', icon: '🎉', shadow: 'shadow-lg shadow-orange-500/30' },
}

export function TypeChip({ type, size = 'md', className = "", animated = true }: TypeChipProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm', 
    lg: 'px-6 py-3 text-base'
  }

  const typeStyle = typeStyles[type] || {
    bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
    text: 'text-white',
    border: 'border-gray-300',
    icon: '❓',
    shadow: 'shadow-lg shadow-gray-400/30'
  }

  const chipContent = (
    <span className={`
      inline-flex items-center rounded-xl border-2 font-bold transition-all duration-200
      ${sizeClasses[size]}
      ${typeStyle.bg}
      ${typeStyle.text}
      ${typeStyle.border}
      ${typeStyle.shadow}
      hover:scale-105 hover:shadow-xl
      ${className}
    `}>
      <span className="mr-2">{typeStyle.icon}</span>
      {type}
    </span>
  )

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {chipContent}
      </motion.div>
    )
  }

  return chipContent
}