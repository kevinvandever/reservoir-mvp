// Question Bank Service for AI Integration and Question Management
import { QuestionSelectionService } from './question-selection-service'
import { COMPREHENSIVE_QUESTION_BANK } from './comprehensive-question-bank'
import { 
  QuestionBank, 
  Question, 
  ConversationContext, 
  ProgressMetrics, 
  QuestionSelectionResult,
  BusinessIntelligenceContext,
  SectionType
} from './question-bank-types'

export interface AIResponse {
  question: string
  quickResponses?: string[]
  isComplete: boolean
  sectionProgress?: ProgressMetrics
  questionMetadata?: {
    section: SectionType
    weight: number
    purpose: string
    questionId: string
  }
  sectionTransition?: {
    fromSection: SectionType
    toSection: SectionType
    transitionMessage: string
  }
}

export class QuestionBankService {
  private selectionService: QuestionSelectionService
  private conversationContext: ConversationContext = {}
  private sessionId?: string
  private lastAskedQuestionId?: string

  constructor(sessionId?: string) {
    this.sessionId = sessionId
    this.selectionService = new QuestionSelectionService(
      COMPREHENSIVE_QUESTION_BANK,
      this.conversationContext
    )
  }

  /**
   * Get the next question in the comprehensive questionnaire
   */
  async getNextQuestion(userResponse?: string): Promise<AIResponse> {
    // 1. Process user response if provided
    if (userResponse && userResponse.trim()) {
      await this.processUserResponse(userResponse)
    }

    // 2. Get next question from selection service
    const selectionResult = this.selectionService.getNextQuestion()

    // 3. Handle completion
    if (selectionResult.isComplete || !selectionResult.question) {
      return this.generateCompletionResponse(selectionResult.progress)
    }

    // 4. Store the question ID for tracking
    this.lastAskedQuestionId = selectionResult.question.id

    // 5. Contextualize question for conversational delivery
    const contextualizedQuestion = this.contextualizeQuestion(
      selectionResult.question,
      selectionResult.sectionTransition
    )

    // 6. Prepare quick responses
    const quickResponses = selectionResult.question.quickResponses || 
                          this.generateContextualQuickResponses(selectionResult.question)

    return {
      question: contextualizedQuestion,
      quickResponses,
      isComplete: false,
      sectionProgress: selectionResult.progress,
      questionMetadata: {
        section: selectionResult.question.section,
        weight: selectionResult.question.weight,
        purpose: selectionResult.question.purpose,
        questionId: selectionResult.question.id
      },
      sectionTransition: selectionResult.sectionTransition
    }
  }

  /**
   * Get current progress metrics
   */
  getProgress(): ProgressMetrics {
    return this.selectionService.calculateProgress()
  }

  /**
   * Get business intelligence context for reporting
   */
  getBusinessIntelligence(): BusinessIntelligenceContext {
    return this.selectionService.getBusinessIntelligenceContext()
  }

  /**
   * Get conversation context for report generation
   */
  getConversationContext(): ConversationContext {
    return { ...this.conversationContext }
  }

  /**
   * Reset the questionnaire (for starting over)
   */
  reset(): void {
    this.conversationContext = {}
    this.lastAskedQuestionId = undefined
    this.selectionService = new QuestionSelectionService(
      COMPREHENSIVE_QUESTION_BANK,
      this.conversationContext
    )
  }

  /**
   * Load existing progress (for resuming sessions)
   */
  loadProgress(context: ConversationContext, answeredQuestionIds: string[]): void {
    this.conversationContext = { ...context }
    this.selectionService = new QuestionSelectionService(
      COMPREHENSIVE_QUESTION_BANK,
      this.conversationContext
    )

    // Mark questions as answered
    answeredQuestionIds.forEach(questionId => {
      this.selectionService.markQuestionAnswered(questionId)
    })
  }

  // Private helper methods

