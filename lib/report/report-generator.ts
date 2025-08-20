import { ReportData, BusinessProfile, AutomationOpportunity, RoadmapPhase, CompetitiveInsights, EnhancedConversationContext } from './types'
import { enhancedConversationService } from '@/lib/questionnaire/enhanced-conversation-service'
import { ContentGeneratorService } from './content-generator'
import { ROICalculatorService } from './roi-calculator'
import { ReservoirClient } from '@/lib/reservoir/client'

export class ReportGenerationError extends Error {
  constructor(message: string, public code: string, public details?: unknown) {
    super(message)
    this.name = 'ReportGenerationError'
  }
}

export class ReportGeneratorService {
  private contentGenerator: ContentGeneratorService
  private roiCalculator: ROICalculatorService
  private reservoirClient: ReservoirClient
  
  constructor() {
    this.contentGenerator = new ContentGeneratorService()
    this.roiCalculator = new ROICalculatorService()
    this.reservoirClient = new ReservoirClient()
  }
  
  async generateReport(sessionId: string): Promise<ReportData> {
    console.log('🔄 Starting report generation for session:', sessionId);
    
    try {
      // 1. Load questionnaire responses from enhanced conversation context
      const conversationContext = await this.loadConversationContext(sessionId);
      const businessIntelligence = enhancedConversationService.getBusinessIntelligence(sessionId);
      
      // 2. Analyze responses to create comprehensive business profile
      const businessProfile = this.analyzeResponses(conversationContext, businessIntelligence || {});
      
      // 3. Calculate automation opportunity score
      const automationScore = this.calculateAutomationScore(businessProfile);
      
      // 4. Get personalized recommendations from Reservoir API
      const opportunities = await this.getReservoirRecommendations(businessProfile);
      
      // 5. Calculate ROI projections for each opportunity
      const roiProjections = this.roiCalculator.calculateROI(businessProfile, opportunities);
      
      // 6. Generate implementation roadmap
      const roadmap = this.generateRoadmap(opportunities, businessProfile);
      
      // 7. Create competitive analysis
      const competitiveAnalysis = this.generateCompetitiveAnalysis(businessProfile);
      
      // 8. Generate strategic recommendations using AI content generator
      const strategicRecommendations = await this.generateStrategicRecommendations(businessProfile);
      
      const reportData: ReportData = {
        businessProfile,
        automationScore,
        opportunities,
        roiProjections,
        implementationRoadmap: roadmap,
        competitiveAnalysis,
        quickWins: this.identifyQuickWins(opportunities),
        strategicRecommendations,
        generatedAt: new Date(),
        sessionId
      };

      // 9. Save report to localStorage for now
      this.saveReport(reportData);
      
      console.log('✅ Report generation completed successfully');
      return reportData;
      
    } catch (error) {
      console.error('❌ Error generating report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new ReportGenerationError(
        'Failed to generate report. Please try again.',
        'REPORT_GENERATION_FAILED',
        { originalError: errorMessage }
      );
    }
  }

  private async loadConversationContext(sessionId: string): Promise<EnhancedConversationContext> {
    // Use await to make this properly async
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const context = enhancedConversationService.getConversationContext(sessionId);
    const businessIntelligence = enhancedConversationService.getBusinessIntelligence(sessionId);
    
    // Extract from business intelligence context structure
    const biContext = businessIntelligence?.context || {};
    
    // Safely extract values with proper type handling
    const teamSizeStr = biContext?.teamSize || context?.teamSize || '1';
    const teamSize = typeof teamSizeStr === 'string' ? parseInt(teamSizeStr) : teamSizeStr;
    
    const gciStr = biContext?.lastYearGCI || context?.lastYearGCI || '0';
    const lastYearGCI = typeof gciStr === 'string' ? parseFloat(gciStr) : gciStr;
    
    return {
      sessionId,
      industry: biContext?.industry || context?.industry || 'real_estate',
      teamSize: isNaN(teamSize) ? 1 : teamSize,
      lastYearGCI: isNaN(lastYearGCI) ? 0 : lastYearGCI,
      marketingTools: biContext?.marketingTools || context?.marketingTools || [],
      businessType: biContext?.businessType || context?.businessType || 'individual',
      challenges: biContext?.challenges || [],
      completedAt: new Date()
    };
  }

  private analyzeResponses(context: EnhancedConversationContext, businessIntelligence: Record<string, unknown>): BusinessProfile {
    // Use business intelligence for additional insights
    const biContext = (businessIntelligence?.context || {}) as Partial<EnhancedConversationContext>;
    
    // Extract business profile from conversation context and business intelligence
    return {
      industry: context.industry || biContext?.industry || 'real_estate',
      businessType: this.determineBusinessType(context),
      teamSize: context.teamSize || biContext?.teamSize || 1,
      monthlyRevenue: context.lastYearGCI ? context.lastYearGCI / 12 : 0,
      growthStage: this.determineGrowthStage(context),
      primaryChallenges: context.challenges || biContext?.challenges || ['Lead generation', 'Time management'],
      timeSpentOnTasks: this.analyzeTimeAllocation(context),
      currentTools: context.marketingTools || biContext?.marketingTools || [],
      automationReadiness: this.calculateReadiness(context)
    };
  }

