# Reservoir MVP Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Enable real estate professionals to save 10+ hours per week through intelligent automation discovery and implementation
- Generate 500 qualified leads through free AI-powered business analysis questionnaire within first year
- Achieve $19,500 MRR by Year 1 with 500 paying Reservoir subscribers
- Create the most intelligent business discovery system in real estate with 70%+ questionnaire completion rate
- Build continuous automation intelligence platform with 80%+ subscriber retention rate
- Deliver measurable ROI with users implementing 3+ automations and increasing revenue by 20% within 90 days
- Establish platform profitability with LTV:CAC ratio >3:1

### Background Context

The Reservoir platform addresses a critical gap in the service professional market, where real estate agents and similar professionals lose an average of $75,000 annually in opportunity costs due to inefficiencies. Despite 73% of agents wanting automation, they lack clarity on what to automate, which tools to use, and how to implement solutions effectively. Current alternatives - generic automation tools lacking industry focus, expensive $50K+ consultants, or theoretical training programs - fail to provide accessible, personalized, and actionable automation intelligence.

Reservoir combines an AI-powered questionnaire system that delivers consultant-grade business analysis (valued at $2,500) as a free lead generation tool with a subscription-based "Reservoir" that provides weekly personalized automation discoveries. This integrated approach transforms the industry standard from one-time expensive engagements to continuous, affordable automation intelligence at $39-49/month, promising to help users double their deals in 6 weeks through systematic automation implementation.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-08-17 | 1.0 | Initial PRD creation from Project Brief | Kevin Vandever |

## Requirements

### Functional Requirements

**FR1:** The platform shall provide a conversational AI questionnaire interface using OpenAI API that conducts 50+ adaptive questions for business discovery

**FR2:** The questionnaire system shall save progress automatically and allow users to resume incomplete sessions

**FR3:** The system shall generate a consultant-grade business analysis report with personalized automation roadmap upon questionnaire completion

**FR4:** The platform shall implement user authentication and profile management through Supabase Auth

**FR5:** The Reservoir shall deliver 10-15 personalized automation recommendations weekly based on user's questionnaire responses and business profile

**FR6:** The system shall provide implementation guides with step-by-step instructions for each automation recommendation

**FR7:** The platform shall track which automations users have saved, implemented, or dismissed

**FR8:** The system shall calculate and display ROI metrics for implemented automations

**FR9:** The platform shall send weekly email notifications when new automation discoveries are available

**FR10:** The questionnaire shall extract and store structured business profile data including industry, size, tech stack, and pain points

**FR11:** The system shall implement subscription management with free trial and paid tiers ($39-49/month)

**FR12:** The platform shall provide a basic implementation tracker showing automation adoption progress

### Non-Functional Requirements

**NFR1:** The system shall handle 100+ concurrent users without performance degradation

**NFR2:** The questionnaire completion time shall not exceed 30 minutes for a typical user session

**NFR3:** The platform shall maintain 99.9% uptime during business hours (6 AM - 10 PM EST)

**NFR4:** All API responses shall complete within 3 seconds under normal load conditions

**NFR5:** The system shall comply with data privacy regulations including GDPR and CCPA for user data handling

**NFR6:** The platform shall be responsive and function correctly on desktop, tablet, and mobile devices

**NFR7:** OpenAI API costs shall be optimized to stay under $500/month for up to 500 active users

**NFR8:** The system shall implement rate limiting to prevent API abuse and control costs

**NFR9:** User data shall be encrypted at rest and in transit using industry-standard encryption

**NFR10:** The platform shall achieve a Lighthouse performance score of 85+ on key pages

**NFR11:** The system shall provide graceful fallbacks when OpenAI API is unavailable

**NFR12:** The codebase shall maintain 70%+ test coverage for critical business logic

## User Interface Design Goals

### Overall UX Vision

Create an intelligent, conversational experience that feels like working with a high-end consultant rather than filling out forms. The interface should inspire trust through professional design while maintaining approachability for non-technical users. The journey from questionnaire to ongoing discoveries should feel seamless and progressively valuable, with each interaction building on previous insights.

