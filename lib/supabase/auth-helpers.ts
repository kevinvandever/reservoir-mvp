import { createClient } from './client'
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
        data: userData || {},
        emailRedirectTo: `${window.location.origin}/auth/confirm`
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

// Singleton instance for client-side use
export const authHelpers = new AuthHelpers()