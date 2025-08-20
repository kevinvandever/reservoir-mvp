// Session Manager for Access Control
import Cookies from 'js-cookie'

export interface AccessSession {
  sessionId: string
  accessCodeId: string
  memberData: {
    name?: string
    email?: string
    source?: string
  }
  startedAt: string
}

export class SessionManager {
  private static readonly SESSION_KEY = 'accessSession'
  private static readonly COOKIE_OPTIONS = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const, // Changed from 'strict' to 'lax' for better compatibility
    expires: 1, // 1 day
    path: '/' // Ensure cookie is available site-wide
  }

  /**
   * Store access session
   */
  static setSession(session: AccessSession): void {
    const sessionData = JSON.stringify(session)
    
    console.log('💾 SessionManager: Storing session data:', sessionData)
    
    // Store in both localStorage (for persistence) and cookies (for SSR/middleware)
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SESSION_KEY, sessionData)
      console.log('✅ SessionManager: Stored in localStorage')
    }
    
    // Set cookie with proper options
    Cookies.set(this.SESSION_KEY, sessionData, this.COOKIE_OPTIONS)
    console.log('✅ SessionManager: Stored in cookies')
    
    // Verify cookie was set
    const cookieCheck = Cookies.get(this.SESSION_KEY)
    console.log('🔍 SessionManager: Cookie verification:', cookieCheck ? 'SUCCESS' : 'FAILED')
  }

  /**
   * Get access session
   */
  static getSession(): AccessSession | null {
    try {
      // Try cookies first (for SSR), then localStorage
      let sessionData = Cookies.get(this.SESSION_KEY)
      
      if (!sessionData && typeof window !== 'undefined') {
        const localData = localStorage.getItem(this.SESSION_KEY)
        if (localData) {
          sessionData = localData
          // If found in localStorage but not cookies, sync to cookies
          console.log('🔄 SessionManager: Syncing localStorage to cookies')
          Cookies.set(this.SESSION_KEY, localData, this.COOKIE_OPTIONS)
        }
      }
      
      return sessionData ? JSON.parse(sessionData) : null
    } catch (error) {
      console.error('Error parsing session data:', error)
      this.clearSession()
      return null
    }
  }

  /**
   * Clear access session
   */
  static clearSession(): void {
    console.log('🗑️ SessionManager: Clearing session data')
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY)
      console.log('✅ SessionManager: Cleared localStorage')
    }
    
    // Remove cookie with the same options used to set it
    Cookies.remove(this.SESSION_KEY, { path: '/' })
    console.log('✅ SessionManager: Cleared cookies')
  }

  /**
   * Check if session is valid (not expired)
   */
  static isSessionValid(session: AccessSession | null): boolean {
    if (!session) return false
    
    try {
      const startedAt = new Date(session.startedAt)
      const now = new Date()
      const dayInMs = 24 * 60 * 60 * 1000
      
      // Session expires after 24 hours
      return (now.getTime() - startedAt.getTime()) < dayInMs
    } catch (error) {
      return false
    }
  }

  /**
   * Update session activity
   */
  static updateActivity(session: AccessSession): void {
    console.log('🔄 SessionManager: Updating session activity')
    
    // Refresh both localStorage and cookie expiry
    const sessionData = JSON.stringify(session)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SESSION_KEY, sessionData)
    }
    
    Cookies.set(this.SESSION_KEY, sessionData, this.COOKIE_OPTIONS)
    console.log('✅ SessionManager: Session activity updated')
  }
}