### Key Interaction Paradigms

- **Conversational Flow**: Chat-like interface for questionnaire with typing indicators, making 50+ questions feel engaging rather than overwhelming
- **Progressive Disclosure**: Reveal complexity gradually - simple entry points leading to rich functionality as users mature
- **Instant Value Delivery**: Show tangible insights and quick wins immediately after key milestones (every 10 questions, upon completion)
- **Guided Implementation**: Step-by-step wizards for automation setup with visual progress tracking
- **Smart Prioritization**: ML-driven recommendation ranking based on user's specific context and implementation history

### Core Screens and Views

- **Landing Page** - Value proposition, social proof, questionnaire CTA
- **Questionnaire Interface** - Chat UI with progress indicator, save & resume capability  
- **Business Analysis Report** - Professional PDF-style report with automation roadmap
- **Reservoir Dashboard** - Weekly discoveries feed with filtering and search
- **Automation Detail View** - Full implementation guide with ROI calculator
- **My Implementations** - Track progress, measure impact, celebrate wins
- **Profile & Settings** - Subscription management, notification preferences
- **Onboarding Flow** - Post-signup tutorial highlighting key features

### Accessibility: WCAG AA

The platform will meet WCAG AA standards to ensure inclusivity for all users, including keyboard navigation, screen reader compatibility, and appropriate color contrast ratios.

### Branding

Clean, professional aesthetic that conveys expertise and trustworthiness. Visual language should blend consulting professionalism with modern SaaS approachability. Avoid overly technical or intimidating design patterns. Use subtle automation/flow imagery to reinforce the value proposition without being heavy-handed.

### Target Device and Platforms: Web Responsive

Primary focus on desktop experience (where agents do deep work) with full mobile responsiveness for on-the-go access. Questionnaire and discovery browsing must work flawlessly on mobile devices. Implementation guides optimized for tablet/desktop viewing.

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing both questionnaire and reservoir systems, shared components, and unified deployment configuration.

### Service Architecture

**Monolithic Next.js application** with modular service layers. All functionality served from a single Next.js 14 application using API routes for backend logic. Services organized as modules (questionnaire service, reservoir service, auth service, AI service) within the monolith for clean separation of concerns while maintaining deployment simplicity.

### Testing Requirements

**Unit + Integration testing** focus for MVP. Unit tests for business logic and utility functions. Integration tests for critical user flows (questionnaire completion, subscription signup, automation discovery). Manual testing convenience methods for AI responses. Skip E2E tests for MVP to accelerate development.

### Additional Technical Assumptions and Requests

- **Framework**: Next.js 14 with TypeScript as specified in project brief
- **Database**: PostgreSQL via Supabase (existing Pro account)
- **Authentication**: Supabase Auth for unified user management
- **Styling**: Tailwind CSS + shadcn/ui component library for rapid UI development
- **State Management**: React Context for global state, Zustand for complex local state
- **AI Integration**: OpenAI Assistants API for questionnaire, GPT-4 Turbo for personalization
- **Embeddings**: OpenAI Ada-2 for semantic matching of automations to user profiles
- **Hosting**: Netlify Pro (existing account specified)
- **Email Service**: Resend API for transactional emails and weekly notifications
- **Payment Processing**: Stripe for subscription management (not mentioned but standard)
- **Monitoring**: Vercel Analytics for performance tracking
- **Version Control**: Git with GitHub (assumed standard)
- **CI/CD**: Netlify's built-in CI/CD pipeline
- **Environment Management**: Separate dev, staging, production environments
- **Secret Management**: Environment variables via Netlify and Supabase
- **Error Tracking**: Sentry for production error monitoring (recommended addition)
- **Feature Flags**: Simple environment-based flags for MVP, consider LaunchDarkly later

## Epic List

Here's the high-level epic structure for the Reservoir MVP, designed to deliver value incrementally:

**Epic 1: Foundation & Authentication System** - Establish project infrastructure, user authentication, and basic application shell with landing page

