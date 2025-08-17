import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { serverAuthHelpers } from '@/lib/supabase/auth-helpers'

// GET /api/user/profile - Get current user's profile
export const GET = withAuth(async (req) => {
  try {
    const user = req.user
    const profile = await serverAuthHelpers.getUserProfile(user.id)
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      profile
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
})

// PUT /api/user/profile - Update current user's profile
export const PUT = withAuth(async (req) => {
  try {
    const user = req.user
    const body = await req.json()
    
    // Validate and sanitize the update data
    const allowedFields = ['full_name', 'company_name', 'industry']
    const updates: any = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }
    
    // Update the profile using auth helpers
    const updatedProfile = await serverAuthHelpers.getUserProfile(user.id)
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
})