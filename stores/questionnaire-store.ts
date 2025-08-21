import { create } from 'zustand'

export interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  timestamp: Date
  quickResponses?: string[]
}

export interface QuestionnaireState {
  sessionId: string | null
  messages: Message[]
  currentQuestionIndex: number
  totalQuestions: number
  isTyping: boolean
  isSaving: boolean
  isComplete: boolean
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (typing: boolean) => void
  setSaving: (saving: boolean) => void
  setComplete: (complete: boolean) => void
  saveSession: () => Promise<void>
  loadSession: (sessionId: string) => Promise<void>
  startNewSession: (forceNew?: boolean) => Promise<void>
  reset: () => void
  resetSession: (sessionId?: string) => Promise<void>
  startOverWithFirstQuestion: () => Promise<void>
}

const defaultState = {
  sessionId: null,
  messages: [],
  currentQuestionIndex: 0,
  totalQuestions: 10,
  isTyping: false,
  isSaving: false,
  isComplete: false,
}

export const useQuestionnaireStore = create<QuestionnaireState>((set, get) => ({
  ...defaultState,
  
  addMessage: (message) => {
    const state = get()
    
    // Check for duplicate content to prevent duplicate messages
    const isDuplicate = state.messages.some(existingMsg => 
      existingMsg.type === message.type && 
      existingMsg.content === message.content &&
      // Only check for duplicates within the last 5 seconds for same type
      (new Date().getTime() - existingMsg.timestamp.getTime()) < 5000
    )
    
    if (isDuplicate) {
      console.log('⚠️ Duplicate message blocked:', message.content.substring(0, 50) + '...')
      return
    }
    
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).slice(2, 11),
      timestamp: new Date(),
    }
    
    console.log('✅ Adding message to store:', message.type, newMessage.id, message.content.substring(0, 50) + '...')
    
    set((state) => ({
      messages: [...state.messages, newMessage],
      currentQuestionIndex: message.type === 'user' 
        ? state.currentQuestionIndex + 1 
        : state.currentQuestionIndex,
    }))
    
    // Auto-save after user messages
    if (message.type === 'user') {
      get().saveSession()
    }
  },
  
  setTyping: (typing) => set({ isTyping: typing }),
  setSaving: (saving) => set({ isSaving: saving }),
  setComplete: (complete) => set({ isComplete: complete }),
  
  saveSession: async () => {
    const state = get()
    if (!state.sessionId) return
    
    set({ isSaving: true })
    
    try {
      // Save to localStorage for now to avoid database issues
      localStorage.setItem('questionnaire_data', JSON.stringify({
        sessionId: state.sessionId,
        messages: state.messages,
        currentQuestionIndex: state.currentQuestionIndex,
        isComplete: state.isComplete,
        timestamp: new Date().toISOString()
      }))
      
      console.log('Session saved to localStorage')
    } catch (error) {
      console.error('Error saving session:', error)
    } finally {
      set({ isSaving: false })
    }
  },
  
  loadSession: async (sessionId: string) => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('questionnaire_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()
      
      if (error) throw error
      
      const sessionData = data.session_data ? JSON.parse(data.session_data) : {}
      
      set({
        sessionId,
        messages: sessionData.messages || [],
        currentQuestionIndex: data.current_step || 0,
        isComplete: sessionData.isComplete || false,
        totalQuestions: data.total_steps || 10,
      })
    } catch (error) {
      console.error('Error loading session:', error)
    }
  },
  
  startNewSession: async () => {
    try {
      // Use access code session instead of Supabase user authentication
      const accessSessionData = localStorage.getItem('accessSession')
      
      if (!accessSessionData) {
        console.error('No access session found - user must enter valid access code first')
        return
      }
      
      const accessSession = JSON.parse(accessSessionData)
      console.log('📋 Starting questionnaire session for access session:', accessSession.sessionId)
      
      // Always create a new questionnaire session - session resumption should be explicit
      // This prevents unwanted message persistence on page reload
      
      // Generate a unique questionnaire session ID based on access session
      const sessionId = `questionnaire_${accessSession.sessionId}_${Date.now()}`
      
      // Clear any old questionnaire session data to prevent persistence issues
      localStorage.removeItem('questionnaire_session')
      localStorage.removeItem('questionnaire_data')
      
      // Save questionnaire session to localStorage
      localStorage.setItem('questionnaire_session', sessionId)
      
      set({
        sessionId,
        messages: [],
        currentQuestionIndex: 0,
        isComplete: false,
        isTyping: false,
        isSaving: false,
      })
      
      console.log('✅ New questionnaire session started successfully:', sessionId)
      
    } catch (error) {
      console.error('❌ Error starting new questionnaire session:', error)
    }
  },
  
  reset: () => {
    // Clear localStorage when resetting
    localStorage.removeItem('questionnaire_session')
    localStorage.removeItem('questionnaire_data')
    set(defaultState)
  },

  resetSession: async (sessionId?: string) => {
    const state = get()
    try {
      // Call the reset endpoint to clear backend session
      const response = await fetch('/api/questionnaire/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId || state.sessionId
        })
      })

      if (!response.ok) {
        throw new Error(`Reset failed: ${response.status}`)
      }

      console.log('✅ Backend session reset successfully')
      
      // Clear local state
      get().reset()
      
    } catch (error) {
      console.error('Error resetting session:', error)
      // Still clear local state even if backend reset fails
      get().reset()
    }
  },

  startOverWithFirstQuestion: async () => {
    const { resetSession, startNewSession, addMessage, setTyping } = get()
    
    try {
      // Reset everything
      await resetSession()
      // Start a new session
      await startNewSession()
      
      // Get first question from AI
      setTyping(true)
      
      // Import enhancedAIService here to avoid circular dependency
      const { enhancedAIService } = await import('@/lib/questionnaire/enhanced-ai-service')
      
      const response = await enhancedAIService.startPremiumSession()
      addMessage({
        type: 'ai',
        content: response.question,
        quickResponses: response.quickResponses
      })
      
      if (response.isComplete) {
        get().setComplete(true)
      }
      
    } catch (error) {
      console.error('Error starting over:', error)
      get().addMessage({
        type: 'ai',
        content: 'I apologize, but there was an error restarting the questionnaire. Please try refreshing the page.'
      })
    } finally {
      get().setTyping(false)
    }
  },
}))