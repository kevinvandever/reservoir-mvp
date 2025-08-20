import { createChatCompletion, estimateTokenCount, estimateCost } from '@/lib/openai/client'

interface ConversationContext {
  businessType?: string
  teamSize?: string
  industry?: string
  challenges?: string[]
  tools?: string[]
  goals?: string[]
  timeSpent?: string
  budget?: string
  urgency?: string
  techComfort?: string
}

interface QuestionResponse {
  question: string
  quickResponses?: string[]
  isComplete: boolean
  context?: ConversationContext
  reasoning?: string
}

const SYSTEM_PROMPT = `You are an expert business automation consultant conducting a discovery interview. Your goal is to understand the user's business needs and identify automation opportunities.

Guidelines:
1. Ask ONE question at a time in a conversational, friendly tone
2. Be concise - questions should be 1-2 sentences max
3. Adapt questions based on previous answers
4. Focus on: business type, team size, challenges, current tools, goals, budget, timeline
5. Provide 3-4 quick response options when helpful, always ending with "Other"
6. After 8-10 questions, summarize and conclude

Response format MUST be valid JSON:
{
  "question": "Your question here",
  "quickResponses": ["Option 1", "Option 2", "Option 3", "Other"] // always include "Other" as last option
}

Current conversation context: {context}
Previous answers: {previousAnswers}

Be intelligent and adaptive. Don't ask questions you already know the answer to.`

export class IntelligentAI {
  private sessions = new Map<string, {
    context: ConversationContext
    previousAnswers: string[]
    questionCount: number
    totalTokensUsed: number
    totalCost: number
    lastActivity: number
  }>()
  
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

