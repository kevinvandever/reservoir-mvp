// Access Code Service for Premium Access Control
import { createClient } from '@/lib/supabase/client'
import { MockAccessCodeService } from './mock-access-service'
import type { 
  AccessCode, 
  AccessValidationResult, 
  GenerateCodeParams,
  MemberSession 
} from './types'

export class AccessCodeService {
  private supabase = createClient()
  private mockService = new MockAccessCodeService()
  // Use mock service only in development or when explicitly set
  private useMockService = process.env.NEXT_PUBLIC_USE_MOCK_ACCESS === 'true' || 
                           (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_ACCESS !== 'false')

  /**
   * Generate a new access code
   */
  async generateCode(params: GenerateCodeParams): Promise<{ code: string; error?: string }> {
    if (this.useMockService) {
      return this.mockService.generateCode(params)
    }

    try {
      const { data, error } = await this.supabase.rpc('generate_access_code', {
        p_member_name: params.member_name || null,
        p_member_email: params.member_email || null,
        p_source: params.source || 'direct',
        p_max_uses: params.max_uses || 1,
        p_expires_in_days: params.expires_in_days || 30
      })

      if (error) {
        console.error('Error generating access code:', error)
        return { code: '', error: 'Failed to generate access code' }
      }

      return { code: data }
    } catch (error) {
      console.error('Error in generateCode:', error)
      return { code: '', error: 'An unexpected error occurred' }
    }
  }

  /**
   * Validate and use an access code
   */
  async validateAndUseCode(
    code: string, 
    sessionId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AccessValidationResult> {
    if (this.useMockService) {
      return this.mockService.validateAndUseCode(code, sessionId, ipAddress, userAgent)
    }

    try {
      const { data, error } = await this.supabase.rpc('validate_and_use_access_code', {
        p_code: code.toUpperCase().trim(),
        p_session_id: sessionId,
        p_ip_address: ipAddress || null,
        p_user_agent: userAgent || null
      })

      if (error) {
        console.error('Error validating access code:', error)
        return {
          valid: false,
          error_message: 'Failed to validate access code. Please try again.'
        }
      }

      // The RPC function returns an array with one result
      const result = data?.[0]
      
      if (!result) {
        return {
          valid: false,
          error_message: 'Invalid response from validation service.'
        }
      }

      return {
        valid: result.valid,
        access_code_id: result.access_code_id,
        member_name: result.member_name,
        member_email: result.member_email,
        source: result.source,
        error_message: result.error_message
      }
    } catch (error) {
      console.error('Error in validateAndUseCode:', error)
      return {
        valid: false,
        error_message: 'An unexpected error occurred. Please try again.'
      }
    }
  }

  /**
   * Check if a session is valid
   */
  async validateSession(sessionId: string): Promise<{ valid: boolean; memberData?: any }> {
    if (this.useMockService) {
      return this.mockService.validateSession(sessionId)
    }

    try {
      const { data, error } = await this.supabase
        .from('member_sessions')
        .select('*, access_codes(*)')
        .eq('session_id', sessionId)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        return { valid: false }
      }

      // Check if the access code is still valid
      const accessCode = data.access_codes as any
      if (accessCode.status !== 'active' && accessCode.status !== 'used') {
        return { valid: false }
      }

      // Update last activity
      await this.supabase
        .from('member_sessions')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('session_id', sessionId)

      return {
        valid: true,
        memberData: data.member_data
      }
    } catch (error) {
      console.error('Error validating session:', error)
      return { valid: false }
    }
  }

  /**
   * Get all access codes (admin only)
   */
  async getAllCodes(): Promise<AccessCode[]> {
    if (this.useMockService) {
      return this.mockService.getAllCodes()
    }

    try {
      const { data, error } = await this.supabase
        .from('access_codes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching access codes:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllCodes:', error)
      return []
    }
  }

  /**
   * Update access code status
   */
  async updateCodeStatus(
    codeId: string, 
    status: 'active' | 'expired' | 'disabled' | 'used'
  ): Promise<boolean> {
    if (this.useMockService) {
      return this.mockService.updateCodeStatus(codeId, status)
    }

    try {
      const { error } = await this.supabase
        .from('access_codes')
        .update({ status })
        .eq('id', codeId)

      if (error) {
        console.error('Error updating code status:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in updateCodeStatus:', error)
      return false
    }
  }

  /**
   * Get access logs for a specific code
   */
  async getCodeLogs(codeId: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('access_logs')
        .select('*')
        .eq('access_code_id', codeId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching access logs:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getCodeLogs:', error)
      return []
    }
  }

  /**
   * Get analytics for access codes
   */
  async getAccessAnalytics(): Promise<any> {
    if (this.useMockService) {
      return this.mockService.getAccessAnalytics()
    }

    try {
      const { data: codes, error } = await this.supabase
        .from('access_codes')
        .select('*, member_sessions(*)')

      if (error) {
        console.error('Error fetching analytics:', error)
        return null
      }

      const analytics = {
        total_codes: codes?.length || 0,
        active_codes: codes?.filter(c => c.status === 'active').length || 0,
        used_codes: codes?.filter(c => c.status === 'used').length || 0,
        expired_codes: codes?.filter(c => c.status === 'expired').length || 0,
        total_uses: codes?.reduce((sum, c) => sum + c.current_uses, 0) || 0,
        completion_rate: 0,
        source_breakdown: {} as Record<string, number>
      }

      // Calculate source breakdown
      codes?.forEach(code => {
        const source = code.source || 'direct'
        analytics.source_breakdown[source] = (analytics.source_breakdown[source] || 0) + 1
      })

      return analytics
    } catch (error) {
      console.error('Error in getAccessAnalytics:', error)
      return null
    }
  }

  /**
   * Complete a member session
   */
  async completeSession(sessionId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('member_sessions')
        .update({ 
          completed_at: new Date().toISOString(),
          is_active: false 
        })
        .eq('session_id', sessionId)

      if (error) {
        console.error('Error completing session:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in completeSession:', error)
      return false
    }
  }
}