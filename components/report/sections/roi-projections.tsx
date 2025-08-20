'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign, Clock, Target, AlertTriangle } from 'lucide-react'
import { ROIProjections, BusinessProfile } from '@/lib/report/types'

interface ROIProjectionsProps {
  projections: ROIProjections
  businessProfile: BusinessProfile
}

export function ROIProjectionsSection({ projections, businessProfile }: ROIProjectionsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100'
    if (confidence >= 60) return 'text-blue-600 bg-blue-100'
    return 'text-yellow-600 bg-yellow-100'
  }

  const getConfidenceDescription = (confidence: number) => {
    if (confidence >= 80) return 'High Confidence'
    if (confidence >= 60) return 'Medium Confidence'
    return 'Conservative Estimate'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(Math.abs(amount))
  }

  const formatPercentage = (percentage: number) => {
    return `${Math.round(percentage)}%`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
            ROI Projections & Financial Impact
          </div>
          <Badge className={`${getConfidenceColor(projections.confidence)} px-3 py-1`}>
            {getConfidenceDescription(projections.confidence)} ({projections.confidence}%)
          </Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Detailed financial projections based on your business profile and industry benchmarks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
            <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(projections.firstYearSavings)}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              {projections.firstYearSavings >= 0 ? 'First Year Net Savings' : 'Investment Recovery'}
            </div>
            {projections.firstYearSavings < 0 && (
              <div className="text-xs text-green-600 mt-1">
                Positive ROI in Year 2
              </div>
            )}
          </div>

          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
            <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(projections.timeToPayback)} months
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Payback Period
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Break-even point
            </div>
          </div>

          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
            <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {formatPercentage(projections.netROI)}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              First Year ROI
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Return on investment
            </div>
          </div>

          <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
            <Target className="h-10 w-10 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {formatCurrency(projections.threeYearValue)}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300">
              Three Year Value
            </div>
            <div className="text-xs text-orange-600 mt-1">
              Total projected value
            </div>
          </div>
        </div>

        {/* Investment Breakdown */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-4">Investment Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h5 className="font-medium text-red-700 dark:text-red-300 mb-3">Initial Investment</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Implementation Costs</span>
                  <span className="font-semibold">{formatCurrency(projections.implementationCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Setup & Training</span>
                  <span className="font-semibold">{formatCurrency(projections.implementationCost * 0.2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Investment</span>
                  <span className="text-red-600">{formatCurrency(projections.implementationCost * 1.2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">Annual Returns</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Year 1 Savings</span>
                  <span className="font-semibold">{formatCurrency(projections.firstYearSavings + projections.implementationCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Year 2 Savings</span>
                  <span className="font-semibold">{formatCurrency((projections.firstYearSavings + projections.implementationCost) * 1.1)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>3-Year Total</span>
                  <span className="text-green-600">{formatCurrency(projections.threeYearValue + projections.implementationCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Timeline */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-blue-800 dark:text-blue-200">
            📊 ROI Timeline & Milestones
          </h4>
          
          <div className="space-y-4">
            {/* Timeline visualization */}
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300"></div>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { month: 0, label: 'Start', amount: -projections.implementationCost, color: 'red' },
                  { month: Math.round(projections.timeToPayback), label: 'Break Even', amount: 0, color: 'yellow' },
                  { month: 12, label: 'Year 1', amount: projections.firstYearSavings, color: 'green' },
                  { month: 36, label: 'Year 3', amount: projections.threeYearValue, color: 'blue' }
                ].map((milestone, index) => (
                  <div key={index} className="text-center relative">
                    <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      milestone.color === 'red' ? 'bg-red-500' :
                      milestone.color === 'yellow' ? 'bg-yellow-500' :
                      milestone.color === 'green' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="text-sm font-medium">{milestone.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Month {milestone.month}</div>
                    <div className={`text-sm font-semibold ${
                      milestone.amount < 0 ? 'text-red-600' :
                      milestone.amount === 0 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {milestone.amount === 0 ? '$0' : formatCurrency(milestone.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Risk Assessment & Confidence Factors
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Factors Supporting High ROI</h5>
              <div className="space-y-2 text-sm">
                {businessProfile.monthlyRevenue > 30000 && (
                  <div className="flex items-center text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Strong revenue foundation ($${businessProfile.monthlyRevenue.toLocaleString()}/month)
                  </div>
                )}
                {businessProfile.automationReadiness > 70 && (
                  <div className="flex items-center text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    High automation readiness ({businessProfile.automationReadiness}%)
                  </div>
                )}
                {businessProfile.teamSize > 1 && (
                  <div className="flex items-center text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Team structure supports automation adoption
                  </div>
                )}
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Industry-proven automation solutions available
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Risk Mitigation Strategies</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Start with quick wins to build confidence
                </div>
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Phased implementation reduces risk
                </div>
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Comprehensive training and support included
                </div>
                <div className="flex items-center text-blue-700 dark:text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Monthly monitoring and optimization
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm">
              <span className="font-medium">Confidence Level: </span>
              <span className={`font-semibold ${
                projections.confidence >= 80 ? 'text-green-600' :
                projections.confidence >= 60 ? 'text-blue-600' :
                'text-yellow-600'
              }`}>
                {projections.confidence}%
              </span>
              {projections.confidence >= 80 && (
                <span className="text-green-600 ml-2">
                  - High confidence based on business profile and industry benchmarks
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 rounded-lg p-6">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
            📈 Industry Benchmark Comparison
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">185%</div>
              <div className="text-sm text-indigo-700 dark:text-indigo-300">Industry Average ROI</div>
              <div className="text-xs text-indigo-600 mt-1">
                Your projection: {formatPercentage(projections.netROI)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">6.5 months</div>
              <div className="text-sm text-indigo-700 dark:text-indigo-300">Average Payback</div>
              <div className="text-xs text-indigo-600 mt-1">
                Your projection: {Math.round(projections.timeToPayback)} months
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">87%</div>
              <div className="text-sm text-indigo-700 dark:text-indigo-300">Success Rate</div>
              <div className="text-xs text-indigo-600 mt-1">
                With proper implementation
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}