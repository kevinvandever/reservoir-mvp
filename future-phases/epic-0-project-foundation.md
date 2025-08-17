# Epic 0: Project Foundation & Setup

**Epic Goal:** Establish the complete development foundation for AI Automation Reservoir, enabling developers to begin building immediately with all necessary tools, configurations, and processes in place.

**Priority:** CRITICAL - Must be completed before any development work begins

---

## User Stories

### US0.1: Repository & Monorepo Setup
**As a Developer, I want a properly configured monorepo with clear package structure, so I can work efficiently across frontend, backend, and shared code.**

**Acceptance Criteria:**
- [ ] Git repository initialized with appropriate .gitignore for Python/Node.js
- [ ] Monorepo structure created with npm workspaces
- [ ] Package structure established: `packages/frontend`, `packages/backend`, `packages/shared`
- [ ] Root-level package.json configured with workspace definitions
- [ ] Shared TypeScript configuration for type consistency
- [ ] Initial commit completed with proper commit message structure

**Implementation Steps:**
```bash
# 1. Initialize repository
git init
git remote add origin [repository-url]

# 2. Create monorepo structure
mkdir -p packages/{frontend,backend,shared}

# 3. Setup npm workspaces (see package.json below)
npm init -y
# Configure workspaces in package.json

# 4. Initial commit
git add .
git commit -m "feat: initialize monorepo structure for AI Automation Reservoir

- Add npm workspaces configuration
- Create packages structure (frontend, backend, shared)
- Setup TypeScript configuration base
- Add development tooling configuration

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### US0.2: Development Environment Configuration
**As a Developer, I want a complete local development environment setup guide, so I can start contributing immediately without configuration delays.**

**Acceptance Criteria:**
- [ ] Local development environment documentation created
- [ ] Required tool versions specified and installation instructions provided
- [ ] Environment variables template created (.env.example)
- [ ] Database setup instructions for PostgreSQL
- [ ] Redis setup for development caching
- [ ] Development server startup instructions
- [ ] Common troubleshooting guide included

### US0.3: Frontend Package Initialization
**As a Frontend Developer, I want a properly configured React application with all necessary dependencies and tooling, so I can build the PWA efficiently.**

**Acceptance Criteria:**
- [ ] React 18+ application initialized with Vite
- [ ] TypeScript 5+ configuration optimized for React
- [ ] Tailwind CSS configured with design system tokens
- [ ] Essential dependencies installed (Zustand, TanStack Query, Radix UI)
- [ ] ESLint and Prettier configured for code quality
- [ ] Vitest configured for testing
- [ ] Build and development scripts working
- [ ] Initial component structure created

### US0.4: Backend Package Initialization  
**As a Backend Developer, I want a properly configured FastAPI application with all necessary dependencies and tooling, so I can build the microservices efficiently.**

**Acceptance Criteria:**
- [ ] Python 3.11+ virtual environment created
- [ ] FastAPI application initialized with project structure
- [ ] Core dependencies installed (FastAPI, Pydantic, SQLAlchemy, asyncpg)
- [ ] Database connection configuration established
- [ ] Alembic migrations setup for database versioning
- [ ] pytest configuration for testing
- [ ] Development and production requirements.txt files
- [ ] API development server startup working

### US0.5: Shared Package Setup
**As a Developer, I want shared TypeScript types and utilities available across packages, so I maintain consistency and avoid duplication.**

**Acceptance Criteria:**
- [ ] Shared TypeScript package created with build configuration
- [ ] Common type definitions for API models
- [ ] Shared utility functions package
- [ ] Build system for shared package updates
- [ ] Import/export configuration for seamless package consumption

### US0.6: Development Tooling & CI/CD
**As a Developer, I want automated code quality and deployment processes, so I can focus on feature development with confidence.**

**Acceptance Criteria:**
- [ ] GitHub Actions workflow configured for CI/CD with complete workflow files
- [ ] Automated testing on pull requests (frontend + backend)
- [ ] Code quality checks (ESLint, Black, mypy, Prettier)
- [ ] Automated build verification for all packages
- [ ] Railway deployment configuration for staging with IaC approach
- [ ] Environment-specific deployment scripts and configurations
- [ ] Vector database setup sequencing clearly defined
- [ ] Staging environment configuration documented

**Implementation Steps:**
```bash
# 1. Create GitHub Actions workflows
mkdir -p .github/workflows
# Create CI/CD workflow files (see configuration section below)

# 2. Setup Railway infrastructure as code
mkdir -p infrastructure/railway
# Create railway.json and deployment scripts

# 3. Configure environment-specific settings
mkdir -p config/environments
# Create staging.env and production.env templates

# 4. Setup vector database configuration
# Add Pinecone/Chroma setup scripts with proper sequencing
```

---

## Configuration Files

### Root package.json
```json
{
  "name": "ai-automation-reservoir",
  "version": "1.0.0",
  "description": "AI-powered automation intelligence platform for service industry professionals",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "npm run dev --workspace=packages/frontend",
    "dev:backend": "npm run dev --workspace=packages/backend", 
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces",
    "clean": "rm -rf packages/*/dist packages/*/node_modules node_modules"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.0.0"
  }
}
```

### Environment Variables Template (.env.example)
```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/automation_reservoir_dev
POSTGRES_USER=automation_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=automation_reservoir_dev

