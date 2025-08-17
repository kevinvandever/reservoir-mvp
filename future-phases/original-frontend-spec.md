# Reservoir Platform - Front-End Specification
## UX Expert Specification by Sally 🎨

**Version:** 1.0  
**Date:** August 17, 2025  
**Project:** Reservoir MVP Platform  
**Prepared for:** Kevin Vandever & Joe (Clockwork Coaching)

---

## Executive Summary

This specification defines the complete user experience and interface design for the Reservoir platform - an AI-powered automation discovery system for real estate professionals. The design extends the sophisticated Clockwork Coaching brand identity into a progressive web application that feels like working with a premium consultant while maintaining the approachability needed for daily use.

**Core UX Principles:**
- **Consultant-Grade Experience:** Professional, trustworthy, sophisticated
- **Progressive Disclosure:** Simple entry → Rich functionality as users mature
- **Mobile-First Implementation:** Native app feel on all devices
- **Conversational Intelligence:** AI interactions feel natural and valuable
- **Measurable Value:** Every feature demonstrates clear ROI

---

## Brand & Design System

### Visual Identity
Building on Clockwork Coaching's established brand:

```css
/* Core Brand Colors */
:root {
  --primary: 38 75% 58%;        /* Warm amber/orange */
  --secondary: 215 25% 27%;     /* Professional charcoal */
  --accent: 38 50% 95%;         /* Soft cream highlight */
  
  --background: 0 0% 100%;      /* Clean white */
  --surface: 210 20% 98%;       /* Subtle warm gray */
  --surface-elevated: 0 0% 100%; /* White cards */
  
  --text-primary: 215 25% 27%;  /* Charcoal text */
  --text-secondary: 215 15% 45%; /* Muted gray */
  --text-muted: 215 10% 65%;    /* Light gray */
  
  --border: 215 15% 92%;        /* Subtle borders */
  --border-focus: 38 75% 58%;   /* Primary focus state */
  
  --success: 142 76% 36%;       /* Professional green */
  --warning: 45 93% 47%;        /* Attention yellow */
  --error: 0 72% 51%;           /* Error red */
}

/* Dark Mode Support */
.dark {
  --background: 215 25% 12%;
  --surface: 215 25% 16%;
  --surface-elevated: 215 25% 20%;
  --text-primary: 210 20% 95%;
  --text-secondary: 215 15% 75%;
  --text-muted: 215 10% 55%;
  --border: 215 25% 25%;
}
```

### Typography Scale
```css
/* Professional Typography Hierarchy */
.text-display {     /* Hero headlines */
  font-size: 3.75rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.text-h1 {          /* Page titles */
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.text-h2 {          /* Section headers */
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
}

.text-h3 {          /* Card titles */
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
}

.text-body-lg {     /* Main content */
  font-size: 1.125rem;
  line-height: 1.6;
}

.text-body {        /* Standard text */
  font-size: 1rem;
  line-height: 1.5;
}

.text-body-sm {     /* Secondary text */
  font-size: 0.875rem;
  line-height: 1.4;
}

.text-caption {     /* Helper text */
  font-size: 0.75rem;
  line-height: 1.3;
  letter-spacing: 0.025em;
}
```

