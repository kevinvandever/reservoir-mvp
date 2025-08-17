# 14. Error Handling & Monitoring

## Unified Error Handling

```typescript
// Error types
export enum ErrorCode {
  AUTHENTICATION_FAILED = 'AUTH_001',
  INSUFFICIENT_PERMISSIONS = 'AUTH_002',
  RESOURCE_NOT_FOUND = 'RESOURCE_001',
  VALIDATION_ERROR = 'VALIDATION_001',
  AI_SERVICE_ERROR = 'AI_001',
  DATABASE_ERROR = 'DB_001',
  RATE_LIMIT_EXCEEDED = 'RATE_001',
  SUBSCRIPTION_REQUIRED = 'SUB_001'
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Global error handler
export function handleApiError(error: Error, req: NextApiRequest, res: NextApiResponse) {
  // Log error to Sentry
  Sentry.captureException(error, {
    tags: {
      endpoint: req.url,
      method: req.method,
      userId: req.user?.id
    }
  });
  
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
  }
  
  // Don't expose internal errors
  return res.status(500).json({
    success: false,
    error: {
      code: ErrorCode.DATABASE_ERROR,
      message: 'Internal server error'
    }
  });
}

// AI service error handling
export class AIServiceErrorHandler {
  static async handleOpenAIError(error: any): Promise<never> {
    if (error.status === 429) {
      throw new AppError(
        ErrorCode.RATE_LIMIT_EXCEEDED,
        'AI service rate limit exceeded. Please try again later.',
        429
      );
    }
    
    if (error.status === 400) {
      throw new AppError(
        ErrorCode.AI_SERVICE_ERROR,
        'Invalid request to AI service',
        400
      );
    }
    
    throw new AppError(
      ErrorCode.AI_SERVICE_ERROR,
      'AI service temporarily unavailable',
      503
    );
  }
}
```

## Monitoring & Observability

```typescript
// Performance monitoring
export class PerformanceMonitor {
  static async trackAPICall<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = Date.now();
    
    try {
      const result = await fn();
      
      // Track success metrics
      this.recordMetric(`${operation}.duration`, Date.now() - start);
      this.recordMetric(`${operation}.success`, 1);
      
      return result;
    } catch (error) {
      // Track error metrics
      this.recordMetric(`${operation}.duration`, Date.now() - start);
      this.recordMetric(`${operation}.error`, 1);
      
      throw error;
    }
  }
  
  private static recordMetric(name: string, value: number) {
    // Send to monitoring service (e.g., DataDog, CloudWatch)
  }
}

// Usage tracking
export class UsageTracker {
  static async trackQuestionnaireProgress(userId: string, questionIndex: number) {
    await analytics.track({
      userId,
      event: 'Questionnaire Progress',
      properties: {
        questionIndex,
        timestamp: new Date().toISOString()
      }
    });
  }
  
  static async trackAutomationSaved(userId: string, automationId: string) {
    await analytics.track({
      userId,
      event: 'Automation Saved',
      properties: {
        automationId,
        timestamp: new Date().toISOString()
      }
    });
  }
}
```

---
