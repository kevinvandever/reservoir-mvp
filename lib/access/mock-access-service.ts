// Mock Access Code Service for Testing Without Database
import type { 
  AccessCode, 
  AccessValidationResult, 
  GenerateCodeParams 
} from './types'

// Mock access codes for testing
const MOCK_ACCESS_CODES: AccessCode[] = [
  {
    id: '1',
    code: 'CLOCK-DEMO-2025',
    member_name: 'Demo User',
    member_email: 'demo@clockworkcoaching.com',
    source: 'demo',
    max_uses: 100,
    current_uses: 0,
    expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    status: 'active',
    created_at: new Date(),
    session_ids: []
  },
  {
    id: '2',
    code: 'CLOCK-TEST-2025',
    member_name: 'Test Member',
    member_email: 'test@example.com',
    source: 'testing',
    max_uses: 5,
    current_uses: 0,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'active',
    created_at: new Date(),
    session_ids: []
  },
  {
    id: '3',
    code: 'CLOCK-VIP1-2025',
    member_name: 'Marcus Rivera',
    member_email: 'marcus@example.com',
    source: 'clockwork_coaching',
    max_uses: 1,
    current_uses: 0,
    expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    status: 'active',
    created_at: new Date(),
    session_ids: []
  }
]

// Make sessions static so they persist across service instances
let MOCK_SESSIONS: any[] = []

export class MockAccessCodeService {
  private codes: AccessCode[] = [...MOCK_ACCESS_CODES]
  private get sessions() { return MOCK_SESSIONS }
  private set sessions(value: any[]) { MOCK_SESSIONS = value }

  async generateCode(params: GenerateCodeParams): Promise<{ code: string; error?: string }> {
    try {
      const code = this.createUniqueCode()
      
      const newAccessCode: AccessCode = {
        id: Date.now().toString(),
        code,
        member_name: params.member_name,
        member_email: params.member_email,
        source: params.source || 'direct',
        max_uses: params.max_uses || 1,
        current_uses: 0,
        expires_at: new Date(Date.now() + (params.expires_in_days || 30) * 24 * 60 * 60 * 1000),
        status: 'active',
        created_at: new Date(),
        session_ids: []
      }
      
      this.codes.push(newAccessCode)
      return { code }
    } catch (error) {
      return { code: '', error: 'Failed to generate access code' }
    }
  }

  async validateAndUseCode(
    code: string, 
    sessionId: string,
    _ipAddress?: string,
    _userAgent?: string
  ): Promise<AccessValidationResult> {
    console.log('🔍 Mock service validating code:', code)
    console.log('📋 Available codes:', this.codes.map(c => c.code))
    
    const accessCode = this.codes.find(c => c.code.toUpperCase() === code.toUpperCase())
    console.log('🎯 Found matching code:', accessCode ? 'YES' : 'NO')
    
    if (!accessCode) {
      return {
        valid: false,
        error_message: 'Invalid access code. Please check your code and try again.'
      }
    }
    
    if (accessCode.status !== 'active') {
      const errorMessages = {
        expired: 'This access code has expired.',
        disabled: 'This access code has been disabled.',
        used: 'This access code has already been fully used.'
      }
      return {
        valid: false,
        error_message: errorMessages[accessCode.status as keyof typeof errorMessages] || 'This access code is no longer active.'
      }
    }
    
    if (accessCode.expires_at < new Date()) {
      accessCode.status = 'expired'
      return {
        valid: false,
        error_message: 'This access code has expired. Please contact support for a new code.'
      }
    }
    
    if (accessCode.current_uses >= accessCode.max_uses) {
      accessCode.status = 'used'
      return {
        valid: false,
        error_message: 'This access code has reached its usage limit.'
      }
    }
    
    // Valid code - increment usage
    accessCode.current_uses += 1
    accessCode.session_ids = accessCode.session_ids || []
    accessCode.session_ids.push(sessionId)
    
    if (accessCode.current_uses >= accessCode.max_uses) {
      accessCode.status = 'used'
    }
    
    // Create session record
    this.sessions.push({
      session_id: sessionId,
      access_code_id: accessCode.id,
      member_data: {
        name: accessCode.member_name,
        email: accessCode.member_email,
        source: accessCode.source
      },
      started_at: new Date(),
      is_active: true
    })
    
    return {
      valid: true,
      access_code_id: accessCode.id,
      member_name: accessCode.member_name,
      member_email: accessCode.member_email,
      source: accessCode.source
    }
  }

  async validateSession(sessionId: string): Promise<{ valid: boolean; memberData?: any }> {
    console.log('🔍 Mock service validating session:', sessionId)
    console.log('📋 Available sessions:', this.sessions.map(s => s.session_id))
    
    let session = this.sessions.find(s => s.session_id === sessionId && s.is_active)
    console.log('🎯 Found matching session:', session ? 'YES' : 'NO')
    
    // In development, if session not found, create a mock valid session
    if (!session && process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: Creating mock session for validation')
      session = {
        session_id: sessionId,
        access_code_id: '1',
        member_data: {
          name: 'Demo User',
          email: 'demo@clockworkcoaching.com',
          source: 'demo'
        },
        is_active: true,
        created_at: new Date(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
      this.sessions.push(session)
    }
    
    if (!session) {
      console.log('❌ Mock service: No active session found')
      return { valid: false }
    }
    
    // Check if the associated access code is still valid
    const accessCode = this.codes.find(c => c.id === session.access_code_id)
    console.log('🔑 Associated access code found:', accessCode ? 'YES' : 'NO')
    console.log('🔑 Access code status:', accessCode?.status)
    
    if (!accessCode || (accessCode.status !== 'active' && accessCode.status !== 'used')) {
      console.log('❌ Mock service: Access code not valid')
      return { valid: false }
    }
    
    console.log('✅ Mock service: Session validation successful')
    return {
      valid: true,
      memberData: session.member_data
    }
  }

  async getAllCodes(): Promise<AccessCode[]> {
    return [...this.codes]
  }

  async updateCodeStatus(
    codeId: string, 
    status: 'active' | 'expired' | 'disabled' | 'used'
  ): Promise<boolean> {
    const code = this.codes.find(c => c.id === codeId)
    if (code) {
      code.status = status
      return true
    }
    return false
  }

  async getAccessAnalytics(): Promise<any> {
    return {
      total_codes: this.codes.length,
      active_codes: this.codes.filter(c => c.status === 'active').length,
      used_codes: this.codes.filter(c => c.status === 'used').length,
      expired_codes: this.codes.filter(c => c.status === 'expired').length,
      total_uses: this.codes.reduce((sum, c) => sum + c.current_uses, 0),
      completion_rate: 0,
      source_breakdown: this.codes.reduce((acc, code) => {
        const source = code.source || 'direct'
        acc[source] = (acc[source] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  private createUniqueCode(): string {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    const year = new Date().getFullYear()
    return `CLOCK-${randomPart}-${year}`
  }
}