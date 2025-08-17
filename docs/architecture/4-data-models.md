# 4. Data Models

## Core Business Entities

```typescript
// User Management
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'free' | 'trial' | 'active' | 'cancelled';
  subscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfile {
  id: string;
  userId: string;
  businessSize: 'solo' | 'small-team' | 'large-team';
  industry: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  currentTools: string[];
  painPoints: string[];
  goals: string[];
  completedQuestionnaire: boolean;
  questionnaireScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Questionnaire System
interface QuestionnaireSession {
  id: string;
  userId: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentQuestionIndex: number;
  totalQuestions: number;
  responses: QuestionnaireResponse[];
  businessAnalysis?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface QuestionnaireResponse {
  id: string;
  sessionId: string;
  questionText: string;
  responseText: string;
  questionCategory: string;
  aiContext?: any;
  timestamp: Date;
}

// Automation Library
interface Automation {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeSaved: number; // hours per week
  revenueImpact: number; // dollars per month
  implementationTime: number; // hours
  tags: string[];
  requiredTools: AutomationTool[];
  steps: ImplementationStep[];
  targetAudience: {
    businessSize: string[];
    experience: string[];
    industries: string[];
  };
  published: boolean;
  embedding?: number[]; // OpenAI embedding vector
  createdAt: Date;
  updatedAt: Date;
}

interface ImplementationStep {
  id: string;
  automationId: string;
  order: number;
  title: string;
  instructions: string;
  estimatedTime: string;
  requiredTools: string[];
  media: StepMedia[];
}

interface StepMedia {
  id: string;
  stepId: string;
  type: 'image' | 'video';
  url: string;
  alt: string;
  caption?: string;
}

// Discovery & Recommendations
interface WeeklyDiscovery {
  id: string;
  userId: string;
  weekOf: Date;
  automations: DiscoveredAutomation[];
  personalizedMessage?: string;
  viewed: boolean;
  viewedAt?: Date;
  createdAt: Date;
}

interface DiscoveredAutomation {
  id: string;
  discoveryId: string;
  automationId: string;
  relevanceScore: number;
  personalizedReason: string;
  status: 'new' | 'saved' | 'dismissed' | 'implemented';
  statusChangedAt?: Date;
}

// User Progress Tracking
interface UserAutomation {
  id: string;
  userId: string;
  automationId: string;
  status: 'saved' | 'in_progress' | 'completed' | 'dismissed';
  progress: AutomationProgress[];
  actualTimeSaved?: number;
  actualRevenueImpact?: number;
  feedback?: string;
  rating?: number;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AutomationProgress {
  id: string;
  userAutomationId: string;
  stepId: string;
  completed: boolean;
  notes?: string;
  completedAt?: Date;
}

// Subscription Management
interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
  planId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---
