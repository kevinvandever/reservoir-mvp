// Intelligent Question Selection Service for Comprehensive Questionnaire
import { 
  QuestionBank, 
  Section, 
  Question, 
  SectionType, 
  ConversationContext, 
  ProgressMetrics, 
  SectionProgress, 
  QuestionSelectionResult,
  BusinessIntelligenceContext
} from './question-bank-types'

export class QuestionSelectionService {
  private answeredQuestions: Set<string> = new Set()
  private currentSection: SectionType = SectionType.BUSINESS_FOUNDATION
  private sectionCompletionTracker: Map<SectionType, Set<string>> = new Map()

  constructor(
    private questionBank: QuestionBank,
    private conversationContext: ConversationContext = {}
  ) {
    // Initialize section completion tracker
    this.questionBank.sections.forEach(section => {
      this.sectionCompletionTracker.set(section.id, new Set())
    })
  }

  /**
   * Get the next most appropriate question based on current context
   */
  getNextQuestion(): QuestionSelectionResult {
    // 1. Check if questionnaire is complete
    const progress = this.calculateProgress()
    if (this.isQuestionnaireComplete(progress)) {
      return {
        question: null,
        isComplete: true,
        progress
      }
    }

    // 2. Determine current section or next section
    const targetSection = this.determineTargetSection()
    
    // 3. Check for section transition
    let sectionTransition = undefined
    if (targetSection !== this.currentSection) {
      sectionTransition = {
        fromSection: this.currentSection,
        toSection: targetSection,
        transitionMessage: this.generateTransitionMessage(this.currentSection, targetSection)
      }
      this.currentSection = targetSection
    }

    // 4. Get available questions in current section
    const section = this.questionBank.sections.find(s => s.id === targetSection)
    if (!section) {
      return { question: null, isComplete: true, progress }
    }

    // 5. Filter and prioritize questions
    const availableQuestions = this.getAvailableQuestions(section)
    const prioritizedQuestions = this.prioritizeQuestions(availableQuestions)

    // 6. Select the best question
    const selectedQuestion = prioritizedQuestions[0] || null

    return {
      question: selectedQuestion,
      isComplete: false,
      progress,
      sectionTransition
    }
  }

  /**
   * Mark a question as answered and update context
   */
  markQuestionAnswered(questionId: string, extractedContext: Partial<ConversationContext> = {}) {
    this.answeredQuestions.add(questionId)
    
    // Update conversation context
    Object.assign(this.conversationContext, extractedContext)
    
    // Track section completion
    const question = this.findQuestionById(questionId)
    if (question) {
      const sectionAnswered = this.sectionCompletionTracker.get(question.section)
      if (sectionAnswered) {
        sectionAnswered.add(questionId)
      }
    }
  }

  /**
   * Calculate detailed progress metrics
   */
  calculateProgress(): ProgressMetrics {
    const sectionProgress: SectionProgress[] = this.questionBank.sections.map(section => {
      const completedCount = this.getSectionCompletedCount(section)
      const totalCount = section.questions.length
      const completedPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      
      return {
        section: section.id,
        name: section.name,
        completed: completedPercentage,
        weight: section.weight,
        required: section.required,
        questionsAnswered: completedCount,
        totalQuestions: totalCount,
        isActive: section.id === this.currentSection,
        isComplete: this.isSectionComplete(section)
      }
    })

    // Calculate overall progress using weighted sections
    const overallProgress = sectionProgress.reduce((total, section) => {
      return total + (section.completed * section.weight / 100)
    }, 0)

    const questionsAnswered = this.answeredQuestions.size
    const totalQuestions = this.questionBank.totalQuestions
    const estimatedTimeRemaining = Math.max(0, (totalQuestions - questionsAnswered) * 1.5) // 1.5 min per question

    return {
      overallProgress: Math.round(overallProgress),
      sectionProgress,
      canGenerateReport: overallProgress >= 60,
      requiredSectionsComplete: this.areRequiredSectionsComplete(),
      questionsAnswered,
      totalQuestions,
      estimatedTimeRemaining
    }
  }

