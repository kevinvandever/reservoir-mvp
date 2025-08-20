import { BusinessProfile, AutomationOpportunity } from './types'

export class ContentGeneratorService {
  
  generateExecutiveSummary(businessProfile: BusinessProfile, automationScore: number, roiProjections: { firstYearSavings: number; timeToPayback: number }): string {
    const industrySpecific = this.getIndustrySpecificInsights(businessProfile)
    const performanceLevel = automationScore > 80 ? 'excellent' : automationScore > 60 ? 'strong' : 'good'
    
    return `Your ${businessProfile.industry.replace('_', ' ')} business demonstrates ${performanceLevel} potential for automation with a score of ${automationScore}/100. ${industrySpecific.summary} Based on our analysis, you could save $${roiProjections.firstYearSavings.toLocaleString()} in the first year with a ${Math.round(roiProjections.timeToPayback)}-month payback period.`
  }

  generateCurrentStateAnalysis(businessProfile: BusinessProfile): {
    strengths: string[]
    challenges: string[]
    opportunities: string[]
  } {
    const analysis = {
      strengths: [],
      challenges: [],
      opportunities: []
    }

    // Analyze strengths based on business profile
    if (businessProfile.monthlyRevenue > 30000) {
      analysis.strengths.push('Strong revenue foundation providing resources for automation investment')
    }
    
    if (businessProfile.teamSize > 1) {
      analysis.strengths.push('Team structure in place to support and benefit from automation systems')
    }
    
    if (businessProfile.automationReadiness > 70) {
      analysis.strengths.push('High technical readiness and openness to automation adoption')
    }

    // Identify challenges
    businessProfile.primaryChallenges.forEach(challenge => {
      const challengeMapping = {
        'Lead generation': 'Inconsistent lead flow limiting business growth potential',
        'Time management': 'Manual processes consuming valuable time that could be spent on revenue-generating activities',
        'Client communication': 'Fragmented communication systems affecting client satisfaction and retention',
        'Transaction coordination': 'Manual transaction management creating bottlenecks and stress'
      }
      
      const mappedChallenge = challengeMapping[challenge as keyof typeof challengeMapping]
      if (mappedChallenge) {
        analysis.challenges.push(mappedChallenge)
      }
    })

    // Identify opportunities
    if (businessProfile.industry === 'real_estate') {
      analysis.opportunities.push('Real estate technology ecosystem offers mature, proven automation solutions')
      if (businessProfile.monthlyRevenue > 25000) {
        analysis.opportunities.push('Business scale justifies investment in premium automation tools')
      }
    }

    const timeWasted = Object.values(businessProfile.timeSpentOnTasks).reduce((a, b) => a + b, 0)
    if (timeWasted > 15) {
      analysis.opportunities.push(`${timeWasted} hours weekly of manual work represents significant automation opportunity`)
    }

    return analysis
  }

  generateCompetitivePositioning(businessProfile: BusinessProfile, competitiveAnalysis: { marketPosition: string; percentileRanking: number }): string {
    const position = competitiveAnalysis.marketPosition
    const percentile = competitiveAnalysis.percentileRanking
    
    const positioning = {
      leader: `You're operating in the top ${100 - percentile}% of ${businessProfile.industry.replace('_', ' ')} businesses in terms of automation maturity. Your challenge now is maintaining this competitive advantage and identifying cutting-edge opportunities.`,
      follower: `You're performing at the ${percentile}th percentile in automation adoption. There's significant opportunity to close the gap with industry leaders through strategic automation investments.`,
      laggard: `Your automation maturity is below industry average (${percentile}th percentile). This represents both a challenge and a massive opportunity - implementing proven automation strategies could dramatically accelerate your business growth.`
    }

    return positioning[position as keyof typeof positioning] || positioning.follower
  }

  generateImplementationStrategy(opportunities: AutomationOpportunity[], businessProfile: BusinessProfile): {
    approach: string
    prioritization: string
    riskMitigation: string
  } {
    const quickWins = opportunities.filter(o => o.implementationEffort === 'low')
    // const complexProjects = opportunities.filter(o => o.implementationEffort === 'high')
    
    return {
      approach: businessProfile.teamSize === 1 
        ? 'Given your solo operation, we recommend a phased approach starting with low-maintenance automations that provide immediate value without overwhelming your capacity.'
        : 'With your team structure, you can pursue parallel implementation tracks - quick wins for immediate ROI while building foundational systems for long-term growth.',
      
      prioritization: quickWins.length > 0 
        ? `Start with ${quickWins.length} quick-win opportunities to build momentum and fund larger projects through early savings.`
        : 'Focus on building robust foundational systems that will scale with your business growth.',
      
      riskMitigation: businessProfile.automationReadiness < 60
        ? 'Begin with pilot implementations and comprehensive training to ensure successful adoption before scaling.'
        : 'Your high automation readiness allows for aggressive implementation timelines with confidence in adoption success.'
    }
  }

