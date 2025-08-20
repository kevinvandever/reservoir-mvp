'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Zap, Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'
import { AutomationOpportunity } from '@/lib/report/types'

interface QuickWinsProps {
  quickWins: AutomationOpportunity[]
}

export function QuickWinsSection({ quickWins }: QuickWinsProps) {
  if (quickWins.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-6 w-6 mr-2 text-yellow-600" />
            Quick Wins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No immediate quick wins identified. Focus on building foundational automation systems first.
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalMonthlySavings = quickWins.reduce((sum, win) => sum + win.monthlySavings, 0)
  const avgImplementationTime = quickWins.reduce((sum, win) => sum + win.timeToValue, 0) / quickWins.length

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-6 w-6 mr-2 text-yellow-600" />
          Quick Wins - Start Here for Immediate Impact
        </CardTitle>
        <p className="text-yellow-700 dark:text-yellow-300">
          These high-impact, low-effort opportunities can be implemented quickly to generate immediate ROI 
          and fund larger automation projects.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${totalMonthlySavings.toLocaleString()}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Monthly Savings Potential
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(avgImplementationTime)} weeks
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Average Time to Value
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {quickWins.length}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              Ready to Implement
            </div>
          </div>
        </div>

        {/* Quick Win Opportunities */}
        <div className="space-y-4">
          {quickWins.map((opportunity, index) => (
            <div 
              key={opportunity.id} 
              className="bg-white dark:bg-gray-800 border border-yellow-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      Quick Win
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {opportunity.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ${opportunity.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300">
                    Monthly Savings
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {opportunity.timeToValue} weeks
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    Time to Value
                  </div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-lg font-bold text-red-600">
                    ${opportunity.implementationCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-red-700 dark:text-red-300">
                    Implementation Cost
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {opportunity.roiProjection}%
                  </div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">
                    ROI Projection
                  </div>
                </div>
              </div>

              {/* Success Preview */}
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                <h5 className="font-medium text-sm mb-2">Expected Outcomes:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {opportunity.successMetrics.slice(0, 2).map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Category:</span> {opportunity.category}
                </div>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  Start Implementation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Sequence */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            🎯 Recommended Implementation Sequence
          </h4>
          <div className="space-y-2">
            {quickWins.map((opportunity, index) => (
              <div key={opportunity.id} className="flex items-center text-sm">
                <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  {index + 1}
                </div>
                <span className="text-yellow-700 dark:text-yellow-300">
                  <span className="font-medium">{opportunity.title}</span> - 
                  Start week {index * Math.ceil(opportunity.timeToValue / 2) + 1}, 
                  savings begin week {index * Math.ceil(opportunity.timeToValue / 2) + opportunity.timeToValue}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-yellow-800 dark:text-yellow-200">
                Total first 90 days impact:
              </span>
              <span className="text-xl font-bold text-green-600">
                ${(totalMonthlySavings * 3).toLocaleString()} saved
              </span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}