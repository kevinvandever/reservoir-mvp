'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle, 
  Phone, 
  FileText, 
  Star,
  Clock,
  Users,
  Target
} from 'lucide-react'
import { BusinessProfile } from '@/lib/report/types'

interface NextStepsProps {
  businessProfile: BusinessProfile
}

export function NextStepsSection({ businessProfile }: NextStepsProps) {
  const getPersonalizedRecommendation = () => {
    if (businessProfile.teamSize === 1) {
      return "As a solo operation, start with one quick win to prove ROI before expanding"
    }
    if (businessProfile.monthlyRevenue > 50000) {
      return "Your strong revenue position allows for aggressive automation investment"
    }
    if (businessProfile.automationReadiness < 60) {
      return "Focus on building automation foundation and team readiness first"
    }
    return "You're well-positioned for successful automation implementation"
  }

  const getTimelineRecommendation = () => {
    if (businessProfile.teamSize === 1) return "2-3 months for initial implementations"
    if (businessProfile.automationReadiness > 80) return "1-2 months for quick wins"
    return "3-4 months for comprehensive automation setup"
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowRight className="h-6 w-6 mr-2 text-green-600" />
          Your Next Steps to Automation Success
        </CardTitle>
        <p className="text-green-700 dark:text-green-300">
          {getPersonalizedRecommendation()}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Immediate Actions (Next 7 Days) */}
        <div className="bg-white dark:bg-gray-800 border border-red-200 rounded-lg p-5">
          <h4 className="font-semibold text-red-700 dark:text-red-300 mb-4 flex items-center">
            🔥 Immediate Actions (Next 7 Days)
            <Badge className="ml-2 bg-red-600 text-white">High Priority</Badge>
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h5 className="font-medium">Schedule Your Implementation Consultation</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Get personalized guidance on your automation roadmap and priority recommendations
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Free Consultation
                </Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h5 className="font-medium">Download Your Detailed Action Plan</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Get step-by-step implementation guides for your top opportunities
                </p>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Action Plan
                </Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h5 className="font-medium">Audit Your Current Tools & Processes</h5>
                <p className="text-sm text-muted-foreground">
                  Use our assessment checklist to identify integration opportunities and gaps
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Short-term Goals (Next 30 Days) */}
        <div className="bg-white dark:bg-gray-800 border border-yellow-200 rounded-lg p-5">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-4 flex items-center">
            ⚡ Short-term Goals (Next 30 Days)
            <Badge className="ml-2 bg-yellow-600 text-white">Start Building</Badge>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Implement first quick win automation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Set up tracking and measurement systems</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Train team on new automated processes</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Document current workflows for automation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Establish success metrics and KPIs</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium">Plan next phase implementation</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Expected timeline for first results:
              </span>
              <span className="font-bold text-yellow-600">
                {getTimelineRecommendation()}
              </span>
            </div>
          </div>
        </div>

        {/* Long-term Vision (Next 90 Days) */}
        <div className="bg-white dark:bg-gray-800 border border-green-200 rounded-lg p-5">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4 flex items-center">
            🚀 Long-term Vision (Next 90 Days)
            <Badge className="ml-2 bg-green-600 text-white">Scale & Optimize</Badge>
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-700 dark:text-green-300">Full Automation</div>
                <div className="text-sm text-green-600">
                  Complete implementation of priority opportunities
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-700 dark:text-green-300">Team Mastery</div>
                <div className="text-sm text-green-600">
                  Full team adoption and process optimization
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-700 dark:text-green-300">Competitive Edge</div>
                <div className="text-sm text-green-600">
                  Market leadership through automation advantage
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 rounded-lg">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                90-Day Success Vision for Your Business:
              </h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Automated systems handling routine tasks 24/7</li>
                <li>• {businessProfile.teamSize > 1 ? 'Team' : 'You'} focused on high-value strategic work</li>
                <li>• Consistent, predictable business processes</li>
                <li>• Significant time savings reinvested in growth</li>
                <li>• Measurable ROI from automation investments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support & Resources */}
        <div className="bg-white dark:bg-gray-800 border border-blue-200 rounded-lg p-5">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">
            🛠️ Support & Resources Available
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Implementation Support</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-600 mr-2" />
                  <span>1-on-1 consultation sessions</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Team training and onboarding</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Step-by-step implementation guides</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Success metrics and tracking tools</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-3">Ongoing Optimization</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Monthly performance reviews</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Continuous improvement recommendations</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Technical support and troubleshooting</span>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Advanced automation opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-6 text-center">
          <h4 className="text-xl font-bold mb-3">Ready to Transform Your Business?</h4>
          <p className="mb-6 opacity-90">
            Your automation journey starts with a single step. Let's discuss how to implement 
            these recommendations and start generating ROI within the first 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="h-5 w-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <FileText className="h-5 w-5 mr-2" />
              Get Implementation Roadmap
            </Button>
          </div>
          <div className="mt-4 text-sm opacity-80">
            ✓ No commitment required  ✓ Personalized guidance  ✓ Proven results
          </div>
        </div>

      </CardContent>
    </Card>
  )
}