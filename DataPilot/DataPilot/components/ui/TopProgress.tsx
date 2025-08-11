import { motion } from 'framer-motion';

interface TopProgressProps {
  percentage: number;
}

export default function TopProgress({ percentage }: TopProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-secondary-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}