  private async processUserResponse(userResponse: string): Promise<void> {
    // Extract business intelligence from response
    const extractedContext = this.extractBusinessIntelligence(userResponse)
    
    // Get the current question that was just answered
    const currentQuestionId = this.getCurrentQuestionId()
    if (currentQuestionId) {
      this.selectionService.markQuestionAnswered(currentQuestionId, extractedContext)
    }

    // Update conversation context
    Object.assign(this.conversationContext, extractedContext)

    // Store progress if session ID is available
    if (this.sessionId) {
      await this.saveProgress()
    }
  }

  private extractBusinessIntelligence(response: string): Partial<ConversationContext> {
    const context: Partial<ConversationContext> = {}
    const lowerResponse = response.toLowerCase()

    // Extract years of experience
    const yearsMatch = response.match(/(\d+)\s*years?/i)
    if (yearsMatch) {
      context.yearsExperience = parseInt(yearsMatch[1])
    }

    // Extract GCI information
    const gciMatches = [
      /\$?(\d+)k/i,
      /\$(\d{1,3}),?(\d{3})/,
      /(\d+)\s*thousand/i
    ]
    
    for (const regex of gciMatches) {
      const match = response.match(regex)
      if (match) {
        let amount = parseInt(match[1])
        if (regex.source.includes('k') || regex.source.includes('thousand')) {
          amount *= 1000
        }
        if (match[2]) {
          amount = parseInt(match[1] + match[2])
        }
        context.lastYearGCI = amount
        break
      }
    }

    // Extract transaction volume
    const transactionMatch = response.match(/(\d+)\s*(?:transactions?|deals?|closings?)/i)
    if (transactionMatch) {
      context.transactionVolume = parseInt(transactionMatch[1])
    }

    // Extract business structure
    if (lowerResponse.includes('solo') || lowerResponse.includes('myself') || lowerResponse.includes('alone')) {
      context.businessStructure = 'solo'
    } else if (lowerResponse.includes('team')) {
      context.businessStructure = 'team'
    } else if (lowerResponse.includes('enterprise') || lowerResponse.includes('large organization')) {
      context.businessStructure = 'enterprise'
    }

    // Extract lead volume
    const leadVolumeMatch = response.match(/(\d+)\s*(?:leads?|prospects?)/i)
    if (leadVolumeMatch) {
      context.monthlyLeadVolume = parseInt(leadVolumeMatch[1])
    }

    // Extract response time
    if (lowerResponse.includes('immediate') || lowerResponse.includes('instantly')) {
      context.leadResponseTime = 'immediate'
    } else if (lowerResponse.includes('minute')) {
      context.leadResponseTime = 'within_minutes'
    } else if (lowerResponse.includes('hour')) {
      context.leadResponseTime = 'within_hours'
    } else if (lowerResponse.includes('day')) {
      context.leadResponseTime = 'within_days'
    }

    // Extract challenges and pain points
    const challengeKeywords = ['challenge', 'problem', 'difficult', 'struggle', 'issue', 'pain point']
    if (challengeKeywords.some(keyword => lowerResponse.includes(keyword))) {
      context.biggestChallenges = context.biggestChallenges || []
      
      if (lowerResponse.includes('lead') || lowerResponse.includes('prospect')) {
        context.biggestChallenges.push('lead_generation')
      }
      if (lowerResponse.includes('follow') || lowerResponse.includes('nurtur')) {
        context.biggestChallenges.push('follow_up')
      }
      if (lowerResponse.includes('time') || lowerResponse.includes('manage')) {
        context.biggestChallenges.push('time_management')
      }
      if (lowerResponse.includes('convert') || lowerResponse.includes('closing')) {
        context.biggestChallenges.push('conversion')
      }
    }

    // Extract tools and systems
    const crmKeywords = ['crm', 'database', 'contact management']
    if (crmKeywords.some(keyword => lowerResponse.includes(keyword))) {
      // Extract CRM name if mentioned
      const crmNames = ['salesforce', 'hubspot', 'pipedrive', 'follow up boss', 'chime', 'wise agent']
      const mentionedCRM = crmNames.find(crm => lowerResponse.includes(crm.toLowerCase()))
      if (mentionedCRM) {
        context.currentCRM = mentionedCRM
      }
    }

    return context
  }

