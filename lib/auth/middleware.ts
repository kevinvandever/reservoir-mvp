import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js'

// Extend NextRequest to include user
export interface AuthenticatedRequest extends NextRequest {
  user: User
}

// Middleware to protect API routes
export async function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      // Add user to request object
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.user = user

      return await handler(authenticatedReq)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

// Middleware to check for specific roles
export function withRole(roles: string | string[]) {
  const allowedRoles = Array.isArray(roles) ? roles : [roles]

  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse> | NextResponse) => {
    return withAuth(async (req: AuthenticatedRequest) => {
      try {
        const supabase = createClient()
        
        // Get user profile to check role
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', req.user.id)
          .single()

        if (error || !profile) {
          return NextResponse.json(
            { error: 'User profile not found' },
            { status: 403 }
          )
        }

        if (!allowedRoles.includes(profile.role)) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }

        return await handler(req)
      } catch (error) {
        console.error('Role middleware error:', error)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      }
    })
  }
}

// Utility function to get user from request in API routes
export async function getUserFromRequest(req: NextRequest): Promise<User | null> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting user from request:', error)
    return null
  }
}

// Utility function to require authentication in API routes
export async function requireAuth(req: NextRequest): Promise<User> {
  const user = await getUserFromRequest(req)
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}