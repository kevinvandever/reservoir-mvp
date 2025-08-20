// Access Control System Types

export interface AccessCode {
  id: string
  code: string
  member_name?: string
  member_email?: string
  source?: string
  max_uses: number
  current_uses: number
  expires_at: Date
  status: 'active' | 'expired' | 'disabled' | 'used'
  metadata?: Record<string, any>
  created_at: Date
  last_used_at?: Date
  session_ids?: string[]
}

export interface MemberSession {
  id: string
  session_id: string
  access_code_id: string
  member_data: {
    name?: string
    email?: string
    source?: string
    vip_level?: string
  }
  started_at: Date
  last_activity_at: Date
  completed_at?: Date
  is_active: boolean
  questionnaire_session_id?: string
}

export interface AccessValidationResult {
  valid: boolean
  access_code_id?: string
  member_name?: string
  member_email?: string
  source?: string
  error_message?: string
}

export interface GenerateCodeParams {
  member_name?: string
  member_email?: string
  source?: string
  max_uses?: number
  expires_in_days?: number
}

export interface AccessLog {
  id: string
  access_code_id: string
  action: 'validate' | 'use' | 'expire' | 'disable' | 'reject'
  session_id?: string
  ip_address?: string
  user_agent?: string
  result: boolean
  error_message?: string
  created_at: Date
}