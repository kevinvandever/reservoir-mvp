'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { authHelpers } from '@/lib/supabase/auth-helpers'
import type { UserProfile } from '@/lib/supabase/types'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  // Load user profile when user changes
  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await authHelpers.getUserProfile(userId)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error loading user profile:', error)
      setProfile(null)
    }
  }

  // Handle auth state changes
  const handleAuthChange = async (event: AuthChangeEvent, session: Session | null) => {
    setSession(session)
    setUser(session?.user ?? null)

    if (session?.user) {
      await loadUserProfile(session.user.id)
    } else {
      setProfile(null)
    }

    setLoading(false)
  }

  // Sign up new user
  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    try {
      const { user: newUser } = await authHelpers.signUp(email, password, userData)
      
      // Create user profile if signup successful
      if (newUser) {
        const profileData: UserProfile = {
          id: newUser.id,
          email: newUser.email!,
          full_name: userData?.full_name || null,
          company_name: userData?.company_name || null,
          industry: userData?.industry || null,
          role: userData?.role || 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        try {
          await authHelpers.createUserProfile(profileData)
        } catch (profileError) {
          console.error('Error creating user profile:', profileError)
          // Profile creation failed, but signup succeeded
          // This might happen if the user already has a profile
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  // Sign in existing user
  const signIn = async (email: string, password: string) => {
    try {
      await authHelpers.signIn(email, password)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  // Sign out user
  const signOut = async () => {
    try {
      await authHelpers.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')

    try {
      const updatedProfile = await authHelpers.updateUserProfile(user.id, updates)
      setProfile(updatedProfile)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthChange('INITIAL_SESSION', session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthChange)

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}