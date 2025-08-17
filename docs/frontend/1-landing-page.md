# 1. Landing Page

## Layout (Mobile-First)
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

## Hero Section Components
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

## Value Proposition Cards
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

## Responsive Breakpoints
- **Mobile (320px-768px):** Stacked layout, full-width CTAs
- **Tablet (768px-1024px):** 2-column value props, larger hero
- **Desktop (1024px+):** 3-column layout, centered max-width 1200px

---
