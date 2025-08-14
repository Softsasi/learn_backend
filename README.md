# Learn MongoDB - Full Stack Application

A full-stack application with MongoDB backend and Next.js frontend, managed as a pnpm workspace.

## Project Structure

```
├── backend/          # Node.js/Express backend with MongoDB
├── frontend/         # Next.js frontend
├── package.json      # Root workspace configuration
└── pnpm-workspace.yaml # pnpm workspace definition
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- MongoDB (local or cloud)

## Getting Started

### 1. Install Dependencies

Install all workspace dependencies:

```bash
pnpm install
```

### 2. Environment Setup

Create environment files for each package:

**Backend** (`backend/.env`):

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/your-db-name
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Development

Start both backend and frontend in development mode:

```bash
pnpm dev
```

Or start them individually:

```bash
# Backend only
pnpm dev:backend

# Frontend only
pnpm dev:frontend
```

## Available Scripts

### Root Level Scripts

- `pnpm dev` - Start both backend and frontend in development mode
- `pnpm build` - Build both backend and frontend
- `pnpm dev:backend` - Start only backend in development mode
- `pnpm dev:frontend` - Start only frontend in development mode
- `pnpm build:backend` - Build only backend
- `pnpm build:frontend` - Build only frontend
- `pnpm clean` - Clean build artifacts from all packages
- `pnpm type-check` - Run TypeScript type checking on all packages

### Package-Specific Scripts

Run scripts in specific packages using the `--filter` flag:

```bash
# Backend specific
pnpm --filter backend <script-name>

# Frontend specific
pnpm --filter frontend <script-name>
```

## Workspace Benefits

- **Unified dependency management**: All packages share the same `node_modules`
- **Cross-package development**: Easy to develop features that span both backend and frontend
- **Consistent tooling**: Shared TypeScript, linting, and build configurations
- **Efficient CI/CD**: Build and test multiple packages together

## Package Management

Add dependencies to specific packages:

```bash
# Add to backend
pnpm add express --filter backend

# Add to frontend
pnpm add react-query --filter frontend

# Add dev dependency to specific package
pnpm add -D @types/node --filter backend
```

Add dependencies to workspace root:

```bash
pnpm add -w typescript
```

## Production Deployment

Build all packages for production:

```bash
pnpm build
```

The backend will be built to `backend/dist/` and the frontend to `frontend/.next/`.

## MongoDB Integration

This project uses MongoDB with Mongoose for the backend. Make sure to:

1. Install and run MongoDB locally, or use a cloud service like MongoDB Atlas
2. Update the `MONGODB_URI` in your backend `.env` file
3. Run any necessary database migrations or seeding scripts

## Contributing

1. Make sure to run `pnpm install` after pulling changes
2. Use `pnpm type-check` to verify TypeScript compilation
3. Test both backend and frontend before submitting PRs