  /**
   * Get business intelligence context for AI personalization
   */
  getBusinessIntelligenceContext(): BusinessIntelligenceContext {
    const context = this.conversationContext

    // Determine business type
    let businessType: 'solo_agent' | 'team_lead' | 'enterprise' = 'solo_agent'
    if (context.businessStructure === 'enterprise') businessType = 'enterprise'
    else if (context.businessStructure === 'team') businessType = 'team_lead'

    // Determine experience level
    let experienceLevel: 'new' | 'experienced' | 'veteran' = 'new'
    if (context.yearsExperience) {
      if (context.yearsExperience >= 10) experienceLevel = 'veteran'
      else if (context.yearsExperience >= 3) experienceLevel = 'experienced'
    }

    // Determine performance level
    let performanceLevel: 'emerging' | 'established' | 'top_performer' = 'emerging'
    if (context.lastYearGCI) {
      if (context.lastYearGCI >= 500000) performanceLevel = 'top_performer'
      else if (context.lastYearGCI >= 150000) performanceLevel = 'established'
    }

    // Extract pain points
    const painPoints: string[] = []
    if (context.biggestChallenges) {
      painPoints.push(...context.biggestChallenges)
    }

    // Determine automation readiness
    let automationReadiness: 'low' | 'medium' | 'high' = 'medium'
    if (context.technologyComfort) {
      if (context.technologyComfort.includes('9') || context.technologyComfort.includes('10')) {
        automationReadiness = 'high'
      } else if (context.technologyComfort.includes('1') || context.technologyComfort.includes('2')) {
        automationReadiness = 'low'
      }
    }

    return {
      businessType,
      experienceLevel,
      performanceLevel,
      painPoints,
      automationReadiness,
      priorityAreas: this.identifyPriorityAreas()
    }
  }

  // Private helper methods

  private determineTargetSection(): SectionType {
    // Check if current section needs more questions
    const currentSectionObj = this.questionBank.sections.find(s => s.id === this.currentSection)
    if (currentSectionObj && !this.isSectionComplete(currentSectionObj)) {
      // Check if we have enough questions for minimum criteria
      const completedCount = this.getSectionCompletedCount(currentSectionObj)
      if (completedCount < currentSectionObj.completionCriteria.minimumQuestions) {
        return this.currentSection
      }
    }

    // Find next incomplete required section
    const requiredSections = this.questionBank.sections.filter(s => s.required)
    for (const section of requiredSections) {
      if (!this.isSectionComplete(section)) {
        return section.id
      }
    }

    // Find next incomplete optional section
    const optionalSections = this.questionBank.sections.filter(s => !s.required)
    for (const section of optionalSections) {
      if (!this.isSectionComplete(section)) {
        return section.id
      }
    }

    return this.currentSection
  }

  private getAvailableQuestions(section: Section): Question[] {
    return section.questions.filter(question => {
      // Skip already answered questions
      if (this.answeredQuestions.has(question.id)) {
        return false
      }

      // Skip questions where info is already gathered from context
      if (this.isQuestionAnsweredByContext(question)) {
        return false
      }

      // Check dependencies
      if (question.dependencies) {
        return question.dependencies.every(dep => this.answeredQuestions.has(dep))
      }

      return true
    })
  }

  private prioritizeQuestions(questions: Question[]): Question[] {
    return questions.sort((a, b) => {
      // Required questions first
      if (a.required && !b.required) return -1
      if (!a.required && b.required) return 1

      // Higher weight questions next
      if (a.weight !== b.weight) return b.weight - a.weight

      // Questions with follow-up triggers (for business intelligence)
      const aHasTriggers = a.followUpTriggers && a.followUpTriggers.length > 0
      const bHasTriggers = b.followUpTriggers && b.followUpTriggers.length > 0
      if (aHasTriggers && !bHasTriggers) return -1
      if (!aHasTriggers && bHasTriggers) return 1

      return 0
    })
  }

  private isQuestionAnsweredByContext(question: Question): boolean {
    const context = this.conversationContext

    // Check specific tag-based context matching
    for (const tag of question.tags) {
      switch (tag) {
        case 'revenue':
        case 'performance':
          if (context.lastYearGCI !== undefined) return true
          break
        case 'experience':
        case 'tenure':
          if (context.yearsExperience !== undefined) return true
          break
        case 'volume':
        case 'productivity':
          if (context.transactionVolume !== undefined) return true
          break
        case 'structure':
        case 'team':
          if (context.businessStructure !== undefined) return true
          break
        case 'lead_volume':
          if (context.monthlyLeadVolume !== undefined) return true
          break
        case 'response_time':
          if (context.leadResponseTime !== undefined) return true
          break
        case 'conversion':
          if (context.conversionRates && Object.keys(context.conversionRates).length > 0) return true
          break
        case 'identity':
        case 'professional':
          if (context.agentName && context.brokerage) return true
          break
        case 'market':
        case 'geographic':
          if (context.marketAreas && context.marketAreas.length > 0) return true
          break
      }
    }

    return false
  }

  private isSectionComplete(section: Section): boolean {
    const completedCount = this.getSectionCompletedCount(section)
    const requiredTopicsCovered = this.areRequiredTopicsCovered(section)
    const hasAnsweredRequired = this.hasAnsweredRequiredQuestions(section)
    
    console.log(`🔍 Section Complete Check: ${section.name}`, {
      completedCount,
      minimumRequired: section.completionCriteria.minimumQuestions,
      requiredTopicsCovered,
      hasAnsweredRequired,
      requiredTopics: section.completionCriteria.requiredTopics
    })
    
    // Section is complete if:
    // 1. Minimum questions answered AND
    // 2. Required topics covered AND  
    // 3. At least one required question answered (if section has required questions)
    const meetsMinimum = completedCount >= section.completionCriteria.minimumQuestions
    const isComplete = meetsMinimum && requiredTopicsCovered && hasAnsweredRequired
    
    console.log(`📝 Section ${section.name} complete:`, isComplete)
    return isComplete
  }

