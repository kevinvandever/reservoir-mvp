import { estimateTokenCount, estimateCost } from '@/lib/openai/client'
import { BenchmarkService } from './benchmark-service'

// Enhanced ConversationContext Interface from Story 2.17 requirements
interface EnhancedConversationContext {
  // Basic Business Info
  agentName?: string
  brokerage?: string
  marketArea?: string
  yearsExperience?: number
  
  // Performance Metrics
  lastYearGCI?: number
  lastYearTransactions?: number
  averageCommission?: number
  marketPercentile?: number
  
  // Business Model
  teamSize?: string
  buyerPercentage?: number
  sellerPercentage?: number
  businessType?: string
  
  // Lead Generation
  monthlyLeads?: number
  leadSources?: string[]
  costPerLead?: number
  responseTime?: string
  leadToAppointmentRate?: number
  appointmentToClientRate?: number
  
  // Current Systems
  crmSystem?: string
  databaseSize?: number
  marketingTools?: string[]
  currentWorkflows?: string[]
  
  // Pain Points & Challenges
  biggestChallenge?: string
  timeWasters?: string[]
  inefficiencies?: string[]
  frustrations?: string[]
  
  // Goals & Aspirations
  revenueGoals?: number
  transactionGoals?: number
  timeManagementGoals?: string[]
  growthPlans?: string[]
  
  // Technical Profile
  techComfortLevel?: string
  automationExperience?: string
  implementationPreferences?: string[]
  
  // Extracted Intelligence
  opportunityScore?: number
  automationReadiness?: number
  topOpportunities?: string[]
  estimatedTimeSavings?: number
  estimatedRevenueImpact?: number
}

interface QuestionResponse {
  question: string
  quickResponses?: string[]
  isComplete: boolean
  context?: EnhancedConversationContext
  reasoning?: string
  extractedInformation?: Partial<EnhancedConversationContext>
  confidence?: number
  celebrationType?: 'success' | 'milestone' | 'insight' | 'benchmark'
  benchmarkData?: {
    metric: string
    userValue: number
    percentile: number
    encouragement: string
  }
}

// Tim Urban personality system prompt as specified in Story 2.17
const ENHANCED_SYSTEM_PROMPT = `You are a $50,000-per-engagement business consultant specializing in real estate automation. 
Your personality is warm and encouraging like Tim Urban - professional but not stuffy.

CRITICAL BEHAVIORS:
1. NEVER ask about information already provided in context
2. NEVER repeat topics already covered in previous conversation
3. Extract ALL business information from every response
4. Show active listening by referencing previous answers  
5. Celebrate successes and validate challenges with specific benchmarks
6. Use industry knowledge to provide encouraging context
7. Make every question feel valuable and purposeful
8. Keep responses consultant-grade but conversational
9. Vary celebration types: success (top performers), milestone (progress), insight (learning), benchmark (comparisons)

RESPONSE PATTERN:
1. Acknowledge what they just shared (with specific reference)
2. Provide encouraging context or benchmark comparison if relevant  
3. Ask the next most valuable question based on information gaps
4. Keep it conversational and consultant-like

Example: "Sarah, 47 transactions is fantastic! You're clearly in the top 10% of agents nationally. 
With that volume, I imagine managing all those client timelines gets intense. 
Tell me, what's eating up most of your time right now - the transaction coordination or something else?"

CELEBRATION TYPES:
- 🎯 "success" for exceptional performance (top 20%+)
- 📊 "benchmark" for sharing context about their position
- 💡 "insight" for revealing important business intelligence  
- 🚀 "milestone" for progress achievements

Current context: {context}
Previous conversation: {previousAnswers}

Generate your next response as JSON with this structure:
{
  "question": "Your question here",
  "quickResponses": ["Option 1", "Option 2", "Option 3", "Other"],
  "extractedInformation": {
    // Any business data extracted from the last response
  },
  "celebrationType": "success|benchmark|insight|milestone",
  "benchmarkData": {
    "metric": "transactions",
    "userValue": 47,
    "percentile": 90,
    "encouragement": "You're in the top 10% of agents nationally!"
  },
  "reasoning": "Why this question is the best next step"
}

CELEBRATION TYPE GUIDELINES:
- "success": Use for top 20% performers (40+ transactions, $400K+ GCI)
- "benchmark": Use when showing industry comparisons 
- "insight": Use for learning moments and challenges
- "milestone": Use for progress and next steps`

