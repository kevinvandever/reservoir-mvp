import { createClient } from './server'
import type { UserProfile } from './types'

// Server-side auth helpers (only use in Server Components)
export class ServerAuthHelpers {
  private getSupabase() {
    return createClient()
  }

  // Get user from server-side context
  async getUser() {
    const supabase = this.getSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // Get user session from server-side context
  async getSession() {
    const supabase = this.getSupabase()
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }

  // Verify user is authenticated
  async requireAuth() {
    const user = await this.getUser()
    if (!user) {
      throw new Error('Authentication required')
    }
    return user
  }

  // Get user profile with auth check
  async getUserProfile(userId?: string) {
    const user = await this.requireAuth()
    const targetUserId = userId || user.id

    // Users can only access their own profile unless admin
    if (targetUserId !== user.id) {
      // TODO: Add admin role check when roles are implemented
      throw new Error('Access denied')
    }

    const supabase = this.getSupabase()
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', targetUserId)
      .single()

    if (error) throw error
    return data
  }
}

// Only create server auth helpers when needed (in server components)
export function getServerAuthHelpers() {
  return new ServerAuthHelpers()
}