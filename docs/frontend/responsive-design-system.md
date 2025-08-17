# Responsive Design System

## Breakpoint Strategy
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

## Component Responsive Patterns
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