**Epic 2: AI Questionnaire System** - Build the complete conversational questionnaire with AI integration and business analysis report generation

**Epic 3: Reservoir Core Platform** - Create the subscription-based discovery platform with weekly automation recommendations and basic tracking

**Epic 4: Monetization & Growth Systems** - Implement payment processing, subscription management, email notifications, and referral mechanisms

## Epic 1: Foundation & Authentication System

**Goal**: Establish the core application infrastructure with Next.js 14, configure Supabase integration, implement user authentication flows, and create a compelling landing page that converts visitors into questionnaire participants.

### Story 1.1: Project Setup and Infrastructure

As a developer,
I want to initialize the Next.js project with all core dependencies and configurations,
so that the team has a solid foundation for feature development.

**Acceptance Criteria:**
1. Next.js 14 project initialized with TypeScript configuration
2. Tailwind CSS and shadcn/ui components library integrated
3. Supabase client configured with environment variables for dev/prod
4. Project structure established with clear separation of concerns (components, services, utils)
5. Prettier and ESLint configured with agreed-upon rules
6. Git repository initialized with appropriate .gitignore
7. README.md with setup instructions and architecture overview
8. Basic health check API route responding at /api/health

### Story 1.2: Landing Page and Value Proposition

As a potential user,
I want to understand Reservoir's value proposition immediately upon visiting,
so that I'm motivated to start the questionnaire.

**Acceptance Criteria:**
1. Hero section with clear headline about saving 10+ hours weekly
2. Three-panel value prop: AI Discovery → Weekly Automations → Measurable ROI
3. Social proof section with placeholder testimonials and metrics
4. Clear CTA button "Start Free Analysis" prominently displayed
5. Responsive design working on mobile, tablet, and desktop
6. Page achieves Lighthouse score of 85+
7. SEO meta tags configured for core keywords

### Story 1.3: User Authentication System

As a user,
I want to create an account and log in securely,
so that my questionnaire progress and discoveries are saved.

**Acceptance Criteria:**
1. Supabase Auth integrated with email/password authentication
2. Sign up flow with email verification
3. Login page with forgot password functionality
4. Protected routes middleware preventing unauthorized access
5. User profile stored in PostgreSQL with proper relations
6. Session management with automatic refresh
7. Logout functionality clearing all session data
8. Basic error handling for auth failures with user-friendly messages

### Story 1.4: Application Shell and Navigation

As an authenticated user,
I want consistent navigation and layout throughout the application,
so that I can easily access different features.

**Acceptance Criteria:**
1. Persistent header with logo and user menu
2. Navigation items: Dashboard, Discoveries, My Implementations, Settings
3. Responsive mobile menu for smaller screens
4. Loading states for async operations
5. Toast notification system for user feedback
6. 404 and error pages with helpful navigation
7. Footer with legal links (Privacy, Terms, Contact)

## Epic 2: AI Questionnaire System

**Goal**: Build an intelligent conversational questionnaire that conducts deep business discovery through 50+ adaptive questions, generating a consultant-grade analysis report that serves as both value delivery and lead generation.

### Story 2.1: Questionnaire Data Model and Storage

As a developer,
I want to establish the questionnaire data structure and storage system,
so that responses can be saved, resumed, and analyzed.

**Acceptance Criteria:**
1. PostgreSQL schema for questionnaire sessions with user relations
2. Question bank table with categories, dependencies, and routing logic
3. Response storage with versioning and timestamps
4. Progress tracking with ability to calculate completion percentage
5. Session state management for resume functionality
6. Data validation rules enforced at database level
7. Indexes optimized for common query patterns

### Story 2.2: Conversational UI Interface

As a user,
I want an engaging chat-like interface for the questionnaire,
so that answering 50+ questions feels conversational rather than tedious.

**Acceptance Criteria:**
1. Chat bubble interface with distinct user/AI message styling
2. Typing indicators when AI is processing
3. Progress bar showing questionnaire completion (0-100%)
4. Auto-save every response with visual confirmation
5. Smooth scroll to latest message
6. Previous responses displayed in conversation history
7. Mobile-optimized with proper keyboard handling
8. Ability to edit previous answers with flow recalculation

