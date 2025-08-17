# 5. API Specification

## REST API Architecture

**Base URL:** `/api/v1`  
**Authentication:** Bearer tokens via Supabase Auth  
**Response Format:** JSON with consistent error handling  

### Core Endpoints

```typescript
// Authentication
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/signout
GET    /api/auth/me

// Questionnaire
POST   /api/questionnaire/start
GET    /api/questionnaire/session/:id
POST   /api/questionnaire/respond
POST   /api/questionnaire/complete
GET    /api/questionnaire/report/:sessionId

// Discoveries
GET    /api/discoveries/weekly
GET    /api/discoveries/browse
POST   /api/discoveries/save
POST   /api/discoveries/dismiss
GET    /api/discoveries/saved

// Automations
GET    /api/automations
GET    /api/automations/:id
POST   /api/automations/:id/implement
PUT    /api/automations/:id/progress
GET    /api/automations/my-implementations

// User & Profile
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/analytics
GET    /api/user/subscription

// Admin (Protected)
GET    /api/admin/automations
POST   /api/admin/automations
PUT    /api/admin/automations/:id
DELETE /api/admin/automations/:id
GET    /api/admin/analytics
```

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

---
