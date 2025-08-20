# Premium Component Design Specifications
**Companion to Premium Questionnaire UX Spec**  
**Date:** January 20, 2025

## 1. Enhanced Progress Tracking Component

### Visual Design Mock
```
Desktop View (1280px):
┌────────────────────────────────────────────────────────────────────┐
│  Your Consultation Progress                              67% Complete │
│                                                                        │
│  ┌──────────┬────────┬──────────┬──────────┬─────────┬──────┬─────┐ │
│  │Foundation│Systems │ Lead Gen │Marketing │Transact.│Market│Goals│ │
│  │  ██████  │ ████▒  │  ███▒▒▒  │  ▒▒▒▒▒▒ │  ▒▒▒▒▒ │ ▒▒▒▒ │▒▒▒▒ │ │
│  │   15%    │  10%   │   20%    │   20%    │  15%   │ 10%  │10%  │ │
│  │   ✓      │  6/7   │   4/10   │   0/8    │  0/6   │ 0/4  │0/7  │ │
│  └──────────┴────────┴──────────┴──────────┴─────────┴──────┴─────┘ │
│                          ↑ Currently Active                           │
│                                                                        │
│  Required Sections: 65% • Optional Sections: 35% • Time: ~12 mins    │
└────────────────────────────────────────────────────────────────────┘

Mobile View (375px):
┌─────────────────────────┐
│ 67% Complete            │
│ ███████████████▒▒▒▒▒▒▒ │
│                         │
│ Current Section:        │
│ Lead Generation (4/10)  │
│ ████████▒▒▒▒▒▒▒▒▒▒▒▒▒  │
│                         │
│ [View All Sections ▼]   │
└─────────────────────────┘
```

### React Component Structure
```tsx
// components/progress/EnhancedProgressTracker.tsx
interface EnhancedProgressTrackerProps {
  sections: ProgressSection[]
  currentSectionId: string
  overallProgress: number
  estimatedTimeRemaining: number
}

export function EnhancedProgressTracker({...props}) {
  return (
    <motion.div className="premium-progress-container">
      <div className="progress-header">
        <h3>Your Consultation Progress</h3>
        <ProgressPercentage value={overallProgress} />
      </div>
      
      <div className="sections-track">
        {sections.map(section => (
          <ProgressSection 
            key={section.id}
            {...section}
            isCurrent={section.id === currentSectionId}
          />
        ))}
      </div>
      
      <ProgressMetadata />
    </motion.div>
  )
}
```

---

## 2. AI Conversation Message Component

### Visual Design
```
AI Consultant Message:
┌─────────────────────────────────────────────────────┐
│ 🤖 │ Sarah, 47 transactions is fantastic! 🎯        │
│    │                                                 │
│    │ You're in the top 5% of agents nationally.     │
│    │ That's seriously impressive volume.            │
│    │                                                 │
│    │ With that kind of success, I imagine           │
│    │ managing all those client timelines gets       │
│    │ pretty intense. What's eating up most of      │
│    │ your time right now?                           │
│    └─────────────────────────────────────────────── │
│                                                      │
│  [Follow-up work] [Client communication] [Other...] │
└──────────────────────────────────────────────────────┘

User Response:
                    ┌──────────────────────────────────┐
                    │ Honestly, it's the lead follow-  │
                    │ up. I get about 30 leads a week  │
                    │ but half go cold before I can    │
                    │ respond properly.                 │
                    │                              You │
                    └──────────────────────────────────┘
```

### Personality Indicators Implementation
```tsx
// components/chat/AIPersonalityMessage.tsx
interface AIMessageProps {
  content: string
  benchmarkData?: BenchmarkComparison
  celebrationType?: 'success' | 'milestone' | 'insight'
  quickResponses?: string[]
}

export function AIPersonalityMessage({
  content, 
  benchmarkData,
  celebrationType,
  quickResponses
}: AIMessageProps) {
  return (
    <div className="ai-message-container">
      <Avatar src="/consultant-avatar.png" />
      
      <div className="message-content">
        {celebrationType && (
          <CelebrationBadge type={celebrationType} />
        )}
        
        <AnimatedText content={content} />
        
        {benchmarkData && (
          <BenchmarkCard data={benchmarkData} />
        )}
        
        {quickResponses && (
          <QuickResponseChips options={quickResponses} />
        )}
      </div>
    </div>
  )
}
```

---

## 3. Premium Access Code Input

### Interactive States
```
Initial State:
┌─────────────────────────────────────┐
│  CLOCK-____-____                    │
│  Enter your exclusive access code   │
└─────────────────────────────────────┘

Typing State (Valid Format):
┌─────────────────────────────────────┐
│  CLOCK-A7B9-2025  ✓                │
│  Format valid                       │
└─────────────────────────────────────┘
         [Begin Consultation →]

Error State:
┌─────────────────────────────────────┐
│  CLOCK-XXXX-XXXX  ✗                │
│  ⚠ This code has expired           │
│  Contact support for assistance     │
└─────────────────────────────────────┘
         [Try Again] [Get Help]
```

### Component Implementation
```tsx
// components/access/PremiumAccessInput.tsx
export function PremiumAccessInput() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'validating'>('idle')
  
  const handleCodeChange = (value: string) => {
    const formatted = formatAccessCode(value)
    setCode(formatted)
    
    if (isValidFormat(formatted)) {
      setStatus('valid')
    } else {
      setStatus('idle')
    }
  }
  
  return (
    <div className="access-input-container">
      <div className={`input-wrapper ${status}`}>
        <input
          type="text"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="CLOCK-____-____"
          className="access-code-input"
          maxLength={15}
        />
        <StatusIcon status={status} />
      </div>
      
      <StatusMessage status={status} />
      
      <Button 
        disabled={status !== 'valid'}
        onClick={validateCode}
        className="premium-cta"
      >
        {status === 'validating' ? (
          <Spinner />
        ) : (
          'Begin Exclusive Consultation'
        )}
      </Button>
    </div>
  )
}
```

