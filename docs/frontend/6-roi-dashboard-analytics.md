# 6. ROI Dashboard & Analytics

## Analytics Layout (Mobile)
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

## Metrics Card Components
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

## Performance Insights
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
