import OpenAI from 'openai'

// Lazy-loaded OpenAI client to avoid initialization errors
let _openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.')
    }
    
    _openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: false, // This will be called from API routes only
    })
  }
  
  return _openai
}

// Export the lazy-loaded client
export const openai = getOpenAIClient

// Configuration constants
export const OPENAI_CONFIG = {
  model: 'gpt-4o-mini', // Cost-effective model for questionnaires
  maxTokens: 500,
  temperature: 0.7, // Balanced creativity/consistency
  maxRetries: 3,
  timeout: 30000, // 30 seconds
}

// Rate limiting configuration
export const RATE_LIMITS = {
  requestsPerMinute: 10,
  dailyTokenLimit: 50000,
  monthlyTokenLimit: 1000000,
}

// Create a completion with retry logic
export async function createChatCompletion(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: {
    maxTokens?: number
    temperature?: number
    stream?: boolean
    model?: string
  } = {}
) {
  try {
    const client = getOpenAIClient()
    const response = await client.chat.completions.create({
      model: options.model || OPENAI_CONFIG.model,
      messages,
      max_tokens: options.maxTokens || OPENAI_CONFIG.maxTokens,
      temperature: options.temperature || OPENAI_CONFIG.temperature,
      stream: options.stream || false,
    })

    return response
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw error
  }
}

// Token counting utility (approximate)
export function estimateTokenCount(text: string): number {
  // Rough estimation: 1 token ≈ 4 characters for English
  return Math.ceil(text.length / 4)
}

// Cost calculation utility
export function estimateCost(inputTokens: number, outputTokens: number): number {
  // GPT-4o-mini pricing (as of 2024)
  const inputCostPer1K = 0.00015 // $0.15 per 1K input tokens
  const outputCostPer1K = 0.0006 // $0.60 per 1K output tokens
  
  return (inputTokens / 1000 * inputCostPer1K) + (outputTokens / 1000 * outputCostPer1K)
}