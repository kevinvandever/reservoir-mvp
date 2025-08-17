'use client'

import { useAuth } from './context'

// Re-export the main hook
export { useAuth }

// Additional auth hooks for convenience
export function useUser() {
  const { user } = useAuth()
  return user
}

export function useSession() {
  const { session } = useAuth()
  return session
}

export function useProfile() {
  const { profile } = useAuth()
  return profile
}

export function useAuthLoading() {
  const { loading } = useAuth()
  return loading
}

// Hook to check if user is authenticated
export function useIsAuthenticated() {
  const { user, loading } = useAuth()
  return { isAuthenticated: !!user, loading }
}

// Hook to require authentication (throws if not authenticated)
export function useRequireAuth() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return { user: null, loading: true }
  }
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return { user, loading: false }
}