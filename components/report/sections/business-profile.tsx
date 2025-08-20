'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { BusinessProfile, CompetitiveInsights } from '@/lib/report/types'

interface BusinessProfileProps {
  profile: BusinessProfile
  competitiveAnalysis: CompetitiveInsights
}

export function BusinessProfileSection({ profile, competitiveAnalysis }: BusinessProfileProps) {
  const formatRevenue = (revenue: number) => {
    if (revenue === 0) return 'Not specified'
    return `$${revenue.toLocaleString()}/month`
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'leader': return 'text-green-600 bg-green-100'
      case 'follower': return 'text-blue-600 bg-blue-100'
      case 'laggard': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPositionDescription = (position: string, percentile: number) => {
    switch (position) {
      case 'leader': 
        return `You're operating in the top ${100 - percentile}% of businesses in automation maturity`
      case 'follower': 
        return `You're performing at the ${percentile}th percentile with room to reach industry leaders`
      case 'laggard': 
        return `Your automation adoption is below average but represents significant opportunity`
      default: 
        return `You're positioned at the ${percentile}th percentile in your industry`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-6 w-6 mr-2 text-blue-600" />
          Business Profile Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Company Overview */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company Overview</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-600 dark:text-gray-300">Industry</span>
                <span className="capitalize font-semibold">
                  {profile.industry.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-600 dark:text-gray-300">Business Type</span>
                <span className="capitalize">
                  {profile.businessType.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-600 dark:text-gray-300">Team Size</span>
                <span>
                  {profile.teamSize} {profile.teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-600 dark:text-gray-300">Monthly Revenue</span>
                <span className="font-semibold text-green-600">
                  {formatRevenue(profile.monthlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-600 dark:text-gray-300">Growth Stage</span>
                <Badge className="capitalize">
                  {profile.growthStage}
                </Badge>
              </div>
            </div>
          </div>

          {/* Current Challenges & Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Current State Assessment</h4>
            
            {/* Challenges */}
            <div className="mb-6">
              <h5 className="font-medium mb-3 text-red-700 dark:text-red-300">Primary Challenges</h5>
              <div className="space-y-2">
                {profile.primaryChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-red-700 dark:text-red-300 text-sm">
                      {challenge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Tools */}
            <div className="mb-6">
              <h5 className="font-medium mb-3 text-green-700 dark:text-green-300">Current Tools</h5>
              {profile.currentTools.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.currentTools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                      {tool}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No current automation tools identified</p>
              )}
            </div>

            {/* Time Allocation */}
            {Object.keys(profile.timeSpentOnTasks).length > 0 && (
              <div>
                <h5 className="font-medium mb-3 text-blue-700 dark:text-blue-300">Time Allocation (hours/week)</h5>
                <div className="space-y-2">
                  {Object.entries(profile.timeSpentOnTasks).map(([task, hours]) => (
                    <div key={task} className="flex justify-between items-center">
                      <span className="text-sm capitalize text-gray-600 dark:text-gray-300">
                        {task.replace('_', ' ')}
                      </span>
                      <span className="font-medium text-blue-600">
                        {hours}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Competitive Position */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Competitive Position
            </h4>
            <Badge className={`${getPositionColor(competitiveAnalysis.marketPosition)} text-sm px-3 py-1`}>
              {competitiveAnalysis.marketPosition.charAt(0).toUpperCase() + competitiveAnalysis.marketPosition.slice(1)}
            </Badge>
          </div>
          
          <p className="text-indigo-700 dark:text-indigo-300 mb-4">
            {getPositionDescription(competitiveAnalysis.marketPosition, competitiveAnalysis.percentileRanking)}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-indigo-600">Industry Benchmark Score</span>
              <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
                {competitiveAnalysis.industryBenchmark}/100
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-indigo-600">Your Percentile Ranking</span>
              <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
                {competitiveAnalysis.percentileRanking}th
              </div>
            </div>
          </div>

          {competitiveAnalysis.competitorAdvantages.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Key Competitive Advantages to Pursue
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {competitiveAnalysis.competitorAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-indigo-700 dark:text-indigo-300">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Automation Readiness */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
              Automation Readiness Score
            </h5>
            <span className="text-xl font-bold text-yellow-600">
              {profile.automationReadiness}%
            </span>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
            <div 
              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${profile.automationReadiness}%` }}
            ></div>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            {profile.automationReadiness >= 80 ? 
              'Excellent readiness for advanced automation implementation' :
              profile.automationReadiness >= 60 ?
              'Good foundation for automation with some preparation needed' :
              'Building blocks in place but will need focused preparation for automation success'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}