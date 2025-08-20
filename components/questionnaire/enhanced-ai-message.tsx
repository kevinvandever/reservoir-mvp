'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { CelebrationBadge } from './celebration-badge'
import { BenchmarkCard } from './benchmark-card'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface BenchmarkData {
  metric: string
  userValue: number
  percentile: number
  encouragement: string
}

interface EnhancedAIMessageProps {
  content: string
  celebrationType?: 'success' | 'milestone' | 'insight' | 'benchmark'
  benchmarkData?: BenchmarkData
  quickResponses?: string[]
  onQuickResponse?: (response: string) => void
  className?: string
}

export function EnhancedAIMessage({
  content,
  celebrationType,
  benchmarkData,
  quickResponses,
  onQuickResponse,
  className
}: EnhancedAIMessageProps) {
  const [isTyping, setIsTyping] = useState(true)
  const [displayedContent, setDisplayedContent] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(content.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 30) // Typing speed

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [content, currentIndex])

  // Reset when content changes
  useEffect(() => {
    setCurrentIndex(0)
    setDisplayedContent('')
    setIsTyping(true)
  }, [content])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex items-start space-x-3 max-w-4xl", className)}
    >
      {/* AI Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-6 w-6 text-white" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-3">
        {/* Celebration Badge */}
        <AnimatePresence>
          {celebrationType && !isTyping && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <CelebrationBadge type={celebrationType} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Message */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-800 leading-relaxed mb-0 whitespace-pre-wrap">
                {displayedContent}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-blue-500 ml-1"
                  />
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benchmark Card */}
        <AnimatePresence>
          {benchmarkData && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <BenchmarkCard 
                data={{
                  ...benchmarkData,
                  tier: benchmarkData.percentile >= 90 ? 'Elite' :
                        benchmarkData.percentile >= 80 ? 'Top 20%' :
                        benchmarkData.percentile >= 60 ? 'Above Average' : 'Building'
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Responses */}
        <AnimatePresence>
          {quickResponses && quickResponses.length > 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="space-y-2"
            >
              <p className="text-sm text-gray-600 font-medium">Quick responses:</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onQuickResponse?.(response)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      "bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300",
                      "text-blue-700 hover:text-blue-800",
                      "shadow-sm hover:shadow-md",
                      // Special styling for "Other" option
                      response.toLowerCase().includes('other') && "border-gray-300 text-gray-600 hover:border-gray-400"
                    )}
                  >
                    {response}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle decoration for high-celebration messages */}
        {(celebrationType === 'success' || celebrationType === 'benchmark') && !isTyping && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              delay: 2 
            }}
          >
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Typing indicator for when AI is "thinking"
export function AITypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-start space-x-3"
    >
      <Avatar className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600">
        <AvatarFallback className="bg-transparent">
          <Bot className="h-6 w-6 text-white" />
        </AvatarFallback>
      </Avatar>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="px-4 py-3">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">Thinking</span>
            <motion.div
              className="flex space-x-1"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.2,
                    repeat: Infinity,
                  },
                },
              }}
              initial="initial"
              animate="animate"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-1 h-1 bg-blue-500 rounded-full"
                  variants={{
                    initial: { y: 0 },
                    animate: {
                      y: [-3, 0],
                      transition: {
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    },
                  }}
                />
              ))}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}