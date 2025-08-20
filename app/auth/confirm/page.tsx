'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EmailConfirmationPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check URL hash for confirmation token
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    const errorDescription = hashParams.get('error_description')

    if (error) {
      setStatus('error')
      setMessage(errorDescription || 'An error occurred during email confirmation.')
    } else {
      setStatus('success')
      setMessage('Your email has been confirmed successfully!')
      
      // Redirect to auth-test page after 3 seconds
      setTimeout(() => {
        router.push('/auth-test')
      }, 3000)
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Confirming your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Email Confirmed!</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <p className="mt-4 text-sm text-gray-500">Redirecting to login page...</p>
            <Link 
              href="/auth-test" 
              className="mt-4 inline-block text-blue-600 hover:text-blue-500"
            >
              Click here if not redirected
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Confirmation Failed</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-6 space-y-2">
              <Link 
                href="/auth-test" 
                className="block w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}