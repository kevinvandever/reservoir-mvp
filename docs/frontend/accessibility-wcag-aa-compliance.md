# Accessibility (WCAG AA Compliance)

## Core Accessibility Features
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

## Keyboard Navigation
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

## Screen Reader Support
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
