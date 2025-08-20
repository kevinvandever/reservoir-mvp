'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BenchmarkData {
  metric: string
  userValue: number | string
  percentile: number
  tier: string
  encouragement: string
  insights?: string[]
}

interface BenchmarkCardProps {
  data: BenchmarkData
  className?: string
}

export function BenchmarkCard({ data, className }: BenchmarkCardProps) {
  const getMetricIcon = (metric: string) => {
    const lowerMetric = metric.toLowerCase()
    if (lowerMetric.includes('transaction')) return Users
    if (lowerMetric.includes('gci') || lowerMetric.includes('income')) return DollarSign
    if (lowerMetric.includes('response') || lowerMetric.includes('time')) return Clock
    return TrendingUp
  }

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (percentile >= 80) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (percentile >= 60) return 'text-purple-600 bg-purple-50 border-purple-200'
    if (percentile >= 40) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const formatValue = (value: number | string, metric: string) => {
    if (typeof value === 'string') return value
    
    if (metric.toLowerCase().includes('gci') || metric.toLowerCase().includes('income')) {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
    
    return value.toString()
  }

  const IconComponent = getMetricIcon(data.metric)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("w-full max-w-md", className)}
    >
      <Card className="border-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <CardContent className="p-3 space-y-2">
          {/* Header with metric and icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{data.metric}</span>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "font-medium border-2",
                getPercentileColor(data.percentile)
              )}
            >
              {data.tier}
            </Badge>
          </div>

          {/* Value and percentile */}
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {formatValue(data.userValue, data.metric)}
              </span>
              <span className="text-xs text-gray-600">
                {data.percentile}th percentile
              </span>
            </div>

            {/* Progress bar visualization */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "absolute left-0 top-0 h-full rounded-full",
                  data.percentile >= 90 ? 'bg-green-500' :
                  data.percentile >= 80 ? 'bg-blue-500' :
                  data.percentile >= 60 ? 'bg-purple-500' :
                  data.percentile >= 40 ? 'bg-amber-500' : 'bg-gray-400'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${data.percentile}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Encouragement message */}
          <div className="bg-white/70 rounded-lg p-2 border">
            <p className="text-xs font-medium text-gray-800">
              {data.encouragement}
            </p>
          </div>

          {/* Hide insights for more compact display during conversation */}
          {false && data.insights && data.insights.length > 0 && (
            <div className="space-y-1">
              {data.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-2 text-xs text-gray-600"
                >
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{insight}</span>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}