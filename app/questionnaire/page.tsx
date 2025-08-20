'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageList } from '@/components/questionnaire/message-list'
import { MessageInput } from '@/components/questionnaire/message-input'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { AccessCodeService } from '@/lib/access/access-code-service'
import { SessionManager } from '@/lib/access/session-manager'
import { enhancedConversationService } from '@/lib/questionnaire/enhanced-conversation-service'
import { EnhancedProgressHeader } from '@/components/questionnaire/enhanced-progress-header'
import type { ProgressMetrics } from '@/lib/questionnaire/question-bank-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Loader2, MessageCircle, Target, Crown, Shield } from 'lucide-react'

export default function QuestionnairePage() {
  const router = useRouter()
  const [isInitializing, setIsInitializing] = useState(true)
  const [accessSession, setAccessSession] = useState<any>(null)
  const [validatingAccess, setValidatingAccess] = useState(true)
  const [currentProgress, setCurrentProgress] = useState<ProgressMetrics | null>(null)
  const [showEnhancedProgress, setShowEnhancedProgress] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  
  const {
    sessionId,
    messages,
    isTyping,
    isComplete,
    addMessage,
    setTyping,
    setComplete,
    startNewSession,
    startOverWithFirstQuestion,
    saveSession,
    reset
  } = useQuestionnaireStore()
  
  // Validate access session on mount
  useEffect(() => {
    const validateAccessSession = async () => {
      console.log('🔍 Questionnaire: Starting session validation...')
      
      try {
        // Get session using SessionManager
        const sessionData = SessionManager.getSession()
        console.log('📋 Questionnaire: Session data retrieved:', sessionData)
        
        if (!sessionData) {
          console.log('❌ Questionnaire: No session data found')
          router.push('/?error=access_required')
          return
        }

        // Check if session is still valid (not expired)
        const isValid = SessionManager.isSessionValid(sessionData)
        console.log('⏰ Questionnaire: Session validity check:', isValid)
        
        if (!isValid) {
          console.log('❌ Questionnaire: Session expired, clearing...')
          SessionManager.clearSession()
          router.push('/?error=session_expired')
          return
        }
        
        // Validate with server
        console.log('🚀 Questionnaire: Validating with server...')
        const accessService = new AccessCodeService()
        const validation = await accessService.validateSession(sessionData.sessionId)
        console.log('✅ Questionnaire: Server validation result:', validation)
        
        if (!validation.valid) {
          console.log('❌ Questionnaire: Server validation failed')
          SessionManager.clearSession()
          router.push('/?error=session_expired')
          return
        }

        console.log('🎉 Questionnaire: All validations passed!')
        // Update activity
        SessionManager.updateActivity(sessionData)
        setAccessSession(sessionData)
      } catch (error) {
        console.error('❌ Questionnaire: Error validating access session:', error)
        SessionManager.clearSession()
        router.push('/?error=session_error')
        return
      } finally {
        console.log('🏁 Questionnaire: Validation complete, setting validatingAccess to false')
        setValidatingAccess(false)
      }
    }

    validateAccessSession()
  }, [router])
  
  // Set initializing to false when we have valid access
  useEffect(() => {
    if (accessSession && !validatingAccess && isInitializing) {
      setIsInitializing(false)
    }
  }, [accessSession, validatingAccess, isInitializing])
  
  // Handle completion redirect (removed auto-redirect for better UX)
  useEffect(() => {
    if (isComplete && messages.length > 0) {
      // User can manually navigate or use Start Over button
      console.log('Questionnaire completed - user can start over or navigate manually')
    }
  }, [isComplete, messages.length])
  
  const handleStartQuestionnaire = async () => {
    // Prevent duplicate calls by checking if already starting
    if (isInitializing) {
      console.log('⚠️ handleStartQuestionnaire called while already initializing, ignoring')
      return
    }
    
    setIsInitializing(true)
    setShowEnhancedProgress(true) // Show enhanced progress immediately to prevent flash
    
    try {
      await startNewSession()
      
      // Get first question from enhanced AI with premium context
      setTimeout(async () => {
        setTyping(true)
        try {
          const response = await enhancedConversationService.startPremiumSession()
          
          // Store the session ID from the enhanced service
          if (response.questionMetadata?.questionId) {
            setCurrentSessionId(response.questionMetadata.questionId)
          }
          
          // Check if message already exists to prevent duplicates
          const currentMessages = messages
          const isDuplicateMessage = currentMessages.some(msg => 
            msg.type === 'ai' && msg.content === response.question
          )
          
          if (!isDuplicateMessage) {
            console.log('✅ Adding new AI message:', response.question.substring(0, 50) + '...')
            addMessage({
              type: 'ai',
              content: response.question,
              quickResponses: response.quickResponses,
              celebrationType: response.celebrationType,
              benchmarkData: response.benchmarkData,
              extractedInformation: response.extractedInformation
            } as any)
          } else {
            console.log('⚠️ Duplicate message detected, skipping add')
          }
          
          // Update progress - always try to get current progress
          if (response.sectionProgress) {
            setCurrentProgress(response.sectionProgress)
            console.log('📊 Updated progress from response:', response.sectionProgress)
          } else {
            // Fallback: try to get progress directly from service
            console.log('⚠️ No progress in response, trying to get from service directly')
            const sessionIdToUse = currentSessionId || sessionId
            if (sessionIdToUse) {
              const directProgress = enhancedConversationService.getProgress(sessionIdToUse)
              if (directProgress) {
                setCurrentProgress({
                  ...directProgress,
                  sectionProgress: [],
                  requiredSectionsComplete: directProgress.canGenerateReport
                })
                console.log('📊 Updated progress from direct service call:', directProgress)
              }
            }
          }
          
          if (response.isComplete) {
            setComplete(true)
          }
        } catch (error) {
          console.error('Error getting first question:', error)
          addMessage({
            type: 'ai',
            content: 'I apologize, but there was an error starting the questionnaire. Please try refreshing the page.'
          })
        } finally {
          setTyping(false)
        }
      }, 1000)
    } catch (error) {
      console.error('Error starting questionnaire:', error)
    } finally {
      setIsInitializing(false)
    }
  }
  
  const handleSendMessage = async (content: string) => {
    // Check if already typing to prevent duplicate calls
    if (isTyping) {
      console.log('⚠️ handleSendMessage called while AI is typing, ignoring')
      return
    }
    
    // Add user message
    addMessage({
      type: 'user',
      content
    })
    
    // Show typing indicator and get AI response
    setTyping(true)
    
    try {
      const response = await enhancedConversationService.getNextQuestion(
        content, 
        currentSessionId || sessionId || undefined
      )
      
      // Check for duplicate AI messages before adding
      const currentMessages = messages
      const isDuplicateMessage = currentMessages.some(msg => 
        msg.type === 'ai' && msg.content === response.question
      )
      
      if (!isDuplicateMessage) {
        console.log('✅ Adding new AI response:', response.question.substring(0, 50) + '...')
        addMessage({
          type: 'ai',
          content: response.question,
          quickResponses: response.quickResponses,
          celebrationType: response.celebrationType,
          benchmarkData: response.benchmarkData,
          extractedInformation: response.extractedInformation
        } as any)
      } else {
        console.log('⚠️ Duplicate AI response detected, skipping add')
      }
      
      // Update progress - always try to get current progress
      if (response.sectionProgress) {
        setCurrentProgress(response.sectionProgress)
        console.log('📊 Updated progress from response:', response.sectionProgress)
      } else {
        // Fallback: try to get progress directly from service
        console.log('⚠️ No progress in response, trying to get from service directly')
        const sessionIdToUse = currentSessionId || sessionId
        if (sessionIdToUse) {
          const directProgress = enhancedConversationService.getProgress(sessionIdToUse)
          if (directProgress) {
            setCurrentProgress({
              ...directProgress,
              sectionProgress: [],
              requiredSectionsComplete: directProgress.canGenerateReport
            })
            console.log('📊 Updated progress from direct service call:', directProgress)
          }
        }
      }
      
      if (response.isComplete) {
        setComplete(true)
        await saveSession()
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      addMessage({
        type: 'ai',
        content: 'I apologize, but I encountered an error. Could you please try again?'
      })
    } finally {
      setTyping(false)
    }
  }
  
  const handleQuickResponse = (response: string) => {
    // Handle completion actions specially
    if (response === 'Generate My Report') {
      router.push('/report')
      return
    }
    
    if (response === 'Review My Answers') {
      // Could show a modal or navigate to a review page
      // For now, just scroll to top to review conversation
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // Handle special quick responses that indicate user wants to type custom answer
    if (response.toLowerCase() === 'other' || 
        response.toLowerCase().includes("i'll type it out") || 
        response.toLowerCase().includes("i'll type")) {
      // Focus the input field to encourage custom response
      const textarea = document.querySelector('textarea')
      if (textarea) {
        textarea.focus()
        textarea.placeholder = response.toLowerCase().includes("type") 
          ? "Please type your detailed answer..." 
          : "Please type your specific answer..."
      }
      return
    }
    
    // Handle "Skip for now" - send the response but with a note
    if (response.toLowerCase().includes("skip for now")) {
      handleSendMessage("I'd prefer to skip this question for now")
      return
    }
    
    handleSendMessage(response)
  }
  
  // Loading state
  if (validatingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="text-center text-white">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-blue-200">Validating premium access...</p>
        </div>
      </div>
    )
  }
  
  // No valid access session
  if (!accessSession) {
    return null
  }
  
  // Welcome screen before starting or when questionnaire is complete
  if (!sessionId || isInitializing || (isComplete && messages.length === 0)) {
    const memberName = accessSession?.memberData?.name
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            {/* Premium Member Badge */}
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-full text-sm font-semibold flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                ClockworkCoaching Member
              </div>
            </div>
            
            {/* Personalized Welcome */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            
            <CardTitle className="text-2xl text-white mb-2">
              {memberName ? `Welcome, ${memberName}` : 'Welcome to Your Premium Consultation'}
            </CardTitle>
            <CardDescription className="text-lg text-blue-200">
              Your exclusive $2,500+ business strategy consultation begins now. 
              Let's discover your automation opportunities through an intelligent conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Target className="h-8 w-8 text-blue-400 mx-auto" />
                <h3 className="font-medium text-white">Strategic Questions</h3>
                <p className="text-sm text-blue-300">
                  10-15 consultant-grade questions
                </p>
              </div>
              <div className="space-y-2">
                <MessageCircle className="h-8 w-8 text-blue-400 mx-auto" />
                <h3 className="font-medium text-white">AI-Powered Analysis</h3>
                <p className="text-sm text-blue-300">
                  Real-time business intelligence
                </p>
              </div>
              <div className="space-y-2">
                <Shield className="h-8 w-8 text-blue-400 mx-auto" />
                <h3 className="font-medium text-white">Premium Report</h3>
                <p className="text-sm text-blue-300">
                  $2,500+ value consultation
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleStartQuestionnaire}
                disabled={isInitializing}
                size="lg"
                className="px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Starting Your Consultation...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Begin Premium Consultation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Main questionnaire interface
  return (
    <div className="flex flex-col min-h-screen">
      {(currentProgress || showEnhancedProgress) ? (
        <EnhancedProgressHeader 
          progress={currentProgress || {
            overallProgress: 0,
            questionsAnswered: 0,
            totalQuestions: 12, // Matches enhanced conversation service estimate
            estimatedTimeRemaining: 15, // More realistic for 12 questions
            canGenerateReport: false,
            requiredSectionsComplete: false,
            sectionProgress: []
          }}
          onStartOver={() => {
            // Clear the message history and store state
            reset()
            
            // Reset progress tracking state
            setCurrentProgress(null)
            setCurrentSessionId(null)
            setShowEnhancedProgress(false)
            
            // Reset the enhanced conversation service properly
            if (currentSessionId) {
              enhancedConversationService.resetSession(currentSessionId)
            }
            
            // Clear any stored session data
            if (typeof window !== 'undefined') {
              localStorage.removeItem(`questionnaire_progress_${currentSessionId}`)
              localStorage.removeItem('questionnaire_session_id')
            }
            
            // Restart with enhanced service (this will add the first question)
            handleStartQuestionnaire()
          }}
          onExit={() => {
            // Clear any questionnaire state before exiting
            setCurrentProgress(null)
            setCurrentSessionId(null)
            setShowEnhancedProgress(false)
            // Navigate to landing page
            window.location.href = '/'
          }}
        />
      ) : (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">Business Discovery</h1>
              </div>
              <Button variant="ghost" size="sm" onClick={() => {
                // Clear any questionnaire state before exiting
                setCurrentProgress(null)
                setCurrentSessionId(null)
                setShowEnhancedProgress(false)
                // Navigate to landing page
                window.location.href = '/'
              }}>
                Exit
              </Button>
            </div>
            <div className="mt-2">
              <Progress value={0} className="h-2" />
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Loading questionnaire...</span>
                <span className="font-medium">0% Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <MessageList onQuickResponse={handleQuickResponse} />
      {isComplete && (
        <div className="p-4 bg-background/95 border-t">
          <div className="container max-w-2xl mx-auto flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Questionnaire completed! Your responses have been saved.
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Clear the message history and store state
                  reset()
                  
                  // Reset progress tracking state  
                  setCurrentProgress(null)
                  setCurrentSessionId(null)
                  setShowEnhancedProgress(false)
                  
                  // Reset the enhanced conversation service properly
                  if (currentSessionId) {
                    enhancedConversationService.resetSession(currentSessionId)
                  }
                  
                  // Clear any stored session data
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem(`questionnaire_progress_${currentSessionId}`)
                    localStorage.removeItem('questionnaire_session_id')
                  }
                  
                  // Restart with enhanced service
                  handleStartQuestionnaire()
                }}
              >
                Start New Questionnaire
              </Button>
              <Button
                size="sm"
                onClick={() => router.push('/report')}
              >
                View Results
              </Button>
            </div>
          </div>
        </div>
      )}
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping || isComplete}
        placeholder={isComplete ? "Questionnaire completed!" : "Type your answer here (or choose from options above)"}
      />
    </div>
  )
}