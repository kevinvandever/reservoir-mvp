export interface BusinessProfile {
  industry: string
  businessType: string
  teamSize: number
  monthlyRevenue: number
  growthStage: 'startup' | 'scaling' | 'established'
  primaryChallenges: string[]
  timeSpentOnTasks: Record<string, number>
  currentTools: string[]
  automationReadiness: number
}

export interface AutomationOpportunity {
  id: string
  title: string
  description: string
  category: string
  impactScore: number
  implementationEffort: 'low' | 'medium' | 'high'
  timeToValue: number // weeks
  monthlySavings: number
  implementationCost: number
  roiProjection: number
  priority: 'high' | 'medium' | 'low'
  beforeScenario: string
  afterScenario: string
  successMetrics: string[]
}

export interface ROIProjections {
  timeToPayback: number // months
  firstYearSavings: number
  threeYearValue: number
  implementationCost: number
  netROI: number
  confidence: number // 0-100
}

export interface RoadmapPhase {
  id: string
  name: string
  month: number
  opportunities: string[]
  expectedROI: number
  description: string
}

export interface CompetitiveInsights {
  industryBenchmark: number
  percentileRanking: number
  competitorAdvantages: string[]
  marketPosition: 'leader' | 'follower' | 'laggard'
}

export interface ReportData {
  businessProfile: BusinessProfile
  automationScore: number
  opportunities: AutomationOpportunity[]
  roiProjections: ROIProjections
  implementationRoadmap: RoadmapPhase[]
  competitiveAnalysis: CompetitiveInsights
  quickWins: AutomationOpportunity[]
  strategicRecommendations: string[]
  generatedAt: Date
  sessionId: string
}

export interface EnhancedConversationContext {
  sessionId: string
  industry?: string
  teamSize?: number
  lastYearGCI?: number
  marketingTools?: string[]
  businessType?: string
  challenges?: string[]
  completedAt?: Date
}

export interface QuestionnaireResponse {
  id: string
  questionId: string
  response: string
  responseType: 'text' | 'number' | 'choice'
  confidence: number
  timestamp: Date
  sessionId: string
}