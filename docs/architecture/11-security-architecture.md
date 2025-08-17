# 11. Security Architecture

## Authentication & Authorization

```typescript
// Middleware for protected routes
export function withAuth(handler: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const supabase = createPagesServerClient({ req, res });
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
}

// Admin role checking
export function withAdminAuth(handler: NextApiHandler): NextApiHandler {
  return withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    const userProfile = await database.getUserProfile(req.user.id);
    
    if (userProfile.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    return handler(req, res);
  });
}
```

## Data Protection

```typescript
// Input validation and sanitization
export const validateQuestionnaireResponse = z.object({
  sessionId: z.string().uuid(),
  response: z.string().min(1).max(500),
  questionId: z.string().uuid()
});

// Rate limiting
export function withRateLimit(
  limit: number,
  window: number,
  keyGenerator?: (req: NextApiRequest) => string
) {
  return (handler: NextApiHandler): NextApiHandler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const key = keyGenerator ? keyGenerator(req) : req.ip;
      const isAllowed = await checkRateLimit(key, limit, window);
      
      if (!isAllowed) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      
      return handler(req, res);
    };
  };
}

// OpenAI API cost controls
export class OpenAICostManager {
  private static readonly MAX_MONTHLY_SPEND = 500; // $500
  private static readonly MAX_DAILY_SPEND = 20; // $20
  
  async checkSpendingLimits(userId: string, estimatedCost: number): Promise<boolean> {
    const dailySpend = await this.getDailySpend();
    const monthlySpend = await this.getMonthlySpend();
    
    return (
      dailySpend + estimatedCost <= OpenAICostManager.MAX_DAILY_SPEND &&
      monthlySpend + estimatedCost <= OpenAICostManager.MAX_MONTHLY_SPEND
    );
  }
}
```

---
