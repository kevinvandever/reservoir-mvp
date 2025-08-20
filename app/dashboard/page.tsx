'use client'

import { useAuth } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  MessageCircle, 
  Target, 
  TrendingUp, 
  BarChart3,
  Clock,
  DollarSign,
  Download,
  Share,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Mock report data for YOLO demonstration
const mockReport = {
  executiveSummary: {
    automationScore: 8.5,
    annualSavings: 45000,
    weeklyTimeSavings: 15,
    efficiencyGain: 35
  },
  opportunities: [
    {
      title: 'Automated Lead Scoring',
      description: 'Automatically score and prioritize leads based on behavior and demographics',
      priority: 'high',
      timeSaved: 8,
      revenueImpact: 2500,
      difficulty: 'medium',
      implementationTime: '2-3 weeks'
    },
    {
      title: 'Customer Email Sequences',
      description: 'Set up automated nurture sequences for different customer segments',
      priority: 'high',
      timeSaved: 5,
      revenueImpact: 1800,
      difficulty: 'easy',
      implementationTime: '1 week'
    }
  ]
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showReport, setShowReport] = useState(false)
  
  const completed = searchParams.get('completed')
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth-test?redirect=/dashboard')
      return
    }
    
    if (completed === 'questionnaire') {
      // Simulate report generation
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        setShowReport(true)
      }, 3000)
    }
  }, [user, loading, completed, router])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!user) {
    return null
  }
  
  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <CardTitle>Generating Your Business Analysis</CardTitle>
            <CardDescription>
              Our AI is analyzing your responses and creating your personalized report...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={85} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              Identifying automation opportunities...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (showReport) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Your Business Analysis Report</h1>
                <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {mockReport.executiveSummary.automationScore}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Automation Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    ${mockReport.executiveSummary.annualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Savings Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {mockReport.executiveSummary.weeklyTimeSavings}h
                  </div>
                  <div className="text-sm text-muted-foreground">Weekly Time Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    +{mockReport.executiveSummary.efficiencyGain}%
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Top Automation Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockReport.opportunities.map((opportunity, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{opportunity.title}</h4>
                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      opportunity.priority === 'high' ? 'bg-red-100 text-red-800' :
                      opportunity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {opportunity.priority} priority
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Clock className="h-4 w-4 inline mr-1" />
                      {opportunity.timeSaved}h/week saved
                    </div>
                    <div>
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      ${opportunity.revenueImpact}/month impact
                    </div>
                    <div>
                      <Zap className="h-4 w-4 inline mr-1" />
                      {opportunity.difficulty} difficulty
                    </div>
                    <div>
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {opportunity.implementationTime}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg opacity-90 mb-6">
                Start implementing these automations today with Reservoir's guided workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.email?.split('@')[0]}!</h1>
        <p className="text-muted-foreground">
          Ready to discover automation opportunities for your business?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Business Discovery</CardTitle>
                <CardDescription>Complete our AI questionnaire</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Answer 10 quick questions to get personalized automation recommendations.
            </p>
            <Button asChild className="w-full">
              <Link href="/questionnaire">
                Start Questionnaire
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Browse Automations</CardTitle>
                <CardDescription>Explore our automation library</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover proven automation solutions for your industry.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/automations">
                Browse Library
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your automation journey</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor your implementation progress and ROI.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}