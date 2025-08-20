// Real Estate Industry Benchmark Service for Performance Analysis
// Implements Task 3.1: Real-time Performance Analysis

interface PerformanceBenchmark {
  min: number
  max: number
  percentile: number
  label: string
  encouragement: string
}

interface BenchmarkComparison {
  metric: string
  userValue: number
  percentile: number
  tier: string
  encouragement: string
  insights: string[]
}

export class BenchmarkService {
  private static readonly REAL_ESTATE_BENCHMARKS = {
    transactions: [
      { 
        min: 0, 
        max: 5, 
        percentile: 20, 
        label: "Entry Level",
        encouragement: "Great starting point! Focus on building systems for growth."
      },
      { 
        min: 6, 
        max: 15, 
        percentile: 50, 
        label: "Established Agent",
        encouragement: "Solid transaction volume! You're in the industry average."
      },
      { 
        min: 16, 
        max: 30, 
        percentile: 80, 
        label: "High Performer",
        encouragement: "Excellent volume! You're in the top 20% of agents."
      },
      { 
        min: 31, 
        max: 50, 
        percentile: 90, 
        label: "Elite Agent",
        encouragement: "Outstanding! You're in the top 10% nationally."
      },
      { 
        min: 51, 
        max: Infinity, 
        percentile: 95, 
        label: "Top Tier",
        encouragement: "Incredible! You're in the top 5% of agents nationally."
      }
    ],
    
    gci: [
      { 
        min: 0, 
        max: 50000, 
        percentile: 30, 
        label: "Building Phase",
        encouragement: "Every expert was once a beginner. Focus on lead generation!"
      },
      { 
        min: 50001, 
        max: 150000, 
        percentile: 60, 
        label: "Growing Business",
        encouragement: "Good income foundation. Time to scale with systems."
      },
      { 
        min: 150001, 
        max: 300000, 
        percentile: 80, 
        label: "Successful Agent",
        encouragement: "Great income! You're above most agents in the US."
      },
      { 
        min: 300001, 
        max: 500000, 
        percentile: 90, 
        label: "High Earner",
        encouragement: "Fantastic GCI! You're in the top 10% of agents."
      },
      { 
        min: 500001, 
        max: Infinity, 
        percentile: 95, 
        label: "Elite Earner",
        encouragement: "Outstanding! You're earning more than 95% of agents."
      }
    ],

    leadVolume: [
      { 
        min: 0, 
        max: 10, 
        percentile: 30, 
        label: "Selective",
        encouragement: "Quality over quantity approach. Focus on conversion rates!"
      },
      { 
        min: 11, 
        max: 25, 
        percentile: 60, 
        label: "Steady Flow",
        encouragement: "Good lead volume for consistent business."
      },
      { 
        min: 26, 
        max: 50, 
        percentile: 80, 
        label: "Strong Pipeline",
        encouragement: "Great lead generation! You're ahead of most agents."
      },
      { 
        min: 51, 
        max: Infinity, 
        percentile: 95, 
        label: "Lead Machine",
        encouragement: "Impressive lead volume! Most agents dream of this flow."
      }
    ],

    responseTime: {
      "within_5_minutes": { 
        percentile: 95, 
        label: "Lightning Fast",
        encouragement: "Amazing response time! This gives you a huge competitive advantage."
      },
      "within_1_hour": { 
        percentile: 80, 
        label: "Very Good",
        encouragement: "Great response time! Much better than industry average."
      },
      "within_4_hours": { 
        percentile: 60, 
        label: "Industry Average",
        encouragement: "Decent response time, but there's room for improvement."
      },
      "within_24_hours": { 
        percentile: 40, 
        label: "Could Improve",
        encouragement: "Leads get cold fast. Consider automation for faster response."
      },
      "more_than_24_hours": { 
        percentile: 20, 
        label: "Needs Attention",
        encouragement: "This is likely costing you deals. Let's fix this first!"
      }
    }
  }

