// Type-safe environment variable access

interface EnvConfig {
  // Public variables (available on client)
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  NEXT_PUBLIC_APP_URL: string

  // Server-only variables
  SUPABASE_SERVICE_ROLE_KEY?: string
  OPENAI_API_KEY?: string
}

function getEnvVar(name: keyof EnvConfig, required: boolean = true): string {
  const value = process.env[name]
  
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  
  return value || ''
}

// Export environment configuration
export const env: EnvConfig = {
  // Public variables
  NEXT_PUBLIC_SUPABASE_URL: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  NEXT_PUBLIC_APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL'),

  // Server-only variables (optional for now)
  SUPABASE_SERVICE_ROLE_KEY: getEnvVar('SUPABASE_SERVICE_ROLE_KEY', false),
  OPENAI_API_KEY: getEnvVar('OPENAI_API_KEY', false),
}

// Helper functions for environment checks
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

// Validate required environment variables
export function validateEnvironment() {
  const requiredVars: (keyof EnvConfig)[] = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_APP_URL'
  ]

  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    )
  }
}