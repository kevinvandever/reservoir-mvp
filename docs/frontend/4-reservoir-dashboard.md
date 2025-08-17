# 4. Reservoir Dashboard

## Mobile Dashboard Layout
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

## Discovery Feed Components
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

## Quick Metrics Widget
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