# Redis Configuration  
REDIS_URL=redis://localhost:6379

# External API Keys
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-west1-gcp-free

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Development Settings
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=debug

# Railway/Production Settings (for later phases)
RAILWAY_ENVIRONMENT=staging
```

### Development Setup Documentation
```markdown
# Development Environment Setup

## Prerequisites

### Required Tools
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.11+** - [Download](https://python.org/)
- **PostgreSQL 15+** - [Download](https://postgresql.org/)
- **Redis 7+** - [Download](https://redis.io/)
- **Git** - [Download](https://git-scm.com/)

### Optional Tools
- **Docker** - For containerized development
- **TablePlus/pgAdmin** - Database management
- **Postman/Insomnia** - API testing

## Setup Instructions

### 1. Repository Setup
```bash
git clone [repository-url]
cd ai-automation-reservoir
npm install
```

### 2. Database Setup
```bash
# Create development database
createdb automation_reservoir_dev

# Setup environment variables
cp .env.example .env
# Edit .env with your local database credentials
```

### 3. Backend Setup
```bash
cd packages/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements/development.txt

# Run database migrations
alembic upgrade head
```

### 4. Frontend Setup
```bash
cd packages/frontend
npm install
```

### 5. Start Development Servers
```bash
# From project root
npm run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:8000)

## Troubleshooting

### Common Issues
1. **Database connection fails**: Verify PostgreSQL is running and credentials in .env
2. **Redis connection fails**: Ensure Redis server is running locally
3. **Import errors**: Verify virtual environment is activated for Python
4. **Build failures**: Clear node_modules and reinstall dependencies
```

### CI/CD Workflow Configuration (.github/workflows/ci.yml)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18'
  PYTHON_VERSION: '3.11'

jobs:
  frontend-tests:
    name: Frontend Tests & Build
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: packages/frontend
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript check
        run: npx tsc --noEmit
      
      - name: Run unit tests
        run: npm run test
      
      - name: Build application
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: frontend-build
          path: packages/frontend/dist

  backend-tests:
    name: Backend Tests & Validation
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: packages/backend
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_USER: test_user
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        run: |
          python -m venv venv
          source venv/bin/activate
          pip install -r requirements/development.txt
      
      - name: Run code formatting check
        run: |
          source venv/bin/activate
          black --check .
      
      - name: Run type checking
        run: |
          source venv/bin/activate
          mypy .
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
          ENVIRONMENT: testing
        run: |
          source venv/bin/activate
          pytest --cov=. --cov-report=xml
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: packages/backend/coverage.xml

  deploy-staging:
    name: Deploy to Staging
    needs: [frontend-tests, backend-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway Staging
        run: |
          npx @railway/cli deploy --environment staging
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-production:
    name: Deploy to Production
    needs: [frontend-tests, backend-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway Production
        run: |
          npx @railway/cli deploy --environment production
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Infrastructure as Code Configuration

#### Railway Infrastructure (infrastructure/railway/railway.json)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "sleepApplication": false,
    "restartPolicyType": "ON_FAILURE"
  },
  "environments": {
    "staging": {
      "variables": {
        "ENVIRONMENT": "staging",
        "DEBUG": "false",
        "LOG_LEVEL": "info"
      },
      "plugins": [
        {
          "name": "postgresql",
          "config": {
            "version": "15"
          }
        },
        {
          "name": "redis",
          "config": {
            "version": "7"
          }
        }
      ]
    },
    "production": {
      "variables": {
        "ENVIRONMENT": "production",
        "DEBUG": "false",
        "LOG_LEVEL": "warning"
      },
      "plugins": [
        {
          "name": "postgresql",
          "config": {
            "version": "15",
            "plan": "pro"
          }
        },
        {
          "name": "redis",
          "config": {
            "version": "7",
            "plan": "pro"
          }
        }
      ]
    }
  }
}
```

#### Environment-Specific Configurations

**Staging Environment (config/environments/staging.env)**
```bash
# Staging Environment Configuration
ENVIRONMENT=staging
DEBUG=false
LOG_LEVEL=info

# Database Configuration (Railway managed)
DATABASE_URL=${RAILWAY_POSTGRES_URL}
REDIS_URL=${RAILWAY_REDIS_URL}

# External API Keys (from Railway secrets)
OPENAI_API_KEY=${OPENAI_API_KEY_STAGING}
PINECONE_API_KEY=${PINECONE_API_KEY_STAGING}
PINECONE_ENVIRONMENT=us-west1-gcp-free

# Authentication
JWT_SECRET_KEY=${JWT_SECRET_KEY_STAGING}
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Vector Database Configuration
VECTOR_DB_TYPE=pinecone
VECTOR_DB_INDEX_NAME=automation-staging
```

**Production Environment (config/environments/production.env)**
```bash
# Production Environment Configuration
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=warning

# Database Configuration (Railway Pro)
DATABASE_URL=${RAILWAY_POSTGRES_URL}
REDIS_URL=${RAILWAY_REDIS_URL}

# External API Keys (from Railway secrets)
OPENAI_API_KEY=${OPENAI_API_KEY_PROD}
PINECONE_API_KEY=${PINECONE_API_KEY_PROD}
PINECONE_ENVIRONMENT=us-west1-gcp

# Authentication
JWT_SECRET_KEY=${JWT_SECRET_KEY_PROD}
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15

# Vector Database Configuration
VECTOR_DB_TYPE=pinecone
VECTOR_DB_INDEX_NAME=automation-production

# Performance Settings
DATABASE_POOL_SIZE=20
REDIS_CONNECTION_POOL_SIZE=10
```

### Vector Database Setup Sequencing (scripts/setup_vector_db.py)
```python
#!/usr/bin/env python3
"""
Vector Database Setup Script
Ensures proper sequencing of vector database initialization
"""

import os
import asyncio
import pinecone
from chroma_db import ChromaDB
from database.connection import get_database_connection

async def setup_vector_database():
    """Setup vector database with proper sequencing"""
    
    # Step 1: Verify PostgreSQL is ready
    print("🔍 Checking PostgreSQL connection...")
    db_conn = await get_database_connection()
    await db_conn.execute("SELECT 1")
    print("✅ PostgreSQL connection verified")
    
    # Step 2: Setup vector database based on environment
    vector_db_type = os.getenv("VECTOR_DB_TYPE", "chroma")
    
    if vector_db_type == "pinecone":
        await setup_pinecone()
    else:
        await setup_chroma()
    
    print("✅ Vector database setup complete")

async def setup_pinecone():
    """Initialize Pinecone vector database"""
    print("🔧 Setting up Pinecone...")
    
    pinecone.init(
        api_key=os.getenv("PINECONE_API_KEY"),
        environment=os.getenv("PINECONE_ENVIRONMENT")
    )
    
    index_name = os.getenv("VECTOR_DB_INDEX_NAME")
    
    # Create index if it doesn't exist
    if index_name not in pinecone.list_indexes():
        pinecone.create_index(
            name=index_name,
            dimension=1536,  # OpenAI embedding dimension
            metric="cosine"
        )
        print(f"✅ Created Pinecone index: {index_name}")
    else:
        print(f"✅ Pinecone index exists: {index_name}")

async def setup_chroma():
    """Initialize ChromaDB for development"""
    print("🔧 Setting up ChromaDB...")
    
    chroma_client = ChromaDB()
    collection_name = "automation_patterns"
    
    # Create collection if it doesn't exist
    try:
        chroma_client.get_collection(collection_name)
        print(f"✅ ChromaDB collection exists: {collection_name}")
    except:
        chroma_client.create_collection(collection_name)
        print(f"✅ Created ChromaDB collection: {collection_name}")

if __name__ == "__main__":
    asyncio.run(setup_vector_database())
```

### Deployment Scripts

#### Staging Deployment (scripts/deploy_staging.sh)
```bash
#!/bin/bash
set -e

echo "🚀 Deploying to Staging Environment"

# Step 1: Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run lint
npm run test
npm run build

# Step 2: Setup vector database
echo "🔧 Setting up vector database..."
cd packages/backend
source venv/bin/activate
python scripts/setup_vector_db.py

# Step 3: Run database migrations
echo "📊 Running database migrations..."
alembic upgrade head

# Step 4: Deploy to Railway
echo "🚢 Deploying to Railway staging..."
npx @railway/cli deploy --environment staging

echo "✅ Staging deployment complete!"
echo "🌐 Staging URL: https://automation-reservoir-staging.railway.app"
```

---

## Definition of Done

### Epic Completion Criteria:
- [ ] All user stories completed with acceptance criteria met
- [ ] Development environment verified working on clean machine
- [ ] Documentation complete and tested by team member
- [ ] CI/CD pipeline successfully building and testing with full workflow configuration
- [ ] Infrastructure as Code setup completed for Railway deployment
- [ ] Vector database setup sequencing script created and tested
- [ ] Environment-specific configurations documented for staging/production
- [ ] All configuration files committed to repository
- [ ] Team can start development work immediately with zero infrastructure blockers

### Success Metrics:
- **Setup Time**: New developer can go from git clone to running application in <30 minutes
- **Documentation Quality**: Setup guide tested and verified by independent developer
- **Build Success**: CI/CD pipeline has 100% success rate
- **Team Velocity**: No development blocked by setup issues

---

## Dependencies & Blockers

### Prerequisites:
- Repository created and access configured
- Development tool licenses acquired if needed
- External service accounts created (OpenAI, Pinecone)

### Potential Blockers:
- Network/firewall restrictions for external APIs
- Tool version compatibility issues
- Database setup permissions

---

## Estimated Effort: 2-3 days

**Note:** This epic should be completed entirely before beginning any feature development to ensure smooth team velocity.