  private getSectionCompletedCount(section: Section): number {
    const sectionAnswered = this.sectionCompletionTracker.get(section.id)
    return sectionAnswered ? sectionAnswered.size : 0
  }

  private areRequiredTopicsCovered(section: Section): boolean {
    const answeredQuestions = Array.from(this.sectionCompletionTracker.get(section.id) || [])
      .map(id => this.findQuestionById(id))
      .filter(Boolean) as Question[]

    const coveredTopics = new Set<string>()
    answeredQuestions.forEach(question => {
      question.tags.forEach(tag => coveredTopics.add(tag))
    })

    console.log(`🔍 Required Topics Check: ${section.name}`, {
      requiredTopics: section.completionCriteria.requiredTopics,
      coveredTopics: Array.from(coveredTopics),
      allCovered: section.completionCriteria.requiredTopics.every(topic => coveredTopics.has(topic))
    })

    return section.completionCriteria.requiredTopics.every(topic => 
      coveredTopics.has(topic)
    )
  }

  private hasAnsweredRequiredQuestions(section: Section): boolean {
    const answeredQuestions = Array.from(this.sectionCompletionTracker.get(section.id) || [])
      .map(id => this.findQuestionById(id))
      .filter(Boolean) as Question[]

    const requiredQuestions = section.questions.filter(q => q.required)
    
    // If no required questions in section, return true
    if (requiredQuestions.length === 0) {
      return true
    }

    // Check if at least one required question was answered
    const hasAnsweredRequired = answeredQuestions.some(q => q.required)
    
    console.log(`🔍 Required Questions Check: ${section.name}`, {
      totalRequired: requiredQuestions.length,
      hasAnsweredRequired,
      answeredQuestionsCount: answeredQuestions.length
    })

    return hasAnsweredRequired
  }

  private areRequiredSectionsComplete(): boolean {
    const requiredSections = this.questionBank.sections.filter(s => s.required)
    return requiredSections.every(section => this.isSectionComplete(section))
  }

  private isQuestionnaireComplete(progress: ProgressMetrics): boolean {
    console.log('🔍 Checking questionnaire completion:', {
      overallProgress: progress.overallProgress,
      requiredSectionsComplete: progress.requiredSectionsComplete,
      questionsAnswered: progress.questionsAnswered,
      totalQuestions: progress.totalQuestions
    })
    
    // More conservative completion logic:
    // Complete if overall progress >= 70% AND required sections are complete AND minimum 35 questions answered
    const progressThreshold = progress.overallProgress >= 70
    const minimumQuestions = progress.questionsAnswered >= 35
    const requiredComplete = progress.requiredSectionsComplete
    
    const isComplete = progressThreshold && requiredComplete && minimumQuestions
    
    console.log('📊 Completion check result:', {
      progressThreshold,
      requiredComplete,
      minimumQuestions,
      finalDecision: isComplete
    })
    
    return isComplete
  }

  private findQuestionById(questionId: string): Question | undefined {
    for (const section of this.questionBank.sections) {
      const question = section.questions.find(q => q.id === questionId)
      if (question) return question
    }
    return undefined
  }

  private generateTransitionMessage(_fromSection: SectionType, toSection: SectionType): string {
    const sectionNames: Record<SectionType, string> = {
      [SectionType.BUSINESS_FOUNDATION]: "Business Foundation",
      [SectionType.CURRENT_SYSTEMS]: "Current Systems & Tools", 
      [SectionType.LEAD_GENERATION]: "Lead Generation & Nurturing",
      [SectionType.MARKETING_CONTENT]: "Marketing & Content Creation",
      [SectionType.TRANSACTION_MANAGEMENT]: "Transaction & Client Management",
      [SectionType.MARKET_ANALYSIS]: "Market Analysis & Reporting",
      [SectionType.GOALS_PRIORITIES]: "Goals & Priorities"
    }

    return `Great! Now let's dive into ${sectionNames[toSection]}. This will help me understand your business even better.`
  }

  private identifyPriorityAreas(): string[] {
    const priorities: string[] = []
    const context = this.conversationContext

    // Analyze context to identify priority areas
    if (context.biggestChallenges) {
      if (context.biggestChallenges.includes('lead')) priorities.push('lead_generation')
      if (context.biggestChallenges.includes('follow-up')) priorities.push('automation')
      if (context.biggestChallenges.includes('time')) priorities.push('time_management')
    }

    if (context.leadResponseTime && context.leadResponseTime.includes('hour')) {
      priorities.push('response_time_optimization')
    }

    if (context.monthlyLeadVolume && context.monthlyLeadVolume > 25) {
      priorities.push('lead_management_automation')
    }

    return priorities
  }
}