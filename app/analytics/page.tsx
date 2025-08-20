'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock, 
  DollarSign, 
  Target,
  Download,
  Share,
  Calendar,
  Star,
  Award,
  Zap,
  Users,
  ArrowUp,
  ArrowDown,
  Filter
} from 'lucide-react'

// Mock analytics data for YOLO demonstration - Story 2.11
const mockAnalytics = {
  overview: {
    totalROI: 340, // percentage
    monthlyRevenue: 12400,
    timeSaved: 45, // hours per week
    automationsActive: 12,
    trend: {
      revenue: 23, // % change
      timeSaved: 18,
      efficiency: 31
    }
  },
  monthlyTrends: [
    { month: 'Jan', revenue: 2400, timeSaved: 8, automations: 2 },
    { month: 'Feb', revenue: 4200, timeSaved: 16, automations: 4 },
    { month: 'Mar', revenue: 6800, timeSaved: 28, automations: 7 },
    { month: 'Apr', revenue: 9200, timeSaved: 36, automations: 9 },
    { month: 'May', revenue: 12400, timeSaved: 45, automations: 12 }
  ],
  topPerformers: [
    {
      id: 1,
      name: 'Email Marketing Automation',
      roi: 450,
      monthlyRevenue: 3200,
      timeSaved: 12,
      status: 'excellent',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Lead Scoring System',
      roi: 320,
      monthlyRevenue: 2800,
      timeSaved: 8,
      status: 'good',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Customer Support Chatbot',
      roi: 280,
      monthlyRevenue: 2400,
      timeSaved: 15,
      status: 'good',
      trend: 'stable'
    },
    {
      id: 4,
      name: 'Social Media Scheduler',
      roi: 180,
      monthlyRevenue: 1200,
      timeSaved: 6,
      status: 'average',
      trend: 'down'
    },
    {
      id: 5,
      name: 'Invoice Processing',
      roi: 150,
      monthlyRevenue: 800,
      timeSaved: 4,
      status: 'average',
      trend: 'up'
    }
  ],
  goals: [
    {
      id: 1,
      title: 'Reach $15k Monthly Revenue',
      current: 12400,
      target: 15000,
      deadline: '2025-06-30',
      status: 'on_track'
    },
    {
      id: 2,
      title: 'Save 50 Hours Per Week',
      current: 45,
      target: 50,
      deadline: '2025-05-31',
      status: 'on_track'
    },
    {
      id: 3,
      title: '15 Active Automations',
      current: 12,
      target: 15,
      deadline: '2025-07-15',
      status: 'behind'
    }
  ],
  weeklyBreakdown: [
    { automation: 'Email Marketing', timeSaved: 12, revenue: 3200 },
    { automation: 'Lead Scoring', timeSaved: 8, revenue: 2800 },
    { automation: 'Support Chatbot', timeSaved: 15, revenue: 2400 },
    { automation: 'Social Media', timeSaved: 6, revenue: 1200 },
    { automation: 'Invoice Processing', timeSaved: 4, revenue: 800 }
  ]
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 3 Months')
  const [showComparison, setShowComparison] = useState(true)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />
      default: return <div className="h-4 w-4" />
    }
  }
  
  const getGoalStatus = (goal: any) => {
    const progress = (goal.current / goal.target) * 100
    if (progress >= 90) return { color: 'text-green-600', status: 'Excellent' }
    if (progress >= 75) return { color: 'text-blue-600', status: 'On Track' }
    if (progress >= 50) return { color: 'text-yellow-600', status: 'Behind' }
    return { color: 'text-red-600', status: 'Critical' }
  }
  
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-primary" />
            Analytics & ROI Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis of your automation performance and business impact.
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last Year">Last Year</option>
            <option value="All Time">All Time</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total ROI</p>
                <p className="text-3xl font-bold text-green-600">{mockAnalytics.overview.totalROI}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{mockAnalytics.overview.trend.revenue}%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-3xl font-bold">${mockAnalytics.overview.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{mockAnalytics.overview.trend.revenue}%</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Saved</p>
                <p className="text-3xl font-bold">{mockAnalytics.overview.timeSaved}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{mockAnalytics.overview.trend.timeSaved}%</span>
              <span className="text-muted-foreground ml-1">per week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Automations</p>
                <p className="text-3xl font-bold">{mockAnalytics.overview.automationsActive}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{mockAnalytics.overview.trend.efficiency}%</span>
              <span className="text-muted-foreground ml-1">efficiency</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              {mockAnalytics.monthlyTrends.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2">
                    <div className="text-sm font-medium">{month.month}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="text-sm text-green-800 font-medium">
                        ${(month.revenue / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-green-600">Revenue</div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <div className="text-sm text-blue-800 font-medium">
                        {month.timeSaved}h
                      </div>
                      <div className="text-xs text-blue-600">Time Saved</div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="text-sm text-purple-800 font-medium">
                        {month.automations}
                      </div>
                      <div className="text-xs text-purple-600">Automations</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Performing Automations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Top Performing Automations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.topPerformers.map((automation, index) => (
              <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                  <div>
                    <h4 className="font-semibold">{automation.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ROI: {automation.roi}%</span>
                      <span>${automation.monthlyRevenue}/mo</span>
                      <span>{automation.timeSaved}h/week saved</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(automation.status)}>
                    {automation.status}
                  </Badge>
                  {getTrendIcon(automation.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Goals Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockAnalytics.goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100
              const statusInfo = getGoalStatus(goal)
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{goal.title}</h4>
                    <Badge variant="outline" className={statusInfo.color}>
                      {statusInfo.status}
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{goal.current} / {goal.target}</span>
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
        
        {/* Weekly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.weeklyBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{item.automation}</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-600" />
                      {item.timeSaved}h
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      ${item.revenue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between font-semibold">
                <span>Total This Week:</span>
                <div className="flex items-center gap-4">
                  <span className="text-blue-600">45h saved</span>
                  <span className="text-green-600">$10,400 generated</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* ROI Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Actual vs Estimated Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-4">Revenue Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated:</span>
                  <span>$9,500/month</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Actual:</span>
                  <span>$12,400/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Performance:</span>
                  <span className="text-green-600 font-medium">+30% better</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-4">Time Savings</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated:</span>
                  <span>38h/week</span>
                </div>
                <div className="flex justify-between font-semibold text-blue-600">
                  <span>Actual:</span>
                  <span>45h/week</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Performance:</span>
                  <span className="text-green-600 font-medium">+18% better</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-4">Implementation Time</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated:</span>
                  <span>8 weeks</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Actual:</span>
                  <span>6 weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Performance:</span>
                  <span className="text-green-600 font-medium">25% faster</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}