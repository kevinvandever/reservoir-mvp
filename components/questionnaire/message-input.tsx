'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Type your response..."
}: MessageInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const handleSend = () => {
    const trimmedInput = input.trim()
    if (trimmedInput && !disabled) {
      onSendMessage(trimmedInput)
      setInput('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    
    if (e.key === 'Escape') {
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }
  
  const handleInputChange = (value: string) => {
    setInput(value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }
  
  const characterCount = input.length
  const maxLength = 500
  
  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container py-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 space-y-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                "min-h-[44px] max-h-[120px] resize-none",
                "focus:ring-2 focus:ring-primary/20 focus:border-primary"
              )}
              rows={1}
            />
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Press Enter to send, Shift+Enter for new line
              </span>
              <span className={cn(
                characterCount > maxLength * 0.9 && "text-warning",
                characterCount >= maxLength && "text-destructive"
              )}>
                {characterCount}/{maxLength}
              </span>
            </div>
          </div>
          
          <Button
            onClick={handleSend}
            disabled={disabled || !input.trim() || characterCount > maxLength}
            size="icon"
            className="h-11 w-11 shrink-0"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}