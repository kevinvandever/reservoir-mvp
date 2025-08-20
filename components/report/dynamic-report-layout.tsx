'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Download,
  Target,
  Users,
  Zap,
  BarChart3,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Calendar,
  Star,
  ArrowRight,
  FileText
} from 'lucide-react'
import { ReportData } from '@/lib/report/types'
import { pdfExportService } from '@/lib/report/pdf-exporter'
import { ExecutiveSummarySection } from './sections/executive-summary'
import { BusinessProfileSection } from './sections/business-profile'
import { OpportunityAssessmentSection } from './sections/opportunity-assessment'
import { ImplementationRoadmapSection } from './sections/implementation-roadmap'
import { ROIProjectionsSection } from './sections/roi-projections'
import { QuickWinsSection } from './sections/quick-wins'
import { NextStepsSection } from './sections/next-steps'

interface DynamicReportLayoutProps {
  data: ReportData
}

export function DynamicReportLayout({ data }: DynamicReportLayoutProps) {
  const [isExporting, setIsExporting] = useState(false)
  
  const handlePDFExport = async () => {
    try {
      setIsExporting(true)
      console.log('📄 Exporting PDF report...')
      await pdfExportService.exportReportToPDF(data, 'report-content')
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }
  
  const handleTextExport = () => {
    pdfExportService.downloadTextReport(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/questionnaire">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questionnaire
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Your Personal Business Analysis Report</h1>
              <p className="text-muted-foreground">
                Generated on {data.generatedAt.toLocaleDateString()} • Automation Score: {data.automationScore}/100
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handlePDFExport} 
                variant="outline" 
                size="sm"
                disabled={isExporting}
                data-export-button
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Generating PDF...' : 'Export PDF'}
              </Button>
              <Button 
                onClick={handleTextExport} 
                variant="ghost" 
                size="sm"
                title="Download as text file"
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div id="report-content" className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Executive Summary */}
          <ExecutiveSummarySection 
            automationScore={data.automationScore}
            roiProjections={data.roiProjections}
            businessProfile={data.businessProfile}
          />
          
          {/* Business Profile Analysis */}
          <BusinessProfileSection 
            profile={data.businessProfile}
            competitiveAnalysis={data.competitiveAnalysis}
          />
          
          {/* Opportunity Assessment */}
          <OpportunityAssessmentSection 
            opportunities={data.opportunities}
            businessProfile={data.businessProfile}
          />
          
          {/* Quick Wins */}
          <QuickWinsSection quickWins={data.quickWins} />
          
          {/* Implementation Roadmap */}
          <ImplementationRoadmapSection 
            roadmap={data.implementationRoadmap}
            opportunities={data.opportunities}
          />
          
          {/* ROI Projections */}
          <ROIProjectionsSection 
            projections={data.roiProjections}
            businessProfile={data.businessProfile}
          />
          
          {/* Strategic Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-6 w-6 mr-2 text-blue-600" />
                Strategic Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.strategicRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Next Steps */}
          <NextStepsSection businessProfile={data.businessProfile} />

          {/* Report Footer */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This analysis shows tremendous potential for automation in your business. 
                Take the next step to implement these recommendations and start seeing results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Schedule Implementation Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Download Detailed Action Plan
                  <Download className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  Personalized Analysis
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  Proven ROI Projections
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  Implementation Support
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}