### Story 2.3: OpenAI Integration and Adaptive Questioning

As a user,
I want the questionnaire to adapt based on my responses,
so that I only answer relevant questions for my business.

**Acceptance Criteria:**
1. OpenAI Assistants API configured with conversation context
2. Question routing logic based on previous responses
3. Dynamic question generation for follow-up clarification
4. Category-based progression (Business Info → Current Tools → Pain Points → Goals)
5. Intelligent skip logic avoiding redundant questions
6. Response parsing to extract structured data
7. Fallback to predetermined questions if AI fails
8. Rate limiting to control API costs

### Story 2.4: Business Analysis Report Generation

As a user,
I want to receive a professional business analysis report upon completion,
so that I get immediate value from the questionnaire.

**Acceptance Criteria:**
1. Report template with sections: Executive Summary, Current State Analysis, Automation Opportunities, Implementation Roadmap
2. PDF generation with professional formatting and branding
3. Personalized insights based on questionnaire responses
4. 10-15 specific automation recommendations with priority ranking
5. ROI projections for top 5 automations
6. Report accessible via unique URL for sharing
7. Email delivery of report with CTA for Reservoir trial
8. Report storage for future reference in user profile

### Story 2.5: Questionnaire Analytics and Optimization

As a product manager,
I want to track questionnaire performance metrics,
so that we can optimize for completion and conversion.

**Acceptance Criteria:**
1. Track completion rate, drop-off points, and time per question
2. A/B testing framework for question variations
3. Conversion tracking from questionnaire to trial signup
4. Response quality scoring to identify low-effort submissions
5. Dashboard showing key questionnaire metrics
6. Export capability for response data analysis
7. Identify most/least valuable questions based on correlation with conversion

## Epic 3: Reservoir Core Platform

**Goal**: Create the subscription-based platform that delivers weekly personalized automation discoveries with implementation guidance, establishing the core value loop that drives retention and revenue.

### Story 3.1: Automation Library and Content Management

As a content administrator,
I want to manage the automation library efficiently,
so that users receive high-quality, relevant recommendations.

**Acceptance Criteria:**
1. Database schema for automations with categories, tools, and requirements
2. Admin interface for CRUD operations on automation content
3. Rich text editor for implementation guides with image support
4. Tagging system for automation categorization and filtering
5. Version control for automation content updates
6. ROI calculator template configuration per automation
7. Tool compatibility matrix for each automation
8. Bulk import capability for initial content load

### Story 3.2: Personalization Engine and Matching Algorithm

As a user,
I want to receive automation recommendations tailored to my business,
so that every discovery is relevant and actionable.

**Acceptance Criteria:**
1. OpenAI embeddings generated for user profiles and automations
2. Semantic similarity matching with threshold configuration
3. Scoring algorithm considering business size, industry, current tools, and pain points
4. Weekly discovery generation job selecting top 10-15 matches
5. Exclusion logic for previously viewed/dismissed automations
6. Diversity algorithm ensuring variety in weekly recommendations
7. Fallback to popular automations if matching fails
8. Performance optimization for sub-second matching

### Story 3.3: Discovery Feed and Browsing Interface

As a user,
I want to browse my weekly automation discoveries easily,
so that I can quickly identify what to implement next.

**Acceptance Criteria:**
1. Card-based feed showing automation previews with estimated time savings
2. Filtering by category, implementation time, and ROI
3. Search functionality across all available automations
4. Save/Dismiss actions with reasoning capture
5. Implementation difficulty indicators (Easy/Medium/Hard)
6. "New this week" badge for fresh discoveries
7. Pagination or infinite scroll for browsing history
8. Mobile-responsive card layout

### Story 3.4: Implementation Guides and Tracking

As a user,
I want detailed guidance for implementing automations,
so that I can successfully set them up without external help.