  private contextualizeQuestion(
    question: Question, 
    sectionTransition?: { fromSection: SectionType; toSection: SectionType; transitionMessage: string }
  ): string {
    let contextualizedQuestion = question.text

    // Add section transition message if applicable
    if (sectionTransition) {
      contextualizedQuestion = `${sectionTransition.transitionMessage}\n\n${question.text}`
    }

    // Apply business structure variations
    if (question.variations && this.conversationContext.businessStructure) {
      const structure = this.conversationContext.businessStructure
      if (structure === 'solo' && question.variations.soloAgent) {
        contextualizedQuestion = question.variations.soloAgent
      } else if (structure === 'team' && question.variations.teamLead) {
        contextualizedQuestion = question.variations.teamLead
      } else if (structure === 'enterprise' && question.variations.enterprise) {
        contextualizedQuestion = question.variations.enterprise
      }
    }

    // Add contextual references to previous answers
    if (this.conversationContext.agentName && !contextualizedQuestion.includes(this.conversationContext.agentName)) {
      // Some questions can be personalized with the agent's name
      if (question.tags.includes('personal') || question.tags.includes('goals')) {
        contextualizedQuestion = contextualizedQuestion.replace(/\byou\b/, `you, ${this.conversationContext.agentName},`)
      }
    }

    return contextualizedQuestion
  }

  private generateContextualQuickResponses(question: Question): string[] {
    // Generate smart quick responses based on question tags and context
    const responses: string[] = []

    if (question.tags.includes('revenue') || question.tags.includes('performance')) {
      return ["Under $100K", "$100K-$250K", "$250K-$500K", "$500K+"]
    }

    if (question.tags.includes('experience') || question.tags.includes('tenure')) {
      return ["Less than 2 years", "2-5 years", "5-10 years", "10+ years"]
    }

    if (question.tags.includes('volume') || question.tags.includes('productivity')) {
      return ["Under 12", "12-24", "25-50", "50+"]
    }

    if (question.tags.includes('frequency')) {
      return ["Daily", "Weekly", "Monthly", "Rarely"]
    }

    if (question.tags.includes('time_management') || question.tags.includes('response_time')) {
      return ["Within 5 minutes", "Within 1 hour", "Within 4 hours", "Next business day"]
    }

    if (question.tags.includes('budget') || question.tags.includes('cost')) {
      return ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"]
    }

    if (question.tags.includes('technology') || question.tags.includes('tools')) {
      return ["Very basic", "Some tools", "Well-equipped", "Highly automated"]
    }

    // Default responses
    return ["Yes", "No", "Somewhat", "I'll explain"]
  }

  private generateCompletionResponse(progress: ProgressMetrics): AIResponse {
    const completionMessages = [
      "Excellent! You've completed the comprehensive business assessment.",
      `Based on your ${progress.questionsAnswered} detailed responses, I now have a complete picture of your business.`,
      "I'm analyzing your information to create a personalized automation strategy report.",
      "This report will identify specific opportunities to save time and increase revenue through strategic automation."
    ]

    return {
      question: completionMessages.join(" "),
      quickResponses: ["Generate My Report", "Review My Answers"],
      isComplete: true,
      sectionProgress: progress,
      questionMetadata: {
        section: SectionType.GOALS_PRIORITIES,
        weight: 0,
        purpose: "Questionnaire completion",
        questionId: "completion"
      }
    }
  }

  private getCurrentQuestionId(): string | undefined {
    return this.lastAskedQuestionId
  }

  private async saveProgress(): Promise<void> {
    // Save progress to localStorage for now
    // In production, this would save to the database
    if (typeof window !== 'undefined' && this.sessionId) {
      const progressData = {
        sessionId: this.sessionId,
        conversationContext: this.conversationContext,
        timestamp: new Date().toISOString()
      }
      
      localStorage.setItem(`questionnaire_progress_${this.sessionId}`, JSON.stringify(progressData))
    }
  }
}