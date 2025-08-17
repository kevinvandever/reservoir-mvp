# 6. External API Integrations

## OpenAI Integration

```typescript
// AI Service Configuration
interface OpenAIConfig {
  apiKey: string;
  model: 'gpt-4-turbo' | 'gpt-3.5-turbo';
  maxTokens: number;
  temperature: number;
  rateLimits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

// Questionnaire AI Service
class QuestionnaireAI {
  async generateNextQuestion(context: QuestionContext): Promise<Question> {
    // Use OpenAI Assistants API for conversation flow
  }
  
  async analyzeResponses(responses: QuestionnaireResponse[]): Promise<BusinessAnalysis> {
    // Generate comprehensive business analysis
  }
  
  async extractStructuredData(responses: QuestionnaireResponse[]): Promise<UserProfile> {
    // Extract structured business profile data
  }
}

// Personalization Engine
class PersonalizationEngine {
  async generateEmbeddings(content: string): Promise<number[]> {
    // Use OpenAI Ada-2 for semantic embeddings
  }
  
  async findSimilarAutomations(userProfile: UserProfile): Promise<ScoredAutomation[]> {
    // Semantic matching using embeddings
  }
  
  async personalizeRecommendations(automations: Automation[], userProfile: UserProfile): Promise<PersonalizedRecommendation[]> {
    // Generate personalized messaging
  }
}
```

## Supabase Integration

```typescript
// Database Service
class DatabaseService {
  private supabase: SupabaseClient;
  
  // User Management
  async createUser(userData: Partial<User>): Promise<User> {}
  async getUserProfile(userId: string): Promise<UserProfile> {}
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {}
  
  // Questionnaire
  async createQuestionnaireSession(userId: string): Promise<QuestionnaireSession> {}
  async saveQuestionnaireResponse(response: QuestionnaireResponse): Promise<void> {}
  async getQuestionnaireSession(sessionId: string): Promise<QuestionnaireSession> {}
  
  // Automations
  async getAutomations(filters?: AutomationFilters): Promise<Automation[]> {}
  async saveUserAutomation(userAutomation: UserAutomation): Promise<void> {}
  async getUserAutomations(userId: string): Promise<UserAutomation[]> {}
}
```

## Stripe Integration

```typescript
// Payment Service
class PaymentService {
  async createSubscription(userId: string, priceId: string): Promise<Subscription> {}
  async cancelSubscription(subscriptionId: string): Promise<void> {}
  async handleWebhook(event: Stripe.Event): Promise<void> {}
  async getCustomerPortalUrl(customerId: string): Promise<string> {}
}
```

---
