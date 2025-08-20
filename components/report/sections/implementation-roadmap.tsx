'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Calendar, DollarSign, CheckCircle } from 'lucide-react'
import { RoadmapPhase, AutomationOpportunity } from '@/lib/report/types'

interface ImplementationRoadmapProps {
  roadmap: RoadmapPhase[]
  opportunities: AutomationOpportunity[]
}

export function ImplementationRoadmapSection({ roadmap, opportunities }: ImplementationRoadmapProps) {
  const getOpportunityById = (id: string) => {
    return opportunities.find(opp => opp.id === id)
  }

  const getTotalROI = () => {
    return roadmap.reduce((sum, phase) => sum + phase.expectedROI, 0)
  }

  const getPhaseColor = (month: number) => {
    const colors = [
      'border-blue-200 bg-blue-50 dark:bg-blue-900/20',
      'border-green-200 bg-green-50 dark:bg-green-900/20',
      'border-purple-200 bg-purple-50 dark:bg-purple-900/20',
      'border-orange-200 bg-orange-50 dark:bg-orange-900/20'
    ]
    return colors[month - 1] || colors[0]
  }

  if (roadmap.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Implementation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Implementation roadmap will be generated based on selected opportunities.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
          90-Day Implementation Roadmap
        </CardTitle>
        <p className="text-muted-foreground">
          Strategic phased approach to maximize success and minimize disruption
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Roadmap Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {roadmap.length} phases
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Over 90 days
            </div>
          </div>
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${getTotalROI().toLocaleString()}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Monthly ROI target
            </div>
          </div>
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {opportunities.length}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              Total opportunities
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="space-y-8">
            {roadmap.map((phase, index) => (
              <div key={phase.id} className="relative flex items-start">
                
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800 z-10"></div>
                
                {/* Phase Content */}
                <div className={`ml-16 w-full border rounded-lg p-5 ${getPhaseColor(phase.month)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold flex items-center">
                        <span className="mr-2">Month {phase.month}:</span>
                        {phase.name}
                      </h4>
                      <p className="text-muted-foreground mt-1">
                        {phase.description}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                      ${phase.expectedROI.toLocaleString()}/month ROI
                    </Badge>
                  </div>

                  {/* Phase Opportunities */}
                  <div className="space-y-3">
                    {phase.opportunities.map((opportunityId) => {
                      const opportunity = getOpportunityById(opportunityId)
                      if (!opportunity) return null

                      return (
                        <div 
                          key={opportunityId}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold">{opportunity.title}</h5>
                            <Badge className={
                              opportunity.implementationEffort === 'low' ? 'bg-green-100 text-green-800' :
                              opportunity.implementationEffort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {opportunity.implementationEffort} effort
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {opportunity.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Monthly Savings</span>
                              <div className="font-semibold text-green-600">
                                ${opportunity.monthlySavings.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Implementation Cost</span>
                              <div className="font-semibold">
                                ${opportunity.implementationCost.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Time to Value</span>
                              <div className="font-semibold text-blue-600">
                                {opportunity.timeToValue} weeks
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">ROI</span>
                              <div className="font-semibold text-purple-600">
                                {opportunity.roiProjection}%
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Phase Timeline */}
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <h6 className="font-medium mb-2">Key Milestones & Timeline</h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Week 1-2</span>
                        <div>Planning & Setup</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Week 3-6</span>
                        <div>Implementation & Testing</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Week 7-8</span>
                        <div>Optimization & Measurement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cumulative Impact */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">
            📈 Cumulative Impact Projection
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roadmap.map((phase, index) => {
              const cumulativeROI = roadmap.slice(0, index + 1).reduce((sum, p) => sum + p.expectedROI, 0)
              return (
                <div key={phase.id} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    Month {phase.month}
                  </div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    ${cumulativeROI.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">
                    Monthly savings
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-sm text-green-700 dark:text-green-300">
              <span className="font-semibold">Total first year projected savings:</span>{' '}
              ${(getTotalROI() * 12).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Success Factors */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
            🔑 Success Factors for Implementation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Start with quick wins to build momentum</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Ensure team training and adoption support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Monitor metrics and optimize continuously</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Maintain focus on business value delivery</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Plan for scalability from day one</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Celebrate wins and learn from challenges</span>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}