  private getSession(sessionId: string) {
    // Clean up expired sessions
    this.cleanupExpiredSessions()
    
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        context: {},
        previousAnswers: [],
        questionCount: 0,
        totalTokensUsed: 0,
        totalCost: 0,
        lastActivity: Date.now()
      })
    }
    
    const session = this.sessions.get(sessionId)!
    // Update last activity timestamp
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
      console.log(`Cleaned up expired session: ${sessionId}`)
    })
  }

  reset(sessionId?: string) {
    if (sessionId) {
      this.sessions.delete(sessionId)
    } else {
      this.sessions.clear()
    }
  }

  async generateNextQuestion(userResponse?: string, sessionId: string = 'default'): Promise<QuestionResponse> {
    try {
      const session = this.getSession(sessionId)
      
      // Debug logging
      console.log('🤖 AI SESSION DEBUG:')
      console.log('  Session ID:', sessionId)
      console.log('  Question Count:', session.questionCount)
      console.log('  Previous Answers:', session.previousAnswers.length)
      console.log('  User Response:', userResponse)
      console.log('  Session Context:', JSON.stringify(session.context, null, 2))

      // Add user response to history
      if (userResponse) {
        session.previousAnswers.push(userResponse)
        this.updateContext(userResponse, session)
      }

      session.questionCount++

      // Check if we should conclude the questionnaire
      if (session.questionCount >= 10 || this.hasEnoughInformation(session)) {
        return {
          question: "Perfect! Based on our conversation, I have a great understanding of your business needs. I'm now analyzing your responses to create personalized automation recommendations. You'll see your custom results in just a moment!",
          isComplete: true,
          context: session.context
        }
      }

      // Generate intelligent next question
      const messages = [
        {
          role: 'system' as const,
          content: SYSTEM_PROMPT
            .replace('{context}', JSON.stringify(session.context, null, 2))
            .replace('{previousAnswers}', session.previousAnswers.join('\n'))
        },
        {
          role: 'user' as const,
          content: this.getQuestionPrompt(session)
        }
      ]

      const response = await createChatCompletion(messages, {
        maxTokens: 200,
        temperature: 0.7
      })

      if (!response.choices[0]?.message?.content) {
        throw new Error('No response from OpenAI')
      }

      // Track usage
      const inputTokens = estimateTokenCount(messages.map(m => m.content).join(' '))
      const outputTokens = estimateTokenCount(response.choices[0].message.content)
      session.totalTokensUsed += inputTokens + outputTokens
      session.totalCost += estimateCost(inputTokens, outputTokens)

      // Parse the JSON response
      const aiResponse = JSON.parse(response.choices[0].message.content)

      console.log('✅ AI RESPONSE:', aiResponse.question)
      console.log('🔄 Session state after response:', {
        questionCount: session.questionCount,
        answersCount: session.previousAnswers.length,
        isComplete: false
      })

      return {
        question: aiResponse.question,
        quickResponses: aiResponse.quickResponses,
        isComplete: false,
        context: session.context,
        reasoning: `AI generated question based on ${session.questionCount} previous responses`
      }

    } catch (error) {
      console.error('Error generating question:', error)
      
      // Fallback to static questions
      const session = this.getSession(sessionId)
      return this.getFallbackQuestion(session)
    }
  }

  private updateContext(userResponse: string, session: { context: ConversationContext, previousAnswers: string[], questionCount: number, totalTokensUsed: number, totalCost: number, lastActivity: number }) {
    const response = userResponse.toLowerCase()
    
    console.log('🔧 UPDATING CONTEXT with response:', response)
    
    // Extract business insights from response - more flexible patterns
    if (response.includes('e-commerce') || response.includes('online store') || response.includes('ecommerce')) {
      session.context.businessType = 'e-commerce'
    } else if (response.includes('saas') || response.includes('software') || response.includes('tech') || response.includes('app')) {
      session.context.businessType = 'saas'
    } else if (response.includes('consulting') || response.includes('consultant')) {
      session.context.businessType = 'consulting'
    } else if (response.includes('real estate') || response.includes('realestate') || response.includes('property') || response.includes('realtor')) {
      session.context.businessType = 'real estate'
    } else if (response.includes('service') || response.includes('local')) {
      session.context.businessType = 'service'
    } else {
      // Store the industry response even if it doesn't match our categories
      session.context.industry = response
    }

    // Extract team size - more flexible patterns
    if (response.includes('just me') || response.includes('solo') || response.includes('myself') || response.includes('1')) {
      session.context.teamSize = 'solo'
    } else if (response.includes('2-5') || response.includes('1-5') || response.includes('small') || response.includes('few')) {
      session.context.teamSize = 'small'
    } else if (response.includes('6-20') || response.includes('medium') || response.includes('dozen')) {
      session.context.teamSize = 'medium'
    } else if (response.includes('20+') || response.includes('large') || response.includes('many')) {
      session.context.teamSize = 'large'
    }

    // Extract challenges
    if (response.includes('customer support') || response.includes('support')) {
      session.context.challenges = [...(session.context.challenges || []), 'customer_support']
    }
    if (response.includes('marketing') || response.includes('leads')) {
      session.context.challenges = [...(session.context.challenges || []), 'marketing']
    }
    if (response.includes('data entry') || response.includes('manual')) {
      session.context.challenges = [...(session.context.challenges || []), 'data_entry']
    }
    
    console.log('✅ CONTEXT UPDATED:', JSON.stringify(session.context, null, 2))
  }

  private hasEnoughInformation(session: { context: ConversationContext, previousAnswers: string[], questionCount: number, totalTokensUsed: number, totalCost: number, lastActivity: number }): boolean {
    return !!(
      (session.context.businessType || session.context.industry) &&
      session.context.teamSize &&
      session.questionCount >= 5
    )
  }

  private getQuestionPrompt(session: { context: ConversationContext, previousAnswers: string[], questionCount: number, totalTokensUsed: number, totalCost: number, lastActivity: number }): string {
    if (session.questionCount === 1) {
      return "Generate the first question to understand their business type."
    } else if (!session.context.teamSize) {
      return "Ask about team size since we don't know this yet."
    } else if (!session.context.challenges?.length) {
      return "Ask about their biggest challenges or pain points."
    } else {
      return `Generate the next logical question. We know: ${JSON.stringify(session.context)}`
    }
  }

  private getFallbackQuestion(session: { context: ConversationContext, previousAnswers: string[], questionCount: number, totalTokensUsed: number, totalCost: number, lastActivity: number }): QuestionResponse {
    const fallbackQuestions = [
      {
        question: "What type of business do you run?",
        quickResponses: ["E-commerce", "SaaS", "Consulting", "Local service", "Real Estate", "Other"]
      },
      {
        question: "How many people work in your business?",
        quickResponses: ["Just me", "2-5 people", "6-20 people", "20+ people"]
      },
      {
        question: "What's your biggest time-consuming challenge?",
        quickResponses: ["Customer support", "Marketing", "Data entry", "Operations"]
      },
      {
        question: "How much time do you spend on repetitive tasks weekly?",
        quickResponses: ["Less than 5 hours", "5-15 hours", "15-30 hours", "30+ hours"]
      },
      {
        question: "What tools do you currently use?",
        quickResponses: ["Spreadsheets", "CRM", "Project management", "Multiple tools"]
      }
    ]

    const questionIndex = Math.min(session.questionCount - 1, fallbackQuestions.length - 1)
    return {
      ...fallbackQuestions[questionIndex],
      isComplete: session.questionCount >= fallbackQuestions.length,
      context: session.context
    }
  }

  getUsageStats(sessionId: string = 'default') {
    const session = this.getSession(sessionId)
    return {
      questionsAsked: session.questionCount,
      totalTokensUsed: session.totalTokensUsed,
      estimatedCost: session.totalCost,
      context: session.context
    }
  }
}

// Singleton instance
export const intelligentAI = new IntelligentAI()