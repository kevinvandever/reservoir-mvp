// Enhanced AI Service with Comprehensive Question Bank Integration
import { QuestionBankService, AIResponse } from './question-bank-service'
import { SessionManager } from '@/lib/access/session-manager'

export class EnhancedAIQuestionnaireService {
  private questionBankServices: Map<string, QuestionBankService> = new Map()
  private fallbackMode = false

  async getNextQuestion(userResponse?: string, sessionId?: string): Promise<AIResponse> {
    console.log('🆕 Enhanced AI Service Request:', { userResponse, sessionId, timestamp: new Date().toISOString() })
    
    try {
      // Get or create question bank service for this session
      console.log('🔧 Getting or creating question bank service for session:', sessionId)
      const questionBankService = this.getOrCreateQuestionBankService(sessionId)
      console.log('✅ Question bank service created successfully')
      
      // Get next question from comprehensive question bank
      console.log('📋 Requesting next question from question bank...')
      const response = await questionBankService.getNextQuestion(userResponse)
      console.log('📄 Question bank response:', {
        hasQuestion: !!response.question,
        isComplete: response.isComplete,
        questionId: response.questionMetadata?.questionId
      })
      
      console.log('✅ Enhanced AI Response:', {
        section: response.questionMetadata?.section,
        progress: response.sectionProgress?.overallProgress,
        isComplete: response.isComplete
      })

      return response

    } catch (error) {
      console.error('❌ Error in enhanced AI service:', error)
      console.error('❌ Error details:', error instanceof Error ? error.message : String(error))
      this.fallbackMode = true
      
      // Fallback to basic question bank if enhanced system fails
      console.log('🚨 FALLING BACK to old API system due to error')
      return this.getFallbackQuestion(userResponse)
    }
  }

  /**
   * Get progress for a specific session
   */
  getProgress(sessionId?: string) {
    if (!sessionId) return null
    
    const questionBankService = this.questionBankServices.get(sessionId)
    return questionBankService ? questionBankService.getProgress() : null
  }

  /**
   * Get business intelligence for report generation
   */
  getBusinessIntelligence(sessionId?: string) {
    if (!sessionId) return null
    
    const questionBankService = this.questionBankServices.get(sessionId)
    return questionBankService ? questionBankService.getBusinessIntelligence() : null
  }

  /**
   * Get conversation context for report generation
   */
  getConversationContext(sessionId?: string) {
    if (!sessionId) return {}
    
    const questionBankService = this.questionBankServices.get(sessionId)
    return questionBankService ? questionBankService.getConversationContext() : {}
  }

  /**
   * Reset questionnaire for a session
   */
  resetSession(sessionId?: string) {
    if (!sessionId) return
    
    const questionBankService = this.questionBankServices.get(sessionId)
    if (questionBankService) {
      questionBankService.reset()
    }
  }

  /**
   * Start a new questionnaire session with premium member context
   */
  async startPremiumSession(): Promise<AIResponse> {
    // Get member session data
    const accessSession = SessionManager.getSession()
    const memberName = accessSession?.memberData?.name

    // Create session ID for questionnaire
    const questionnaireSessionId = `questionnaire_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    
    // Initialize question bank service
    const questionBankService = new QuestionBankService(questionnaireSessionId)
    this.questionBankServices.set(questionnaireSessionId, questionBankService)

    // Get the first question with premium member context
    const welcomeMessage = memberName 
      ? `Welcome to your exclusive business consultation, ${memberName}! I'm excited to dive deep into your business and identify the most impactful automation opportunities for you.`
      : `Welcome to your exclusive business consultation! I'm excited to dive deep into your business and identify the most impactful automation opportunities for you.`

    // Get first question
    const firstQuestionResponse = await questionBankService.getNextQuestion()

    // Combine welcome with first question
    const premiumQuestion = `${welcomeMessage}\n\n${firstQuestionResponse.question}`

    return {
      ...firstQuestionResponse,
      question: premiumQuestion,
      questionMetadata: {
        ...firstQuestionResponse.questionMetadata!,
        questionId: questionnaireSessionId // Track this session
      }
    }
  }

  // Private helper methods

  private getOrCreateQuestionBankService(sessionId?: string): QuestionBankService {
    if (!sessionId) {
      // Create temporary session ID
      sessionId = `temp_${Date.now()}`
    }

    let questionBankService = this.questionBankServices.get(sessionId)
    
    if (!questionBankService) {
      questionBankService = new QuestionBankService(sessionId)
      this.questionBankServices.set(sessionId, questionBankService)
      
      // Try to load existing progress
      this.loadExistingProgress(sessionId, questionBankService)
    }

    return questionBankService
  }

  private loadExistingProgress(sessionId: string, questionBankService: QuestionBankService) {
    try {
      if (typeof window !== 'undefined') {
        const savedProgress = localStorage.getItem(`questionnaire_progress_${sessionId}`)
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress)
          questionBankService.loadProgress(
            progressData.conversationContext || {},
            progressData.answeredQuestionIds || []
          )
          console.log('📂 Loaded existing progress for session:', sessionId)
        }
      }
    } catch (error) {
      console.warn('Could not load existing progress:', error)
    }
  }

  private getFallbackQuestion(_userResponse?: string): AIResponse {
    console.warn('🚨 Using fallback mode - enhanced question bank unavailable')
    
    // Simple fallback questions for real estate
    const fallbacks = [
      {
        question: "Let's start with the basics. What's your name and which brokerage are you with?",
        quickResponses: ["I'll type it out", "Skip for now"]
      },
      {
        question: "How many years have you been in real estate?",
        quickResponses: ["Less than 2 years", "2-5 years", "5-10 years", "10+ years"]
      },
      {
        question: "What was your approximate GCI last year?",
        quickResponses: ["Under $100K", "$100K-$250K", "$250K-$500K", "$500K+"]
      },
      {
        question: "What's your biggest challenge with lead generation?",
        quickResponses: ["Not enough leads", "Lead quality", "Follow-up", "Converting leads"]
      },
      {
        question: "How many leads do you get per month?",
        quickResponses: ["Under 10", "10-25", "25-50", "50+"]
      }
    ]

    // Simple progression based on responses received
    const questionIndex = Math.min(
      this.questionBankServices.size, 
      fallbacks.length - 1
    )

    return {
      question: fallbacks[questionIndex].question,
      quickResponses: fallbacks[questionIndex].quickResponses,
      isComplete: questionIndex >= fallbacks.length - 1,
      sectionProgress: {
        overallProgress: (questionIndex / fallbacks.length) * 100,
        sectionProgress: [],
        canGenerateReport: questionIndex >= 3,
        requiredSectionsComplete: false,
        questionsAnswered: questionIndex,
        totalQuestions: fallbacks.length,
        estimatedTimeRemaining: (fallbacks.length - questionIndex) * 2
      },
      questionMetadata: {
        section: 'business_foundation' as any,
        weight: 1,
        purpose: 'Fallback question',
        questionId: `fallback_${questionIndex}`
      }
    }
  }
}

// Singleton instance for the enhanced service
export const enhancedAIService = new EnhancedAIQuestionnaireService()

// Export both for backward compatibility
export { aiService } from './ai-service' // Keep original for any existing references