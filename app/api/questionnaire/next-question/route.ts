import { NextRequest, NextResponse } from 'next/server'
import { intelligentAI } from '@/lib/questionnaire/intelligent-ai'
import { createClient } from '@/lib/supabase/server'

// Rate limiting in memory (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const userLimit = requestCounts.get(userId)
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize
    requestCounts.set(userId, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }
  
  if (userLimit.count >= 10) {
    return false // Rate limited
  }
  
  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check rate limiting
    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { userResponse, sessionId: clientSessionId } = body
    
    // Use user ID as fallback session ID if client doesn't provide one
    const sessionId = clientSessionId || `${user.id}_fallback`
    
    // Debug logging
    console.log('🔍 API REQUEST DEBUG:')
    console.log('  User ID:', user.id)
    console.log('  Client Session ID:', clientSessionId)
    console.log('  Final Session ID:', sessionId)
    console.log('  User Response:', userResponse)
    console.log('  Request timestamp:', new Date().toISOString())

    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, using fallback')
      // Fall back to static questions if no API key
      return NextResponse.json({
        question: "What type of business do you run?",
        quickResponses: ["E-commerce", "SaaS", "Consulting", "Local service"],
        isComplete: false,
        fallback: true
      })
    }

    // Generate next question using AI
    const response = await intelligentAI.generateNextQuestion(userResponse, sessionId)
    
    // Log usage for monitoring
    const stats = intelligentAI.getUsageStats(sessionId)
    console.log(`OpenAI Usage - User: ${user.id}, Tokens: ${stats.totalTokensUsed}, Cost: $${stats.estimatedCost.toFixed(4)}`)

    return NextResponse.json({
      question: response.question,
      quickResponses: response.quickResponses || [],
      isComplete: response.isComplete || false,
      context: response.context,
      reasoning: response.reasoning,
      usage: {
        tokensUsed: stats.totalTokensUsed,
        estimatedCost: stats.estimatedCost
      }
    })

  } catch (error) {
    console.error('Error in next-question API:', error)
    
    // Return fallback question on any error
    return NextResponse.json({
      question: "I apologize, but I'm having trouble generating the next question. Could you tell me about your business?",
      quickResponses: ["E-commerce store", "Software company", "Consulting business", "Other"],
      isComplete: false,
      fallback: true,
      error: "AI service temporarily unavailable"
    })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}