  private calculateAutomationScore(profile: BusinessProfile): number {
    let score = 0;
    
    // Business maturity (30 points)
    if (profile.monthlyRevenue > 20000) score += 15;
    if (profile.teamSize > 1) score += 10;
    if (profile.growthStage === 'scaling') score += 5;
    
    // Challenge severity (25 points)
    const challengeScore = profile.primaryChallenges.length * 5;
    score += Math.min(challengeScore, 25);
    
    // Automation readiness (25 points)
    score += profile.automationReadiness * 0.25;
    
    // Opportunity potential (20 points)
    const timeWasted = Object.values(profile.timeSpentOnTasks).reduce((a, b) => a + b, 0);
    if (timeWasted > 20) score += 20;
    else if (timeWasted > 10) score += 15;
    else score += 10;
    
    return Math.min(Math.round(score), 100);
  }

  private async getReservoirRecommendations(businessProfile: BusinessProfile): Promise<AutomationOpportunity[]> {
    try {
      // Get recommendations from Reservoir API
      const recommendations = await this.reservoirClient.getAutomationRecommendations(businessProfile);
      
      // Validate and adjust recommendations based on business profile
      const validatedRecommendations = await Promise.all(
        recommendations.map(async (rec) => {
          const validation = await this.reservoirClient.validateRecommendation(rec.id, businessProfile);
          if (validation.adjustments) {
            return { ...rec, ...validation.adjustments };
          }
          return rec;
        })
      );
      
      return validatedRecommendations;
    } catch (error) {
      console.error('Error fetching Reservoir recommendations:', error);
      // Fallback to mock data if API fails
      return this.generateMockOpportunities(businessProfile);
    }
  }

  private generateMockOpportunities(profile: BusinessProfile): AutomationOpportunity[] {
    // Generate personalized opportunities based on business profile
    const opportunities: AutomationOpportunity[] = [];

    if (profile.industry === 'real_estate') {
      opportunities.push({
        id: 'crm-automation',
        title: 'CRM Lead Follow-up Automation',
        description: 'Automate lead nurturing sequences and follow-up tasks',
        category: 'Lead Management',
        impactScore: 85,
        implementationEffort: 'medium',
        timeToValue: 4,
        monthlySavings: Math.round(profile.monthlyRevenue * 0.05),
        implementationCost: 2500,
        roiProjection: 250,
        priority: 'high',
        beforeScenario: 'Manually following up with 50+ leads weekly, missing opportunities',
        afterScenario: 'Automated sequences nurture leads 24/7, increasing conversion by 35%',
        successMetrics: ['35% increase in lead conversion', '15 hours/week saved', '90% lead response rate']
      });

      opportunities.push({
        id: 'transaction-coordination',
        title: 'Transaction Coordination System',
        description: 'Streamline transaction management and client communication',
        category: 'Transaction Management',
        impactScore: 78,
        implementationEffort: 'high',
        timeToValue: 8,
        monthlySavings: Math.round(profile.monthlyRevenue * 0.08),
        implementationCost: 5000,
        roiProjection: 180,
        priority: 'high',
        beforeScenario: 'Manual tracking of deadlines, scattered communication',
        afterScenario: 'Automated milestone tracking, centralized client updates',
        successMetrics: ['40% faster closings', '25% fewer missed deadlines', '95% client satisfaction']
      });
    }

    if (profile.primaryChallenges.includes('Lead generation')) {
      opportunities.push({
        id: 'social-media-automation',
        title: 'Social Media Content Automation',
        description: 'Automated posting and engagement across social platforms',
        category: 'Marketing',
        impactScore: 65,
        implementationEffort: 'low',
        timeToValue: 2,
        monthlySavings: Math.round(profile.monthlyRevenue * 0.03),
        implementationCost: 1200,
        roiProjection: 400,
        priority: 'medium',
        beforeScenario: 'Inconsistent posting, low engagement, 10 hours/week',
        afterScenario: 'Consistent brand presence, 3x engagement, 2 hours/week',
        successMetrics: ['300% engagement increase', '8 hours/week saved', '50% more qualified leads']
      });
    }

    return opportunities;
  }