### Component Design Tokens
```css
/* Spacing Scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */

/* Border Radius */
--radius-sm: 0.25rem;   /* Small elements */
--radius-md: 0.5rem;    /* Cards, buttons */
--radius-lg: 0.75rem;   /* Modal, large cards */
--radius-xl: 1rem;      /* Hero sections */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 25px 50px rgba(0,0,0,0.15);

/* Animation */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Progressive Web App Architecture

### PWA Features
```json
{
  "name": "Reservoir - Automation Intelligence",
  "short_name": "Reservoir",
  "description": "AI-powered automation discovery for real estate professionals",
  "theme_color": "#f59e0b",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Native App Feel Features
- **Splash Screen:** Branded loading experience
- **Pull-to-Refresh:** On discovery feed and dashboard
- **Haptic Feedback:** Button taps, success states (iOS/Android)
- **Status Bar Styling:** Matches app theme
- **Safe Area Handling:** iPhone notch/dynamic island support
- **Offline Capability:** Cache questionnaire progress, view saved automations
- **Push Notifications:** Weekly discoveries, implementation reminders

---

## Core User Flows

### 1. Primary Conversion Flow
```
Landing Page
    ↓
[Start Free Analysis CTA]
    ↓
Account Creation (email + password)
    ↓
Questionnaire Onboarding
    ↓
AI Conversation (50+ questions)
    ↓
Analysis Report Generation
    ↓
[Upgrade to Reservoir CTA]
    ↓
Subscription Flow
    ↓
Reservoir Dashboard
```

### 2. Weekly Discovery Flow
```
Email Notification
    ↓
Reservoir Dashboard
    ↓
Browse Weekly Discoveries
    ↓
Select Automation
    ↓
Implementation Guide
    ↓
Progress Tracking
    ↓
ROI Measurement
```

### 3. Mobile-First Navigation Flow
```
Bottom Tab Navigation:
- 🏠 Dashboard
- 🔍 Discoveries  
- 📊 My Progress
- ⚙️ Settings

With contextual top navigation for:
- Back buttons
- Search functionality
- Action menus
```

---

## Screen-by-Screen Specifications

## 1. Landing Page

### Layout (Mobile-First)
```
┌─────────────────────────┐
│ [Logo]    [Login]       │ ← Header (60px)
├─────────────────────────┤
│                         │
│    🎯 HERO SECTION      │ ← Viewport height
│                         │
│ "Save 10+ Hours Weekly  │
│  with AI Automation     │
│  Discovery"             │
│                         │
│ [Start Free Analysis]   │ ← Primary CTA
│                         │
├─────────────────────────┤
│  💡 VALUE PROPOSITIONS  │ ← 3 cards stack on mobile
│     📈 ROI PROOF        │
│     👥 SOCIAL PROOF     │ ← Testimonials
│     🎁 FREE ANALYSIS    │ ← Lead magnet details
├─────────────────────────┤
│     [Footer]            │
└─────────────────────────┘
```

### Hero Section Components
```jsx
// Hero Message Hierarchy
<section className="hero-section">
  <h1 className="text-display text-center">
    Save <span className="text-primary">10+ Hours</span> Weekly
  </h1>
  <p className="text-body-lg text-secondary text-center">
    AI-powered automation discovery for real estate professionals. 
    Get your free $2,500 business analysis in 20 minutes.
  </p>
  <Button size="xl" variant="primary" className="w-full">
    Start Free Analysis
    <ArrowRight className="ml-2" />
  </Button>
</section>
```

### Value Proposition Cards
```jsx
// Three-Card Value Stack
const valueProps = [
  {
    icon: "🔍",
    title: "AI Discovery",
    description: "50+ intelligent questions reveal hidden automation opportunities",
    metric: "Average: 15 automations identified"
  },
  {
    icon: "📝",
    title: "Weekly Intelligence",
    description: "Personalized automation recommendations delivered weekly",
    metric: "10-15 new opportunities monthly"
  },
  {
    icon: "📊",
    title: "Measurable ROI",
    description: "Track time saved and revenue impact from every automation",
    metric: "Average: $75K+ annual savings"
  }
];
```

### Responsive Breakpoints
- **Mobile (320px-768px):** Stacked layout, full-width CTAs
- **Tablet (768px-1024px):** 2-column value props, larger hero
- **Desktop (1024px+):** 3-column layout, centered max-width 1200px

---

## 2. AI Questionnaire Interface

### Mobile Layout Design
```
┌─────────────────────────┐
│ ← Progress: 23/50 (46%) │ ← Header with progress
├─────────────────────────┤
│                         │
│     💬 Chat Messages    │ ← Scrollable conversation
│                         │
│ ┌─AI: Welcome! Let's... │
│ └─[timestamp]           │
│                         │
│ ┌─You: I'm a real...────┤ 
│ └─[timestamp]           │
│                         │
│ ┌─AI: Great! How many...│ ← Typing indicator when loading
│ └─●●● typing...         │
│                         │
│                         │
│                         │
├─────────────────────────┤
│ [Text Input Area]       │ ← Input with suggestions
│ [Send] [Voice] [Emoji]  │
└─────────────────────────┘
```

### Conversation Components
```jsx
// AI Message Bubble
<div className="message-bubble ai">
  <Avatar className="ai-avatar">🤖</Avatar>
  <div className="message-content">
    <p>Based on your role as a listing agent, how many active listings do you typically manage at once?</p>
    <QuickResponses>
      <Button variant="outline" size="sm">1-5 listings</Button>
      <Button variant="outline" size="sm">6-15 listings</Button>
      <Button variant="outline" size="sm">16+ listings</Button>
    </QuickResponses>
  </div>
  <span className="timestamp">2:34 PM</span>
</div>

// User Message Bubble  
<div className="message-bubble user">
  <div className="message-content">
    <p>Usually around 8-12 active listings. It gets overwhelming during busy seasons.</p>
  </div>
  <span className="timestamp">2:35 PM</span>
</div>

// Typing Indicator
<div className="typing-indicator">
  <div className="dots">
    <span></span><span></span><span></span>
  </div>
  <span>AI is thinking...</span>
</div>
```

### Input Enhancement Features
```jsx
// Smart Input Component
<div className="input-container">
  <TextareaAutosize 
    placeholder="Type your response..."
    className="message-input"
    onKeyPress={handleKeyPress}
    maxLength={500}
  />
  
  <div className="input-actions">
    <Button variant="ghost" size="sm">
      <Mic className="w-4 h-4" /> {/* Voice input */}
    </Button>
    <Button variant="ghost" size="sm">
      <Image className="w-4 h-4" /> {/* Photo upload */}
    </Button>
    <Button variant="primary" size="sm">
      <Send className="w-4 h-4" />
    </Button>
  </div>
  
  {/* Smart Suggestions */}
  <QuickSuggestions>
    <Button variant="outline" size="xs">Skip this question</Button>
    <Button variant="outline" size="xs">I'm not sure</Button>
    <Button variant="outline" size="xs">Tell me more</Button>
  </QuickSuggestions>
</div>
```

### Progress & Navigation
```jsx
// Progress Header
<header className="questionnaire-header">
  <Button variant="ghost" onClick={handleBack}>
    <ChevronLeft className="w-5 h-5" />
  </Button>
  
  <div className="progress-container">
    <ProgressBar value={progress} max={100} />
    <span className="progress-text">Question {currentQ} of ~50</span>
  </div>
  
  <Button variant="ghost" onClick={handleSave}>
    <Save className="w-5 h-5" />
  </Button>
</header>
```

---

## 3. Business Analysis Report

### Report Layout (Mobile-Optimized)
```
┌─────────────────────────┐
│ 📊 Your Business        │ ← Header with download CTA
│     Analysis Report     │
│ [Download PDF] [Share]  │
├─────────────────────────┤
│                         │
│ 📈 EXECUTIVE SUMMARY    │ ← Collapsible sections
│ Your automation score:  │
│      8.7/10             │ ← Large metric display
│                         │
│ Potential annual        │
│ savings: $87,500        │
├─────────────────────────┤
│ 🔍 TOP OPPORTUNITIES    │ ← Cards stack on mobile
│                         │
│ ┌─ Lead Response Auto. ─┐
│ │ Priority: HIGH        │
│ │ Time Saved: 8h/week   │
│ │ Revenue Impact: $2.1K │
│ │ [View Details]        │
│ └─────────────────────── ┘
│                         │
│ ┌─ Listing Automation ──┐
│ │ Priority: MEDIUM      │
│ │ Time Saved: 4h/week   │
│ │ Revenue Impact: $1.3K │
│ │ [View Details]        │
│ └─────────────────────── ┘
├─────────────────────────┤
│ 🎯 IMPLEMENTATION       │
│    ROADMAP              │
│                         │
│ Week 1-2: Lead Response │
│ Week 3-4: CRM Setup     │
│ Week 5-6: Listing Auto  │
│                         │
├─────────────────────────┤
│ 🚀 NEXT STEPS           │
│                         │
│ [Start Reservoir Trial] │ ← Conversion CTA
│ [Download Full Report]  │
│ [Schedule Consultation] │
└─────────────────────────┘
```

### Report Components
```jsx
// Executive Summary Card
<Card className="summary-card">
  <CardHeader>
    <CardTitle className="flex items-center">
      <TrendingUp className="w-6 h-6 text-primary mr-2" />
      Your Automation Potential
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="metric-grid">
      <MetricCard
        value="8.7/10"
        label="Automation Score"
        trend="+2.3 vs average"
        color="success"
      />
      <MetricCard
        value="$87,500"
        label="Annual Savings"
        trend="Conservative estimate"
        color="primary"
      />
      <MetricCard
        value="15 hours"
        label="Weekly Time Savings"
        trend="38% efficiency gain"
        color="warning"
      />
    </div>
  </CardContent>
</Card>

// Opportunity Card
<Card className="opportunity-card">
  <CardHeader>
    <div className="priority-badge priority-high">HIGH PRIORITY</div>
    <CardTitle>Lead Response Automation</CardTitle>
    <CardDescription>
      Automatically respond to leads within 5 minutes with personalized messages
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="impact-metrics">
      <div className="metric">
        <Clock className="w-4 h-4" />
        <span>8 hours/week saved</span>
      </div>
      <div className="metric">
        <DollarSign className="w-4 h-4" />
        <span>$2,100 monthly impact</span>
      </div>
      <div className="metric">
        <Zap className="w-4 h-4" />
        <span>90% faster response time</span>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" className="w-full">
      View Implementation Guide
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </CardFooter>
</Card>
```

---

## 4. Reservoir Dashboard

### Mobile Dashboard Layout
```
┌─────────────────────────┐
│ 👋 Hey Sarah!           │ ← Personalized greeting
│ You've saved 47 hours   │
│ this month 🎉           │
├─────────────────────────┤
│ 🆕 This Week's          │ ← Weekly discoveries section
│     Discoveries         │
│                         │
│ ┌─ Smart Follow-up ─────┐ ← Discovery cards
│ │ NEW                   │
│ │ 3 hours/week saved    │
│ │ [Quick Save] [View]   │
│ └─────────────────────── ┘
│                         │
│ ┌─ Contract Templates ──┐
│ │ NEW                   │
│ │ 2 hours/week saved    │
│ │ [Quick Save] [View]   │
│ └─────────────────────── ┘
├─────────────────────────┤
│ 📊 Your Progress        │ ← Quick metrics
│                         │
│ Automations Active: 12  │
│ Time Saved: 47h         │
│ Revenue Impact: $8.2K   │
│ [View Full Report]      │
├─────────────────────────┤
│ ⚡ Quick Actions         │ ← Action shortcuts
│                         │
│ [Browse All] [Saved]    │
│ [Implemented] [Help]    │
└─────────────────────────┘
```

### Discovery Feed Components
```jsx
// Weekly Discoveries Header
<section className="discoveries-header">
  <div className="header-content">
    <h2 className="text-h2">This Week's Discoveries</h2>
    <p className="text-body text-secondary">
      8 new automations curated for your business
    </p>
  </div>
  <div className="header-actions">
    <Button variant="outline" size="sm">
      <Filter className="w-4 h-4 mr-2" />
      Filter
    </Button>
    <Button variant="outline" size="sm">
      <Search className="w-4 h-4 mr-2" />
      Search
    </Button>
  </div>
</section>

// Discovery Card
<Card className="discovery-card">
  <CardHeader>
    <div className="card-header-row">
      <Badge variant="primary">NEW</Badge>
      <div className="difficulty-indicator">
        <span className="difficulty-dots">
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </span>
        <span className="difficulty-label">Medium</span>
      </div>
    </div>
    <CardTitle>Smart Follow-up Sequences</CardTitle>
    <CardDescription>
      Automatically nurture leads with personalized email sequences based on their behavior
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="impact-preview">
      <div className="impact-item">
        <Clock className="w-4 h-4 text-primary" />
        <span>3 hours/week</span>
      </div>
      <div className="impact-item">
        <TrendingUp className="w-4 h-4 text-success" />
        <span>25% more conversions</span>
      </div>
      <div className="impact-item">
        <Wrench className="w-4 h-4 text-warning" />
        <span>3 tools needed</span>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <div className="card-actions">
      <Button variant="ghost" size="sm">
        <Heart className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Bookmark className="w-4 h-4" />
      </Button>
      <Button variant="primary" className="flex-1">
        View Guide
      </Button>
    </div>
  </CardFooter>
</Card>
```

### Quick Metrics Widget
```jsx
// Progress Summary
<Card className="progress-summary">
  <CardHeader>
    <CardTitle className="flex items-center">
      <BarChart3 className="w-5 h-5 text-primary mr-2" />
      Your Progress This Month
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="metrics-grid">
      <div className="metric-item">
        <span className="metric-value text-h3">12</span>
        <span className="metric-label">Active Automations</span>
        <span className="metric-change text-success">+3 this week</span>
      </div>
      <div className="metric-item">
        <span className="metric-value text-h3">47h</span>
        <span className="metric-label">Time Saved</span>
        <span className="metric-change text-success">+8h this week</span>
      </div>
      <div className="metric-item">
        <span className="metric-value text-h3">$8.2K</span>
        <span className="metric-label">Revenue Impact</span>
        <span className="metric-change text-success">+$1.1K this week</span>
      </div>
    </div>
    
    <Button variant="outline" className="w-full mt-4">
      View Detailed Report
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </CardContent>
</Card>
```

---

## 5. Implementation Guide Interface

### Guide Layout (Mobile-First)
```
┌─────────────────────────┐
│ ← Smart Follow-up       │ ← Header with back nav
│   Sequences             │
│ [Save] [Share] [Help]   │
├─────────────────────────┤
│ ⭐ Difficulty: Medium    │ ← Quick overview
│ ⏱️  Time: 2-3 hours      │
│ 🛠️  Tools: 3 required    │
│ 📈 Impact: 3h/week      │
├─────────────────────────┤
│ 📋 IMPLEMENTATION       │ ← Step-by-step guide
│     STEPS               │
│                         │
│ ✅ Step 1: Setup CRM    │ ← Checkable progress
│ ⏳ Step 2: Create...    │ ← Current step
│ ⬜ Step 3: Configure... │ ← Future steps
│ ⬜ Step 4: Test...      │
│                         │
├─────────────────────────┤
│ 🎯 CURRENT STEP         │ ← Detailed current step
│                         │
│ Step 2: Create Email    │
│ Sequences               │
│                         │
│ [Detailed instructions] │
│ [Screenshots/Video]     │
│                         │
│ Required Tools:         │
│ • MailChimp (Free)      │ ← Tool links
│ • Zapier (Starter)      │
│                         │
│ [Mark Complete]         │ ← Progress action
│ [Need Help?]            │
├─────────────────────────┤
│ 📊 Expected Impact      │ ← ROI preview
│                         │
│ After completion:       │
│ • 3 hours/week saved    │
│ • 25% more conversions  │
│ • $2,100/month value    │
└─────────────────────────┘
```

### Implementation Components
```jsx
// Step Progress Indicator
<div className="step-progress">
  {steps.map((step, index) => (
    <div 
      key={step.id}
      className={`step-item ${getStepStatus(index)}`}
    >
      <div className="step-indicator">
        {step.completed ? (
          <CheckCircle className="w-6 h-6 text-success" />
        ) : step.current ? (
          <Circle className="w-6 h-6 text-primary" />
        ) : (
          <Circle className="w-6 h-6 text-muted" />
        )}
      </div>
      <div className="step-content">
        <h4 className="step-title">{step.title}</h4>
        <p className="step-description">{step.description}</p>
      </div>
    </div>
  ))}
</div>

// Current Step Detail
<Card className="current-step">
  <CardHeader>
    <div className="step-meta">
      <Badge variant="primary">Step {currentStep} of {totalSteps}</Badge>
      <span className="time-estimate">~30 minutes</span>
    </div>
    <CardTitle>{currentStepData.title}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="step-instructions">
      {currentStepData.instructions.map((instruction, index) => (
        <div key={index} className="instruction-item">
          <span className="instruction-number">{index + 1}</span>
          <div className="instruction-content">
            <p>{instruction.text}</p>
            {instruction.image && (
              <img 
                src={instruction.image} 
                alt={instruction.alt}
                className="instruction-image"
              />
            )}
            {instruction.video && (
              <VideoPlayer src={instruction.video} />
            )}
          </div>
        </div>
      ))}
    </div>
    
    {/* Required Tools */}
    <div className="required-tools">
      <h4>Required Tools</h4>
      <div className="tools-list">
        {currentStepData.tools.map(tool => (
          <div key={tool.id} className="tool-item">
            <img src={tool.icon} alt={tool.name} className="tool-icon" />
            <div className="tool-info">
              <span className="tool-name">{tool.name}</span>
              <span className="tool-plan">({tool.plan})</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={tool.signupUrl} target="_blank">
                Sign Up
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <div className="step-actions">
      <Button variant="outline" onClick={handlePrevious}>
        Previous
      </Button>
      <Button 
        variant="primary" 
        onClick={handleMarkComplete}
        className="flex-1"
      >
        Mark Complete & Continue
      </Button>
    </div>
  </CardFooter>
</Card>
```

### Help & Support Integration
```jsx
// Contextual Help Widget
<div className="help-widget">
  <Button variant="ghost" size="sm" onClick={toggleHelp}>
    <HelpCircle className="w-4 h-4 mr-2" />
    Need Help?
  </Button>
  
  {helpOpen && (
    <Card className="help-popup">
      <CardContent>
        <div className="help-options">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with Support
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Video className="w-4 h-4 mr-2" />
            Watch Video Guide
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Community Forum
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Book 1:1 Help Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )}
</div>
```

---

## 6. ROI Dashboard & Analytics

### Analytics Layout (Mobile)
```
┌─────────────────────────┐
│ 📊 Your Impact Report   │ ← Header with date range
│ Last 30 Days            │
│ [This Month] [All Time] │
├─────────────────────────┤
│ 🎯 Key Metrics          │ ← Hero metrics cards
│                         │
│ ┌─ Time Saved ──────────┐
│ │     47 hours          │
│ │   +8h this week       │
│ └─────────────────────── ┘
│                         │
│ ┌─ Revenue Impact ──────┐
│ │    $8,200             │
│ │   +$1,100 this week   │
│ └─────────────────────── ┘
│                         │
│ ┌─ Automations Live ────┐
│ │      12               │
│ │   +3 this month       │
│ └─────────────────────── ┘
├─────────────────────────┤
│ 📈 Trends               │ ← Simple trend charts
│                         │
│ Weekly Time Savings     │
│ [Simple line chart]     │
│                         │
│ Automation Adoption     │
│ [Simple bar chart]      │
├─────────────────────────┤
│ ⭐ Top Performers        │ ← Best automations
│                         │
│ 1. Lead Response        │
│    12h saved, $3.2K     │
│                         │
│ 2. Listing Auto         │
│    8h saved, $2.1K      │
│                         │
│ 3. Follow-up Seqs       │
│    6h saved, $1.8K      │
├─────────────────────────┤
│ 🚀 Opportunities        │ ← Growth suggestions
│                         │
│ You could save 15 more  │
│ hours by implementing:  │
│                         │
│ • Social Media Auto     │
│ • Contract Templates    │
│ • Market Reports        │
│                         │
│ [Explore These]         │
└─────────────────────────┘
```

### Metrics Card Components
```jsx
// Hero Metric Card
<Card className="metric-hero-card">
  <CardContent className="p-6">
    <div className="metric-header">
      <div className="metric-icon">
        <Clock className="w-8 h-8 text-primary" />
      </div>
      <div className="metric-meta">
        <span className="metric-label">Time Saved This Month</span>
        <span className="metric-period">Last 30 days</span>
      </div>
    </div>
    
    <div className="metric-value">
      <span className="value-number text-display">47</span>
      <span className="value-unit text-h3">hours</span>
    </div>
    
    <div className="metric-change">
      <TrendingUp className="w-4 h-4 text-success" />
      <span className="change-value text-success">+8 hours</span>
      <span className="change-label">vs last week</span>
    </div>
    
    <div className="metric-progress">
      <ProgressBar value={78} max={100} variant="success" />
      <span className="progress-label">78% of monthly goal</span>
    </div>
  </CardContent>
</Card>

// Simple Trend Chart
<Card className="trend-chart-card">
  <CardHeader>
    <CardTitle>Weekly Time Savings Trend</CardTitle>
    <CardDescription>Hours saved per week over time</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="chart-container">
      {/* Simple SVG line chart or Chart.js */}
      <SimpleTrendChart 
        data={weeklySavingsData}
        height={120}
        color="primary"
      />
    </div>
    <div className="chart-summary">
      <span className="summary-text">
        📈 Consistent upward trend - you're building momentum!
      </span>
    </div>
  </CardContent>
</Card>
```

### Performance Insights
```jsx
// Top Performers List
<Card className="top-performers">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Trophy className="w-5 h-5 text-primary mr-2" />
      Your Best Automations
    </CardTitle>
    <CardDescription>
      Highest impact implementations this month
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="performers-list">
      {topAutomations.map((automation, index) => (
        <div key={automation.id} className="performer-item">
          <div className="performer-rank">
            <span className="rank-number">#{index + 1}</span>
          </div>
          <div className="performer-info">
            <h4 className="performer-name">{automation.name}</h4>
            <div className="performer-metrics">
              <span className="metric">
                <Clock className="w-3 h-3" />
                {automation.timeSaved}h saved
              </span>
              <span className="metric">
                <DollarSign className="w-3 h-3" />
                ${automation.revenueImpact}K value
              </span>
            </div>
          </div>
          <div className="performer-trend">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="trend-value">+{automation.growth}%</span>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" className="w-full">
      View All Automation Details
    </Button>
  </CardFooter>
</Card>
```

---

## 7. Admin Interface for Content Management

### Admin Dashboard Layout
```
┌─────────────────────────┐
│ 🔧 Reservoir Admin      │ ← Admin header
│ [Kevin] [Joe] [Logout]  │
├─────────────────────────┤
│ 📊 Content Overview     │ ← Quick stats
│                         │
│ Active Automations: 127 │
│ Published: 98           │
│ Draft: 29              │
│ Categories: 12         │
├─────────────────────────┤
│ ⚡ Quick Actions         │ ← Action buttons
│                         │
│ [+ New Automation]      │
│ [Bulk Import]           │
│ [Category Manager]      │
│ [User Analytics]        │
├─────────────────────────┤
│ 📋 Recent Activity      │ ← Activity feed
│                         │
│ • Joe published "Smart  │
│   Contract Templates"   │
│   2 hours ago           │
│                         │
│ • Kevin updated "Lead   │
│   Response Auto"        │
│   5 hours ago           │
│                         │
│ • New user feedback on  │
│   "Social Media Auto"   │
│   1 day ago             │
├─────────────────────────┤
│ 🎯 Content Performance  │ ← Top content
│                         │
│ Most Saved:             │
│ 1. Lead Response (89%)  │
│ 2. CRM Setup (76%)      │
│ 3. Email Sequences(71%) │
│                         │
│ Needs Attention:        │
│ • Contract Auto (34%)   │
│ • Market Reports (28%)  │
└─────────────────────────┘
```

### Automation Editor Interface
```jsx
// Automation Creation/Edit Form
<div className="automation-editor">
  <header className="editor-header">
    <div className="header-left">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
    </div>
    <div className="header-right">
      <Button variant="outline" onClick={handlePreview}>
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>
      <Button variant="outline" onClick={handleSaveDraft}>
        Save Draft
      </Button>
      <Button variant="primary" onClick={handlePublish}>
        <Rocket className="w-4 h-4 mr-2" />
        Publish
      </Button>
    </div>
  </header>

  <div className="editor-content">
    {/* Basic Information */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-group">
          <Label htmlFor="title">Automation Title</Label>
          <Input 
            id="title"
            placeholder="e.g., Smart Lead Response System"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>
        
        <div className="form-group">
          <Label htmlFor="description">Short Description</Label>
          <Textarea 
            id="description"
            placeholder="Brief description that appears in discovery cards..."
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={3}
          />
        </div>
        
        <div className="form-grid-2">
          <div className="form-group">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead-management">Lead Management</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="form-group">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={formData.difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (1 hour)</SelectItem>
                <SelectItem value="medium">Medium (2-4 hours)</SelectItem>
                <SelectItem value="hard">Hard (5+ hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Impact Metrics */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Impact Metrics</CardTitle>
        <CardDescription>
          These help users understand the value of this automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-grid-3">
          <div className="form-group">
            <Label htmlFor="timeSaved">Time Saved (hours/week)</Label>
            <Input 
              id="timeSaved"
              type="number"
              placeholder="8"
              value={formData.timeSaved}
              onChange={handleTimeSavedChange}
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="revenueImpact">Revenue Impact ($/month)</Label>
            <Input 
              id="revenueImpact"
              type="number"
              placeholder="2100"
              value={formData.revenueImpact}
              onChange={handleRevenueImpactChange}
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="implementationTime">Setup Time (hours)</Label>
            <Input 
              id="implementationTime"
              type="number"
              placeholder="3"
              value={formData.implementationTime}
              onChange={handleImplementationTimeChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <Label htmlFor="additionalBenefits">Additional Benefits</Label>
          <TagInput 
            id="additionalBenefits"
            placeholder="Add benefit (press Enter)"
            tags={formData.additionalBenefits}
            onTagsChange={handleBenefitsChange}
          />
          <span className="form-help">
            e.g., "90% faster response time", "Reduces manual errors"
          </span>
        </div>
      </CardContent>
    </Card>

    {/* Implementation Guide */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Implementation Guide</CardTitle>
        <CardDescription>
          Step-by-step instructions for users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepEditor 
          steps={formData.steps}
          onStepsChange={handleStepsChange}
        />
      </CardContent>
    </Card>

    {/* Required Tools */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Required Tools</CardTitle>
        <CardDescription>
          Tools users need to implement this automation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToolSelector 
          selectedTools={formData.requiredTools}
          onToolsChange={handleToolsChange}
        />
      </CardContent>
    </Card>

    {/* Targeting & Personalization */}
    <Card className="editor-section">
      <CardHeader>
        <CardTitle>Targeting Criteria</CardTitle>
        <CardDescription>
          Define which users should see this automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-group">
          <Label>Business Size</Label>
          <CheckboxGroup 
            options={businessSizeOptions}
            value={formData.targetBusinessSize}
            onChange={handleBusinessSizeChange}
          />
        </div>
        
        <div className="form-group">
          <Label>Experience Level</Label>
          <CheckboxGroup 
            options={experienceLevelOptions}
            value={formData.targetExperience}
            onChange={handleExperienceChange}
          />
        </div>
        
        <div className="form-group">
          <Label>Current Tools</Label>
          <ToolSelector 
            selectedTools={formData.targetTools}
            onToolsChange={handleTargetToolsChange}
            mode="targeting"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

### Content Management Features
```jsx
// Step Editor Component
<div className="step-editor">
  <div className="steps-list">
    {steps.map((step, index) => (
      <Card key={step.id} className="step-card">
        <CardHeader>
          <div className="step-header">
            <span className="step-number">Step {index + 1}</span>
            <div className="step-actions">
              <Button variant="ghost" size="sm" onClick={() => moveStep(index, -1)}>
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => moveStep(index, 1)}>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteStep(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="form-group">
            <Label>Step Title</Label>
            <Input 
              value={step.title}
              onChange={(e) => updateStep(index, 'title', e.target.value)}
              placeholder="e.g., Configure your CRM"
            />
          </div>
          
          <div className="form-group">
            <Label>Instructions</Label>
            <RichTextEditor 
              value={step.instructions}
              onChange={(value) => updateStep(index, 'instructions', value)}
              placeholder="Detailed step instructions..."
            />
          </div>
          
          <div className="form-group">
            <Label>Media</Label>
            <MediaUploader 
              onUpload={(url, type) => addStepMedia(index, url, type)}
              acceptedTypes={['image', 'video']}
            />
            {step.media.map((media, mediaIndex) => (
              <MediaPreview 
                key={mediaIndex}
                media={media}
                onRemove={() => removeStepMedia(index, mediaIndex)}
              />
            ))}
          </div>
          
          <div className="form-group">
            <Label>Required Tools for This Step</Label>
            <ToolSelector 
              selectedTools={step.requiredTools}
              onToolsChange={(tools) => updateStep(index, 'requiredTools', tools)}
            />
          </div>
          
          <div className="form-group">
            <Label>Estimated Time</Label>
            <Select 
              value={step.estimatedTime}
              onValueChange={(value) => updateStep(index, 'estimatedTime', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time estimate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-min">5 minutes</SelectItem>
                <SelectItem value="15-min">15 minutes</SelectItem>
                <SelectItem value="30-min">30 minutes</SelectItem>
                <SelectItem value="1-hour">1 hour</SelectItem>
                <SelectItem value="2-hours">2+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  
  <Button 
    variant="outline" 
    onClick={addNewStep}
    className="w-full"
  >
    <Plus className="w-4 h-4 mr-2" />
    Add New Step
  </Button>
</div>
```

---

## 8. Mobile Navigation & PWA Features

### Bottom Tab Navigation
```jsx
// Mobile Navigation Component
<nav className="mobile-navigation">
  <div className="nav-container">
    {navItems.map((item) => (
      <Link 
        key={item.id}
        href={item.href}
        className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
      >
        <div className="nav-icon">
          {item.icon}
          {item.badge && (
            <span className="nav-badge">{item.badge}</span>
          )}
        </div>
        <span className="nav-label">{item.label}</span>
      </Link>
    ))}
  </div>
</nav>

// Navigation Items Configuration
const navItems = [
  {
    id: 'dashboard',
    href: '/dashboard',
    icon: <Home className="w-5 h-5" />,
    label: 'Dashboard',
    badge: null
  },
  {
    id: 'discoveries',
    href: '/discoveries',
    icon: <Search className="w-5 h-5" />,
    label: 'Discoveries',
    badge: newDiscoveriesCount > 0 ? newDiscoveriesCount : null
  },
  {
    id: 'progress',
    href: '/progress',
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Progress',
    badge: null
  },
  {
    id: 'profile',
    href: '/profile',
    icon: <User className="w-5 h-5" />,
    label: 'Profile',
    badge: null
  }
];
```

### PWA Installation & Features
```jsx
// PWA Install Prompt
<div className="pwa-install-prompt">
  <Card className="install-card">
    <CardContent className="p-4">
      <div className="install-content">
        <div className="install-icon">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <div className="install-text">
          <h4>Install Reservoir</h4>
          <p>Get native app experience with offline access</p>
        </div>
      </div>
      <div className="install-actions">
        <Button variant="ghost" size="sm" onClick={dismissInstallPrompt}>
          Not now
        </Button>
        <Button variant="primary" size="sm" onClick={handleInstall}>
          Install
        </Button>
      </div>
    </CardContent>
  </Card>
</div>

// Offline Indicator
<div className="offline-indicator">
  {isOffline && (
    <div className="offline-banner">
      <WifiOff className="w-4 h-4 mr-2" />
      <span>You're offline. Some features may be limited.</span>
    </div>
  )}
</div>

// Pull-to-Refresh Component
<div className="pull-to-refresh-container">
  <div 
    className={`refresh-indicator ${isRefreshing ? 'active' : ''}`}
    style={{ transform: `translateY(${pullDistance}px)` }}
  >
    <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
    <span>{isRefreshing ? 'Refreshing...' : 'Pull to refresh'}</span>
  </div>
  
  <div 
    className="refresh-content"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    {children}
  </div>
</div>
```

---

## Responsive Design System

### Breakpoint Strategy
```css
/* Mobile-First Breakpoints */
.container {
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 2rem;
  }
  
  /* Two-column layouts */
  .discovery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  /* Enhanced navigation */
  .mobile-navigation {
    display: none;
  }
  
  .desktop-navigation {
    display: block;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Three-column layouts */
  .discovery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  /* Sidebar layouts */
  .dashboard-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
  
  /* Four-column discovery grid */
  .discovery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Component Responsive Patterns
```jsx
// Responsive Card Component
<Card className="discovery-card responsive-card">
  <CardHeader className="p-4 md:p-6">
    <div className="card-header-mobile md:card-header-desktop">
      <Badge variant="primary">NEW</Badge>
      <div className="difficulty-indicator">
        <span className="difficulty-dots hidden md:inline-flex">
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </span>
        <span className="difficulty-label">Medium</span>
      </div>
    </div>
    <CardTitle className="text-lg md:text-xl lg:text-2xl">
      Smart Follow-up Sequences
    </CardTitle>
    <CardDescription className="text-sm md:text-base">
      Automatically nurture leads with personalized email sequences
    </CardDescription>
  </CardHeader>
  <CardContent className="p-4 md:p-6">
    <div className="impact-preview grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
      <div className="impact-item">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-sm md:text-base">3 hours/week</span>
      </div>
      <div className="impact-item">
        <TrendingUp className="w-4 h-4 text-success" />
        <span className="text-sm md:text-base">25% more conversions</span>
      </div>
      <div className="impact-item">
        <Wrench className="w-4 h-4 text-warning" />
        <span className="text-sm md:text-base">3 tools needed</span>
      </div>
    </div>
  </CardContent>
  <CardFooter className="p-4 md:p-6">
    <div className="card-actions flex flex-col md:flex-row gap-2 md:gap-4 w-full">
      <div className="action-buttons flex gap-2 md:hidden">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
      <Button variant="primary" className="flex-1">
        View Guide
      </Button>
      <div className="hidden md:flex gap-2">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </CardFooter>
</Card>
```

---

## Accessibility (WCAG AA Compliance)

### Core Accessibility Features
```jsx
// Accessible Navigation
<nav aria-label="Main navigation" className="main-navigation">
  <ul role="list">
    {navItems.map((item) => (
      <li key={item.id}>
        <Link 
          href={item.href}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className="nav-link"
        >
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
          {item.badge && (
            <span 
              className="nav-badge"
              aria-label={`${item.badge} new items`}
            >
              {item.badge}
            </span>
          )}
        </Link>
      </li>
    ))}
  </ul>
</nav>

// Accessible Form Components
<div className="form-group">
  <Label 
    htmlFor="automation-title"
    className="form-label required"
  >
    Automation Title
    <span aria-label="required" className="required-indicator">*</span>
  </Label>
  <Input 
    id="automation-title"
    aria-describedby="title-help title-error"
    aria-invalid={hasError ? 'true' : 'false'}
    value={title}
    onChange={handleTitleChange}
  />
  <div id="title-help" className="form-help">
    Choose a clear, descriptive title for your automation
  </div>
  {hasError && (
    <div id="title-error" className="form-error" role="alert">
      Title is required and must be at least 5 characters
    </div>
  )}
</div>

// Accessible Modal/Dialog
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button variant="primary">
      Create New Automation
    </Button>
  </DialogTrigger>
  <DialogContent 
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">
        Create New Automation
      </DialogTitle>
      <DialogDescription id="dialog-description">
        Fill out the form below to create a new automation for your users
      </DialogDescription>
    </DialogHeader>
    <div className="dialog-content">
      {/* Form content */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Create Automation
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Keyboard Navigation
```css
/* Focus Management */
.focus-trap {
  outline: none;
}

.focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--background);
  color: var(--text-primary);
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Keyboard-only indicators */
.keyboard-user .button:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}

.keyboard-user .card:focus-within {
  box-shadow: 0 0 0 2px var(--border-focus);
}
```

### Screen Reader Support
```jsx
// Live Regions for Dynamic Content
<div 
  aria-live="polite" 
  aria-atomic="true"
  className="sr-only"
  id="status-updates"
>
  {statusMessage}
</div>

// Descriptive Buttons
<Button 
  variant="ghost" 
  size="sm"
  aria-label="Save automation to your favorites"
  onClick={handleSave}
>
  <Heart className="w-4 h-4" aria-hidden="true" />
  <span className="sr-only">Save</span>
</Button>

// Complex UI Descriptions
<div 
  className="progress-chart"
  role="img"
  aria-labelledby="chart-title"
  aria-describedby="chart-description"
>
  <h3 id="chart-title">Weekly Time Savings</h3>
  <div id="chart-description" className="sr-only">
    Chart showing time saved over the last 8 weeks, 
    trending upward from 12 hours to 47 hours per week
  </div>
  {/* Chart visualization */}
</div>
```

---

## Performance Optimization

### Core Web Vitals Targets
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s  
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Performance Strategies
```jsx
// Image Optimization
<Image
  src={automation.previewImage}
  alt={automation.title}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// Code Splitting & Lazy Loading
const AdminDashboard = lazy(() => import('../components/AdminDashboard'));
const AnalyticsChart = lazy(() => import('../components/AnalyticsChart'));

// Critical CSS Inlining
<style dangerouslySetInnerHTML={{
  __html: `
    /* Critical above-the-fold styles */
    .hero-section { /* styles */ }
    .navigation { /* styles */ }
    .loading-skeleton { /* styles */ }
  `
}} />

// Service Worker for Caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'none'
  });
}
```

### Loading States & Skeleton Screens
```jsx
// Skeleton Components
const DiscoveryCardSkeleton = () => (
  <Card className="discovery-card skeleton">
    <CardHeader>
      <div className="skeleton-line w-1/4 h-4"></div>
      <div className="skeleton-line w-3/4 h-6"></div>
      <div className="skeleton-line w-full h-4"></div>
    </CardHeader>
    <CardContent>
      <div className="skeleton-grid">
        <div className="skeleton-line w-1/3 h-4"></div>
        <div className="skeleton-line w-1/3 h-4"></div>
        <div className="skeleton-line w-1/3 h-4"></div>
      </div>
    </CardContent>
    <CardFooter>
      <div className="skeleton-line w-full h-10"></div>
    </CardFooter>
  </Card>
);

// Progressive Loading
const DiscoveryFeed = () => {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="discovery-feed">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <DiscoveryCardSkeleton key={i} />
        ))
      ) : (
        discoveries.map(discovery => (
          <DiscoveryCard key={discovery.id} discovery={discovery} />
        ))
      )}
    </div>
  );
};
```

---

## Component Library Specifications

### Button System
```jsx
// Button Variants & Sizes
const buttonVariants = {
  // Variants
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  
  // Sizes
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8",
  xl: "h-12 px-8 text-lg",
  
  // Special
  icon: "h-10 w-10"
};

