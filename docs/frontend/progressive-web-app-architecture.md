# Progressive Web App Architecture

## PWA Features
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

## Native App Feel Features
- **Splash Screen:** Branded loading experience
- **Pull-to-Refresh:** On discovery feed and dashboard
- **Haptic Feedback:** Button taps, success states (iOS/Android)
- **Status Bar Styling:** Matches app theme
- **Safe Area Handling:** iPhone notch/dynamic island support
- **Offline Capability:** Cache questionnaire progress, view saved automations
- **Push Notifications:** Weekly discoveries, implementation reminders

---