  /**
   * Get performance insight and encouragement for a metric
   */
  static getPerformanceInsight(metric: string, value: number | string): BenchmarkComparison | null {
    const benchmarks = this.REAL_ESTATE_BENCHMARKS[metric as keyof typeof this.REAL_ESTATE_BENCHMARKS]
    
    if (!benchmarks) {
      console.warn(`Unknown benchmark metric: ${metric}`)
      return null
    }

    // Handle response time as a special case (string-based)
    if (metric === 'responseTime' && typeof value === 'string') {
      const benchmark = benchmarks[value as keyof typeof benchmarks] as any
      if (benchmark) {
        return {
          metric: 'Response Time',
          userValue: value as any,
          percentile: benchmark.percentile,
          tier: benchmark.label,
          encouragement: benchmark.encouragement,
          insights: this.getResponseTimeInsights(value as string, benchmark.percentile)
        }
      }
      return null
    }

    // Handle numeric metrics
    if (Array.isArray(benchmarks) && typeof value === 'number') {
      const benchmark = benchmarks.find(b => value >= b.min && value <= b.max)
      
      if (benchmark) {
        return {
          metric: this.getMetricDisplayName(metric),
          userValue: value,
          percentile: benchmark.percentile,
          tier: benchmark.label,
          encouragement: benchmark.encouragement,
          insights: this.getMetricInsights(metric, value, benchmark.percentile)
        }
      }
    }

    return null
  }

  /**
   * Get display name for metric
   */
  private static getMetricDisplayName(metric: string): string {
    const displayNames: Record<string, string> = {
      'transactions': 'Annual Transactions',
      'gci': 'Gross Commission Income',
      'leadVolume': 'Monthly Lead Volume',
      'responseTime': 'Lead Response Time'
    }
    return displayNames[metric] || metric
  }

  /**
   * Generate specific insights based on metric and percentile
   */
  private static getMetricInsights(metric: string, value: number, percentile: number): string[] {
    const insights: string[] = []

    switch (metric) {
      case 'transactions':
        if (percentile >= 90) {
          insights.push("With your volume, automation could save 10+ hours per week")
          insights.push("You're handling more transactions than most teams")
        } else if (percentile >= 80) {
          insights.push("Perfect volume to invest in growth systems")
          insights.push("You're clearly doing something right!")
        } else if (percentile >= 60) {
          insights.push("Solid foundation - ready to scale with the right tools")
          insights.push("Many top agents started exactly where you are")
        } else {
          insights.push("Great opportunity to build systems for growth")
          insights.push("Focus on lead generation and conversion")
        }
        break

      case 'gci':
        if (percentile >= 90) {
          insights.push("Your income puts you among elite agents")
          insights.push("Time is now your most valuable asset")
        } else if (percentile >= 80) {
          insights.push("Strong earnings - perfect time to automate and scale")
          insights.push("You've proven the business model works")
        } else {
          insights.push("Good foundation for implementing growth systems")
          insights.push("Automation can help increase your income per hour")
        }
        break

      case 'leadVolume':
        if (value >= 50) {
          insights.push("Your lead volume is exceptional - most agents would love this flow")
          insights.push("The challenge is converting and managing this volume efficiently")
        } else if (value >= 25) {
          insights.push("Great lead generation - now focus on conversion optimization")
          insights.push("With better systems, this volume could double your business")
        } else {
          insights.push("Steady flow - let's optimize conversion before increasing volume")
          insights.push("Quality leads are more valuable than quantity")
        }
        break
    }

    return insights
  }

  /**
   * Generate response time specific insights
   */
  private static getResponseTimeInsights(responseTime: string, percentile: number): string[] {
    const insights: string[] = []

    switch (responseTime) {
      case 'within_5_minutes':
        insights.push("Studies show agents responding within 5 minutes are 9x more likely to qualify leads")
        insights.push("Your response time gives you a massive competitive advantage")
        break
      case 'within_1_hour':
        insights.push("Much better than industry average of 4+ hours")
        insights.push("Consider automating to get under 5 minutes for even better results")
        break
      case 'within_4_hours':
        insights.push("Industry average, but leads are 50% less likely to convert after 1 hour")
        insights.push("Automation could dramatically improve your conversion rates")
        break
      case 'within_24_hours':
        insights.push("Leads are 90% less likely to convert after 24 hours")
        insights.push("This should be your #1 priority to fix")
        break
      case 'more_than_24_hours':
        insights.push("This response time is likely costing you 60-80% of potential deals")
        insights.push("Immediate automation could double your lead conversion")
        break
    }

    return insights
  }

