import { BusinessProfile, AutomationOpportunity, ROIProjections } from './types'

export class ROICalculatorService {
  
  calculateROI(businessProfile: BusinessProfile, opportunities: AutomationOpportunity[]): ROIProjections {
    const totalImplementationCost = opportunities.reduce((sum, opp) => sum + opp.implementationCost, 0)
    const totalMonthlySavings = opportunities.reduce((sum, opp) => sum + opp.monthlySavings, 0)
    const annualSavings = totalMonthlySavings * 12
    
    return {
      timeToPayback: totalMonthlySavings > 0 ? totalImplementationCost / totalMonthlySavings : 12,
      firstYearSavings: annualSavings - totalImplementationCost,
      threeYearValue: (annualSavings * 3) - totalImplementationCost,
      implementationCost: totalImplementationCost,
      netROI: totalImplementationCost > 0 ? ((annualSavings - totalImplementationCost) / totalImplementationCost) * 100 : 0,
      confidence: this.calculateConfidence(businessProfile, opportunities)
    }
  }

  calculateTimeToValue(opportunity: AutomationOpportunity, businessProfile: BusinessProfile): number {
    const baseImplementationTime = {
      'low': 2,
      'medium': 6, 
      'high': 12
    }[opportunity.implementationEffort]
    
    // Adjust based on business size and technical readiness
    const sizeFactor = businessProfile.teamSize > 20 ? 1.5 : 1.0
    const readinessFactor = businessProfile.automationReadiness / 100
    
    return Math.round(baseImplementationTime * sizeFactor * (2 - readinessFactor))
  }
  
  calculateMonthlySavings(opportunity: AutomationOpportunity, profile: BusinessProfile): number {
    // Calculate based on time saved * hourly rate for business size
    const hourlyRate = this.getHourlyRateByBusinessSize(profile.teamSize)
    const timeSavedHours = this.estimateTimeSaved(opportunity, profile)
    
    return Math.round(timeSavedHours * hourlyRate * 4.33) // weeks per month
  }

  calculateImplementationCost(opportunity: AutomationOpportunity, profile: BusinessProfile): number {
    // Base cost from opportunity
    let cost = opportunity.implementationCost
    
    // Adjust based on business complexity
    if (profile.teamSize > 10) cost *= 1.3
    if (profile.growthStage === 'established') cost *= 1.2
    
    // Scale adjustment for real estate specifics
    if (profile.industry === 'real_estate' && profile.monthlyRevenue > 50000) {
      cost *= 1.15 // Higher end systems for top producers
    }
    
    return Math.round(cost)
  }

  calculateRevenueProjection(opportunity: AutomationOpportunity, profile: BusinessProfile): number {
    // Different calculation for revenue-generating vs cost-saving automations
    if (opportunity.category === 'Lead Management' || opportunity.category === 'Marketing') {
      // Revenue-generating automations
      const baseRevenue = profile.monthlyRevenue
      let multiplier = 0.02 // 2% revenue increase baseline
      
      if (opportunity.impactScore > 80) multiplier = 0.05
      else if (opportunity.impactScore > 60) multiplier = 0.03
      
      return Math.round(baseRevenue * multiplier)
    } else {
      // Cost-saving automations (return as savings)
      return opportunity.monthlySavings
    }
  }

  private getHourlyRateByBusinessSize(teamSize: number): number {
    if (teamSize === 1) return 75 // Solo entrepreneur
    if (teamSize <= 5) return 100 // Small team
    if (teamSize <= 20) return 150 // Medium business
    return 200 // Large business
  }

  private estimateTimeSaved(opportunity: AutomationOpportunity, profile: BusinessProfile): number {
    // Estimate weekly hours saved based on opportunity type and business profile
    const baseHours = {
      'Lead Management': 10,
      'Transaction Management': 8,
      'Marketing': 6,
      'Client Communication': 5,
      'Administrative': 4
    }[opportunity.category] || 5

    // Scale based on business size
    const scaleFactor = Math.min(profile.teamSize / 5, 2.0) // Cap at 2x scaling
    
    return Math.round(baseHours * scaleFactor)
  }

  private calculateConfidence(businessProfile: BusinessProfile, opportunities: AutomationOpportunity[]): number {
    let confidence = 70 // Base confidence
    
    // Higher confidence for established businesses with track record
    if (businessProfile.growthStage === 'established') confidence += 15
    if (businessProfile.automationReadiness > 80) confidence += 10
    if (businessProfile.monthlyRevenue > 40000) confidence += 10
    
    // Lower confidence if too many high-effort opportunities
    const highEffortCount = opportunities.filter(o => o.implementationEffort === 'high').length
    if (highEffortCount > 2) confidence -= 10
    
    // Adjust for industry maturity
    if (businessProfile.industry === 'real_estate') confidence += 5 // Mature automation market
    
    return Math.min(Math.max(confidence, 40), 95) // Keep between 40-95%
  }

  // Industry-specific benchmark calculations
  calculateIndustryBenchmarks(profile: BusinessProfile): {
    avgROI: number
    avgPaybackMonths: number
    successRate: number
  } {
    const industryBenchmarks = {
      'real_estate': {
        avgROI: 185,
        avgPaybackMonths: 6.5,
        successRate: 87
      },
      'e_commerce': {
        avgROI: 240,
        avgPaybackMonths: 4.2,
        successRate: 92
      },
      'consulting': {
        avgROI: 160,
        avgPaybackMonths: 8.1,
        successRate: 78
      },
      'default': {
        avgROI: 170,
        avgPaybackMonths: 7.0,
        successRate: 82
      }
    }

    return industryBenchmarks[profile.industry as keyof typeof industryBenchmarks] || industryBenchmarks.default
  }

  // Risk assessment for ROI projections
  calculateRiskFactors(opportunity: AutomationOpportunity, profile: BusinessProfile): {
    implementationRisk: 'low' | 'medium' | 'high'
    adoptionRisk: 'low' | 'medium' | 'high'
    overallRisk: 'low' | 'medium' | 'high'
  } {
    let implementationRisk: 'low' | 'medium' | 'high' = 'low'
    let adoptionRisk: 'low' | 'medium' | 'high' = 'low'

    // Implementation risk based on complexity
    if (opportunity.implementationEffort === 'high') implementationRisk = 'high'
    else if (opportunity.implementationEffort === 'medium') implementationRisk = 'medium'

    // Adoption risk based on business readiness
    if (profile.automationReadiness < 50) adoptionRisk = 'high'
    else if (profile.automationReadiness < 70) adoptionRisk = 'medium'

    // Team size factor
    if (profile.teamSize === 1 && opportunity.implementationEffort === 'high') {
      adoptionRisk = 'high'
    }

    // Overall risk assessment
    const riskScore = (implementationRisk === 'high' ? 3 : implementationRisk === 'medium' ? 2 : 1) +
                      (adoptionRisk === 'high' ? 3 : adoptionRisk === 'medium' ? 2 : 1)

    const overallRisk = riskScore >= 5 ? 'high' : riskScore >= 3 ? 'medium' : 'low'

    return { implementationRisk, adoptionRisk, overallRisk }
  }
}