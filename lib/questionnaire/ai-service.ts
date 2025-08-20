// Client-side service to interact with the OpenAI API

interface AIResponse {
  question: string
  quickResponses?: string[]
  isComplete: boolean
  context?: any
  reasoning?: string
  usage?: {
    tokensUsed: number
    estimatedCost: number
  }
  fallback?: boolean
  error?: string
}

export class AIQuestionnaireService {
  private baseUrl = '/api/questionnaire'

  async getNextQuestion(userResponse?: string, sessionId?: string): Promise<AIResponse> {
    console.log('🆕 AI Service Request:', { userResponse, sessionId, timestamp: new Date().toISOString() })
    
    try {
      const response = await fetch(`${this.baseUrl}/next-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userResponse,
          sessionId
        })
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`)
      }

      const data: AIResponse = await response.json()
      
      // Log if using fallback
      if (data.fallback) {
        console.warn('Using fallback questions - OpenAI API unavailable')
      }

      // Log usage stats
      if (data.usage) {
        console.log(`AI Usage: ${data.usage.tokensUsed} tokens, $${data.usage.estimatedCost.toFixed(4)}`)
      }

      return data

    } catch (error) {
      console.error('Error calling AI service:', error)
      
      // Return a fallback question if API completely fails
      return {
        question: "I'm having trouble connecting to our AI service. Let's continue with a basic question: What type of business do you run?",
        quickResponses: ["E-commerce", "SaaS", "Consulting", "Service business", "Real Estate"],
        isComplete: false,
        fallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Static fallback questions for when API is unavailable
  private getFallbackQuestion(questionNumber: number): AIResponse {
    const fallbacks = [
      {
        question: "What type of business do you run?",
        quickResponses: ["E-commerce", "SaaS", "Consulting", "Local service", "Real Estate"]
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
        question: "How much time do you spend on repetitive tasks each week?",
        quickResponses: ["Less than 5 hours", "5-15 hours", "15-30 hours", "30+ hours"]
      },
      {
        question: "What tools are you currently using?",
        quickResponses: ["Spreadsheets", "CRM", "Project management", "Multiple tools"]
      }
    ]

    const index = Math.min(questionNumber, fallbacks.length - 1)
    return {
      ...fallbacks[index],
      isComplete: questionNumber >= fallbacks.length - 1,
      fallback: true
    }
  }
}

// Singleton instance
export const aiService = new AIQuestionnaireService()