// Usage Examples
<Button variant="primary" size="lg">
  Start Free Analysis
</Button>

<Button variant="outline" size="sm">
  <Heart className="w-4 h-4 mr-2" />
  Save
</Button>

<Button variant="ghost" size="icon">
  <MoreHorizontal className="w-4 h-4" />
</Button>
```

### Card System
```jsx
// Card Hierarchy
<Card className="discovery-card">
  <CardHeader>
    <CardTitle>Smart Follow-up Sequences</CardTitle>
    <CardDescription>
      Automatically nurture leads with personalized email sequences
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main card content */}
  </CardContent>
  <CardFooter>
    {/* Actions and additional info */}
  </CardFooter>
</Card>

// Card Variants
const cardVariants = {
  default: "bg-card text-card-foreground",
  elevated: "bg-card text-card-foreground shadow-lg",
  outline: "border border-border bg-background",
  ghost: "bg-transparent",
  gradient: "bg-gradient-to-br from-primary/5 to-primary/10"
};
```

### Form Components
```jsx
// Input Components
<div className="form-group">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email"
    type="email"
    placeholder="your@email.com"
    required
  />
</div>

<div className="form-group">
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message"
    placeholder="Tell us about your business..."
    rows={4}
  />
</div>

<div className="form-group">
  <Label htmlFor="category">Category</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="lead-management">Lead Management</SelectItem>
      <SelectItem value="marketing">Marketing</SelectItem>
      <SelectItem value="operations">Operations</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## Technical Implementation Notes

