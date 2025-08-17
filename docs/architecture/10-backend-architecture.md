# 10. Backend Architecture

## Service Layer Organization

```typescript
// Core Services
export class AuthService {
  constructor(private supabase: SupabaseClient) {}
  
  async signUp(email: string, password: string): Promise<AuthResult> {}
  async signIn(email: string, password: string): Promise<AuthResult> {}
  async signOut(): Promise<void> {}
  async getCurrentUser(): Promise<User | null> {}
  async refreshSession(): Promise<AuthResult> {}
}

export class QuestionnaireService {
  constructor(
    private database: DatabaseService,
    private ai: OpenAIService
  ) {}
  
  async startSession(userId: string): Promise<QuestionnaireSession> {}
  async processResponse(sessionId: string, response: string): Promise<Question> {}
  async generateAnalysis(sessionId: string): Promise<BusinessAnalysis> {}
}

export class DiscoveryService {
  constructor(
    private database: DatabaseService,
    private ai: OpenAIService
  ) {}
  
  async generateWeeklyDiscoveries(userId: string): Promise<WeeklyDiscovery> {}
  async getPersonalizedAutomations(userProfile: UserProfile): Promise<Automation[]> {}
  async calculateRelevanceScore(automation: Automation, profile: UserProfile): Promise<number> {}
}

export class AutomationService {
  constructor(private database: DatabaseService) {}
  
  async getAutomations(filters?: AutomationFilters): Promise<Automation[]> {}
  async getAutomationById(id: string): Promise<Automation | null> {}
  async saveUserAutomation(userId: string, automationId: string): Promise<void> {}
  async updateProgress(userAutomationId: string, stepId: string, completed: boolean): Promise<void> {}
}

export class AnalyticsService {
  constructor(private database: DatabaseService) {}
  
  async getUserMetrics(userId: string): Promise<UserMetrics> {}
  async calculateROI(userId: string): Promise<ROIMetrics> {}
  async getTopPerformingAutomations(userId: string): Promise<AutomationPerformance[]> {}
}
```

## API Route Structure

```typescript
// pages/api/auth/[...supabase].ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return createPagesServerClient({ req, res }).auth.api.createSupabaseServerApiHandler();
}

// pages/api/questionnaire/start.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const questionnaireService = new QuestionnaireService(database, openai);
  const session = await questionnaireService.startSession(user.id);
  
  return res.json({ success: true, data: session });
}

// pages/api/discoveries/weekly.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const discoveryService = new DiscoveryService(database, openai);
  const discoveries = await discoveryService.getWeeklyDiscoveries(user.id);
  
  return res.json({ success: true, data: discoveries });
}
```

---
