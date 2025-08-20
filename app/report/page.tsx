'use client'

import { useEffect, useState } from 'react'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { ReportGeneratorService } from '@/lib/report/report-generator'
import { ReportData } from '@/lib/report/types'
import { DynamicReportLayout } from '@/components/report/dynamic-report-layout'
import { ReportLoadingState } from '@/components/report/report-loading'
import { ReportErrorState } from '@/components/report/report-error'

export default function DynamicReportPage() {
  const { sessionId, isComplete } = useQuestionnaireStore()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (isComplete && sessionId) {
      generateReport()
    } else {
      // Try to load from localStorage if we have a session
      if (sessionId) {
        loadExistingReport()
      } else {
        setError('Please complete the questionnaire first')
        setLoading(false)
      }
    }
  }, [isComplete, sessionId])
  
  const generateReport = async () => {
    try {
      setLoading(true)
      console.log('🔄 Generating report for session:', sessionId)
      
      const generator = new ReportGeneratorService()
      const data = await generator.generateReport(sessionId!)
      
      setReportData(data)
      setError(null)
      console.log('✅ Report generated successfully')
    } catch (error) {
      console.error('❌ Error generating report:', error)
      setError('Failed to generate report. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const loadExistingReport = () => {
    try {
      const saved = localStorage.getItem(`report_${sessionId}`)
      if (saved) {
        const data = JSON.parse(saved)
        setReportData(data)
        setLoading(false)
        console.log('✅ Loaded existing report from localStorage')
        return
      }
    } catch (error) {
      console.error('Error loading existing report:', error)
    }
    
    // If no existing report and questionnaire is not complete, show error
    setError('Please complete the questionnaire to generate your report')
    setLoading(false)
  }
  
  if (loading) return <ReportLoadingState />
  if (error) return <ReportErrorState error={error} onRetry={generateReport} />
  if (!reportData) return <ReportErrorState error="No report data available" onRetry={generateReport} />
  
  return <DynamicReportLayout data={reportData} />
}