// Simple AI response simulator for demo purposes
// In production, this would integrate with OpenAI or similar service

interface QuestionData {
  question: string
  quickResponses?: string[]
  followUp?: string
}

const questionFlow: QuestionData[] = [
  {
    question: "Great! Let's start. What type of business do you run?",
    quickResponses: ["E-commerce", "SaaS", "Consulting", "Local service", "Other"]
  },
  {
    question: "That's awesome! How many people work in your business currently?",
    quickResponses: ["Just me", "2-5 people", "6-20 people", "20+ people"]
  },
  {
    question: "What's your biggest time-consuming challenge right now?",
    quickResponses: ["Customer support", "Marketing", "Sales", "Operations", "Data entry"]
  },
  {
    question: "How much time do you spend on repetitive tasks each week?",
    quickResponses: ["Less than 5 hours", "5-15 hours", "15-30 hours", "More than 30 hours"]
  },
  {
    question: "What tools are you currently using to manage your business?",
    quickResponses: ["Spreadsheets mainly", "CRM system", "Project management", "Multiple tools", "Not sure"]
  },
  {
    question: "How comfortable are you with trying new technology solutions?",
    quickResponses: ["Very comfortable", "Somewhat comfortable", "Not very comfortable", "Need help"]
  },
  {
    question: "What's your primary goal for automation?",
    quickResponses: ["Save time", "Reduce errors", "Scale business", "Cut costs", "All of the above"]
  },
  {
    question: "How soon would you like to implement automation solutions?",
    quickResponses: ["Immediately", "Within a month", "Within 3 months", "Just exploring"]
  },
  {
    question: "What's your approximate budget for automation tools per month?",
    quickResponses: ["Under $100", "$100-$500", "$500-$1000", "$1000+", "Not sure yet"]
  },
  {
    question: "Perfect! Based on your answers, I can recommend some great automation opportunities. Would you like to see your personalized recommendations?",
    quickResponses: ["Yes, show me!", "Tell me more", "I'm ready"]
  }
]

export class AISimulator {
  private currentQuestionIndex = 0
  private responses: string[] = []
  
  constructor() {
    this.reset()
  }
  
  reset() {
    this.currentQuestionIndex = 0
    this.responses = []
  }
  
  async getNextQuestion(userResponse?: string): Promise<{
    question: string
    quickResponses?: string[]
    isComplete: boolean
  }> {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    if (userResponse) {
      this.responses.push(userResponse)
    }
    
    // Check if we've completed all questions
    if (this.currentQuestionIndex >= questionFlow.length) {
      return {
        question: "Thank you for completing the questionnaire! 🎉 I'm analyzing your responses to create personalized automation recommendations. You'll be redirected to your results shortly.",
        isComplete: true
      }
    }
    
    const questionData = questionFlow[this.currentQuestionIndex]
    this.currentQuestionIndex++
    
    return {
      question: questionData.question,
      quickResponses: questionData.quickResponses,
      isComplete: false
    }
  }
  
  getProgress() {
    return {
      current: this.currentQuestionIndex,
      total: questionFlow.length,
      percentage: (this.currentQuestionIndex / questionFlow.length) * 100
    }
  }
  
  getResponses() {
    return this.responses
  }
  
  // Simulate personalized follow-up questions based on responses
  async getFollowUpQuestion(context: string[]): Promise<string | null> {
    const lastResponse = context[context.length - 1]?.toLowerCase()
    
    // Simple context-aware follow-ups
    if (lastResponse?.includes('e-commerce')) {
      return "What e-commerce platform are you using? (Shopify, WooCommerce, etc.)"
    }
    
    if (lastResponse?.includes('customer support')) {
      return "Do you currently use any helpdesk software or chat tools?"
    }
    
    if (lastResponse?.includes('marketing')) {
      return "What marketing channels do you use most? (Social media, email, ads, etc.)"
    }
    
    return null
  }
}

// Singleton instance for the questionnaire session
export const aiSimulator = new AISimulator()