### State Management Strategy
```jsx
// Global App State (React Context)
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  return (
    <AppContext.Provider value={{
      user, setUser,
      theme, setTheme,
      notifications, setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Local Component State (Zustand)
const useDiscoveryStore = create((set, get) => ({
  discoveries: [],
  filters: {
    category: 'all',
    difficulty: 'all',
    saved: false
  },
  loading: false,
  
  setDiscoveries: (discoveries) => set({ discoveries }),
  updateFilters: (newFilters) => set(state => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setLoading: (loading) => set({ loading })
}));
```

### API Integration Patterns
```jsx
// API Service Layer
class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
  }
  
  async fetchDiscoveries(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${this.baseURL}/discoveries?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch discoveries');
    }
    
    return response.json();
  }
  
  async saveAutomation(automationId) {
    const response = await fetch(`${this.baseURL}/automations/${automationId}/save`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  }
}

// React Query Integration
const useDiscoveries = (filters) => {
  return useQuery({
    queryKey: ['discoveries', filters],
    queryFn: () => apiService.fetchDiscoveries(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

---

## Testing Strategy

### Component Testing
```jsx
// Discovery Card Test
import { render, screen, fireEvent } from '@testing-library/react';
import { DiscoveryCard } from '../DiscoveryCard';

const mockDiscovery = {
  id: '1',
  title: 'Smart Follow-up Sequences',
  description: 'Automatically nurture leads...',
  timeSaved: 3,
  difficulty: 'medium',
  category: 'lead-management'
};

