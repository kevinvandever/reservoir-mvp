// Enhanced Conversation Service - Story 2.17 Implementation
// Integrates with existing system while adding Tim Urban personality and advanced features

import { enhancedIntelligentAI } from './enhanced-intelligent-ai'
import { BenchmarkService } from './benchmark-service'
import { SessionManager } from '@/lib/access/session-manager'

// Interface for the enhanced response that includes UX elements
interface EnhancedConversationResponse {
  question: string
  quickResponses?: string[]
  isComplete: boolean
  celebrationType?: 'success' | 'milestone' | 'insight' | 'benchmark'
  benchmarkData?: {
    metric: string
    userValue: number
    percentile: number
    encouragement: string
  }
  extractedInformation?: any
  confidence?: number
  reasoning?: string
  sectionProgress?: {
    overallProgress: number
    sectionProgress: any[]
    canGenerateReport: boolean
    requiredSectionsComplete: boolean
    questionsAnswered: number
    totalQuestions: number
    estimatedTimeRemaining: number
  }
  questionMetadata?: {
    section: string
    weight: number
    purpose: string
    questionId: string
  }
}

export class EnhancedConversationService {
  private fallbackMode = false
  private debounceTimers = new Map<string, NodeJS.Timeout>()
  private readonly DEBOUNCE_DELAY = 500 // 500ms debounce

  async getNextQuestion(userResponse?: string, sessionId?: string): Promise<EnhancedConversationResponse> {
    console.log('🎯 Enhanced Conversation Service Request:', { userResponse, sessionId, timestamp: new Date().toISOString() })
    
    // For user responses, use debounced processing to prevent rapid-fire submissions
    if (userResponse && sessionId) {
      return this.getDebouncedNextQuestion(userResponse, sessionId)
    }
    
    return this.processNextQuestion(userResponse, sessionId)
  }