**Acceptance Criteria:**
1. Step-by-step implementation guide with screenshots/videos
2. Required tools checklist with links to sign up
3. Time estimate for implementation
4. Progress tracking with checkable steps
5. "Mark as Implemented" with optional success metrics input
6. Help/stuck button linking to community or support
7. Related automations suggestions upon completion
8. Implementation timeline showing user's automation journey

### Story 3.5: ROI Dashboard and Success Metrics

As a user,
I want to see the impact of my implemented automations,
so that I can measure my return on investment.

**Acceptance Criteria:**
1. Dashboard showing total time saved and revenue impact
2. Per-automation ROI tracking with user-input metrics
3. Before/after comparison visualizations
4. Weekly/monthly trend charts for key metrics
5. Celebration animations for milestones (first automation, 10 hours saved, etc.)
6. Export functionality for metrics data
7. Share success story feature for community/testimonials
8. Predictive ROI for planned implementations

## Epic 4: Monetization & Growth Systems

**Goal**: Implement revenue generation through subscription management, payment processing, and growth mechanisms including email marketing and referral systems to achieve sustainable MRR growth.

### Story 4.1: Stripe Payment Integration

As a user,
I want to subscribe to Reservoir with my credit card,
so that I can access weekly automation discoveries.

**Acceptance Criteria:**
1. Stripe checkout integrated with PCI compliance
2. Subscription plans configured ($39/month MVP pricing)
3. Free trial period (14 days) with card required
4. Payment method management in user settings
5. Webhook handling for payment events
6. Failed payment retry logic with notifications
7. Subscription status synced with user permissions
8. Test mode for development environment

### Story 4.2: Subscription Management Interface

As a user,
I want to manage my subscription easily,
so that I can upgrade, downgrade, or cancel as needed.

**Acceptance Criteria:**
1. Current plan display with renewal date
2. Upgrade/downgrade flow with proration
3. Cancel subscription with reason survey
4. Reactivation option for cancelled users
5. Billing history with invoice downloads
6. Update payment method functionality
7. Plan comparison table showing feature differences
8. Grace period handling for failed payments

### Story 4.3: Email Notification System

As a user,
I want to receive timely emails about my discoveries and account,
so that I stay engaged with the platform.

**Acceptance Criteria:**
1. Welcome email series for new users (3 emails over first week)
2. Weekly discovery notification with preview of top 3 automations
3. Questionnaire completion reminder for abandoned sessions
4. Trial ending reminder (3 days before, 1 day before)
5. Payment failure notifications with update link
6. Implementation success celebration emails
7. Email preference management in settings
8. Unsubscribe handling with reason tracking

### Story 4.4: Referral Program System

As a user,
I want to refer colleagues and earn rewards,
so that we both benefit from the platform.

**Acceptance Criteria:**
1. Unique referral code generation per user
2. Referral tracking from landing through conversion
3. Reward system (3 referrals = 3 months free)
4. Referral dashboard showing status and rewards
5. Social sharing buttons with pre-filled messages
6. Email invitation system with tracking
7. Reward fulfillment automation
8. Fraud prevention for self-referrals

### Story 4.5: Analytics and Admin Dashboard

As a product owner,
I want comprehensive analytics on platform performance,
so that I can make data-driven decisions.

**Acceptance Criteria:**
1. MRR, churn, and LTV calculations
2. Cohort analysis for retention tracking
3. Funnel visualization (Visit → Questionnaire → Trial → Paid)
4. User segment analysis by industry/size
5. Automation popularity and implementation success rates
6. Support ticket tracking and resolution metrics
7. Real-time dashboards with key KPIs
8. Data export for external analysis

## Checklist Results Report

### **Checklist Results Report - Reservoir MVP PRD**

**Executive Summary:**
- **Overall PRD Completeness:** 85%
- **MVP Scope Appropriateness:** Just Right (focused but viable)
- **Readiness for Architecture Phase:** Ready
- **Most Critical Gaps:** Payment processing details, error handling specifics, content management workflows

