'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, DollarSign, Clock, TrendingUp } from 'lucide-react'
import { BusinessProfile, ROIProjections } from '@/lib/report/types'

interface ExecutiveSummaryProps {
  automationScore: number
  roiProjections: ROIProjections
  businessProfile: BusinessProfile
}

export function ExecutiveSummarySection({ automationScore, roiProjections, businessProfile }: ExecutiveSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'strong'
    return 'good'
  }

  const getIndustryContext = (industry: string) => {
    const contexts = {
      real_estate: 'real estate business',
      e_commerce: 'e-commerce business',
      consulting: 'consulting business',
      default: 'business'
    }
    return contexts[industry as keyof typeof contexts] || contexts.default
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Executive Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Automation Score */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
              🎯 Automation Opportunity Score
            </h3>
            <Badge className={`${getScoreColor(automationScore)} bg-white text-lg px-3 py-1`}>
              {automationScore}/100
            </Badge>
          </div>
          <p className="text-green-700 dark:text-green-300 leading-relaxed">
            Your {getIndustryContext(businessProfile.industry)} shows{' '}
            <span className="font-semibold">{getScoreDescription(automationScore)} potential</span> for automation
            with high-impact opportunities in{' '}
            <span className="font-semibold">
              {businessProfile.primaryChallenges.slice(0, 2).join(' and ')}
            </span>.
            {businessProfile.monthlyRevenue > 30000 && (
              ' Your strong revenue foundation provides excellent resources for automation investment.'
            )}
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
            <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-600 mb-1">
              ${Math.abs(roiProjections.firstYearSavings).toLocaleString()}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              {roiProjections.firstYearSavings >= 0 ? 'First Year Net Savings' : 'Investment Recovery Period'}
            </div>
            {roiProjections.firstYearSavings < 0 && (
              <div className="text-xs text-green-600 mt-1">
                Positive ROI in Year 2
              </div>
            )}
          </div>
          
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
            <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(roiProjections.timeToPayback)} months
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Payback Period
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {roiProjections.confidence}% confidence
            </div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
            <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(roiProjections.netROI)}%
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              ROI First Year
            </div>
            <div className="text-xs text-purple-600 mt-1">
              {roiProjections.netROI > 200 ? 'Exceptional' : roiProjections.netROI > 100 ? 'Excellent' : 'Good'} returns
            </div>
          </div>
        </div>

        {/* Business Context */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Your Business at a Glance
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Industry:</span>
              <div className="text-blue-800 dark:text-blue-200 capitalize">
                {businessProfile.industry.replace('_', ' ')}
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Team Size:</span>
              <div className="text-blue-800 dark:text-blue-200">
                {businessProfile.teamSize} {businessProfile.teamSize === 1 ? 'person' : 'people'}
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Growth Stage:</span>
              <div className="text-blue-800 dark:text-blue-200 capitalize">
                {businessProfile.growthStage}
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Automation Readiness:</span>
              <div className="text-blue-800 dark:text-blue-200">
                {businessProfile.automationReadiness}%
              </div>
            </div>
          </div>
        </div>

        {/* Investment Confidence */}
        {roiProjections.confidence >= 80 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
              ⭐ High Confidence Investment
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Based on your business profile and industry benchmarks, we have high confidence ({roiProjections.confidence}%) 
              in these ROI projections. Your business shows strong indicators for successful automation adoption.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}