  /**
   * Debounced version for user responses to prevent rapid submissions
   */
  private async getDebouncedNextQuestion(userResponse: string, sessionId: string): Promise<EnhancedConversationResponse> {
    return new Promise((resolve, reject) => {
      // Clear existing timer for this session
      const existingTimer = this.debounceTimers.get(sessionId)
      if (existingTimer) {
        clearTimeout(existingTimer)
      }
      
      // Set new timer
      const timer = setTimeout(async () => {
        try {
          this.debounceTimers.delete(sessionId)
          const result = await this.processNextQuestion(userResponse, sessionId)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, this.DEBOUNCE_DELAY)
      
      this.debounceTimers.set(sessionId, timer)
    })
  }

  /**
   * Core processing method
   */
  private async processNextQuestion(userResponse?: string, sessionId?: string): Promise<EnhancedConversationResponse> {
    
    try {
      // Use the enhanced intelligent AI for conversation
      const response = await enhancedIntelligentAI.generateNextQuestion(userResponse, sessionId)
      
      // Get usage stats for progress calculation
      const stats = enhancedIntelligentAI.getUsageStats(sessionId)
      
      // Calculate progress based on information completeness
      const progressPercentage = stats.informationCompleteness
      const questionsAnswered = stats.questionsAsked
      const estimatedTotal = 12 // Target completion questions
      
      // Enhanced response with UX elements
      const enhancedResponse: EnhancedConversationResponse = {
        question: response.question,
        quickResponses: response.quickResponses,
        isComplete: response.isComplete,
        celebrationType: response.celebrationType,
        benchmarkData: response.benchmarkData,
        extractedInformation: response.extractedInformation,
        confidence: response.confidence,
        reasoning: response.reasoning,
        
        // Progress information for UX components
        sectionProgress: {
          overallProgress: progressPercentage,
          sectionProgress: [], // Will be populated by section-based progress
          canGenerateReport: progressPercentage >= 60,
          requiredSectionsComplete: progressPercentage >= 60,
          questionsAnswered: questionsAnswered,
          totalQuestions: estimatedTotal,
          estimatedTimeRemaining: Math.max(0, (estimatedTotal - questionsAnswered) * 1.5) // 1.5 mins per question
        },
        
        // Question metadata for tracking
        questionMetadata: {
          section: this.getCurrentSection(progressPercentage),
          weight: 1,
          purpose: 'Enhanced AI conversation with Tim Urban personality',
          questionId: `enhanced_${sessionId}_${questionsAnswered}`
        }
      }

      // Add benchmark analysis if we have performance data
      if (response.context?.lastYearTransactions || response.context?.lastYearGCI) {
        const benchmarkAnalysis = BenchmarkService.getComprehensiveAnalysis(response.context)
        
        // Add celebration type based on performance
        if (benchmarkAnalysis.overallPercentile >= 90) {
          enhancedResponse.celebrationType = 'success'
        } else if (benchmarkAnalysis.overallPercentile >= 80) {
          enhancedResponse.celebrationType = 'benchmark'
        }
        
        console.log('📊 Benchmark Analysis:', {
          percentile: benchmarkAnalysis.overallPercentile,
          strengths: benchmarkAnalysis.strengthAreas.length,
          automationScore: benchmarkAnalysis.automationOpportunity.score
        })
      }

      console.log('✅ Enhanced Conversation Response Generated:', {
        hasQuestion: !!enhancedResponse.question,
        progress: enhancedResponse.sectionProgress?.overallProgress,
        celebration: enhancedResponse.celebrationType,
        isComplete: enhancedResponse.isComplete
      })

      return enhancedResponse

    } catch (error) {
      console.error('❌ Error in enhanced conversation service:', error)
      this.fallbackMode = true
      
      // Fallback to basic response
      return this.getFallbackQuestion(userResponse, sessionId)
    }
  }

  /**
   * Start a premium session with member personalization
   */
  async startPremiumSession(memberName?: string): Promise<EnhancedConversationResponse> {
    // Get member session data
    const accessSession = SessionManager.getSession()
    const actualMemberName = memberName || accessSession?.memberData?.name

    // Create session ID for questionnaire
    const questionnaireSessionId = `enhanced_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    
    // Get the first question with premium member context
    const welcomeMessage = actualMemberName 
      ? `Welcome to your exclusive business consultation, ${actualMemberName}! I'm excited to dive deep into your business and identify the most impactful automation opportunities for you.`
      : `Welcome to your exclusive business consultation! I'm excited to dive deep into your business and identify the most impactful automation opportunities for you.`

    // Get first question from enhanced AI
    const firstQuestionResponse = await this.getNextQuestion(undefined, questionnaireSessionId)

    // Combine welcome with first question
    const premiumQuestion = `${welcomeMessage}\n\n${firstQuestionResponse.question}`

    return {
      ...firstQuestionResponse,
      question: premiumQuestion,
      celebrationType: 'milestone',
      questionMetadata: {
        ...firstQuestionResponse.questionMetadata!,
        questionId: questionnaireSessionId // Track this session
      }
    }
  }

  /**
   * Get conversation context for report generation (Story 2.18 integration)
   */
  getConversationContext(sessionId?: string) {
    if (!sessionId) return {}
    return enhancedIntelligentAI.getConversationContext(sessionId)
  }

  /**
   * Get business intelligence for report generation
   */
  getBusinessIntelligence(sessionId?: string) {
    if (!sessionId) return null
    
    const context = this.getConversationContext(sessionId)
    const stats = enhancedIntelligentAI.getUsageStats(sessionId)
    
    // Return comprehensive business analysis
    return {
      context,
      extractionHistory: stats.extractionHistory,
      completeness: stats.informationCompleteness,
      benchmarkAnalysis: BenchmarkService.getComprehensiveAnalysis(context)
    }
  }

  /**
   * Reset a conversation session
   */
  resetSession(sessionId?: string) {
    if (sessionId) {
      enhancedIntelligentAI.reset(sessionId)
      // Clear any pending debounce timers
      const timer = this.debounceTimers.get(sessionId)
      if (timer) {
        clearTimeout(timer)
        this.debounceTimers.delete(sessionId)
      }
    }
  }

  /**
   * Clean up all debounce timers
   */
  cleanup() {
    this.debounceTimers.forEach(timer => clearTimeout(timer))
    this.debounceTimers.clear()
  }

  /**
   * Get progress for a specific session
   */
  getProgress(sessionId?: string) {
    if (!sessionId) return null
    
    const stats = enhancedIntelligentAI.getUsageStats(sessionId)
    
    return {
      questionsAnswered: stats.questionsAsked,
      totalQuestions: 12,
      overallProgress: stats.informationCompleteness,
      canGenerateReport: stats.informationCompleteness >= 60,
      estimatedTimeRemaining: Math.max(0, (12 - stats.questionsAsked) * 1.5)
    }
  }

  // Private helper methods

  private getCurrentSection(progressPercentage: number): string {
    if (progressPercentage < 20) return 'business_foundation'
    if (progressPercentage < 40) return 'current_systems'
    if (progressPercentage < 60) return 'lead_generation'
    if (progressPercentage < 80) return 'challenges_goals'
    return 'optimization_opportunities'
  }

  private getFallbackQuestion(_userResponse?: string, sessionId?: string): EnhancedConversationResponse {
    console.warn('🚨 Using fallback mode - enhanced conversation unavailable')
    
    // Simple fallback questions with UX enhancements
    const fallbacks = [
      {
        question: "Let's start with the basics. What's your name and which brokerage are you with?",
        quickResponses: ["I'll type it out", "Skip for now"],
        celebrationType: 'insight' as const
      },
      {
        question: "How many transactions did you close last year? Don't worry if it's not perfect - just give me a ballpark!",
        quickResponses: ["Under 10", "10-25", "25-50", "50+"],
        celebrationType: 'benchmark' as const
      },
      {
        question: "What was your approximate GCI last year? This helps me understand your business scale.",
        quickResponses: ["Under $100K", "$100K-$250K", "$250K-$500K", "$500K+"],
        celebrationType: 'benchmark' as const
      },
      {
        question: "What's your biggest challenge right now? I find most successful agents struggle with similar issues.",
        quickResponses: ["Lead follow-up", "Time management", "Client communication", "Transaction coordination"],
        celebrationType: 'insight' as const
      },
      {
        question: "How many leads do you typically get per month? This is key for understanding your pipeline.",
        quickResponses: ["Under 10", "10-30", "30-60", "60+"],
        celebrationType: 'insight' as const
      }
    ]

    // Simple progression based on session
    const questionIndex = Math.min(2, fallbacks.length - 1) // Default to question 2

    return {
      question: fallbacks[questionIndex].question,
      quickResponses: fallbacks[questionIndex].quickResponses,
      isComplete: false,
      celebrationType: fallbacks[questionIndex].celebrationType,
      sectionProgress: {
        overallProgress: questionIndex * 20,
        sectionProgress: [],
        canGenerateReport: false,
        requiredSectionsComplete: false,
        questionsAnswered: questionIndex,
        totalQuestions: 12,
        estimatedTimeRemaining: (12 - questionIndex) * 1.5
      },
      questionMetadata: {
        section: 'business_foundation',
        weight: 1,
        purpose: 'Fallback question',
        questionId: `fallback_${sessionId}_${questionIndex}`
      }
    }
  }
}

// Singleton instance for the enhanced conversation service
export const enhancedConversationService = new EnhancedConversationService()