  /**
   * Calculate automation opportunity score based on multiple metrics
   */
  static calculateAutomationOpportunity(metrics: {
    transactions?: number
    gci?: number
    leadVolume?: number
    responseTime?: string
  }): {
    score: number
    priority: string
    reasoning: string[]
  } {
    let score = 0
    const reasoning: string[] = []

    // High transaction volume = high automation value
    if (metrics.transactions && metrics.transactions >= 25) {
      score += 25
      reasoning.push("High transaction volume shows automation could save significant time")
    } else if (metrics.transactions && metrics.transactions >= 10) {
      score += 15
      reasoning.push("Good transaction volume provides foundation for automation ROI")
    }

    // High GCI = can afford automation, high ROI potential
    if (metrics.gci && metrics.gci >= 200000) {
      score += 20
      reasoning.push("Strong GCI indicates capacity to invest in automation")
    }

    // High lead volume = urgent need for automation
    if (metrics.leadVolume && metrics.leadVolume >= 30) {
      score += 25
      reasoning.push("High lead volume creates urgent need for automated follow-up")
    }

    // Poor response time = immediate automation need
    if (metrics.responseTime === 'more_than_24_hours' || metrics.responseTime === 'within_24_hours') {
      score += 30
      reasoning.push("Slow response time represents immediate opportunity for automation")
    } else if (metrics.responseTime === 'within_4_hours') {
      score += 15
      reasoning.push("Response time improvement through automation could boost conversions")
    }

    // Determine priority level
    let priority: string
    if (score >= 70) {
      priority = "Critical - Immediate ROI expected"
    } else if (score >= 50) {
      priority = "High - Strong automation candidate"
    } else if (score >= 30) {
      priority = "Medium - Good potential for automation"
    } else {
      priority = "Low - Focus on fundamentals first"
    }

    return {
      score: Math.min(score, 100),
      priority,
      reasoning
    }
  }

  /**
   * Get benchmark comparison for multiple metrics
   */
  static getComprehensiveAnalysis(context: {
    lastYearTransactions?: number
    lastYearGCI?: number
    monthlyLeads?: number
    responseTime?: string
  }): {
    overallPercentile: number
    benchmarks: BenchmarkComparison[]
    automationOpportunity: ReturnType<typeof BenchmarkService.calculateAutomationOpportunity>
    strengthAreas: string[]
    improvementAreas: string[]
  } {
    const benchmarks: BenchmarkComparison[] = []
    const percentiles: number[] = []
    const strengthAreas: string[] = []
    const improvementAreas: string[] = []

    // Analyze each metric
    if (context.lastYearTransactions) {
      const benchmark = this.getPerformanceInsight('transactions', context.lastYearTransactions)
      if (benchmark) {
        benchmarks.push(benchmark)
        percentiles.push(benchmark.percentile)
        
        if (benchmark.percentile >= 80) {
          strengthAreas.push(`Transaction volume (${benchmark.tier})`)
        } else if (benchmark.percentile < 60) {
          improvementAreas.push(`Transaction volume could grow`)
        }
      }
    }

    if (context.lastYearGCI) {
      const benchmark = this.getPerformanceInsight('gci', context.lastYearGCI)
      if (benchmark) {
        benchmarks.push(benchmark)
        percentiles.push(benchmark.percentile)
        
        if (benchmark.percentile >= 80) {
          strengthAreas.push(`Income level (${benchmark.tier})`)
        } else if (benchmark.percentile < 60) {
          improvementAreas.push(`Income growth opportunity`)
        }
      }
    }

    if (context.monthlyLeads) {
      const benchmark = this.getPerformanceInsight('leadVolume', context.monthlyLeads)
      if (benchmark) {
        benchmarks.push(benchmark)
        percentiles.push(benchmark.percentile)
        
        if (benchmark.percentile >= 80) {
          strengthAreas.push(`Lead generation (${benchmark.tier})`)
        } else if (benchmark.percentile < 60) {
          improvementAreas.push(`Lead generation could improve`)
        }
      }
    }

    if (context.responseTime) {
      const benchmark = this.getPerformanceInsight('responseTime', context.responseTime)
      if (benchmark) {
        benchmarks.push(benchmark)
        percentiles.push(benchmark.percentile)
        
        if (benchmark.percentile >= 80) {
          strengthAreas.push(`Response time (${benchmark.tier})`)
        } else {
          improvementAreas.push(`Response time needs improvement`)
        }
      }
    }

    // Calculate overall percentile
    const overallPercentile = percentiles.length > 0 
      ? Math.round(percentiles.reduce((sum, p) => sum + p, 0) / percentiles.length)
      : 50

    // Calculate automation opportunity
    const automationOpportunity = this.calculateAutomationOpportunity({
      transactions: context.lastYearTransactions,
      gci: context.lastYearGCI,
      leadVolume: context.monthlyLeads,
      responseTime: context.responseTime
    })

    return {
      overallPercentile,
      benchmarks,
      automationOpportunity,
      strengthAreas,
      improvementAreas
    }
  }
}