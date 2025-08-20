'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Clock, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { AutomationOpportunity, BusinessProfile } from '@/lib/report/types'

interface OpportunityAssessmentProps {
  opportunities: AutomationOpportunity[]
  businessProfile: BusinessProfile
}

export function OpportunityAssessmentSection({ opportunities, businessProfile }: OpportunityAssessmentProps) {
  const [expandedOpportunities, setExpandedOpportunities] = useState<Set<string>>(new Set())

  const toggleOpportunity = (id: string) => {
    const newExpanded = new Set(expandedOpportunities)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedOpportunities(newExpanded)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200 text-red-800'
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800'
      case 'low': return 'bg-green-100 border-green-200 text-green-800'
      default: return 'bg-gray-100 border-gray-200 text-gray-800'
    }
  }

  const getEffortBadge = (effort: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    return colors[effort as keyof typeof colors] || colors.medium
  }

  const priorityOrder = { high: 3, medium: 2, low: 1 }
  const sortedOpportunities = opportunities.sort((a, b) => 
    priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
  )

  const groupedOpportunities = {
    high: sortedOpportunities.filter(o => o.priority === 'high'),
    medium: sortedOpportunities.filter(o => o.priority === 'medium'),
    low: sortedOpportunities.filter(o => o.priority === 'low')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-6 w-6 mr-2 text-blue-600" />
          Automation Opportunity Assessment
        </CardTitle>
        <p className="text-muted-foreground">
          Personalized recommendations based on your business profile and industry best practices
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          
          {/* High Priority Opportunities */}
          {groupedOpportunities.high.length > 0 && (
            <div className={`border rounded-lg p-4 ${getPriorityColor('high')}`}>
              <h4 className="font-semibold mb-4 flex items-center">
                🔥 High Priority - Implement First
                <Badge className="ml-2 bg-red-600 text-white">
                  {groupedOpportunities.high.length} opportunities
                </Badge>
              </h4>
              <div className="space-y-4">
                {groupedOpportunities.high.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isExpanded={expandedOpportunities.has(opportunity.id)}
                    onToggle={() => toggleOpportunity(opportunity.id)}
                    businessProfile={businessProfile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority Opportunities */}
          {groupedOpportunities.medium.length > 0 && (
            <div className={`border rounded-lg p-4 ${getPriorityColor('medium')}`}>
              <h4 className="font-semibold mb-4 flex items-center">
                ⚡ Medium Priority - Next Quarter
                <Badge className="ml-2 bg-yellow-600 text-white">
                  {groupedOpportunities.medium.length} opportunities
                </Badge>
              </h4>
              <div className="space-y-4">
                {groupedOpportunities.medium.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isExpanded={expandedOpportunities.has(opportunity.id)}
                    onToggle={() => toggleOpportunity(opportunity.id)}
                    businessProfile={businessProfile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Low Priority Opportunities */}
          {groupedOpportunities.low.length > 0 && (
            <div className={`border rounded-lg p-4 ${getPriorityColor('low')}`}>
              <h4 className="font-semibold mb-4 flex items-center">
                📋 Lower Priority - Future Consideration
                <Badge className="ml-2 bg-green-600 text-white">
                  {groupedOpportunities.low.length} opportunities
                </Badge>
              </h4>
              <div className="space-y-4">
                {groupedOpportunities.low.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isExpanded={expandedOpportunities.has(opportunity.id)}
                    onToggle={() => toggleOpportunity(opportunity.id)}
                    businessProfile={businessProfile}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  )
}

interface OpportunityCardProps {
  opportunity: AutomationOpportunity
  isExpanded: boolean
  onToggle: () => void
  businessProfile: BusinessProfile
}

function OpportunityCard({ opportunity, isExpanded, onToggle, businessProfile }: OpportunityCardProps) {
  const getEffortBadge = (effort: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    return colors[effort as keyof typeof colors] || colors.medium
  }

  const formatTimeToValue = (weeks: number) => {
    if (weeks < 4) return `${weeks} weeks`
    return `${Math.round(weeks / 4)} months`
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full p-4 justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-start justify-between w-full">
              <div className="text-left flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h5 className="font-semibold text-base">{opportunity.title}</h5>
                  <Badge className={getEffortBadge(opportunity.implementationEffort)}>
                    {opportunity.implementationEffort} effort
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {opportunity.description}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span className="font-semibold text-green-600">
                      ${opportunity.monthlySavings.toLocaleString()}/month
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-blue-600">
                      {formatTimeToValue(opportunity.timeToValue)} to value
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-purple-600">
                      {opportunity.roiProjection}% ROI
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="border-t p-4 space-y-4">
            
            {/* Impact Score */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="font-medium">Impact Score</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${opportunity.impactScore}%` }}
                  ></div>
                </div>
                <span className="font-bold text-blue-600">{opportunity.impactScore}/100</span>
              </div>
            </div>

            {/* Before/After Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                <h6 className="font-medium text-red-800 dark:text-red-200 mb-2">Before (Current State)</h6>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {opportunity.beforeScenario}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg">
                <h6 className="font-medium text-green-800 dark:text-green-200 mb-2">After (Automated)</h6>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {opportunity.afterScenario}
                </p>
              </div>
            </div>

            {/* Success Metrics */}
            <div>
              <h6 className="font-medium mb-2">Success Metrics</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {opportunity.successMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Details */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Implementation Cost</span>
                  <div className="font-semibold">${opportunity.implementationCost.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Monthly Savings</span>
                  <div className="font-semibold text-green-600">${opportunity.monthlySavings.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Payback Period</span>
                  <div className="font-semibold">
                    {Math.round(opportunity.implementationCost / opportunity.monthlySavings)} months
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Category</span>
                  <div className="font-semibold">{opportunity.category}</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Implementation Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}