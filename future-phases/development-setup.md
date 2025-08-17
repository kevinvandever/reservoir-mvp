# AI Automation Reservoir - Development Environment Setup

**Version:** 1.0  
**Date:** 2025-01-14  
**Target:** Developers joining the AI Automation Reservoir project

---

## Quick Start (TL;DR)

```bash
# 1. Clone and setup
git clone [repository-url]
cd ai-automation-reservoir
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your local settings

# 3. Setup backend
cd packages/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements/development.txt
alembic upgrade head

# 4. Start development
cd ../../
npm run dev
```

**Access URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Prerequisites & System Requirements

### Required Software

| Tool | Version | Purpose | Installation |
|------|---------|---------|--------------|
| **Node.js** | 18.0+ | Frontend build and package management | [nodejs.org](https://nodejs.org/) |
| **Python** | 3.11+ | Backend development | [python.org](https://python.org/) |
| **PostgreSQL** | 15+ | Primary database | [postgresql.org](https://postgresql.org/) |
| **Redis** | 7.0+ | Caching and task queues | [redis.io](https://redis.io/) |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com/) |

### Recommended Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **Docker** | Containerized development | [docker.com](https://docker.com/) |
| **TablePlus/pgAdmin** | Database management | [tableplus.com](https://tableplus.com/) |
| **Postman/Insomnia** | API testing | [postman.com](https://postman.com/) |
| **VS Code** | Code editor with excellent TypeScript/Python support | [code.visualstudio.com](https://code.visualstudio.com/) |

### VS Code Extensions (Recommended)

```bash
# Install recommended extensions
code --install-extension ms-python.python
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ms-vscode.vscode-eslint
```

---

## Initial Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone [repository-url]
cd ai-automation-reservoir

# Install root dependencies and setup workspaces
npm install

# Verify workspace structure
npm run workspaces list
```

**Expected structure:**
```
ai-automation-reservoir/
├── packages/
│   ├── frontend/          # React + TypeScript PWA
│   ├── backend/           # FastAPI + Python services
│   └── shared/            # Shared TypeScript types
├── docs/                  # Project documentation
├── .github/               # CI/CD workflows
└── package.json           # Workspace configuration
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env  # or your preferred editor
```

**Required environment variables:**
```bash
# Database Configuration
DATABASE_URL=postgresql://automation_user:dev_password@localhost:5432/automation_reservoir_dev
POSTGRES_USER=automation_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=automation_reservoir_dev

# Redis Configuration
REDIS_URL=redis://localhost:6379

# External API Keys (get from respective services)
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-west1-gcp-free

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key_here_min_32_chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Development Settings
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=debug
```

### 3. Database Setup

#### Option A: Local PostgreSQL Installation

```bash
# macOS (using Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-15 postgresql-contrib

# Windows
# Download installer from postgresql.org
```

#### Option B: Docker PostgreSQL

```bash
# Start PostgreSQL in Docker
docker run --name automation-postgres \
  -e POSTGRES_USER=automation_user \
  -e POSTGRES_PASSWORD=dev_password \
  -e POSTGRES_DB=automation_reservoir_dev \
  -p 5432:5432 \
  -d postgres:15
```

#### Create Development Database

```bash
# Create database (if not using Docker)
createdb automation_reservoir_dev

# Verify connection
psql -d automation_reservoir_dev -c "SELECT version();"
```

### 4. Redis Setup

#### Option A: Local Redis Installation

```bash
# macOS (using Homebrew)
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server

# Windows
# Download from redis.io or use WSL
```

#### Option B: Docker Redis

```bash
# Start Redis in Docker
docker run --name automation-redis \
  -p 6379:6379 \
  -d redis:7-alpine
```

#### Verify Redis

```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

---

## Package Setup

### Backend Package Setup

```bash
cd packages/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Verify Python version
python --version  # Should be 3.11+

# Install dependencies
pip install -r requirements/development.txt

# Setup database migrations
alembic upgrade head

# Verify backend setup
python -m uvicorn main:app --reload --port 8000
# Should start server at http://localhost:8000
```

### Frontend Package Setup

```bash
cd packages/frontend

# Install dependencies
npm install

# Verify TypeScript configuration
npx tsc --noEmit

# Start development server
npm run dev
# Should start at http://localhost:5173
```

### Shared Package Setup

```bash
cd packages/shared

# Install and build shared types
npm install
npm run build

# Verify shared package is working
npm run test
```

---

## Development Commands

### Global Commands (from project root)

```bash
# Start all development servers
npm run dev

# Build all packages
npm run build

# Run all tests
npm run test

# Lint all packages
npm run lint

# Clean all build artifacts
npm run clean
```

### Frontend-Specific Commands

```bash
cd packages/frontend

# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Lint TypeScript and React
npm run lint

# Format code with Prettier
npm run format
```

### Backend-Specific Commands

```bash
cd packages/backend
source venv/bin/activate

# Start development server with auto-reload
python -m uvicorn main:app --reload --port 8000

# Run tests
pytest

# Run tests with coverage
pytest --cov=.

# Create new database migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Lint Python code
flake8 .

# Format code with black
black .

# Type checking with mypy
mypy .
```

---

## External Services Setup

### OpenAI API

1. Sign up at [platform.openai.com](https://platform.openai.com/)
2. Create API key in API Keys section
3. Add to `.env` as `OPENAI_API_KEY`
4. Set usage limits to control costs

### Pinecone Vector Database

1. Sign up at [pinecone.io](https://pinecone.io/)
2. Create new index with dimensions: 1536 (OpenAI embedding size)
3. Get API key and environment from dashboard
4. Add to `.env` as `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT`

### Railway (for deployment)

1. Sign up at [railway.app](https://railway.app/)
2. Connect GitHub repository
3. Configure environment variables in Railway dashboard
4. Deploy staging environment

---

## Verification & Testing

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

echo "🔍 AI Automation Reservoir - Health Check"
echo "========================================="

# Check Node.js
echo "📦 Node.js version:"
node --version

# Check Python
echo "🐍 Python version:"
python --version

# Check PostgreSQL
echo "🗄️  PostgreSQL connection:"
psql $DATABASE_URL -c "SELECT 'Database Connected' as status;"

# Check Redis
echo "📊 Redis connection:"
redis-cli ping

# Check frontend build
echo "⚛️  Frontend build test:"
cd packages/frontend && npm run build

# Check backend startup
echo "🚀 Backend startup test:"
cd ../backend && python -c "from main import app; print('Backend imports successful')"

echo "✅ Health check complete!"
```

### Running Full Test Suite

```bash
# Run complete verification
npm run test
npm run lint
npm run build

# Expected results:
# ✅ All tests passing
# ✅ No linting errors
# ✅ Clean builds for all packages
```

---

## Common Issues & Troubleshooting

### Database Issues

**Issue**: `psql: FATAL: database "automation_reservoir_dev" does not exist`
```bash
# Solution: Create the database
createdb automation_reservoir_dev
```

**Issue**: `psql: FATAL: role "automation_user" does not exist`
```bash
# Solution: Create the user
createuser automation_user
```

**Issue**: Permission denied for database
```bash
# Solution: Grant permissions
psql -c "ALTER USER automation_user CREATEDB;"
```

### Python Issues

**Issue**: `ModuleNotFoundError` even after pip install
```bash
# Solution: Ensure virtual environment is activated
source venv/bin/activate
pip list  # Verify packages are installed
```

**Issue**: `uvicorn: command not found`
```bash
# Solution: Install uvicorn in virtual environment
pip install uvicorn[standard]
```

### Node.js Issues

**Issue**: `Cannot find module` errors
```bash
# Solution: Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: `EADDRINUSE: address already in use`
```bash
# Solution: Kill process using port or use different port
lsof -ti:5173 | xargs kill -9
```

### Network Issues

**Issue**: Cannot connect to external APIs
```bash
# Check firewall/proxy settings
curl -I https://api.openai.com/v1/models
```

**Issue**: Local services not accessible
```bash
# Verify services are running
ps aux | grep postgres
ps aux | grep redis
```

---

## Performance Optimization

### Development Performance Tips

1. **Use SSD storage** for faster file operations
2. **Increase Node.js memory** for large builds:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```
3. **Enable TypeScript incremental compilation** in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "incremental": true,
       "tsBuildInfoFile": ".tsbuildinfo"
     }
   }
   ```
4. **Use development database** with smaller dataset
5. **Enable Redis for development caching**

### IDE Configuration

**VS Code settings.json:**
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "python.defaultInterpreterPath": "./packages/backend/venv/bin/python",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Next Steps

Once your development environment is running:

1. **Review Architecture**: Read `/docs/architecture.md`
2. **Understand User Stories**: Review `/docs/prd.md` 
3. **Start with Epic 0**: Begin with project foundation tasks
4. **Join Team Communication**: Get access to project Slack/Discord
5. **Review Git Workflow**: Understand branching and PR process

---

## Support & Resources

### Getting Help

1. **Documentation**: Check `/docs` folder first
2. **Team Chat**: Project Slack/Discord channel
3. **GitHub Issues**: Report bugs or ask questions
4. **Code Reviews**: Learn from existing PR discussions

### Useful Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Happy coding! 🚀**