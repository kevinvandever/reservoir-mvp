'use client'

import { Message } from '@/stores/questionnaire-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { User } from 'lucide-react'
import { motion } from 'framer-motion'
import { EnhancedAIMessage } from './enhanced-ai-message'

interface MessageBubbleProps {
  message: Message & {
    // Enhanced message properties
    celebrationType?: 'success' | 'milestone' | 'insight' | 'benchmark'
    benchmarkData?: {
      metric: string
      userValue: number
      percentile: number
      encouragement: string
    }
    extractedInformation?: any
  }
  onQuickResponse?: (response: string) => void
}

export function MessageBubble({ message, onQuickResponse }: MessageBubbleProps) {
  const isAI = message.type === 'ai'
  
  // Use enhanced AI message component for AI messages
  if (isAI) {
    return (
      <EnhancedAIMessage
        content={message.content}
        celebrationType={message.celebrationType}
        benchmarkData={message.benchmarkData}
        quickResponses={message.quickResponses}
        onQuickResponse={onQuickResponse}
        className="mb-6"
      />
    )
  }

  // User message with enhanced styling
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex justify-end gap-3 mb-4"
    >
      <div className="max-w-[80%] space-y-2 text-right">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl px-4 py-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {format(message.timestamp, 'HH:mm')}
        </p>
      </div>
      
      <Avatar className="h-8 w-8 mt-1 bg-gradient-to-r from-blue-600 to-blue-700">
        <AvatarFallback className="bg-transparent text-white">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </motion.div>
  )
}