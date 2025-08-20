import { NextRequest, NextResponse } from 'next/server'
import { createChatCompletion } from '@/lib/openai/client'

export async function POST(request: NextRequest) {
  try {
    const { response, context } = await request.json()
    
    console.log('🧠 AI Business Intelligence Extraction API called')
    console.log('📝 Response to analyze:', response.substring(0, 100) + '...')
    
    const extractionPrompt = `
    Analyze this real estate agent response and extract ALL business information:
    "${response}"
    
    Current context: ${JSON.stringify(context)}
    
    Extract:
    - Numbers: GCI, transactions, leads/month, response times, percentages, hours, costs
    - Business details: CRM, tools, team structure, market areas, agent name, brokerage
    - Performance metrics: conversion rates, lead sources, database size
    - Pain points: challenges, time wasters, frustrations (even implied)
    - Goals: revenue targets, growth plans, aspirations
    - Technical comfort: automation experience, implementation preferences
    
    Return as JSON with confidence scores for each extracted field:
    {
      "extracted": {
        "agentName": "value_if_found",
        "lastYearGCI": number_if_found,
        "lastYearTransactions": number_if_found,
        // ... other fields only if found
      },
      "confidence": 0.85,
      "benchmarkComparison": "Agent performance vs industry standards"
    }
    
    Include industry benchmark comparisons where relevant:
    - Transactions: <5=bottom 20%, 6-25=middle 60%, 26-50=top 20%, 51+=top 5%
    - GCI: <$75K=bottom 20%, $75K-$250K=middle 60%, $250K-$500K=top 20%, $500K+=top 5%
    `;
    
    const extraction = await createChatCompletion([
      { role: 'user', content: extractionPrompt }
    ], {
      model: 'gpt-4',
      temperature: 0.1,
      maxTokens: 500
    });

    if (!extraction.choices[0]?.message?.content) {
      throw new Error('No extraction response from OpenAI')
    }

    const result = JSON.parse(extraction.choices[0].message.content)
    
    console.log('✅ AI Business Intelligence extracted successfully')
    console.log('📊 Extracted data:', result.extracted)
    
    return NextResponse.json({
      success: true,
      extracted: result.extracted || {},
      confidence: result.confidence || 0.5
    })

  } catch (error) {
    console.error('❌ Error in business intelligence extraction API:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      extracted: {},
      confidence: 0
    }, { status: 500 })
  }
}