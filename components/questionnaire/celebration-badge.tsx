'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Lightbulb, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CelebrationBadgeProps {
  type: 'success' | 'milestone' | 'insight' | 'benchmark'
  className?: string
}

const celebrationConfig = {
  success: {
    icon: Trophy,
    emoji: '🎯',
    bgColor: 'bg-green-50 border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    label: 'Outstanding!'
  },
  milestone: {
    icon: Target,
    emoji: '🚀',
    bgColor: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    label: 'Progress!'
  },
  insight: {
    icon: Lightbulb,
    emoji: '💡',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-800',
    iconColor: 'text-amber-600',
    label: 'Great insight!'
  },
  benchmark: {
    icon: TrendingUp,
    emoji: '📊',
    bgColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-800',
    iconColor: 'text-purple-600',
    label: 'Top performer!'
  }
}

export function CelebrationBadge({ type, className }: CelebrationBadgeProps) {
  const config = celebrationConfig[type]
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span className="text-base" role="img" aria-label={config.label}>
        {config.emoji}
      </span>
      <IconComponent className={cn("h-4 w-4", config.iconColor)} />
      <span>{config.label}</span>
    </motion.div>
  )
}

// Animated confetti effect for major celebrations
export function CelebrationConfetti() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute w-2 h-2 rounded-full",
            // Random colors
            Math.random() > 0.5 ? 'bg-blue-500' : 
            Math.random() > 0.5 ? 'bg-green-500' :
            Math.random() > 0.5 ? 'bg-yellow-500' : 'bg-purple-500'
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  )
}