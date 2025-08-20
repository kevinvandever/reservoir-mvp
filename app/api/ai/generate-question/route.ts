import { NextRequest, NextResponse } from 'next/server'
import { createChatCompletion } from '@/lib/openai/client'

const ENHANCED_SYSTEM_PROMPT = `You are an expert real estate business consultant conducting a high-value consultation worth $2,500+. Your goal is to ask intelligent, adaptive questions that reveal automation opportunities.

PERSONALITY: You have Tim Urban's engaging, conversational style - curious, insightful, and able to make complex topics accessible. You're genuinely excited about helping agents optimize their businesses.

RESPONSE FORMAT: Always respond with valid JSON in this exact format:
{
  "question": "Your next question here",
  "quickResponses": ["Specific Option 1", "Specific Option 2", "Specific Option 3", "I'll type it out"],
  "isComplete": false,
  "celebrationType": "success|milestone|insight|benchmark|none",
  "reasoning": "Why you're asking this question"
}

QUICK RESPONSE GUIDELINES:
- Make them SPECIFIC and ACTIONABLE (e.g., "10-25 transactions", "Lead follow-up", "Under $500K")
- NEVER use generic responses like "Sure, let me tell you", "Yes", "No" 
- ALWAYS include "I'll type it out" as the last option for custom responses
- Focus on BUSINESS-SPECIFIC categories, ranges, or common scenarios
- Each option should be a complete, standalone answer

CELEBRATION GUIDELINES:
- Only use celebrationType when something genuinely impressive or noteworthy happens
- "success" = High performance metrics shared (50+ transactions, $500K+ GCI)
- "milestone" = Reaching significant conversation milestones  
- "insight" = Revealing important business insights
- "benchmark" = Sharing industry benchmark data
- "none" = Default for normal questions (most questions should use this)

INTELLIGENT QUESTIONING STRATEGY:
1. Start with high-level business context (name, brokerage, basic performance)
2. Dive into their biggest pain points and challenges
3. Explore specific workflows and processes
4. Identify automation opportunities based on their specific situation
5. NEVER ask redundant questions - build on what you already know

CURRENT CONTEXT: {context}
PREVIOUS CONVERSATION: {previousAnswers}

Based on the context and conversation so far, generate the next most valuable question that will help identify automation opportunities. Make it conversational and engaging like Tim Urban would ask it.`;

export async function POST(request: NextRequest) {
  try {
    const { userResponse, context, previousAnswers } = await request.json()
    
    console.log('🤖 AI Question Generation API called')
    console.log('📝 User response:', userResponse?.substring(0, 100) + '...')
    console.log('🧠 Current context:', Object.keys(context || {}))
    
    const systemPrompt = ENHANCED_SYSTEM_PROMPT
      .replace('{context}', JSON.stringify(context, null, 2))
      .replace('{previousAnswers}', previousAnswers.join('\n'))

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: userResponse || 'Start the consultation with the first question.' }
    ]

    const response = await createChatCompletion(messages, {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 400
    })

    if (!response.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI')
    }

    const aiResponse = JSON.parse(response.choices[0].message.content)
    
    console.log('✅ AI Question generated successfully')
    console.log('❓ Generated question:', aiResponse.question?.substring(0, 100) + '...')
    
    // Ensure response has required fields
    const formattedResponse = {
      question: aiResponse.question || "Let's continue exploring your business needs.",
      quickResponses: aiResponse.quickResponses || ["I'll type it out"],
      isComplete: aiResponse.isComplete || false,
      celebrationType: aiResponse.celebrationType === "none" ? undefined : aiResponse.celebrationType,
      reasoning: aiResponse.reasoning || "Continuing business discovery",
      extractedInformation: aiResponse.extractedInformation || undefined
    }
    
    return NextResponse.json({
      success: true,
      ...formattedResponse
    })

  } catch (error) {
    console.error('❌ Error in question generation API:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      question: "I apologize, but I encountered an error. Could you please try again?",
      quickResponses: ["I'll type it out"],
      isComplete: false
    }, { status: 500 })
  }
}