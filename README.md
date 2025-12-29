# Saranya Education Management System (Monorepo)

## Requirements (local)
- Node.js **20+** recommended (NestJS + Prisma + Next.js modern stack)
- MySQL running locally

This repo is scaffolded per the required structure:
- `apps/api` → NestJS backend (REST, Prisma + MySQL)
- `apps/web` → Next.js frontend (placeholder for now)
- `packages/shared` → shared types/schemas
- `packages/ui` → shared UI components (placeholder)

## Quick start (API)
1. Create MySQL database: `saranya_db`
2. Copy env template:
   - `apps/api/.env.example` → `apps/api/.env`
3. Install deps (requires modern npm/workspaces):
   - `npm install`
4. Generate Prisma client:
   - `npm --workspace @saranya/api run prisma:generate`
5. Run migrations:
   - `npm --workspace @saranya/api run prisma:migrate`
6. Start API:
   - `npm run dev:api`

API will run on `http://localhost:3001`.