---

## 4. Dynamic Report Section Component

### Expandable Opportunity Card Design
```
Collapsed State:
┌──────────────────────────────────────────────────────┐
│ 🚀 Lead Response Automation          High Priority   │
│ ─────────────────────────────────────────────────── │
│ Save 10 hours/week • $8,000/month value             │
│ Implementation: 2 weeks                              │
│                                                      │
│                        [Expand Details ▼]            │
└──────────────────────────────────────────────────────┘

Expanded State:
┌──────────────────────────────────────────────────────┐
│ 🚀 Lead Response Automation          High Priority   │
│ ─────────────────────────────────────────────────── │
│ Save 10 hours/week • $8,000/month value             │
│ Implementation: 2 weeks                              │
│                                                      │
│ Before & After Scenarios:                           │
│ ┌────────────────┬────────────────┐                │
│ │     Before     │     After      │                │
│ │ 2-hour response│ 5-min response │                │
│ │ 30% conversion │ 55% conversion │                │
│ └────────────────┴────────────────┘                │
│                                                      │
│ ROI Calculator:                                     │
│ [========│────────] $24,000 first year             │
│                                                      │
│ Success Metrics:                                    │
│ • Response time < 5 minutes                         │
│ • Lead engagement rate +80%                         │
│ • Appointment bookings +45%                         │
│                                                      │
│                        [Collapse ▲]                  │
└──────────────────────────────────────────────────────┘
```

### Implementation
```tsx
// components/report/OpportunityCard.tsx
export function OpportunityCard({ opportunity }: { opportunity: AutomationOpportunity }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <motion.div 
      className="opportunity-card"
      layout
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <div className="title-section">
          <span className="icon">{opportunity.icon}</span>
          <h3>{opportunity.title}</h3>
          <PriorityBadge priority={opportunity.priority} />
        </div>
        
        <div className="metrics-summary">
          <MetricPill 
            icon="clock" 
            value={`Save ${opportunity.timeSaved}/week`} 
          />
          <MetricPill 
            icon="dollar" 
            value={`$${opportunity.monthlyValue}/month`} 
          />
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-details"
          >
            <BeforeAfterComparison data={opportunity.scenarios} />
            <ROICalculator opportunity={opportunity} />
            <SuccessMetrics metrics={opportunity.successMetrics} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setExpanded(!expanded)}
        className="expand-button"
      >
        {expanded ? 'Collapse' : 'Expand Details'} 
        <ChevronIcon direction={expanded ? 'up' : 'down'} />
      </button>
    </motion.div>
  )
}
```

---

## 5. VIP Member Experience Components

### Personalized Header
```
┌────────────────────────────────────────────────────────────┐
│  Welcome back, Sarah Chen 👋                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🏆 ClockworkCoaching VIP Member                      │ │
│  │ Member Since: January 2024 • Platinum Status        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Your exclusive $2,500 consultation is ready              │
└────────────────────────────────────────────────────────────┘
```

### Implementation
```tsx
// components/member/VIPWelcomeHeader.tsx
export function VIPWelcomeHeader({ memberData }: { memberData: MemberData }) {
  return (
    <motion.div 
      className="vip-welcome-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="welcome-message">
        Welcome back, {memberData.name} 
        <span className="wave-emoji">👋</span>
      </h1>
      
      <div className="member-badge-container">
        <div className="premium-badge">
          <Trophy className="badge-icon" />
          <div className="badge-content">
            <span className="badge-title">ClockworkCoaching VIP Member</span>
            <span className="badge-details">
              Member Since: {memberData.joinDate} • {memberData.tier} Status
            </span>
          </div>
        </div>
      </div>
      
      <p className="consultation-value">
        Your exclusive $2,500 consultation is ready
      </p>
    </motion.div>
  )
}
```

---

## 6. Mobile-First Responsive Patterns

### Touch Gestures & Interactions
```typescript
// hooks/useTouchGestures.ts
export function useTouchGestures() {
  const [touchStart, setTouchStart] = useState(0)
  
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    // Handle opportunity card swiping
    // Handle section navigation
  }, [])
  
  return {
    onTouchStart: (e) => setTouchStart(e.touches[0].clientX),
    onTouchEnd: (e) => {
      const touchEnd = e.changedTouches[0].clientX
      if (touchStart - touchEnd > 50) handleSwipe('left')
      if (touchEnd - touchStart > 50) handleSwipe('right')
    }
  }
}
```

### Bottom Sheet Pattern for Mobile
```tsx
// components/mobile/MobileAccessSheet.tsx
export function MobileAccessSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mobile-access-btn">
          Enter Access Code
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="mobile-sheet">
        <SheetHeader>
          <SheetTitle>Member Access Portal</SheetTitle>
          <SheetDescription>
            Enter your exclusive ClockworkCoaching access code
          </SheetDescription>
        </SheetHeader>
        
        <div className="sheet-body">
          <PremiumAccessInput />
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

---

## Animation Specifications

### Framer Motion Presets
```typescript
// lib/animations/presets.ts
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.2 }
  },
  
  slideFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  
  celebration: {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
    },
    transition: { duration: 0.5 }
  }
}
```

---

*These component specifications provide detailed implementation guidance for developers while maintaining the premium, consultant-grade experience throughout the application.*