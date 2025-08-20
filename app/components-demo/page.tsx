'use client'

import { useState } from 'react'
import { AutomationCard } from '@/components/cards/automation-card'
import { MetricCard } from '@/components/cards/metric-card'
import { QuestionCard } from '@/components/cards/question-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info 
} from 'lucide-react'

export default function ComponentsDemo() {
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionAnswers, setQuestionAnswers] = useState<any[]>([])

  const sampleQuestions = [
    {
      id: '1',
      type: 'single-choice' as const,
      title: 'What is your team size?',
      description: 'This helps us recommend appropriate automations for your business.',
      options: [
        { value: 'solo', label: 'Just me (Solo entrepreneur)' },
        { value: 'small', label: 'Small team (2-10 people)' },
        { value: 'medium', label: 'Medium team (11-50 people)' },
        { value: 'large', label: 'Large team (50+ people)' }
      ],
      required: true
    },
    {
      id: '2',
      type: 'scale' as const,
      title: 'How important is automation to your business?',
      description: 'Rate from 1 (not important) to 10 (extremely important)',
      min: 1,
      max: 10,
      required: true
    },
    {
      id: '3',
      type: 'text' as const,
      title: 'What are your biggest time-consuming tasks?',
      description: 'Describe the manual processes that take up most of your time.',
      required: false
    }
  ]

  const handleQuestionNext = (answer: any) => {
    const newAnswers = [...questionAnswers]
    newAnswers[currentQuestion] = answer
    setQuestionAnswers(newAnswers)
    
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      toast({
        title: "Questionnaire Complete!",
        description: "Thank you for completing the demo questionnaire.",
      })
    }
  }

  const handleQuestionPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const showToast = (type: 'default' | 'success' | 'error') => {
    switch (type) {
      case 'success':
        toast({
          title: "Success!",
          description: "This is a success toast notification.",
        })
        break
      case 'error':
        toast({
          title: "Error",
          description: "This is an error toast notification.",
          variant: "destructive",
        })
        break
      default:
        toast({
          title: "Notification",
          description: "This is a default toast notification.",
        })
    }
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Component Library Demo</h1>
        <p className="text-muted-foreground">
          Showcase of all UI components built with shadcn/ui and our custom design system.
        </p>
      </div>

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Card Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AutomationCard
                title="Email Marketing Automation"
                description="Set up automated email sequences that nurture leads and convert them into customers using behavioral triggers."
                category="Marketing"
                difficulty="medium"
                estimatedTime={180}
                roiPotential={85.5}
                businessSize={['small-team', 'large-team']}
                tags={['email marketing', 'lead nurturing', 'automation', 'conversion']}
                popularityScore={4.7}
                onLearnMore={() => showToast('default')}
                onStart={() => showToast('success')}
              />
              
              <AutomationCard
                title="Social Media Scheduler"
                description="Automate your social media posting across multiple platforms with AI-generated content suggestions."
                category="Social Media"
                difficulty="easy"
                estimatedTime={60}
                roiPotential={92.3}
                businessSize={['solo', 'small-team']}
                tags={['social media', 'content creation', 'scheduling', 'AI']}
                popularityScore={4.5}
                onLearnMore={() => showToast('default')}
                onStart={() => showToast('success')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Automations"
                value={24}
                description="Active automations"
                icon={TrendingUp}
                trend={{ value: 12, isPositive: true }}
              />
              <MetricCard
                title="Time Saved"
                value="156h"
                description="This month"
                icon={Clock}
                trend={{ value: 8, isPositive: true }}
              />
              <MetricCard
                title="Team Members"
                value={12}
                description="Using platform"
                icon={Users}
              />
              <MetricCard
                title="ROI Generated"
                value="$48.2k"
                description="Estimated value"
                icon={DollarSign}
                trend={{ value: 23, isPositive: true }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
            
            <div className="max-w-4xl">
              <QuestionCard
                question={sampleQuestions[currentQuestion]}
                currentStep={currentQuestion + 1}
                totalSteps={sampleQuestions.length}
                onNext={handleQuestionNext}
                onPrevious={currentQuestion > 0 ? handleQuestionPrevious : undefined}
                value={questionAnswers[currentQuestion]}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Feedback Components</h2>
            
            <div className="space-y-4 max-w-2xl">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert to provide context or additional details.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your automation has been successfully implemented and is now running.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error processing your request. Please try again.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h3 className="font-medium">Toast Notifications</h3>
                <div className="flex gap-2">
                  <Button onClick={() => showToast('default')}>Default Toast</Button>
                  <Button onClick={() => showToast('success')}>Success Toast</Button>
                  <Button onClick={() => showToast('error')} variant="destructive">Error Toast</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Layout Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>
                    A simple card component with header and content areas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the content area of the card. You can put any content here.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Card with Badges</CardTitle>
                  <CardDescription>
                    Demonstrating different badge variants.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Display</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-medium mb-2">Progress Bars</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Email Setup</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Social Media Integration</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Analytics Setup</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Loading Skeletons</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Interactive Components</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-medium mb-2">Button Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}