describe('DiscoveryCard', () => {
  it('renders discovery information correctly', () => {
    render(<DiscoveryCard discovery={mockDiscovery} />);
    
    expect(screen.getByText('Smart Follow-up Sequences')).toBeInTheDocument();
    expect(screen.getByText('3 hours/week')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });
  
  it('calls onSave when save button is clicked', () => {
    const onSave = jest.fn();
    render(<DiscoveryCard discovery={mockDiscovery} onSave={onSave} />);
    
    fireEvent.click(screen.getByLabelText(/save/i));
    expect(onSave).toHaveBeenCalledWith(mockDiscovery.id);
  });
});
```

### Accessibility Testing
```jsx
// A11y Testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<DiscoveryCard discovery={mockDiscovery} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### E2E Testing (Playwright)
```javascript
// Questionnaire Flow Test
import { test, expect } from '@playwright/test';

test('complete questionnaire flow', async ({ page }) => {
  await page.goto('/questionnaire');
  
  // Start questionnaire
  await page.click('text=Start Free Analysis');
  
  // Answer first question
  await page.fill('[placeholder="Type your response..."]', 'I am a listing agent');
  await page.click('[aria-label="Send message"]');
  
  // Verify AI response
  await expect(page.locator('.ai-message')).toContainText('Great!');
  
  // Continue through questionnaire...
  
  // Complete and verify report generation
  await expect(page.locator('.analysis-report')).toBeVisible();
  await expect(page.locator('text=Your Automation Score')).toBeVisible();
});
```

---

## Launch & Deployment Strategy

### Deployment Checklist
- [ ] PWA manifest configured and tested
- [ ] Service worker caching strategy implemented
- [ ] Lighthouse scores: Performance 90+, A11y 95+, SEO 90+
- [ ] Mobile responsiveness tested on real devices
- [ ] Cross-browser compatibility verified (Chrome, Safari, Firefox, Edge)
- [ ] Error boundaries and fallback UI implemented
- [ ] Analytics and monitoring configured
- [ ] A/B testing framework setup for key conversion points

### Progressive Rollout Plan
1. **Week 1:** Internal testing (Kevin + Joe)
2. **Week 2:** Beta testing with 10 selected real estate agents
3. **Week 3:** Limited public launch (100 users max)
4. **Week 4:** Full public launch with marketing campaign

### Success Metrics & KPIs
- **Questionnaire Completion Rate:** Target 70%+
- **Mobile Usage:** Expected 60%+ of traffic
- **PWA Install Rate:** Target 15% of returning users
- **Page Load Speed:** < 2s on 3G connection
- **Accessibility Score:** 95%+ WCAG AA compliance
- **User Satisfaction:** 4.5+ stars average rating

---

## Conclusion

This comprehensive front-end specification provides the foundation for building a world-class user experience for the Reservoir platform. The design extends your existing Clockwork Coaching brand into a sophisticated yet approachable automation discovery platform that will feel like working with a premium consultant.

The specification prioritizes:
- **Mobile-first implementation** with progressive web app capabilities
- **Accessible design** meeting WCAG AA standards
- **Performance optimization** for fast, smooth interactions
- **Scalable component system** for rapid development and future expansion
- **User-centered design** focused on value delivery and conversion

Ready to build something amazing! 🚀

---

**Next Steps:**
1. Review and approve this specification
2. Begin implementation with the foundational components
3. Set up development environment with PWA tooling
4. Create initial component library and design system
5. Start with the landing page and questionnaire interface

Let me know if you need any clarification or want me to dive deeper into any specific section!