  private generateRoadmap(opportunities: AutomationOpportunity[], _profile: BusinessProfile): RoadmapPhase[] {
    // Sort opportunities by priority and implementation effort
    const sortedOpportunities = opportunities.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const effortWeight = { low: 3, medium: 2, high: 1 };
      
      const aScore = priorityWeight[a.priority] + effortWeight[a.implementationEffort];
      const bScore = priorityWeight[b.priority] + effortWeight[b.implementationEffort];
      
      return bScore - aScore;
    });

    const phases: RoadmapPhase[] = [
      {
        id: 'phase-1',
        name: 'Quick Wins & Foundation',
        month: 1,
        opportunities: sortedOpportunities.slice(0, 2).map(o => o.id),
        expectedROI: sortedOpportunities.slice(0, 2).reduce((sum, o) => sum + o.monthlySavings, 0),
        description: 'Implement high-impact, quick-to-deploy automations'
      },
      {
        id: 'phase-2',
        name: 'Process Optimization',
        month: 2,
        opportunities: sortedOpportunities.slice(2, 4).map(o => o.id),
        expectedROI: sortedOpportunities.slice(2, 4).reduce((sum, o) => sum + o.monthlySavings, 0),
        description: 'Enhance existing processes with automation'
      },
      {
        id: 'phase-3',
        name: 'Advanced Integration',
        month: 3,
        opportunities: sortedOpportunities.slice(4).map(o => o.id),
        expectedROI: sortedOpportunities.slice(4).reduce((sum, o) => sum + o.monthlySavings, 0),
        description: 'Deploy complex integrations and advanced features'
      }
    ];

    return phases.filter(phase => phase.opportunities.length > 0);
  }

  private generateCompetitiveAnalysis(profile: BusinessProfile): CompetitiveInsights {
    // Mock competitive analysis based on industry benchmarks
    let percentile = 50;
    
    if (profile.monthlyRevenue > 30000) percentile += 20;
    if (profile.teamSize > 3) percentile += 15;
    if (profile.automationReadiness > 70) percentile += 10;
    
    percentile = Math.min(percentile, 95);
    
    return {
      industryBenchmark: 65,
      percentileRanking: percentile,
      competitorAdvantages: [
        'Advanced CRM automation',
        'Integrated marketing systems',
        'Automated transaction management'
      ],
      marketPosition: percentile > 80 ? 'leader' : percentile > 60 ? 'follower' : 'laggard'
    };
  }

  private async generateStrategicRecommendations(profile: BusinessProfile): Promise<string[]> {
    // Use content generator for AI-powered recommendations
    const industryRecommendations = this.contentGenerator.generateIndustrySpecificRecommendations(profile);
    
    // Add growth-stage specific recommendations
    const recommendations = [...industryRecommendations];
    
    if (profile.growthStage === 'scaling') {
      recommendations.push('Build scalable systems now to support rapid growth without proportional staff increases');
    }

    if (profile.monthlyRevenue > 40000) {
      recommendations.push('Consider advanced AI-powered tools for market analysis and pricing optimization');
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  private identifyQuickWins(opportunities: AutomationOpportunity[]): AutomationOpportunity[] {
    return opportunities
      .filter(opp => opp.implementationEffort === 'low' && opp.timeToValue <= 4)
      .sort((a, b) => b.roiProjection - a.roiProjection)
      .slice(0, 3);
  }

  private saveReport(reportData: ReportData): void {
    try {
      localStorage.setItem(`report_${reportData.sessionId}`, JSON.stringify(reportData));
      console.log('Report saved to localStorage');
    } catch (error) {
      console.error('Error saving report:', error);
    }
  }

  // Helper methods
  private determineBusinessType(context: EnhancedConversationContext): string {
    if (context.teamSize && context.teamSize > 5) return 'team';
    if (context.lastYearGCI && context.lastYearGCI > 500000) return 'high_producer';
    return 'individual';
  }

  private determineGrowthStage(context: EnhancedConversationContext): 'startup' | 'scaling' | 'established' {
    if (!context.lastYearGCI) return 'startup';
    if (context.lastYearGCI < 200000) return 'startup';
    if (context.lastYearGCI < 500000) return 'scaling';
    return 'established';
  }

  private analyzeTimeAllocation(context: EnhancedConversationContext): Record<string, number> {
    // Mock time allocation based on challenges
    const timeSpent: Record<string, number> = {};
    
    if (context.challenges?.includes('Lead generation')) {
      timeSpent['lead_follow_up'] = 15;
    }
    if (context.challenges?.includes('Time management')) {
      timeSpent['administrative_tasks'] = 12;
    }
    if (context.challenges?.includes('Client communication')) {
      timeSpent['client_communication'] = 10;
    }
    
    return timeSpent;
  }

  private calculateReadiness(context: EnhancedConversationContext): number {
    let readiness = 50; // Base readiness
    
    if (context.marketingTools && context.marketingTools.length > 0) readiness += 20;
    if (context.teamSize && context.teamSize > 1) readiness += 15;
    if (context.lastYearGCI && context.lastYearGCI > 300000) readiness += 10;
    
    return Math.min(readiness, 95);
  }

}