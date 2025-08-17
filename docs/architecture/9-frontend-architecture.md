# 9. Frontend Architecture

## Component Organization

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── forms/                 # Form components
│   │   ├── QuestionnaireForm.tsx
│   │   ├── ProfileForm.tsx
│   │   └── ...
│   ├── discovery/             # Discovery-related components
│   │   ├── DiscoveryCard.tsx
│   │   ├── DiscoveryFeed.tsx
│   │   ├── FilterBar.tsx
│   │   └── ...
│   ├── automation/            # Automation components
│   │   ├── AutomationDetail.tsx
│   │   ├── ImplementationGuide.tsx
│   │   ├── ProgressTracker.tsx
│   │   └── ...
│   ├── analytics/             # Analytics components
│   │   ├── MetricsCard.tsx
│   │   ├── TrendChart.tsx
│   │   ├── ROIDashboard.tsx
│   │   └── ...
│   └── layout/                # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       └── ...
├── pages/
│   ├── index.tsx              # Landing page
│   ├── questionnaire/
│   │   └── index.tsx          # Questionnaire interface
│   ├── dashboard/
│   │   └── index.tsx          # Main dashboard
│   ├── discoveries/
│   │   ├── index.tsx          # Discovery feed
│   │   └── [id].tsx           # Individual automation
│   ├── progress/
│   │   └── index.tsx          # User progress
│   ├── admin/
│   │   ├── index.tsx          # Admin dashboard
│   │   └── automations/       # Admin automation management
│   └── api/                   # API routes
├── lib/
│   ├── services/              # Service layer
│   │   ├── api.ts             # API client
│   │   ├── ai.ts              # OpenAI integration
│   │   ├── auth.ts            # Authentication
│   │   ├── database.ts        # Database operations
│   │   └── payments.ts        # Stripe integration
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDiscoveries.ts
│   │   ├── useQuestionnaire.ts
│   │   └── ...
│   ├── utils/                 # Utility functions
│   │   ├── date.ts
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   └── ...
│   └── types/                 # TypeScript types
│       ├── api.ts
│       ├── automation.ts
│       ├── user.ts
│       └── ...
├── stores/                    # Zustand stores
│   ├── authStore.ts
│   ├── discoveryStore.ts
│   ├── questionnaireStore.ts
│   └── ...
└── styles/
    ├── globals.css
    └── components.css
```

## State Management Strategy

```typescript
// Global State (React Context)
interface AppContextType {
  user: User | null;
  subscription: Subscription | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

// Local State (Zustand)
interface DiscoveryStore {
  discoveries: WeeklyDiscovery[];
  filters: DiscoveryFilters;
  loading: boolean;
  error: string | null;
  
  // Actions
  setDiscoveries: (discoveries: WeeklyDiscovery[]) => void;
  updateFilters: (filters: Partial<DiscoveryFilters>) => void;
  saveAutomation: (automationId: string) => Promise<void>;
  dismissAutomation: (automationId: string) => Promise<void>;
}

interface QuestionnaireStore {
  session: QuestionnaireSession | null;
  currentQuestion: Question | null;
  responses: QuestionnaireResponse[];
  loading: boolean;
  
  // Actions
  startSession: () => Promise<void>;
  submitResponse: (response: string) => Promise<void>;
  completeQuestionnaire: () => Promise<void>;
}
```

---
