import { NextRequest, NextResponse } from 'next/server'
import { enhancedAIService } from '@/lib/questionnaire/enhanced-ai-service'
import { createClient } from '@/lib/supabase/server'

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

    // Parse request body
    const body = await request.json()
    const { sessionId } = body

    console.log('🔄 RESET REQUEST:', { userId: user.id, sessionId })

    // Reset the session in the enhanced AI service
    if (sessionId) {
      enhancedAIService.resetSession(sessionId)
      console.log('✅ Enhanced AI session reset successfully:', sessionId)
    } else {
      console.log('⚠️ No sessionId provided for reset, user will get fresh session on next start')
    }

    return NextResponse.json({
      success: true,
      message: 'Session reset successfully'
    })

  } catch (error) {
    console.error('Error resetting session:', error)
    
    return NextResponse.json({
      error: 'Failed to reset session',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}