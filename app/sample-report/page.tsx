'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  BarChart3, 
  Clock, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  Target,
  Users,
  Zap
} from 'lucide-react'

export default function SampleReport() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/questionnaire">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questionnaire
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Your Automation Discovery Results</h1>
              <p className="text-muted-foreground">Based on your questionnaire responses</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Executive Summary */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  🎯 Automation Opportunity Score: 87/100
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Your e-commerce business shows excellent potential for automation with high-impact opportunities 
                  in customer service, inventory management, and marketing workflows.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">$12,500</div>
                  <div className="text-sm text-muted-foreground">Monthly Savings Potential</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">32 hours</div>
                  <div className="text-sm text-muted-foreground">Weekly Time Savings</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">285%</div>
                  <div className="text-sm text-muted-foreground">ROI in First Year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                Business Profile Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Company Overview</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium">Industry:</span> E-commerce (Consumer Electronics)</li>
                    <li><span className="font-medium">Team Size:</span> 15-20 employees</li>
                    <li><span className="font-medium">Monthly Revenue:</span> $85,000-$120,000</li>
                    <li><span className="font-medium">Growth Stage:</span> Scaling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Current Challenges</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-red-500 mr-2" />Manual order processing (8 hrs/day)</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-red-500 mr-2" />Customer service backlog</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-red-500 mr-2" />Inventory tracking errors</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-red-500 mr-2" />Marketing campaign management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automation Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-2 text-blue-600" />
                Priority Automation Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* High Priority */}
                <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">🔥 High Priority (Implement First)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Automated Order Processing System</h5>
                        <p className="text-sm text-muted-foreground">Integrate Shopify with fulfillment center APIs</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-green-600">$4,200/month saved</div>
                        <div className="text-muted-foreground">12 hours/week saved</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">AI-Powered Customer Service Chatbot</h5>
                        <p className="text-sm text-muted-foreground">Handle 70% of common inquiries automatically</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-green-600">$3,500/month saved</div>
                        <div className="text-muted-foreground">18 hours/week saved</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medium Priority */}
                <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">⚡ Medium Priority (Next Quarter)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Inventory Management Automation</h5>
                        <p className="text-sm text-muted-foreground">Real-time stock tracking and auto-reordering</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-green-600">$2,800/month saved</div>
                        <div className="text-muted-foreground">8 hours/week saved</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Email Marketing Automation</h5>
                        <p className="text-sm text-muted-foreground">Personalized campaigns based on purchase behavior</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-green-600">$2,000/month revenue</div>
                        <div className="text-muted-foreground">6 hours/week saved</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                90-Day Implementation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">Month 1: Foundation Setup</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Implement order processing automation</li>
                    <li>• Deploy customer service chatbot</li>
                    <li>• Expected ROI: $7,700/month</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold">Month 2: Process Optimization</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Set up inventory management system</li>
                    <li>• Launch email marketing automation</li>
                    <li>• Expected additional ROI: $4,800/month</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-semibold">Month 3: Scale & Refine</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Optimize all automated systems</li>
                    <li>• Implement advanced analytics</li>
                    <li>• Total projected ROI: $12,500/month</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}