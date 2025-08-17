# 13. Testing Strategy

## Testing Pyramid

```typescript
// Unit Tests (70%)
describe('AutomationService', () => {
  let service: AutomationService;
  let mockDatabase: jest.Mocked<DatabaseService>;
  
  beforeEach(() => {
    mockDatabase = createMockDatabase();
    service = new AutomationService(mockDatabase);
  });
  
  it('should filter automations by category', async () => {
    const automations = await service.getAutomations({ category: 'lead-management' });
    expect(automations).toHaveLength(3);
    expect(automations.every(a => a.category === 'lead-management')).toBe(true);
  });
});

// Integration Tests (20%)
describe('Questionnaire API', () => {
  it('should complete full questionnaire flow', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { response: 'I am a listing agent' }
    });
    
    await startQuestionnaireHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    
    const session = JSON.parse(res._getData()).data;
    expect(session.status).toBe('in_progress');
  });
});

// E2E Tests (10%)
describe('User Journey', () => {
  it('should complete questionnaire and receive recommendations', async () => {
    await page.goto('/questionnaire');
    await page.click('text=Start Free Analysis');
    
    // Complete questionnaire flow
    for (let i = 0; i < 10; i++) {
      await page.fill('[placeholder="Type your response..."]', `Response ${i}`);
      await page.click('[aria-label="Send message"]');
      await page.waitForSelector('.ai-message');
    }
    
    // Verify report generation
    await expect(page.locator('.analysis-report')).toBeVisible();
    await expect(page.locator('text=Your Automation Score')).toBeVisible();
  });
});
```

## AI Testing Strategy

```typescript
// Mock AI responses for testing
export class MockAIService implements AIService {
  private responses: Map<string, string> = new Map([
    ['initial_question', 'Welcome! Let\'s start by understanding your role...'],
    ['follow_up_business_size', 'Great! How many agents work in your office?'],
    ['analysis_completion', 'Based on your responses, here\'s your business analysis...']
  ]);
  
  async generateNextQuestion(context: QuestionContext): Promise<Question> {
    const key = this.getResponseKey(context);
    const text = this.responses.get(key) || 'Default question';
    
    return {
      id: `q_${Date.now()}`,
      text,
      category: 'general',
      expectedResponseType: 'text'
    };
  }
  
  async generateBusinessAnalysis(responses: QuestionnaireResponse[]): Promise<string> {
    return 'Mock business analysis based on responses';
  }
}

// AI response validation
export function validateAIResponse(response: string): boolean {
  return (
    response.length > 10 &&
    response.length < 500 &&
    !response.includes('I cannot') &&
    !response.includes('I\'m sorry')
  );
}
```

---
