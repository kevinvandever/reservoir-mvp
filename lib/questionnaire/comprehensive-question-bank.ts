// Comprehensive Question Bank - 50+ Strategic Questions for Real Estate Professionals
import { QuestionBank, SectionType, Question, Section } from './question-bank-types'

export const COMPREHENSIVE_QUESTION_BANK: QuestionBank = {
  sections: [
    // Section 1: Business Foundation (15% weight, Required) - 8 questions
    {
      id: SectionType.BUSINESS_FOUNDATION,
      name: "Business Foundation",
      description: "Core business structure and performance metrics",
      weight: 15,
      required: true,
      completionCriteria: {
        minimumQuestions: 6,
        requiredTopics: ['identity', 'experience', 'performance', 'structure']
      },
      questions: [
        {
          id: 'foundation_001',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "What's your name and which brokerage are you affiliated with?",
          purpose: "Establish identity and professional context",
          weight: 2,
          required: true,
          tags: ['identity', 'professional', 'basic'],
          variations: {
            soloAgent: "What's your name and brokerage?",
            teamLead: "What's your name, brokerage, and team name?",
            enterprise: "Please share your name, brokerage, and your role in the organization."
          },
          quickResponses: ["I'll type it out", "Skip for now"]
        },
        {
          id: 'foundation_002',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "What market areas do you primarily serve?",
          purpose: "Understand geographic focus and market knowledge",
          weight: 1,
          required: true,
          tags: ['market', 'geographic', 'specialization'],
          quickResponses: ["Single city", "Multiple cities", "Statewide", "National"]
        },
        {
          id: 'foundation_003',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "How many years have you been active in real estate?",
          purpose: "Assess experience level for appropriate recommendations",
          weight: 2,
          required: true,
          tags: ['experience', 'tenure', 'expertise'],
          quickResponses: ["Less than 2 years", "2-5 years", "5-10 years", "10+ years"]
        },
        {
          id: 'foundation_004',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "What was your approximate GCI (Gross Commission Income) last year?",
          purpose: "Establish business performance baseline",
          weight: 3,
          required: true,
          tags: ['performance', 'revenue', 'success'],
          followUpTriggers: ['high_performer', 'scaling_needs'],
          quickResponses: ["Under $100K", "$100K-$250K", "$250K-$500K", "$500K+", "Prefer not to say"]
        },
        {
          id: 'foundation_005',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "How many transactions did you close last year?",
          purpose: "Understand volume and average transaction value",
          weight: 3,
          required: true,
          tags: ['performance', 'volume', 'productivity'],
          quickResponses: ["Under 12", "12-24", "25-50", "50+"]
        },
        {
          id: 'foundation_006',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "What percentage of your business comes from each lead source? Think referrals, online leads, sphere of influence, prospecting, etc.",
          purpose: "Analyze lead generation effectiveness and dependencies",
          weight: 2,
          required: true,
          tags: ['lead_sources', 'marketing', 'business_model'],
          quickResponses: ["Mostly referrals", "Mostly online", "Mixed sources", "I'll break it down"]
        },
        {
          id: 'foundation_007',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "What's your current split between buyer and seller representation?",
          purpose: "Understand business focus and workflow implications",
          weight: 1,
          required: false,
          tags: ['business_model', 'specialization', 'workflow'],
          quickResponses: ["Mostly buyers", "Mostly sellers", "50/50 split", "It varies"]
        },
        {
          id: 'foundation_008',
          section: SectionType.BUSINESS_FOUNDATION,
          text: "Do you work solo, with a team, or are you part of a larger organization?",
          purpose: "Determine collaboration needs and automation scale",
          weight: 2,
          required: true,
          tags: ['structure', 'team', 'scale'],
          followUpTriggers: ['team_lead', 'solo_agent', 'enterprise'],
          quickResponses: ["Solo agent", "Small team (2-5)", "Large team (6+)", "Enterprise organization"]
        }
      ]
    },

    // Section 2: Current Systems & Tools (10% weight, Required) - 7 questions
    {
      id: SectionType.CURRENT_SYSTEMS,
      name: "Current Systems & Tools",
      description: "Technology stack and operational tools assessment",
      weight: 10,
      required: true,
      completionCriteria: {
        minimumQuestions: 5,
        requiredTopics: ['crm', 'marketing_tools', 'technology_comfort']
      },
      questions: [
        {
          id: 'systems_001',
          section: SectionType.CURRENT_SYSTEMS,
          text: "What CRM system do you currently use, and roughly how many contacts do you have in your database?",
          purpose: "Assess current CRM capabilities and database size",
          weight: 3,
          required: true,
          tags: ['crm', 'database', 'contacts'],
          quickResponses: ["No CRM", "Basic CRM (<1K contacts)", "Established CRM (1K-5K)", "Large database (5K+)"]
        },
        {
          id: 'systems_002',
          section: SectionType.CURRENT_SYSTEMS,
          text: "What marketing tools and platforms do you currently use for promoting your business?",
          purpose: "Understand marketing technology stack",
          weight: 2,
          required: true,
          tags: ['marketing_tools', 'platforms', 'technology'],
          quickResponses: ["Social media only", "Email marketing", "Multiple tools", "Very minimal"]
        },
        {
          id: 'systems_003',
          section: SectionType.CURRENT_SYSTEMS,
          text: "How do you currently manage your transactions from contract to closing?",
          purpose: "Assess transaction management processes",
          weight: 2,
          required: true,
          tags: ['transaction_management', 'process', 'workflow'],
          quickResponses: ["Paper/manual", "Spreadsheets", "Transaction software", "Brokerage system"]
        },
        {
          id: 'systems_004',
          section: SectionType.CURRENT_SYSTEMS,
          text: "What's your main method for communicating with clients throughout the process?",
          purpose: "Understand communication preferences and tools",
          weight: 1,
          required: false,
          tags: ['communication', 'client_management', 'tools'],
          quickResponses: ["Phone calls", "Email", "Text messaging", "Mix of all"]
        },
        {
          id: 'systems_005',
          section: SectionType.CURRENT_SYSTEMS,
          text: "How do you track and follow up with your leads currently?",
          purpose: "Assess lead management processes",
          weight: 2,
          required: true,
          tags: ['lead_tracking', 'follow_up', 'process'],
          quickResponses: ["Manual notes", "Spreadsheet", "CRM system", "No formal system"]
        },
        {
          id: 'systems_006',
          section: SectionType.CURRENT_SYSTEMS,
          text: "How do you handle document storage and sharing with clients?",
          purpose: "Understand document management needs",
          weight: 1,
          required: false,
          tags: ['document_management', 'storage', 'sharing'],
          quickResponses: ["Email attachments", "Cloud storage", "Brokerage portal", "Mix of methods"]
        },
        {
          id: 'systems_007',
          section: SectionType.CURRENT_SYSTEMS,
          text: "On a scale of 1-10, how comfortable are you with adopting new technology and tools?",
          purpose: "Gauge technology adoption readiness",
          weight: 1,
          required: true,
          tags: ['technology_comfort', 'adoption', 'readiness'],
          quickResponses: ["1-3 (Cautious)", "4-6 (Moderate)", "7-8 (Comfortable)", "9-10 (Early adopter)"]
        }
      ]
    },

    // Section 3: Lead Generation & Nurturing (20% weight, Required) - 10 questions
    {
      id: SectionType.LEAD_GENERATION,
      name: "Lead Generation & Nurturing",
      description: "Lead acquisition, response, and conversion processes",
      weight: 20,
      required: true,
      completionCriteria: {
        minimumQuestions: 7,
        requiredTopics: ['lead_volume', 'response_time', 'conversion', 'nurturing']
      },
      questions: [
        {
          id: 'leadgen_001',
          section: SectionType.LEAD_GENERATION,
          text: "How many new leads do you typically receive per month across all sources?",
          purpose: "Establish lead volume baseline for automation ROI calculations",
          weight: 3,
          required: true,
          tags: ['lead_volume', 'metrics', 'baseline'],
          quickResponses: ["Under 10", "10-25", "25-50", "50+"]
        },
        {
          id: 'leadgen_002',
          section: SectionType.LEAD_GENERATION,
          text: "What's your biggest challenge with lead generation right now?",
          purpose: "Identify primary pain points for targeted automation",
          weight: 3,
          required: true,
          tags: ['challenges', 'pain_points', 'priorities'],
          quickResponses: ["Not enough leads", "Lead quality", "Follow-up consistency", "Converting leads"]
        },
        {
          id: 'leadgen_003',
          section: SectionType.LEAD_GENERATION,
          text: "How quickly do you typically respond to new leads?",
          purpose: "Assess response time optimization opportunities",
          weight: 3,
          required: true,
          tags: ['response_time', 'speed', 'competitive_advantage'],
          followUpTriggers: ['slow_response', 'automation_opportunity'],
          quickResponses: ["Within 5 minutes", "Within 1 hour", "Within 4 hours", "Next business day"]
        },
        {
          id: 'leadgen_004',
          section: SectionType.LEAD_GENERATION,
          text: "Walk me through your typical lead follow-up sequence - what happens after that first contact?",
          purpose: "Understand current nurturing process and automation gaps",
          weight: 2,
          required: true,
          tags: ['follow_up', 'nurturing', 'process', 'automation_gap'],
          quickResponses: ["Single follow-up", "Few follow-ups", "Systematic sequence", "No formal process"]
        },
        {
          id: 'leadgen_005',
          section: SectionType.LEAD_GENERATION,
          text: "What's your approximate conversion rate from leads to appointments?",
          purpose: "Measure conversion efficiency for improvement targeting",
          weight: 2,
          required: false,
          tags: ['conversion', 'metrics', 'efficiency'],
          quickResponses: ["Under 10%", "10-20%", "20-30%", "30%+", "Not sure"]
        },
        {
          id: 'leadgen_006',
          section: SectionType.LEAD_GENERATION,
          text: "What's your conversion rate from appointments to signed clients?",
          purpose: "Identify presentation and closing optimization needs",
          weight: 2,
          required: false,
          tags: ['conversion', 'closing', 'presentation'],
          quickResponses: ["Under 30%", "30-50%", "50-70%", "70%+", "Not sure"]
        },
        {
          id: 'leadgen_007',
          section: SectionType.LEAD_GENERATION,
          text: "How do you currently nurture leads who aren't ready to buy or sell immediately?",
          purpose: "Assess long-term nurturing strategy and automation potential",
          weight: 2,
          required: true,
          tags: ['nurturing', 'long_term', 'automation'],
          quickResponses: ["Email campaigns", "Periodic check-ins", "Social media", "No formal nurturing"]
        },
        {
          id: 'leadgen_008',
          section: SectionType.LEAD_GENERATION,
          text: "What's your average cost per lead across your main lead sources?",
          purpose: "Understand marketing efficiency and budget optimization",
          weight: 1,
          required: false,
          tags: ['cost', 'roi', 'budget', 'efficiency'],
          quickResponses: ["Under $50", "$50-$100", "$100-$200", "$200+", "Not sure"]
        },
        {
          id: 'leadgen_009',
          section: SectionType.LEAD_GENERATION,
          text: "How do you stay in touch with your sphere of influence and past clients?",
          purpose: "Evaluate referral generation and relationship maintenance",
          weight: 2,
          required: true,
          tags: ['sphere', 'referrals', 'relationships', 'automation'],
          quickResponses: ["Regular calls/emails", "Holiday cards", "Market updates", "Social media only"]
        },
        {
          id: 'leadgen_010',
          section: SectionType.LEAD_GENERATION,
          text: "What percentage of your business comes from repeat clients and referrals?",
          purpose: "Assess relationship-based business strength",
          weight: 1,
          required: false,
          tags: ['referrals', 'repeat_business', 'relationships'],
          quickResponses: ["Under 25%", "25-50%", "50-75%", "75%+"]
        }
      ]
    },

    // Section 4: Marketing & Content Creation (20% weight, Required) - 8 questions
    {
      id: SectionType.MARKETING_CONTENT,
      name: "Marketing & Content Creation",
      description: "Content strategy, social media, and brand positioning",
      weight: 20,
      required: true,
      completionCriteria: {
        minimumQuestions: 6,
        requiredTopics: ['content_strategy', 'social_media', 'marketing_budget']
      },
      questions: [
        {
          id: 'marketing_001',
          section: SectionType.MARKETING_CONTENT,
          text: "How often do you create and share content about your business or market?",
          purpose: "Assess content creation frequency and strategy",
          weight: 2,
          required: true,
          tags: ['content_strategy', 'frequency', 'marketing'],
          quickResponses: ["Daily", "Weekly", "Monthly", "Rarely"]
        },
        {
          id: 'marketing_002',
          section: SectionType.MARKETING_CONTENT,
          text: "What social media platforms do you actively use for business?",
          purpose: "Understand social media presence and strategy",
          weight: 2,
          required: true,
          tags: ['social_media', 'platforms', 'strategy'],
          quickResponses: ["Facebook/Instagram", "LinkedIn", "TikTok/YouTube", "Multiple platforms"]
        },
        {
          id: 'marketing_003',
          section: SectionType.MARKETING_CONTENT,
          text: "Do you send regular email newsletters or market updates to your database?",
          purpose: "Evaluate email marketing strategy",
          weight: 2,
          required: true,
          tags: ['email_marketing', 'newsletters', 'database'],
          quickResponses: ["Weekly", "Monthly", "Quarterly", "No regular emails"]
        },
        {
          id: 'marketing_004',
          section: SectionType.MARKETING_CONTENT,
          text: "How do you currently create market analysis and reporting for clients?",
          purpose: "Assess market reporting capabilities",
          weight: 1,
          required: false,
          tags: ['market_analysis', 'reporting', 'client_value'],
          quickResponses: ["Manual reports", "CMA tools", "Automated reports", "Don't create reports"]
        },
        {
          id: 'marketing_005',
          section: SectionType.MARKETING_CONTENT,
          text: "What makes you different from other agents in your area?",
          purpose: "Understand brand positioning and differentiation",
          weight: 2,
          required: true,
          tags: ['brand_positioning', 'differentiation', 'value_proposition'],
          quickResponses: ["Experience", "Technology", "Service quality", "Specialized expertise"]
        },
        {
          id: 'marketing_006',
          section: SectionType.MARKETING_CONTENT,
          text: "Do you track the ROI of your marketing efforts?",
          purpose: "Assess marketing measurement and optimization",
          weight: 1,
          required: false,
          tags: ['marketing_roi', 'tracking', 'optimization'],
          quickResponses: ["Yes, detailed tracking", "Basic tracking", "Rough estimates", "No tracking"]
        },
        {
          id: 'marketing_007',
          section: SectionType.MARKETING_CONTENT,
          text: "What's your approximate monthly marketing budget?",
          purpose: "Understand marketing investment level",
          weight: 2,
          required: true,
          tags: ['marketing_budget', 'investment', 'spending'],
          quickResponses: ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"]
        },
        {
          id: 'marketing_008',
          section: SectionType.MARKETING_CONTENT,
          text: "What marketing activities take up most of your time?",
          purpose: "Identify time-consuming tasks for automation",
          weight: 2,
          required: true,
          tags: ['time_management', 'marketing_activities', 'automation_opportunities'],
          quickResponses: ["Social media", "Email campaigns", "Content creation", "Lead follow-up"]
        }
      ]
    },

    // Section 5: Transaction & Client Management (15% weight, Optional) - 6 questions
    {
      id: SectionType.TRANSACTION_MANAGEMENT,
      name: "Transaction & Client Management",
      description: "Transaction coordination and client service processes",
      weight: 15,
      required: false,
      completionCriteria: {
        minimumQuestions: 4,
        requiredTopics: ['transaction_process', 'client_communication']
      },
      questions: [
        {
          id: 'transaction_001',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "How do you coordinate transactions from contract to closing?",
          purpose: "Understand transaction management process",
          weight: 3,
          required: true,
          tags: ['transaction_process', 'coordination', 'workflow'],
          quickResponses: ["Manual checklist", "Transaction software", "Assistant helps", "Brokerage handles"]
        },
        {
          id: 'transaction_002',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "How do you keep clients updated throughout the transaction process?",
          purpose: "Assess client communication systems",
          weight: 2,
          required: true,
          tags: ['client_communication', 'updates', 'process'],
          quickResponses: ["Personal calls", "Email updates", "Text messages", "Client portal"]
        },
        {
          id: 'transaction_003',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "What's your average time from contract to closing?",
          purpose: "Understand transaction timeline management",
          weight: 1,
          required: false,
          tags: ['timeline', 'efficiency', 'closing'],
          quickResponses: ["Under 30 days", "30-45 days", "45-60 days", "60+ days"]
        },
        {
          id: 'transaction_004',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "What do you do to stay in touch with clients after closing?",
          purpose: "Evaluate post-closing follow-up process",
          weight: 2,
          required: true,
          tags: ['post_closing', 'follow_up', 'relationships'],
          quickResponses: ["Anniversary calls", "Market updates", "Holiday cards", "Minimal contact"]
        },
        {
          id: 'transaction_005',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "How do you measure client satisfaction?",
          purpose: "Assess client satisfaction tracking",
          weight: 1,
          required: false,
          tags: ['client_satisfaction', 'feedback', 'quality'],
          quickResponses: ["Formal surveys", "Informal feedback", "Reviews/testimonials", "Don't measure"]
        },
        {
          id: 'transaction_006',
          section: SectionType.TRANSACTION_MANAGEMENT,
          text: "What percentage of your past clients refer you to others?",
          purpose: "Evaluate referral generation from transactions",
          weight: 1,
          required: false,
          tags: ['referrals', 'client_loyalty', 'satisfaction'],
          quickResponses: ["Under 25%", "25-50%", "50-75%", "75%+"]
        }
      ]
    },

    // Section 6: Market Analysis & Reporting (10% weight, Optional) - 4 questions
    {
      id: SectionType.MARKET_ANALYSIS,
      name: "Market Analysis & Reporting",
      description: "Market data analysis and competitive positioning",
      weight: 10,
      required: false,
      completionCriteria: {
        minimumQuestions: 3,
        requiredTopics: ['market_data', 'competitive_analysis']
      },
      questions: [
        {
          id: 'market_001',
          section: SectionType.MARKET_ANALYSIS,
          text: "What sources do you use for market data and analysis?",
          purpose: "Understand market data sources and capabilities",
          weight: 3,
          required: true,
          tags: ['market_data', 'sources', 'analysis'],
          quickResponses: ["MLS only", "Multiple sources", "Professional services", "Limited data"]
        },
        {
          id: 'market_002',
          section: SectionType.MARKET_ANALYSIS,
          text: "How often do you create and share market reports with your sphere?",
          purpose: "Assess market reporting frequency and distribution",
          weight: 2,
          required: true,
          tags: ['market_reports', 'frequency', 'distribution'],
          quickResponses: ["Monthly", "Quarterly", "Annually", "Rarely"]
        },
        {
          id: 'market_003',
          section: SectionType.MARKET_ANALYSIS,
          text: "How do you stay aware of what your competition is doing?",
          purpose: "Evaluate competitive analysis practices",
          weight: 2,
          required: true,
          tags: ['competitive_analysis', 'market_intelligence', 'strategy'],
          quickResponses: ["Social media monitoring", "Market observation", "Networking", "Don't track"]
        },
        {
          id: 'market_004',
          section: SectionType.MARKET_ANALYSIS,
          text: "How do you identify and communicate market trends to clients?",
          purpose: "Assess trend identification and communication",
          weight: 2,
          required: false,
          tags: ['market_trends', 'communication', 'client_value'],
          quickResponses: ["Regular analysis", "As needed", "Client requests", "Don't actively track"]
        }
      ]
    },

    // Section 7: Goals & Priorities (10% weight, Optional) - 7 questions
    {
      id: SectionType.GOALS_PRIORITIES,
      name: "Goals & Priorities",
      description: "Business objectives and growth priorities",
      weight: 10,
      required: false,
      completionCriteria: {
        minimumQuestions: 4,
        requiredTopics: ['revenue_goals', 'growth_priorities']
      },
      questions: [
        {
          id: 'goals_001',
          section: SectionType.GOALS_PRIORITIES,
          text: "What are your revenue and transaction volume goals for this year?",
          purpose: "Understand business growth targets",
          weight: 3,
          required: true,
          tags: ['revenue_goals', 'transaction_goals', 'targets'],
          quickResponses: ["10-20% growth", "20-50% growth", "50%+ growth", "Maintain current"]
        },
        {
          id: 'goals_002',
          section: SectionType.GOALS_PRIORITIES,
          text: "What's your biggest priority for growing your business this year?",
          purpose: "Identify primary growth focus areas",
          weight: 3,
          required: true,
          tags: ['growth_priorities', 'focus_areas', 'strategy'],
          quickResponses: ["More leads", "Better conversion", "Expand team", "New markets"]
        },
        {
          id: 'goals_003',
          section: SectionType.GOALS_PRIORITIES,
          text: "What aspects of time management do you want to improve?",
          purpose: "Understand time management objectives",
          weight: 2,
          required: true,
          tags: ['time_management', 'productivity', 'efficiency'],
          quickResponses: ["Lead follow-up", "Administrative tasks", "Client meetings", "Marketing activities"]
        },
        {
          id: 'goals_004',
          section: SectionType.GOALS_PRIORITIES,
          text: "Are you planning to build or expand a team?",
          purpose: "Assess team building and scaling plans",
          weight: 2,
          required: false,
          tags: ['team_building', 'scaling', 'growth'],
          quickResponses: ["Add assistant", "Hire agents", "Expand team", "Stay solo"]
        },
        {
          id: 'goals_005',
          section: SectionType.GOALS_PRIORITIES,
          text: "What new technology or tools are you most interested in adopting?",
          purpose: "Identify technology adoption goals",
          weight: 1,
          required: false,
          tags: ['technology_goals', 'tools', 'innovation'],
          quickResponses: ["CRM upgrade", "Marketing automation", "AI tools", "Transaction management"]
        },
        {
          id: 'goals_006',
          section: SectionType.GOALS_PRIORITIES,
          text: "Are you looking to expand into new market areas?",
          purpose: "Understand market expansion intentions",
          weight: 1,
          required: false,
          tags: ['market_expansion', 'geographic_growth', 'strategy'],
          quickResponses: ["Yes, nearby areas", "Yes, different markets", "No expansion planned", "Considering options"]
        },
        {
          id: 'goals_007',
          section: SectionType.GOALS_PRIORITIES,
          text: "How important is work-life balance in your business planning?",
          purpose: "Assess work-life balance priorities",
          weight: 1,
          required: false,
          tags: ['work_life_balance', 'priorities', 'lifestyle'],
          quickResponses: ["Very important", "Moderately important", "Not a priority", "Need improvement"]
        }
      ]
    }
  ],
  totalQuestions: 50,
  requiredQuestions: 33,
  industryVariants: {
    real_estate: {
      // Real estate specific variations and additional questions would go here
    }
  }
}