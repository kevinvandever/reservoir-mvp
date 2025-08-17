# 12. Performance Optimization

## Caching Strategy

```typescript
// Redis caching for expensive operations
export class CacheService {
  private redis: Redis;
  
  // Cache user profiles for 1 hour
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const cached = await this.redis.get(`profile:${userId}`);
    if (cached) return JSON.parse(cached);
    
    const profile = await database.getUserProfile(userId);
    await this.redis.setex(`profile:${userId}`, 3600, JSON.stringify(profile));
    return profile;
  }
  
  // Cache automation embeddings indefinitely
  async getAutomationEmbedding(automationId: string): Promise<number[] | null> {
    const cached = await this.redis.get(`embedding:${automationId}`);
    if (cached) return JSON.parse(cached);
    
    const automation = await database.getAutomation(automationId);
    if (automation.embedding) {
      await this.redis.set(`embedding:${automationId}`, JSON.stringify(automation.embedding));
      return automation.embedding;
    }
    
    return null;
  }
}

// Database query optimization
export class OptimizedQueries {
  // Batch load user automations with implementation steps
  async getUserAutomationsWithSteps(userId: string): Promise<UserAutomationWithSteps[]> {
    return database.query(`
      SELECT 
        ua.*,
        a.title, a.description, a.category,
        json_agg(
          json_build_object(
            'id', is.id,
            'title', is.title,
            'order_index', is.order_index,
            'completed', ap.completed
          ) ORDER BY is.order_index
        ) as steps
      FROM user_automations ua
      JOIN automations a ON ua.automation_id = a.id
      LEFT JOIN implementation_steps is ON a.id = is.automation_id
      LEFT JOIN automation_progress ap ON is.id = ap.step_id AND ua.id = ap.user_automation_id
      WHERE ua.user_id = $1
      GROUP BY ua.id, a.id
    `, [userId]);
  }
}
```

## AI Response Optimization

```typescript
export class OptimizedAIService {
  // Batch embeddings generation
  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: texts
    });
    
    return response.data.map(item => item.embedding);
  }
  
  // Streaming questionnaire responses
  async streamQuestionnaireResponse(context: QuestionContext): Promise<ReadableStream> {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: context.messages,
      stream: true,
      max_tokens: 150
    });
    
    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      }
    });
  }
  
  // Smart caching for similar questions
  async getCachedResponse(questionSignature: string): Promise<string | null> {
    return await cache.get(`ai_response:${questionSignature}`);
  }
  
  async setCachedResponse(questionSignature: string, response: string): Promise<void> {
    await cache.setex(`ai_response:${questionSignature}`, 86400, response); // 24 hours
  }
}
```

---