  generateIndustrySpecificRecommendations(businessProfile: BusinessProfile): string[] {
    const recommendations: string[] = []
    
    if (businessProfile.industry === 'real_estate') {
      recommendations.push('Integrate with MLS systems for automated property alerts and market analysis')
      recommendations.push('Implement automated client onboarding and transaction milestone communications')
      recommendations.push('Set up automated lead scoring based on property search behavior and engagement')
      
      if (businessProfile.monthlyRevenue > 40000) {
        recommendations.push('Consider AI-powered market analysis tools for competitive pricing strategies')
        recommendations.push('Implement automated comparative market analysis (CMA) generation')
      }
      
      if (businessProfile.teamSize > 3) {
        recommendations.push('Deploy team collaboration tools with automated task assignment and tracking')
        recommendations.push('Implement automated commission tracking and team performance dashboards')
      }
    }

    // Add growth stage specific recommendations
    if (businessProfile.growthStage === 'scaling') {
      recommendations.push('Build scalable automation infrastructure now to prevent bottlenecks during rapid growth')
      recommendations.push('Implement automated reporting and analytics to maintain visibility during expansion')
    }

    return recommendations
  }

  generateNextSteps(businessProfile: BusinessProfile, opportunities: AutomationOpportunity[]): {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  } {
    const sortedOpportunities = opportunities.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 }
      const effortWeight = { low: 3, medium: 2, high: 1 }
      
      const aScore = priorityWeight[a.priority] + effortWeight[a.implementationEffort]
      const bScore = priorityWeight[b.priority] + effortWeight[b.implementationEffort]
      
      return bScore - aScore
    })

    return {
      immediate: [
        'Schedule a consultation to review your specific automation roadmap',
        'Audit current tools and identify integration opportunities',
        `Begin implementation of ${sortedOpportunities[0]?.title || 'highest priority automation'}`
      ],
      
      shortTerm: [
        'Deploy 2-3 quick-win automations within the next 30 days',
        'Establish automation success metrics and tracking systems',
        'Train team on new automated processes and workflows'
      ],
      
      longTerm: [
        'Continuously optimize and expand automation based on performance data',
        'Explore advanced AI and machine learning opportunities',
        'Scale successful automations across all business operations'
      ]
    }
  }

  private getIndustrySpecificInsights(businessProfile: BusinessProfile): { summary: string, focus: string[] } {
    const insights = {
      real_estate: {
        summary: 'The real estate industry offers mature automation opportunities with proven ROI across lead management, transaction coordination, and client communication.',
        focus: ['CRM automation', 'Transaction management', 'Lead nurturing', 'Client communication']
      },
      e_commerce: {
        summary: 'E-commerce businesses benefit significantly from automation in inventory, customer service, and marketing workflows.',
        focus: ['Inventory management', 'Customer service', 'Marketing automation', 'Order processing']
      },
      consulting: {
        summary: 'Consulting businesses can leverage automation for client onboarding, project management, and business development.',
        focus: ['Client onboarding', 'Project management', 'Proposal generation', 'Follow-up systems']
      },
      default: {
        summary: 'Your business shows strong potential for automation across multiple operational areas.',
        focus: ['Process automation', 'Communication systems', 'Data management', 'Client relationship management']
      }
    }

    return insights[businessProfile.industry as keyof typeof insights] || insights.default
  }

  generateSuccessStories(businessProfile: BusinessProfile): {
    title: string
    businessType: string
    challenge: string
    solution: string
    results: string[]
  }[] {
    // Generate relevant success stories based on business profile
    const stories = []

    if (businessProfile.industry === 'real_estate') {
      stories.push({
        title: 'Solo Agent Doubles Production',
        businessType: 'Individual Real Estate Agent',
        challenge: 'Managing 200+ leads manually while handling 15+ transactions simultaneously',
        solution: 'Implemented CRM automation with automated nurture sequences and transaction coordination system',
        results: [
          'Increased lead conversion from 12% to 28%',
          'Reduced time spent on follow-up by 15 hours/week',
          'Doubled transaction volume within 8 months'
        ]
      })
    }

    if (businessProfile.teamSize > 3) {
      stories.push({
        title: 'Team Productivity Breakthrough',
        businessType: `${businessProfile.teamSize}-person team`,
        challenge: 'Inconsistent processes and communication gaps across team members',
        solution: 'Deployed integrated automation platform with team collaboration and automated workflows',
        results: [
          'Increased team productivity by 40%',
          'Reduced errors and missed deadlines by 60%',
          'Improved client satisfaction scores by 25%'
        ]
      })
    }

    return stories
  }

  generateQuestionAnalysis(businessProfile: BusinessProfile): {
    keyInsights: string[]
    dataConfidence: number
    missingInformation: string[]
  } {
    const insights: string[] = []
    const missing: string[] = []
    let confidence = 85

    // Analyze what we learned from the conversation
    if (businessProfile.monthlyRevenue > 0) {
      insights.push(`Revenue scale of $${businessProfile.monthlyRevenue.toLocaleString()}/month provides foundation for automation investment`)
    } else {
      missing.push('Monthly revenue data for accurate ROI calculations')
      confidence -= 10
    }

    if (businessProfile.teamSize > 1) {
      insights.push(`Team of ${businessProfile.teamSize} can benefit from collaborative automation tools`)
    }

    if (businessProfile.primaryChallenges.length > 0) {
      insights.push(`Primary challenges in ${businessProfile.primaryChallenges.join(', ')} align with proven automation solutions`)
    } else {
      missing.push('Specific business challenges to target with automation')
      confidence -= 15
    }

    const timeWasted = Object.values(businessProfile.timeSpentOnTasks).reduce((a, b) => a + b, 0)
    if (timeWasted > 0) {
      insights.push(`${timeWasted} hours/week of manual work represents clear automation opportunity`)
    } else {
      missing.push('Time allocation data for more precise savings calculations')
      confidence -= 10
    }

    return {
      keyInsights: insights,
      dataConfidence: Math.max(confidence, 60),
      missingInformation: missing
    }
  }
}