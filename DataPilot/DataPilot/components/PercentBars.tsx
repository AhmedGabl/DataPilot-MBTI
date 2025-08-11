import { motion } from "framer-motion"

interface PercentBarsProps {
  axes: {
    E: number
    I: number  
    S: number
    N: number
    T: number
    F: number
    J: number
    P: number
  }
}

export function PercentBars({ axes }: PercentBarsProps) {
  const dimensions = [
    { left: 'E', right: 'I', leftScore: axes.E, rightScore: axes.I, label: 'Energy' },
    { left: 'S', right: 'N', leftScore: axes.S, rightScore: axes.N, label: 'Information' },
    { left: 'T', right: 'F', leftScore: axes.T, rightScore: axes.F, label: 'Decisions' },
    { left: 'J', right: 'P', leftScore: axes.J, rightScore: axes.P, label: 'Lifestyle' }
  ]

  return (
    <div className="space-y-4">
      {dimensions.map((dim, index) => {
        const total = dim.leftScore + dim.rightScore
        const leftPercent = total > 0 ? (dim.leftScore / total) * 100 : 50
        const rightPercent = total > 0 ? (dim.rightScore / total) * 100 : 50
        const isLeftDominant = leftPercent > rightPercent

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium text-ink">
              <span>{dim.label}</span>
              <span className="text-xs">
                {isLeftDominant ? dim.left : dim.right} {Math.round(Math.max(leftPercent, rightPercent))}%
              </span>
            </div>
            
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-neutral-300 rounded-l-full"
                initial={{ width: 0 }}
                animate={{ width: `${leftPercent}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              
              <motion.div
                className="absolute right-0 top-0 h-full bg-secondary-400 rounded-r-full"
                initial={{ width: 0 }}
                animate={{ width: `${rightPercent}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>
            
            <div className="flex justify-between text-xs font-bold">
              <span className={`${isLeftDominant ? 'text-gray-700' : 'text-gray-400'}`}>
                {dim.left}
              </span>
              <span className={`${!isLeftDominant ? 'text-secondary-500' : 'text-gray-400'}`}>
                {dim.right}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}