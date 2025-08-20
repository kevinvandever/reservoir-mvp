// Question Bank Types and Interfaces for Comprehensive Questionnaire System

export enum SectionType {
  BUSINESS_FOUNDATION = 'business_foundation',
  CURRENT_SYSTEMS = 'current_systems',
  LEAD_GENERATION = 'lead_generation',
  MARKETING_CONTENT = 'marketing_content',
  TRANSACTION_MANAGEMENT = 'transaction_management',
  MARKET_ANALYSIS = 'market_analysis',
  GOALS_PRIORITIES = 'goals_priorities'
}

export interface Question {
  id: string
  section: SectionType
  text: string
  purpose: string
  weight: number
  required: boolean
  industrySpecific?: string[]
  tags: string[]
  followUpTriggers?: string[]
  dependencies?: string[]
  variations?: {
    soloAgent?: string
    teamLead?: string
    enterprise?: string
  }
  quickResponses?: string[]
}

export interface Section {
  id: SectionType
  name: string
  description: string
  weight: number // Percentage of overall questionnaire
  required: boolean
  questions: Question[]
  completionCriteria: {
    minimumQuestions: number
    requiredTopics: string[]
  }
}

export interface QuestionBank {
  sections: Section[]
  totalQuestions: number
  requiredQuestions: number
  industryVariants: Record<string, Partial<QuestionBank>>
}

export interface ConversationContext {
  [key: string]: any
  // Business Foundation Context
  agentName?: string
  brokerage?: string
  marketAreas?: string[]
  yearsExperience?: number
  lastYearGCI?: number
  transactionVolume?: number
  leadSourceBreakdown?: Record<string, number>
  businessStructure?: 'solo' | 'team' | 'enterprise'
  
  // Lead Generation Context
  monthlyLeadVolume?: number
  leadResponseTime?: string
  conversionRates?: {
    leadToAppointment?: number
    appointmentToClient?: number
  }
  biggestChallenges?: string[]
  
  // Systems Context
  currentCRM?: string
  marketingTools?: string[]
  technologyComfort?: string
  
  // Marketing Context
  contentStrategy?: string
  socialMediaPresence?: string
  marketingBudget?: number
  
  // Goals Context
  revenueGoals?: number
  transactionGoals?: number
  growthPriorities?: string[]
}

export interface ProgressMetrics {
  overallProgress: number
  sectionProgress: SectionProgress[]
  canGenerateReport: boolean
  requiredSectionsComplete: boolean
  questionsAnswered: number
  totalQuestions: number
  estimatedTimeRemaining: number
}

export interface SectionProgress {
  section: SectionType
  name: string
  completed: number // Percentage 0-100
  weight: number
  required: boolean
  questionsAnswered: number
  totalQuestions: number
  isActive: boolean
  isComplete: boolean
}

export interface QuestionSelectionResult {
  question: Question | null
  isComplete: boolean
  progress: ProgressMetrics
  sectionTransition?: {
    fromSection: SectionType
    toSection: SectionType
    transitionMessage: string
  }
}

export interface BusinessIntelligenceContext {
  businessType: 'solo_agent' | 'team_lead' | 'enterprise'
  experienceLevel: 'new' | 'experienced' | 'veteran'
  performanceLevel: 'emerging' | 'established' | 'top_performer'
  painPoints: string[]
  automationReadiness: 'low' | 'medium' | 'high'
  priorityAreas: string[]
}