**Category Analysis Table:**

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PASS    | None - strong foundation from project brief |
| 2. MVP Scope Definition          | PASS    | Well-balanced MVP scope |
| 3. User Experience Requirements  | PASS    | Clear UI vision and interaction paradigms |
| 4. Functional Requirements       | PASS    | Comprehensive with good traceability |
| 5. Non-Functional Requirements   | PARTIAL | Missing specific error handling requirements |
| 6. Epic & Story Structure        | PASS    | Logical sequencing, appropriate sizing |
| 7. Technical Guidance            | PASS    | Clear stack choices and architectural direction |
| 8. Cross-Functional Requirements | PARTIAL | Content management workflow needs definition |
| 9. Clarity & Communication       | PASS    | Well-structured and stakeholder-ready |

**Top Issues by Priority:**

**HIGH:**
- Content management workflow for automation library needs definition
- Error handling strategies for AI service failures require specification
- Subscription tier variations and pricing strategy needs clarification

**MEDIUM:** 
- Analytics and reporting requirements could be more detailed
- Mobile app strategy for future phases should be clarified
- Customer support integration points need definition

**MVP Scope Assessment:**
- **Appropriate scope:** The 4-epic structure delivers core value incrementally
- **Well-prioritized:** AI questionnaire → Reservoir platform → Monetization flow is logical
- **Timeline realistic:** Stories are sized for AI agent execution (2-4 hours each)
- **No cuts recommended:** All features directly support core value proposition

**Technical Readiness:**
- **Strong technical foundation:** Next.js 14, Supabase, OpenAI stack is well-defined
- **Clear constraints:** Monorepo, monolithic architecture appropriate for MVP
- **Identified risks:** OpenAI API dependency is acknowledged with fallback plans
- **Areas needing investigation:** Semantic matching performance at scale, content versioning strategy

**Recommendations:**

1. **Add NFR13:** Define specific error handling for AI service failures with user-friendly messaging
2. **Expand Story 3.1:** Include content management workflow and versioning strategy
3. **Clarify subscription tiers:** Define if MVP includes multiple pricing plans or single tier
4. **Define analytics scope:** Specify which metrics are MVP vs future enhancement
5. **Document AI cost controls:** Add specific rate limiting and cost monitoring requirements

**Final Decision: READY FOR ARCHITECT**

The PRD provides a comprehensive foundation for architectural design. The epic structure is logical, requirements are well-defined, and technical constraints are clear. Minor gaps identified above can be addressed during implementation without blocking the architecture phase.

## Next Steps

### UX Expert Prompt

Hey UX Expert! I need you to create the complete user interface design and user experience architecture for the Reservoir MVP platform. Please review the attached PRD and create a comprehensive UX specification including:

1. **Detailed wireframes** for all core screens (landing page, questionnaire interface, reservoir dashboard, implementation guides)
2. **User flow diagrams** showing the complete journey from landing to subscription conversion
3. **Responsive design specifications** for mobile, tablet, and desktop
4. **Design system guidelines** including components, spacing, typography, and color schemes
5. **Accessibility compliance** strategy for WCAG AA standards
6. **Interaction design patterns** for the conversational questionnaire and discovery browsing

Focus on creating an interface that builds trust with real estate professionals while making complex automation discovery feel approachable and valuable. The design should feel like working with a premium consultant, not a generic SaaS tool.

### Architect Prompt

Hey Architect! I need you to design the complete technical architecture for the Reservoir MVP platform. Please review the attached PRD and create a comprehensive technical specification including:

1. **System architecture diagrams** showing the Next.js monolith structure with Supabase backend
2. **Database schema design** for users, questionnaires, automations, and subscriptions
3. **API specification** including OpenAI integration patterns and rate limiting
4. **Security architecture** covering authentication, data protection, and payment processing
5. **Performance optimization strategy** for AI operations and semantic matching
6. **Deployment and infrastructure** setup using Netlify and Supabase Pro
7. **Testing strategy** including unit tests, integration tests, and AI response validation
8. **Monitoring and observability** implementation plan

Pay special attention to the OpenAI integration patterns, cost optimization for AI operations, and ensuring the system can handle 100+ concurrent users while maintaining sub-3-second response times.