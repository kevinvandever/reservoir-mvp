import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 justify-start">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-muted rounded-2xl px-4 py-3">
        <div className="flex space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}