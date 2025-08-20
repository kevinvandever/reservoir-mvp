'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, Target, BarChart3, DollarSign } from 'lucide-react'

export function ReportLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold">Generating Your Business Analysis Report</h1>
            </div>
            <p className="text-muted-foreground">
              Analyzing your responses and calculating personalized automation opportunities...
            </p>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Progress Indicator */}
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-600">Analyzing questionnaire responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Calculating ROI projections</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Generating recommendations</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/3 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Executive Summary Skeleton */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                <Skeleton className="h-6 w-48" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Skeleton className="h-8 w-8 mx-auto mb-2 rounded-full" />
                    <Skeleton className="h-6 w-20 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Business Profile Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-4 w-20 mr-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-5 w-48 mb-3" />
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-64" />
                        </div>
                        <div className="text-right ml-4">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}