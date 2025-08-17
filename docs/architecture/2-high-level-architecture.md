# 2. High Level Architecture

## Technical Summary
**Architecture Pattern:** Monolithic Next.js 14 application with modular service layers  
**Platform Choice:** Web-first Progressive Web Application (PWA)  
**Repository Structure:** Single monorepo containing frontend, backend, and shared utilities  
**Deployment Model:** Serverless edge deployment via Netlify  

## Core System Components
```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │   Mobile    │ │   Tablet    │ │      Desktop        ││
│  │    PWA      │ │    PWA      │ │       PWA           ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                 Next.js 14 Application                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │  Frontend   │ │ API Routes  │ │   Middleware        ││
│  │ Components  │ │   Layer     │ │     Layer           ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                  Service Layer                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │   AI & ML   │ │    Auth     │ │    Business         ││
│  │  Services   │ │  Services   │ │    Services         ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                 External Services                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │  Supabase   │ │   OpenAI    │ │      Stripe         ││
│  │   (DB)      │ │    API      │ │    (Payments)       ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---
