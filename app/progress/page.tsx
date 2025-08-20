'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp,
  Clock, 
  DollarSign, 
  Target,
  Award,
  Calendar,
  CheckCircle,
  Star,
  BarChart3,
  Users,
  Zap,
  Trophy,
  Medal,
  Crown,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { enhancedAIService } from '@/lib/questionnaire/enhanced-ai-service'
import { SessionManager } from '@/lib/access/session-manager'
import { ProgressMetrics } from '@/lib/questionnaire/question-bank-types'

// Mock progress data for YOLO demonstration - Story 2.6
const mockProgress = {
  overview: {
    totalAutomations: 12,
    implemented: 8,
    inProgress: 3,
    planned: 1,
    totalTimeSaved: 32, // hours per week
    totalRevenue: 8400, // per month
    efficiency: 67 // percentage
  },
  automations: [
    {
      id: '1',
      title: 'Email Marketing Automation',
      status: 'completed',
      progress: 100,
      timeSaved: 8,
      revenueImpact: 2200,
      implementedDate: '2025-01-15',
      rating: 5,
      feedback: 'Incredible time saver! Increased our email engagement by 40%.'
    },
    {
      id: '2',
      title: 'Lead Scoring System',
      status: 'completed',
      progress: 100,
      timeSaved: 6,
      revenueImpact: 1800,
      implementedDate: '2025-01-20',
      rating: 4,
      feedback: 'Good automation, but took longer to set up than expected.'
    },
    {
      id: '3',
      title: 'Customer Support Chatbot',
      status: 'in_progress',
      progress: 75,
      timeSaved: 12,
      revenueImpact: 2800,
      estimatedCompletion: '2025-02-05'
    },
    {
      id: '4',
      title: 'Invoice Processing',
      status: 'in_progress',
      progress: 45,
      timeSaved: 4,
      revenueImpact: 800,
      estimatedCompletion: '2025-02-15'
    },
    {
      id: '5',
      title: 'Social Media Scheduler',
      status: 'planned',
      progress: 0,
      timeSaved: 3,
      revenueImpact: 600,
      estimatedStart: '2025-02-20'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'First Automation',
      description: 'Completed your first automation implementation',
      icon: Target,
      earned: true,
      earnedDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Time Saver',
      description: 'Saved 10+ hours per week through automation',
      icon: Clock,
      earned: true,
      earnedDate: '2025-01-22'
    },
    {
      id: '3',
      title: 'Revenue Booster',
      description: 'Generated $5000+ monthly revenue impact',
      icon: DollarSign,
      earned: true,
      earnedDate: '2025-01-25'
    },
    {
      id: '4',
      title: 'Automation Expert',
      description: 'Implemented 10+ automations successfully',
      icon: Award,
      earned: false
    },
    {
      id: '5',
      title: 'Efficiency Master',
      description: 'Achieved 80%+ business efficiency score',
      icon: Crown,
      earned: false
    }
  ],
  weeklyStats: [
    { week: 'Week 1', timeSaved: 5, revenue: 1200 },
    { week: 'Week 2', timeSaved: 12, revenue: 2400 },
    { week: 'Week 3', timeSaved: 20, revenue: 4100 },
    { week: 'Week 4', timeSaved: 32, revenue: 8400 }
  ]
}

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')
  const [realProgress, setRealProgress] = useState<ProgressMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRealData, setShowRealData] = useState(false)
  
  const accessSession = SessionManager.getSession()
  const memberName = accessSession?.memberData?.name
  
  useEffect(() => {
    // Try to load real progress data
    loadRealProgress()
  }, [])
  
  const loadRealProgress = () => {
    try {
      // For now, we'll try to get session ID from any available source
      const sessionId = typeof window !== 'undefined' ? localStorage.getItem('questionnaire_session_id') : null
      
      if (sessionId) {
        const progress = enhancedAIService.getProgress(sessionId)
        if (progress) {
          setRealProgress(progress)
          console.log('📊 Loaded real progress:', progress)
        }
      }
    } catch (err) {
      console.error('Error loading progress:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'planned': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const renderRating = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }
  
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-primary" />
            {memberName ? `${memberName}'s Progress` : 'Progress Tracking'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor your automation journey and measure business impact.
          </p>
          
          {/* Real Progress Toggle */}
          <div className="mt-4 flex items-center gap-4">
            <Button 
              onClick={() => setShowRealData(!showRealData)} 
              variant="outline" 
              size="sm"
              disabled={!realProgress}
            >
              {showRealData ? 'Show Demo Data' : 'Show Questionnaire Progress'}
            </Button>
            {realProgress && (
              <Badge variant="secondary">
                ✅ Questionnaire: {realProgress.overallProgress}% complete
              </Badge>
            )}
            {!realProgress && (
              <Badge variant="outline">
                <AlertCircle className="h-3 w-3 mr-1" />
                No questionnaire data
              </Badge>
            )}
          </div>
        </div>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="All Time">All Time</option>
        </select>
      </div>
      
      {/* Real Questionnaire Progress */}
      {showRealData && realProgress && (
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Questionnaire Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {realProgress.overallProgress}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <Progress value={realProgress.overallProgress} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">
                  {realProgress.questionsAnswered}
                </div>
                <p className="text-sm text-muted-foreground">
                  of {realProgress.totalQuestions} Questions
                </p>
                <div className="text-xs text-green-600 mt-1">
                  {realProgress.canGenerateReport ? '✅ Report Ready' : `${Math.max(0, 35 - realProgress.questionsAnswered)} more for report`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">
                  {Math.ceil(realProgress.estimatedTimeRemaining)}
                </div>
                <p className="text-sm text-muted-foreground">Minutes Left</p>
                <div className="text-xs mt-1">
                  {realProgress.requiredSectionsComplete ? '✅ Required Done' : '⏳ Still Required'}
                </div>
              </div>
            </div>
            
            {/* Section Progress */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Section Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {realProgress.sectionProgress.map((section) => (
                  <div key={section.section} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate">{section.name}</span>
                      <Badge variant={section.isComplete ? "default" : section.isActive ? "secondary" : "outline"} className="text-xs">
                        {section.isComplete ? 'Done' : section.isActive ? 'Active' : `${section.completed}%`}
                      </Badge>
                    </div>
                    <Progress value={section.completed} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {section.questionsAnswered}/{section.totalQuestions} • {section.weight}% weight
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Mock Data - Show when real data is not displayed */}
      {!showRealData && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Automations</p>
                    <p className="text-3xl font-bold">{mockProgress.overview.totalAutomations}</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4">
                  <Progress value={(mockProgress.overview.implemented / mockProgress.overview.totalAutomations) * 100} />
                  <p className="text-xs text-muted-foreground mt-2">
                    {mockProgress.overview.implemented} completed, {mockProgress.overview.inProgress} in progress
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                    <p className="text-3xl font-bold">{mockProgress.overview.totalTimeSaved}h</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Per week • {mockProgress.overview.totalTimeSaved * 4}h per month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue Impact</p>
                    <p className="text-3xl font-bold">${mockProgress.overview.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Per month • ${(mockProgress.overview.totalRevenue * 12).toLocaleString()} annually
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency Score</p>
                    <p className="text-3xl font-bold">{mockProgress.overview.efficiency}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-4">
                  <Progress value={mockProgress.overview.efficiency} />
                  <p className="text-xs text-muted-foreground mt-2">
                    +23% from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Automation Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Implementation Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProgress.automations.map((automation) => (
                <div key={automation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{automation.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(automation.status)}>
                          {automation.status.replace('_', ' ')}
                        </Badge>
                        {automation.status === 'completed' && (
                          <div className="flex items-center">
                            {renderRating(automation.rating || 0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{automation.progress}%</div>
                      <Progress value={automation.progress} className="w-24 mt-1" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <Clock className="h-4 w-4 inline mr-1" />
                      {automation.timeSaved}h/week saved
                    </div>
                    <div>
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      ${automation.revenueImpact}/month
                    </div>
                    <div>
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {automation.status === 'completed' 
                        ? `Completed ${automation.implementedDate}`
                        : automation.status === 'in_progress'
                        ? `Est. ${automation.estimatedCompletion}`
                        : `Starting ${automation.estimatedStart}`
                      }
                    </div>
                    <div>
                      {automation.status === 'completed' && (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {automation.feedback && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-sm">
                      <strong>Your feedback:</strong> {automation.feedback}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
      
      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Actual vs Estimated Benefits</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Estimated Time Savings:</span>
                  <span>28h/week</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Actual Time Savings:</span>
                  <span>32h/week (+14%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Revenue Impact:</span>
                  <span>$7,200/month</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Actual Revenue Impact:</span>
                  <span>$8,400/month (+17%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Weekly Progress Trend</h4>
              <div className="space-y-2">
                {mockProgress.weeklyStats.map((week, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{week.week}</span>
                    <div className="flex gap-4">
                      <span>{week.timeSaved}h saved</span>
                      <span className="text-green-600">${week.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}