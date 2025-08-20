'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

interface ReportErrorStateProps {
  error: string
  onRetry?: () => void
}

export function ReportErrorState({ error, onRetry }: ReportErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
              <h1 className="text-2xl font-bold text-red-600">Report Generation Issue</h1>
              <p className="text-muted-foreground">We encountered a problem generating your report</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertTriangle className="h-6 w-6 mr-2" />
                Report Generation Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">What you can try:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Make sure you've completed the questionnaire with detailed responses
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Check your internet connection and try again
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    If the problem persists, contact support for assistance
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {onRetry && (
                  <Button onClick={onRetry} className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                <Link href="/questionnaire" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Questionnaire
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If you continue to experience issues, our support team is here to help you get your 
                business analysis report generated successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:support@clockworkcoaching.com">
                    Contact Support
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide">
                    View Help Guide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}