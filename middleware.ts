// Next.js middleware for route protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Routes that require access code validation
  const protectedRoutes = [
    '/questionnaire',
    '/api/questionnaire',
    '/report',
    '/sample-report'
  ]
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    // Check for access session in cookies or headers
    const accessSession = request.cookies.get('accessSession')?.value ||
                         request.headers.get('x-access-session')
    
    console.log('🔍 Middleware: Checking protected route:', pathname)
    console.log('🔍 Middleware: Looking for accessSession cookie')
    console.log('🔍 Middleware: AccessSession cookie found:', !!accessSession)
    
    if (!accessSession) {
      console.log('🚫 Middleware: No session found in cookies or headers')
      // No session found, redirect to landing page with error
      const redirectUrl = new URL('/', request.url)
      redirectUrl.searchParams.set('error', 'access_required')
      return NextResponse.redirect(redirectUrl)
    }
    
    try {
      // Parse and validate session data
      const sessionData = JSON.parse(accessSession)
      console.log('🔍 Middleware: Session data:', sessionData)
      
      if (!sessionData.sessionId || !sessionData.accessCodeId) {
        console.log('❌ Middleware: Invalid session structure')
        const redirectUrl = new URL('/', request.url)
        redirectUrl.searchParams.set('error', 'invalid_session')
        return NextResponse.redirect(redirectUrl)
      }
      
      console.log('✅ Middleware: Session valid, allowing access')
      
      // Add session data to request headers for route handlers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-member-session', accessSession)
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error('❌ Middleware: Error parsing access session:', error)
      const redirectUrl = new URL('/', request.url)
      redirectUrl.searchParams.set('error', 'session_error')
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/questionnaire/:path*',
    '/api/questionnaire/:path*',
    '/report/:path*',
    '/sample-report/:path*'
  ]
}