# 8. Mobile Navigation & PWA Features

## Bottom Tab Navigation
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

## PWA Installation & Features
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
