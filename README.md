# Reservoir MVP

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/reservoir-mvp/deploys)
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/reservoir-mvp/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/reservoir-mvp/actions)

A Next.js 14 application for business automation discovery and implementation guidance platform.

## Tech Stack

- **Frontend Framework**: Next.js 14.x with App Router
- **Language**: TypeScript 5.x (Strict mode enabled)
- **Styling**: Tailwind CSS 3.x
- **UI Components**: shadcn/ui (to be added in Story 1.4)
- **State Management**: React Context + Zustand (to be added when needed)
- **Backend**: Supabase (to be configured in Story 1.2)

## Project Structure

```
reservoir-mvp/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── api/              # API routes
├── components/            # React components
├── lib/                  # Utility functions and shared code
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript type definitions
├── docs/                 # Project documentation
├── .env.local            # Local environment variables
├── .env.example          # Example environment variables
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reservoir-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# OpenAI API (for future use)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (for future use)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development Workflow

1. All code should pass TypeScript compilation (`npm run type-check`)
2. ESLint rules should be followed (`npm run lint`)
3. Code should be formatted with Prettier (`npm run format`)
4. Create feature branches for new functionality
5. Follow conventional commit messages

## Deployment

### Production Deployment
This project is deployed on Netlify with continuous deployment from the `main` branch.

- **Production URL**: `https://reservoir-mvp.netlify.app` (update with actual domain)
- **Staging URL**: `https://develop--reservoir-mvp.netlify.app`
- **Preview Deployments**: Created automatically for pull requests

### Deployment Configuration
- **Platform**: Netlify
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18.x
- **Environment Variables**: Configured in Netlify dashboard

### Manual Deployment
For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick setup:
1. Connect repository to Netlify
2. Configure environment variables
3. Deploy from `main` branch

## Documentation

- `/docs/architecture/` - Technical architecture specifications
- `/docs/frontend/` - Frontend design and UX specifications  
- `/docs/stories/` - User stories and development tasks
- `/future-phases/` - Future development phases
- `DEPLOYMENT.md` - Production deployment guide

## Project Status

✅ **Epic 1: Foundation** - In Progress
- ✅ Story 1.1: Initialize Next.js Project (Complete)
- 🔄 Story 1.2: Configure Supabase Integration (Next)
- ⏳ Story 1.3: Implement Basic Auth Flow
- ⏳ Story 1.4: Set up UI Component Library  
- ⏳ Story 1.5: Create Landing Page

⏳ **Epic 2: Frontend/UX Implementation** - Planned
