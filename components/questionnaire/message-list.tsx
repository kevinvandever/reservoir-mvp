'use client'

import { useEffect, useRef } from 'react'
import { MessageBubble } from './message-bubble'
import { AITypingIndicator } from './enhanced-ai-message'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'

interface MessageListProps {
  onQuickResponse: (response: string) => void
}

export function MessageList({ onQuickResponse }: MessageListProps) {
  const { messages, isTyping } = useQuestionnaireStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      })
    }
  }
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive or typing changes
    const timer = setTimeout(() => scrollToBottom(), 100)
    return () => clearTimeout(timer)
  }, [messages.length, isTyping])
  
  useEffect(() => {
    // Initial scroll to bottom without animation
    scrollToBottom(false)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      style={{
        // Calculate height to account for header and input
        height: 'calc(100vh - 140px - 120px)',
        minHeight: '400px'
      }}
    >
      <div className="max-w-3xl mx-auto">
        {messages.length === 0 && !isTyping && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-xl font-semibold mb-2">Welcome to Business Discovery</h2>
            <p className="text-muted-foreground">
              I'll help you discover automation opportunities for your business.
              Let's get started!
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onQuickResponse={onQuickResponse}
          />
        ))}
        
        {isTyping && <AITypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}