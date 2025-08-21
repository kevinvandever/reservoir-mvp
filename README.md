# 🏗️ Reservoir MVP - Business Automation Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/reservoir-mvp/deploy-status)](https://app.netlify.com/sites/reservoir-mvp/deploys)

A Next.js 14 application offering AI-powered business automation discovery and consultation services with dual access methods for different user types.

**🚀 Live Production:** https://reservoir-mvp.netlify.app

---

## 🎯 **Platform Overview**

Reservoir MVP provides intelligent business automation consultation through:

- **🎫 Premium Access Codes** - Exclusive GPT-4 powered consultations for ClockworkCoaching members
- **👤 User Registration** - Self-service dashboard with automation tools and analytics
- **🤖 AI-Powered Conversations** - Tim Urban-style engaging business intelligence gathering
- **📊 Dynamic Reports** - Personalized automation recommendations with ROI projections

---

## 🔐 **Access Methods**

### **Method 1: Premium Access Codes**
- Entry Point: `/` (Landing page)
- Experience: AI-powered business consultation questionnaire
- Value: $2,500+ premium consultation experience
- Users: ClockworkCoaching members with exclusive codes

### **Method 2: User Registration**  
- Entry Point: `/dashboard` (redirects to registration)
- Experience: Traditional dashboard with full platform access
- Value: Ongoing automation discovery and implementation
- Users: General business owners creating accounts

📋 **Detailed Guide:** See [`ACCESS_METHODS_GUIDE.md`](./ACCESS_METHODS_GUIDE.md) for complete documentation.

---

## 🛠️ **Tech Stack**

- **Framework:** Next.js 14.x (App Router, TypeScript, Tailwind CSS)
- **UI Components:** shadcn/ui with Radix UI primitives
- **State Management:** Zustand + React Context
- **Database:** Supabase (PostgreSQL with real-time subscriptions)  
- **Authentication:** Supabase Auth + Custom Access Code System
- **AI Services:** OpenAI GPT-4 for intelligent conversations
- **Deployment:** Netlify with automatic deployments
- **Monitoring:** Built-in error tracking and analytics

---

## 🏗️ **Architecture**

```
reservoir-mvp/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Premium access code landing
│   ├── dashboard/           # User dashboard (registered users)  
│   ├── questionnaire/       # AI-powered questionnaire
│   ├── report/              # Dynamic report generation
│   ├── api/                 # API routes
│   │   ├── ai/              # GPT-4 question generation
│   │   ├── access/          # Access code validation  
│   │   └── user/            # User management
│   └── admin/               # Access code management
├── components/               # React components
│   ├── ui/                  # shadcn/ui base components
│   ├── report/              # Report generation components
│   └── questionnaire/       # Questionnaire UI components  
├── lib/                     # Core business logic
│   ├── access/              # Access code system
│   ├── auth/                # User authentication
│   ├── openai/              # AI integration
│   ├── report/              # Report generation engine
│   └── supabase/            # Database clients
├── stores/                  # Zustand state management
└── docs/                    # Story documentation
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- Supabase account
- OpenAI API key

### **Development Setup**

```bash
# 1. Clone and install
git clone https://github.com/kevinvandever/reservoir-mvp.git
cd reservoir-mvp
npm install

# 2. Environment setup
cp .env.example .env.local
# Edit .env.local with your API keys

# 3. Database setup  
# Run SQL scripts from /supabase/ in your Supabase project

# 4. Start development
npm run dev
```

### **Testing Access Methods**

**Premium Access Code:**
1. Go to http://localhost:3000
2. Enter code: `CLOCK-DEMO-2025`  
3. Experience AI questionnaire

**User Registration:**
1. Go to http://localhost:3000/dashboard
2. Create account → Confirm email → Login
3. Explore dashboard features

---

## 📋 **Available Scripts**

```bash
npm run dev            # Development server
npm run build          # Production build
npm run start          # Production server
npm run lint          # ESLint validation
npm run lint:fix      # ESLint with auto-fix
npm run type-check    # TypeScript validation
```

---

## 🌍 **Environment Variables**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# OpenAI Integration  
OPENAI_API_KEY=your_openai_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=https://reservoir-mvp.netlify.app
NEXT_PUBLIC_ENV=production
```

---

## 🎫 **Access Code Management**

### **Demo Codes Available:**
- `CLOCK-DEMO-2025` - Demo User (100 uses, 90 days)
- `CLOCK-TEST-2025` - Test Member (10 uses, 30 days)
- `CLOCK-VIP1-2025` - Marcus Rivera (1 use, 60 days)

### **Admin Management:**
- **Panel:** `/admin/access-codes` (requires authentication)
- **Database:** Direct SQL queries via Supabase dashboard
- **Monitoring:** Real-time usage tracking and analytics

---

## 🚀 **Deployment**

**Production:** Automatic deployment to Netlify on `main` branch push

**Quick Deploy Checklist:**
1. ✅ Run SQL setup scripts in Supabase  
2. ✅ Configure environment variables in Netlify
3. ✅ Push to `main` branch
4. ✅ Test access codes and user registration

📋 **Detailed Guide:** See [`DEPLOYMENT_QUICK_GUIDE.md`](./DEPLOYMENT_QUICK_GUIDE.md)

---

## 📚 **Documentation**

- [`ACCESS_METHODS_GUIDE.md`](./ACCESS_METHODS_GUIDE.md) - Complete access methods documentation
- [`DEPLOYMENT_QUICK_GUIDE.md`](./DEPLOYMENT_QUICK_GUIDE.md) - Production deployment guide  
- [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) - Database configuration
- `/docs/stories/` - Technical implementation stories with QA results

---

## 🧪 **Testing**

### **Critical User Flows:**
1. **Access Code Flow:** Landing → Code Entry → AI Questionnaire → Report
2. **Registration Flow:** Dashboard → Registration → Email Confirm → Dashboard Access  
3. **AI Conversation:** Intelligent question generation and response handling
4. **Report Generation:** Dynamic personalized business analysis

### **⚠️ Production Readiness:**
- **✅ FULLY FUNCTIONAL:** Access codes, AI questionnaire, report generation, user auth
- **🎪 MOCK DATA:** Dashboard content, analytics charts, automation suggestions
- **📋 Details:** See [`ACCESS_METHODS_GUIDE.md`](./ACCESS_METHODS_GUIDE.md) for mock vs real breakdown

### **QA Status:** ✅ All core flows validated and production-ready

---

## 🤝 **Contributing**

This is a private MVP for ClockworkCoaching business automation consultation.

**Development Team:**
- Kevin VanDever - Product Owner & Developer
- Quinn (Claude) - QA & Architecture Review

---

## 📞 **Support**

### **For Technical Issues:**
- Check browser console for errors
- Verify environment variables configuration
- Review Netlify deployment logs
- Check Supabase database connectivity

### **For Access Code Issues:**
- Verify code exists: `SELECT * FROM access_codes WHERE code = 'CLOCK-DEMO-2025'`
- Reset usage: `UPDATE access_codes SET current_uses = 0`
- Check expiration dates and status

---

## 📊 **Current Status**

**✅ PRODUCTION READY**

- Premium access code system fully functional
- AI-powered questionnaire operational with GPT-4
- User registration and dashboard active
- Dynamic report generation working
- All deployment automation configured

**Last Updated:** 2025-08-21  
**Version:** Production MVP v1.0