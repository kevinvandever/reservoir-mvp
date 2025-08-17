import { createClient } from './client'
import { createClient as createServerClient } from './server'
import type { UserProfile } from './types'

// Client-side auth helpers
export class AuthHelpers {
  private supabase = createClient()

  // Sign up new user
  async signUp(email: string, password: string, userData?: Record<string, any>) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData || {}
      }
    })

    if (error) throw error
    return data
  }

  // Sign in existing user
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  // Sign out user
  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Create user profile (typically called after signup)
  async createUserProfile(profile: UserProfile) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Server-side auth helpers
export class ServerAuthHelpers {
  private supabase = createServerClient()

  // Get user from server-side context
  async getUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // Get user session from server-side context
  async getSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession()
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

    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', targetUserId)
      .single()

    if (error) throw error
    return data
  }
}

// Singleton instances
export const authHelpers = new AuthHelpers()
export const serverAuthHelpers = new ServerAuthHelpers()