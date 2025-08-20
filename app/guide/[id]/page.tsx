'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  Circle,
  Clock,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Play,
  ArrowLeft,
  ArrowRight,
  Flag,
  Star,
  MessageSquare,
  Download
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

// Mock implementation guide data for YOLO demonstration - Story 2.10
const mockGuides = {
  'email-automation': {
    id: 'email-automation',
    title: 'Email Marketing Automation Setup',
    description: 'Complete guide to setting up automated email sequences for customer nurturing',
    estimatedTime: '2-3 hours',
    difficulty: 'Medium',
    totalSteps: 6,
    tools: ['Mailchimp', 'Zapier', 'Google Sheets'],
    expectedROI: '$1,800/month',
    steps: [
      {
        id: 1,
        title: 'Set Up Email Marketing Platform',
        description: 'Create and configure your email marketing account with proper settings',
        timeEstimate: '30 minutes',
        content: `
## Getting Started with Email Automation

First, you'll need to set up your email marketing platform. We recommend Mailchimp for beginners due to its user-friendly interface.

### What You'll Do:
1. Create a Mailchimp account
2. Set up your sender profile
3. Configure DKIM authentication
4. Import your existing contacts

### Why This Matters:
Proper setup ensures high deliverability rates and professional appearance.
        `,
        media: [
          { type: 'image', url: '/guides/mailchimp-setup.png', alt: 'Mailchimp dashboard setup' },
          { type: 'video', url: '/guides/email-setup.mp4', title: 'Setup walkthrough video' }
        ],
        externalLinks: [
          { title: 'Create Mailchimp Account', url: 'https://mailchimp.com/signup', type: 'primary' },
          { title: 'DKIM Setup Guide', url: 'https://mailchimp.com/help/authentication', type: 'secondary' }
        ],
        completed: true,
        notes: ''
      },
      {
        id: 2,
        title: 'Create Customer Segments',
        description: 'Organize your contacts into meaningful groups for targeted messaging',
        timeEstimate: '45 minutes',
        content: `
## Segmenting Your Audience

Effective email automation starts with proper audience segmentation. This allows you to send relevant messages to the right people.

### Recommended Segments:
- **New Subscribers**: People who just joined your list
- **Engaged Users**: Active readers and clickers
- **Potential Customers**: Showed interest but haven't purchased
- **Existing Customers**: Previous purchasers

### Implementation Steps:
1. Create tags for each segment
2. Set up automation rules
3. Import and tag existing contacts
4. Test segment functionality
        `,
        media: [
          { type: 'image', url: '/guides/segmentation.png', alt: 'Email segmentation example' }
        ],
        externalLinks: [
          { title: 'Segmentation Best Practices', url: 'https://mailchimp.com/help/getting-started-audience', type: 'secondary' }
        ],
        completed: true,
        notes: 'Created 4 main segments as recommended'
      },
      {
        id: 3,
        title: 'Design Email Templates',
        description: 'Create professional email templates for your automation sequences',
        timeEstimate: '1 hour',
        content: `
## Designing Effective Email Templates

Your email templates are the foundation of your automation. They should be professional, mobile-friendly, and aligned with your brand.

### Template Types Needed:
- **Welcome Email**: First impression for new subscribers
- **Nurture Series**: Educational content over time
- **Promotional**: Special offers and announcements
- **Re-engagement**: Win back inactive subscribers

### Design Principles:
- Keep it simple and scannable
- Use consistent branding
- Include clear call-to-action buttons
- Optimize for mobile devices
        `,
        media: [
          { type: 'image', url: '/guides/email-templates.png', alt: 'Email template examples' }
        ],
        externalLinks: [
          { title: 'Mailchimp Template Editor', url: 'https://us1.admin.mailchimp.com/templates', type: 'primary' }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 4,
        title: 'Build Automation Workflows',
        description: 'Set up the automated email sequences and triggers',
        timeEstimate: '45 minutes',
        content: `
## Creating Your Automation Workflows

Now you'll connect your segments and templates into automated workflows that run without manual intervention.

### Workflow Types:
1. **Welcome Series**: 3-email sequence for new subscribers
2. **Educational Nurture**: Weekly tips and insights
3. **Abandoned Cart**: Re-engage potential customers
4. **Customer Onboarding**: Help new customers succeed

### Setup Process:
- Define trigger conditions
- Set timing delays between emails
- Configure audience targeting
- Test the complete flow
        `,
        media: [
          { type: 'video', url: '/guides/workflow-setup.mp4', title: 'Workflow creation demo' }
        ],
        externalLinks: [
          { title: 'Automation Builder', url: 'https://us1.admin.mailchimp.com/customer-journey', type: 'primary' }
        ],
        completed: false,
        notes: ''
      },
      {
        id: 5,
        title: 'Test and Launch',
        description: 'Thoroughly test your automation before going live',
        timeEstimate: '30 minutes',
        content: `
## Testing Your Automation

Before launching to your entire list, it's crucial to test every aspect of your automation.

### Testing Checklist:
- [ ] Send test emails to yourself
- [ ] Check mobile rendering
- [ ] Verify all links work
- [ ] Test unsubscribe process
- [ ] Confirm timing delays
- [ ] Review spam score

### Launch Strategy:
1. Start with a small segment
2. Monitor performance for 48 hours
3. Make adjustments if needed
4. Gradually expand to full list
        `,
        completed: false,
        notes: ''
      },
      {
        id: 6,
        title: 'Monitor and Optimize',
        description: 'Track performance and continuously improve your automation',
        timeEstimate: 'Ongoing',
        content: `
## Optimization and Monitoring

Your automation is now live! Regular monitoring and optimization will maximize your results.

### Key Metrics to Track:
- **Open Rates**: Industry average is 20-25%
- **Click Rates**: Aim for 2-5%
- **Conversion Rates**: Track sales/signups
- **Unsubscribe Rates**: Keep under 1%

### Monthly Optimization Tasks:
- Review performance reports
- A/B test subject lines
- Update content based on feedback
- Clean inactive subscribers
        `,
        completed: false,
        notes: ''
      }
    ]
  }
}

export default function ImplementationGuidePage() {
  const params = useParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [notes, setNotes] = useState<{[key: number]: string}>({})
  const [stepCompletion, setStepCompletion] = useState<{[key: number]: boolean}>({})
  
  const guideId = params.id as string
  const guide = mockGuides[guideId as keyof typeof mockGuides]
  
  useEffect(() => {
    if (guide) {
      // Initialize completion state from mock data
      const completion: {[key: number]: boolean} = {}
      const noteData: {[key: number]: string} = {}
      guide.steps.forEach(step => {
        completion[step.id] = step.completed
        noteData[step.id] = step.notes
      })
      setStepCompletion(completion)
      setNotes(noteData)
    }
  }, [guide])
  
  if (!guide) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The implementation guide you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/automations')}>
              Browse Automations
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  const currentStepData = guide.steps.find(step => step.id === currentStep)
  const completedSteps = Object.values(stepCompletion).filter(Boolean).length
  const progressPercentage = (completedSteps / guide.totalSteps) * 100
  
  const toggleStepCompletion = (stepId: number) => {
    setStepCompletion(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }
  
  const updateNotes = (stepId: number, note: string) => {
    setNotes(prev => ({
      ...prev,
      [stepId]: note
    }))
  }
  
  const goToNextStep = () => {
    if (currentStep < guide.totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/automations')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Automations
              </Button>
              <div>
                <h1 className="text-xl font-bold">{guide.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {guide.estimatedTime}
                  </span>
                  <Badge variant="outline">{guide.difficulty}</Badge>
                  <span>Step {currentStep} of {guide.totalSteps}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right mr-4">
                <div className="text-sm font-medium">{Math.round(progressPercentage)}% Complete</div>
                <Progress value={progressPercentage} className="w-32" />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Step Navigation Sidebar */}
          <div className="col-span-3">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-sm">Implementation Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {guide.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      step.id === currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {stepCompletion[step.id] ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-75">{step.timeEstimate}</div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {currentStepData && (
              <>
                {/* Step Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step {currentStepData.id}</Badge>
                          <Badge variant="secondary">{currentStepData.timeEstimate}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
                        <p className="text-muted-foreground mt-2">{currentStepData.description}</p>
                      </div>
                      <Button
                        variant={stepCompletion[currentStepData.id] ? "default" : "outline"}
                        onClick={() => toggleStepCompletion(currentStepData.id)}
                      >
                        {stepCompletion[currentStepData.id] ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
                
                {/* Step Content */}
                <Card>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: currentStepData.content.replace(/\n/g, '<br>') }} />
                    </div>
                    
                    {/* Media */}
                    {currentStepData.media && currentStepData.media.length > 0 && (
                      <div className="mt-8 space-y-4">
                        <h4 className="font-semibold">Resources</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {currentStepData.media.map((item, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex items-center gap-3">
                                {item.type === 'image' ? (
                                  <ImageIcon className="h-8 w-8 text-blue-600" />
                                ) : (
                                  <Play className="h-8 w-8 text-red-600" />
                                )}
                                <div>
                                  <div className="font-medium">
                                    {item.type === 'image' ? item.alt : item.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {item.type === 'image' ? 'Screenshot' : 'Video Tutorial'}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* External Links */}
                    {currentStepData.externalLinks && currentStepData.externalLinks.length > 0 && (
                      <div className="mt-8 space-y-4">
                        <h4 className="font-semibold">Quick Actions</h4>
                        <div className="flex flex-wrap gap-3">
                          {currentStepData.externalLinks.map((link, index) => (
                            <Button
                              key={index}
                              variant={link.type === 'primary' ? 'default' : 'outline'}
                              asChild
                            >
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {link.title}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Notes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Your Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add notes about this step, challenges faced, or modifications made..."
                      value={notes[currentStepData.id] || ''}
                      onChange={(e) => updateNotes(currentStepData.id, e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
                
                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous Step
                  </Button>
                  
                  {currentStep === guide.totalSteps ? (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Flag className="h-4 w-4 mr-2" />
                      Complete Guide
                    </Button>
                  ) : (
                    <Button onClick={goToNextStep}>
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
                
                {/* Completion Celebration */}
                {progressPercentage === 100 && (
                  <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="text-4xl">🎉</div>
                        <h3 className="text-2xl font-bold">Congratulations!</h3>
                        <p className="text-lg opacity-90">
                          You've successfully completed the {guide.title} implementation.
                        </p>
                        <p className="text-lg opacity-90">
                          Expected impact: <strong>{guide.expectedROI}</strong> in additional monthly revenue.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                          <Button variant="secondary">
                            <Star className="h-4 w-4 mr-2" />
                            Rate This Guide
                          </Button>
                          <Button variant="secondary">
                            Share Success
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}