export class EnhancedIntelligentAI {
  private sessions = new Map<string, {
    context: EnhancedConversationContext
    previousAnswers: string[]
    questionCount: number
    totalTokensUsed: number
    totalCost: number
    lastActivity: number
    extractionHistory: Array<{
      response: string
      extracted: Partial<EnhancedConversationContext>
      confidence: number
      timestamp: number
    }>
  }>()
  
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  
  // Request deduplication to prevent race conditions
  private processingRequests = new Set<string>()
  private lastProcessedResponse = new Map<string, { response: string, timestamp: number }>()

  private getSession(sessionId: string) {
    this.cleanupExpiredSessions()
    
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        context: {},
        previousAnswers: [],
        questionCount: 0,
        totalTokensUsed: 0,
        totalCost: 0,
        lastActivity: Date.now(),
        extractionHistory: []
      })
    }
    
    const session = this.sessions.get(sessionId)!
    session.lastActivity = Date.now()
    return session
  }

  private cleanupExpiredSessions() {
    const now = Date.now()
    const sessionsToDelete: string[] = []
    
    this.sessions.forEach((session, sessionId) => {
      if (now - session.lastActivity > this.SESSION_TIMEOUT) {
        sessionsToDelete.push(sessionId)
      }
    })
    
    sessionsToDelete.forEach(sessionId => {
      this.sessions.delete(sessionId)
      this.lastProcessedResponse.delete(sessionId)
      console.log(`🧹 Cleaned up expired session: ${sessionId}`)
    })
    
    // Also cleanup old processed responses (older than 5 minutes)
    this.lastProcessedResponse.forEach((data, sessionId) => {
      if (now - data.timestamp > 5 * 60 * 1000) {
        this.lastProcessedResponse.delete(sessionId)
      }
    })
  }

  /**
   * Extract comprehensive business intelligence from user response using GPT-4
   */
  private async extractBusinessIntelligence(
    response: string, 
    context: EnhancedConversationContext
  ): Promise<{
    extracted: Partial<EnhancedConversationContext>
    confidence: number
  }> {
    try {
      console.log('🧠 Calling AI Business Intelligence API...')
      
      const apiResponse = await fetch('/api/ai/extract-business-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response,
          context
        }),
      })

      if (!apiResponse.ok) {
        throw new Error(`API call failed: ${apiResponse.status}`)
      }

      const result = await apiResponse.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API call failed')
      }
      
      console.log('✅ AI Business Intelligence extraction successful')
      
      return {
        extracted: result.extracted || {},
        confidence: result.confidence || 0.5
      }

    } catch (error) {
      console.error('❌ Error in AI business intelligence extraction:', error)
      console.log('🔄 Falling back to basic extraction...')
      
      // Fallback to basic extraction
      return this.fallbackExtraction(response, context)
    }
  }

  /**
   * Fallback extraction for when GPT-4 extraction fails
   */
  private fallbackExtraction(
    response: string, 
    context: EnhancedConversationContext
  ): { extracted: Partial<EnhancedConversationContext>, confidence: number } {
    console.log('🔧 Fallback extraction for response:', response)
    const extracted: Partial<EnhancedConversationContext> = {}
    const lowerResponse = response.toLowerCase()

    // Extract numbers for transactions and GCI
    // Handle both explicit mentions and range responses
    let transactionMatch = lowerResponse.match(/(\d+)\s*(transactions?|deals?|closes?)/i)
    if (!transactionMatch) {
      // Handle range responses like "25-50", "under 10", "50+"
      const rangeMatch = lowerResponse.match(/(\d+)-(\d+)/)
      if (rangeMatch) {
        const min = parseInt(rangeMatch[1])
        const max = parseInt(rangeMatch[2])
        extracted.lastYearTransactions = Math.round((min + max) / 2) // Use middle of range
      } else if (lowerResponse.includes('under') && lowerResponse.match(/under\s+(\d+)/)) {
        const underMatch = lowerResponse.match(/under\s+(\d+)/)
        if (underMatch) {
          extracted.lastYearTransactions = Math.round(parseInt(underMatch[1]) / 2) // Use half the upper limit
        }
      } else if (lowerResponse.match(/(\d+)\+/)) {
        const plusMatch = lowerResponse.match(/(\d+)\+/)
        if (plusMatch) {
          // Keep the original number for calculation, but getOriginalTransactionResponse will show "50+"
          extracted.lastYearTransactions = parseInt(plusMatch[1]) + 10 // Add 10 for percentile calculation
        }
      } else if (lowerResponse.match(/^\d+$/)) {
        // Just a number by itself (like "25-50" might come as just the selection)
        extracted.lastYearTransactions = parseInt(lowerResponse)
      }
    } else {
      extracted.lastYearTransactions = parseInt(transactionMatch[1])
    }

    const gciMatch = lowerResponse.match(/\$?(\d+)k?\s*(gci|gross|commission|income)/i)
    if (gciMatch) {
      const amount = parseInt(gciMatch[1])
      extracted.lastYearGCI = lowerResponse.includes('k') ? amount * 1000 : amount
    }

    // Extract name patterns - improved regex
    const nameMatch = response.match(/(?:I'm|I am|my name is|call me)\s+([A-Z][a-z]+)(?:\s+and)?/i)
    if (nameMatch) {
      extracted.agentName = nameMatch[1]
    }

    // Extract business type and tools
    if (lowerResponse.includes('real estate') || lowerResponse.includes('realtor')) {
      extracted.businessType = 'real estate'
    }

    // Extract challenges
    if (lowerResponse.includes('follow') || lowerResponse.includes('lead')) {
      extracted.biggestChallenge = 'lead follow-up'
    }
    
    if (lowerResponse.includes('time management') || lowerResponse.includes('time')) {
      extracted.biggestChallenge = 'time management'
    }

    console.log('📊 Fallback extraction results:', extracted)
    
    return {
      extracted,
      confidence: 0.6
    }
  }

  /**
   * Generate intelligent response using enhanced prompting
   */
  private async generateIntelligentResponse(
    userResponse: string, 
    context: EnhancedConversationContext,
    previousAnswers: string[]
  ): Promise<QuestionResponse> {
    try {
      console.log('🤖 Calling AI Question Generation API...')
      
      const apiResponse = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userResponse,
          context,
          previousAnswers
        }),
      })

      if (!apiResponse.ok) {
        throw new Error(`API call failed: ${apiResponse.status}`)
      }

      const result = await apiResponse.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API call failed')
      }
      
      console.log('✅ AI Question generation successful')

      return {
        question: result.question,
        quickResponses: result.quickResponses || [],
        isComplete: result.isComplete || false,
        context,
        reasoning: result.reasoning,
        extractedInformation: result.extractedInformation,
        celebrationType: result.celebrationType
        // Removed benchmarkData to eliminate confusing card display
      }
    } catch (error) {
      console.error('❌ Error in AI question generation:', error)
      throw error // Let the calling function handle fallback
    }
  }

  /**
   * Calculate market percentile based on performance metrics using BenchmarkService
   */
  private calculateMarketPercentile(context: EnhancedConversationContext): number {
    if (context.lastYearTransactions) {
      const benchmark = BenchmarkService.getPerformanceInsight('transactions', context.lastYearTransactions)
      if (benchmark) {
        return benchmark.percentile
      }
    }

    if (context.lastYearGCI) {
      const benchmark = BenchmarkService.getPerformanceInsight('gci', context.lastYearGCI)
      if (benchmark) {
        return benchmark.percentile
      }
    }

    return 50 // Default if no data
  }

  /**
   * Convert percentile to readable text
   */
  private getPercentileText(percentile: number): string {
    if (percentile >= 95) return "top 5%"
    if (percentile >= 90) return "top 10%"
    if (percentile >= 80) return "top 20%"
    if (percentile >= 60) return "top 40%"
    return "middle tier"
  }

  /**
   * Get the original transaction response from user (e.g., "25-50" instead of calculated "38")
   */
  private getOriginalTransactionResponse(previousAnswers: string[]): string | null {
    for (const answer of previousAnswers) {
      const lowerAnswer = answer.toLowerCase()
      // Look for range patterns in previous answers
      if (lowerAnswer.match(/\d+-\d+/) || lowerAnswer.includes('under') || lowerAnswer.includes('+')) {
        // If it's a transaction-related response, use it
        if (lowerAnswer.includes('25-50')) return '25-50 transactions'
        if (lowerAnswer.includes('10-25')) return '10-25 transactions'  
        if (lowerAnswer.includes('under 10')) return 'under 10 transactions'
        if (lowerAnswer.includes('50+')) return '50+ transactions'
        // Generic range handling
        const rangeMatch = lowerAnswer.match(/(\d+-\d+)/)
        if (rangeMatch) return `${rangeMatch[1]} transactions`
      }
    }
    return null
  }

  /**
   * Check if enough information has been gathered
   */
  private hasEnoughInformation(context: EnhancedConversationContext, questionCount: number): boolean {
    const requiredFields = [
      'agentName', 'businessType', 'lastYearTransactions', 'lastYearGCI', 
      'biggestChallenge', 'monthlyLeads', 'crmSystem'
    ]
    
    const completedFields = requiredFields.filter(field => 
      context[field as keyof EnhancedConversationContext] !== undefined
    ).length

    return completedFields >= 5 && questionCount >= 8
  }

  /**
   * Check if a question topic has already been asked
   */
  private hasTopicBeenCovered(topic: string, previousAnswers: string[]): boolean {
    const topicKeywords = {
      'leads': ['leads', 'lead generation', 'pipeline'],
      'transactions': ['transactions', 'closes', 'deals'],
      'gci': ['gci', 'commission', 'income'],
      'challenge': ['challenge', 'problem', 'difficult'],
      'crm': ['crm', 'system', 'software'],
      'name': ['name', 'call me', "i'm"]
    }

    const keywords = topicKeywords[topic as keyof typeof topicKeywords] || [topic]
    
    return previousAnswers.some(answer => 
      keywords.some(keyword => 
        answer.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }

  reset(sessionId?: string) {
    if (sessionId) {
      this.sessions.delete(sessionId)
    } else {
      this.sessions.clear()
    }
  }

  /**
   * Main method to generate next question with enhanced intelligence
   */
  async generateNextQuestion(userResponse?: string, sessionId: string = 'default'): Promise<QuestionResponse> {
    // Request deduplication to prevent race conditions
    const requestKey = `${sessionId}_${userResponse || 'initial'}`
    
    try {
      
      // Check if we're already processing this exact request
      if (this.processingRequests.has(requestKey)) {
        console.warn('🚨 Duplicate request blocked:', requestKey)
        throw new Error('Duplicate request - please wait for current response')
      }
      
      // Check for recent duplicate responses (within 2 seconds)
      const lastProcessed = this.lastProcessedResponse.get(sessionId)
      if (userResponse && lastProcessed && 
          lastProcessed.response === userResponse && 
          (Date.now() - lastProcessed.timestamp) < 2000) {
        console.warn('🚨 Duplicate response detected within 2 seconds - ignoring')
        throw new Error('Duplicate response detected')
      }
      
      // Mark request as processing
      this.processingRequests.add(requestKey)
      
      const session = this.getSession(sessionId)
      
      console.log('🚀 ENHANCED AI SESSION DEBUG:')
      console.log('  Session ID:', sessionId)
      console.log('  Question Count:', session.questionCount)
      console.log('  Previous Answers:', session.previousAnswers.length)
      console.log('  Previous Answers:', session.previousAnswers)
      console.log('  User Response:', userResponse)
      console.log('  Current Context:', JSON.stringify(session.context, null, 2))

      // Process user response if provided
      if (userResponse) {
        // Track this response to prevent duplicates
        this.lastProcessedResponse.set(sessionId, {
          response: userResponse,
          timestamp: Date.now()
        })
        
        session.previousAnswers.push(userResponse)
        
        // Extract business intelligence from response
        console.log('🔍 Extracting business intelligence...')
        const { extracted, confidence } = await this.extractBusinessIntelligence(
          userResponse, 
          session.context
        )

        // Merge extracted information into context
        session.context = { ...session.context, ...extracted }
        
        // Calculate market percentile if we have performance data
        if (session.context.lastYearTransactions || session.context.lastYearGCI) {
          session.context.marketPercentile = this.calculateMarketPercentile(session.context)
        }

        // Store extraction history
        session.extractionHistory.push({
          response: userResponse,
          extracted,
          confidence,
          timestamp: Date.now()
        })

        console.log('✅ CONTEXT UPDATED:', JSON.stringify(session.context, null, 2))
      }

      session.questionCount++

      // Check completion criteria
      if (session.questionCount >= 12 || this.hasEnoughInformation(session.context, session.questionCount)) {
        return {
          question: "Perfect! I now have a comprehensive understanding of your business. You're clearly a high-performer, and I can already see several exciting opportunities for automation that could save you significant time and boost your revenue. I'm generating your personalized analysis report now - you'll see your results in just a moment!",
          isComplete: true,
          context: session.context,
          celebrationType: 'milestone'
        }
      }

      // For demo purposes, let's use a smart fallback that demonstrates the extraction
      // This will work reliably while still showing the enhanced features
      console.log('📋 Current context after extraction:', session.context)
      
      // Only ask the transaction celebration question once - more robust check
      const hasAskedTransactionCelebration = session.extractionHistory.some(extraction => 
        extraction.response.toLowerCase().includes('transactions') ||
        extraction.response.toLowerCase().includes('25-50') ||
        extraction.response.toLowerCase().includes('10-25') ||
        extraction.response.toLowerCase().includes('under 10') ||
        extraction.response.toLowerCase().includes('50+')
      )
      
      console.log('🎯 Transaction celebration check:', {
        agentName: session.context.agentName,
        lastYearTransactions: session.context.lastYearTransactions,
        questionCount: session.questionCount,
        hasAskedTransactionCelebration,
        extractionHistoryLength: session.extractionHistory.length,
        willTakeMainPath: session.context.agentName && session.context.lastYearTransactions && session.questionCount === 3 && !hasAskedTransactionCelebration
      })
      
      if (session.context.agentName && session.context.lastYearTransactions && session.questionCount === 3 && !hasAskedTransactionCelebration) {
        console.log('🎯 TAKING MAIN TRANSACTION CELEBRATION PATH');
        // Get accurate benchmark data - but use range display for better UX
        const benchmark = BenchmarkService.getPerformanceInsight('transactions', session.context.lastYearTransactions)
        const percentileText = benchmark ? this.getPercentileText(benchmark.percentile) : "performing well"
        
        // Display the original range response instead of calculated middle value
        const transactionDisplay = this.getOriginalTransactionResponse(session.previousAnswers) || `${session.context.lastYearTransactions} transactions`
        
        return {
          question: `${session.context.agentName}, that's fantastic! ${transactionDisplay} puts you in the ${percentileText} of agents nationally, and that shows you're clearly a high performer. With that kind of volume, I imagine managing all those client timelines gets pretty intense. What's your biggest challenge right now?`,
          quickResponses: ["Lead follow-up", "Time management", "Client communication", "Transaction coordination", "I'll type it out"],
          isComplete: false,
          context: session.context,
          celebrationType: 'success'
          // Removed benchmarkData to eliminate confusing card display
        }
      }

      // Handle challenge follow-up question (question 4)
      if (session.context.agentName && session.context.biggestChallenge && session.questionCount === 4) {
        const challengeFollowUps = {
          'lead follow-up': "Lead follow-up is crucial for conversion. How are you currently managing your lead nurturing, and what's your typical response time when a new lead comes in?",
          'time management': "Time management is key for scaling. What tasks are eating up most of your day, and which ones feel like they could be automated or streamlined?",
          'client communication': "Client communication can definitely be streamlined. What's your current process for keeping clients updated throughout transactions, and where do things typically get chaotic?",
          'transaction coordination': "Transaction coordination gets complex fast. How are you currently tracking deadlines and milestones, and where do things typically fall through the cracks?"
        }
        
        const followUpQuestion = challengeFollowUps[session.context.biggestChallenge as keyof typeof challengeFollowUps] || 
          `Tell me more about ${session.context.biggestChallenge} - what specific aspects are causing the most friction in your business?`
        
        return {
          question: followUpQuestion,
          quickResponses: ["I'll type it out", "Skip for now"],
          isComplete: false,
          context: session.context
        }
      }

      // Generate next intelligent question
      try {
        const response = await this.generateIntelligentResponse(
          userResponse || '', 
          session.context,
          session.previousAnswers
        )

        // Track usage
        const inputTokens = estimateTokenCount(session.previousAnswers.join(' '))
        const outputTokens = estimateTokenCount(response.question)
        session.totalTokensUsed += inputTokens + outputTokens
        session.totalCost += estimateCost(inputTokens, outputTokens)

        console.log('✅ ENHANCED AI RESPONSE:', response.question)
        
        return response
      } catch (aiError) {
        console.error('❌ GPT-4 AI Error:', aiError)
        console.log('🔄 Falling back to smart context-aware questions...')
        
        // Smart fallback that uses extracted context
        return this.getSmartFallbackQuestion(sessionId, session.context)
      }

    } catch (error) {
      console.error('❌ Error in enhanced AI generation:', error)
      
      // Fallback to basic question
      return this.getFallbackQuestion(sessionId)
    } finally {
      // Always clean up processing request
      this.processingRequests.delete(requestKey)
    }
  }

  /**
   * Smart fallback that uses extracted context - better than basic fallback
   */
  private getSmartFallbackQuestion(sessionId: string, context: EnhancedConversationContext): QuestionResponse {
    const session = this.getSession(sessionId)
    
    console.log('🧠 Smart fallback with context:', context)
    
    // If we have name and transactions, acknowledge them and move to challenges
    // But only if we haven't already done the transaction celebration
    const hasAskedTransactionCelebration = session.extractionHistory.some(extraction => 
      extraction.response.toLowerCase().includes('transactions') ||
      extraction.response.toLowerCase().includes('25-50') ||
      extraction.response.toLowerCase().includes('10-25') ||
      extraction.response.toLowerCase().includes('under 10') ||
      extraction.response.toLowerCase().includes('50+')
    )
    
    if (context.agentName && context.lastYearTransactions && !hasAskedTransactionCelebration && session.questionCount === 2) {
      console.log('🎯 TAKING SMART FALLBACK TRANSACTION PATH');
      // Use the same range display logic as the main path
      const transactionDisplay = this.getOriginalTransactionResponse(session.previousAnswers) || `${context.lastYearTransactions} transactions`
      const benchmark = BenchmarkService.getPerformanceInsight('transactions', context.lastYearTransactions)
      const percentileText = benchmark ? this.getPercentileText(benchmark.percentile) : "performing well"
      
      return {
        question: `${context.agentName}, that's fantastic! ${transactionDisplay} puts you in the ${percentileText} of agents nationally. What's the biggest challenge you're facing in scaling your business even further?`,
        quickResponses: ["Lead follow-up", "Time management", "Client communication", "Transaction coordination", "I'll type it out"],
        isComplete: false,
        context,
        celebrationType: 'success'
        // Removed benchmarkData to eliminate confusing card display
      }
    }

    // If we have name only, ask about performance
    if (context.agentName) {
      return {
        question: `Great to meet you, ${context.agentName}! Tell me about your business performance - how many transactions did you close last year?`,
        quickResponses: ["Under 10", "10-25", "25-50", "50+"],
        isComplete: false,
        context,
        celebrationType: 'milestone'
      }
    }

    // Default smart fallback
    return this.getFallbackQuestion(sessionId)
  }

  /**
   * Fallback question generation with UX enhancements
   */
  private getFallbackQuestion(sessionId: string): QuestionResponse {
    const session = this.getSession(sessionId)
    
    const fallbackQuestions = [
      {
        question: "Let's start with the basics - what's your name and which brokerage are you with?",
        quickResponses: ["I'll type it out", "Skip for now"],
        celebrationType: 'milestone' as const
      },
      {
        question: "How many transactions did you close last year? I know this might vary, but I'd love to understand your volume.",
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
        quickResponses: ["Lead generation", "Follow-up", "Transaction management", "Time management"],
        celebrationType: 'insight' as const
      },
      {
        question: "How many leads do you typically get per month? This is key for understanding your pipeline.",
        quickResponses: ["Under 10", "10-30", "30-60", "60+"],
        celebrationType: 'insight' as const
      },
      {
        question: "Perfect! What CRM system are you currently using? Understanding your tech stack helps me recommend the best integrations.",
        quickResponses: ["CINC", "Chime", "Follow Up Boss", "KvCORE", "Other"],
        celebrationType: 'insight' as const
      },
      {
        question: "Excellent! How quickly do you typically respond to new leads? This is a huge factor in conversion rates.",
        quickResponses: ["Within 5 minutes", "Within 1 hour", "Within 4 hours", "24+ hours"],
        celebrationType: 'benchmark' as const
      }
    ]

    const questionIndex = Math.min(session.questionCount - 1, fallbackQuestions.length - 1)
    
    // Dynamic celebration type based on previous responses
    let celebrationType = fallbackQuestions[questionIndex]?.celebrationType || 'insight'
    
    // Check for high performance to trigger success celebration
    if (session.context.lastYearTransactions && session.context.lastYearTransactions >= 40) {
      celebrationType = 'milestone' // Will trigger success in frontend when benchmark shows
    } else if (session.context.lastYearGCI && session.context.lastYearGCI >= 400000) {
      celebrationType = 'milestone' // Will trigger success in frontend when benchmark shows
    }
    
    return {
      question: fallbackQuestions[questionIndex]?.question || "Tell me more about your business goals for this year.",
      quickResponses: fallbackQuestions[questionIndex]?.quickResponses || ["I'll type it out"],
      isComplete: session.questionCount >= fallbackQuestions.length,
      context: session.context,
      celebrationType
    }
  }

  /**
   * Get session usage statistics
   */
  getUsageStats(sessionId: string = 'default') {
    const session = this.getSession(sessionId)
    return {
      questionsAsked: session.questionCount,
      totalTokensUsed: session.totalTokensUsed,
      estimatedCost: session.totalCost,
      context: session.context,
      extractionHistory: session.extractionHistory,
      informationCompleteness: this.calculateInformationCompleteness(session.context)
    }
  }

  /**
   * Calculate how complete the business profile is
   */
  private calculateInformationCompleteness(context: EnhancedConversationContext): number {
    const allFields = [
      'agentName', 'brokerage', 'lastYearGCI', 'lastYearTransactions', 
      'biggestChallenge', 'monthlyLeads', 'crmSystem', 'teamSize',
      'revenueGoals', 'techComfortLevel'
    ]
    
    const completedFields = allFields.filter(field => 
      context[field as keyof EnhancedConversationContext] !== undefined
    ).length

    return Math.round((completedFields / allFields.length) * 100)
  }

  /**
   * Export conversation context for report generation (Story 2.18 integration)
   */
  getConversationContext(sessionId: string): EnhancedConversationContext {
    const session = this.sessions.get(sessionId)
    return session?.context || {}
  }
}

// Singleton instance
export const enhancedIntelligentAI = new EnhancedIntelligentAI()