# Loka Tech — Next.js Starter

**Stack:** Next.js (App Router) + TypeScript + Tailwind + Stripe Checkout + Supabase (optional).

## Quick Start
```bash
npm install
cp .env.example .env.local
npm run dev
```
Set Stripe Price IDs and secrets in `.env.local`, then run `npm run dev`.

## Booking Flow
- `/book` → POST `/api/checkout` (creates Stripe session)
- Webhook `/api/webhook` handles `checkout.session.completed` (persist to Supabase)

## Deploy
Use Vercel. Set env vars there. Add Stripe webhook: `https://YOUR_DOMAIN/api/webhook`.

## MySQL Integration

This project uses MySQL as the primary relational database and Prisma as the ORM. The flow is:

- Configure your MySQL connection in `\.env.local`.
- Define models in `schema.prisma`.
- Run Prisma migrations and generate the client.
- Import the Prisma client from `lib/prisma.ts` and use it in API routes (for example, user registration).

### Environment

Add your connection string to `\.env.local`:

`DATABASE_URL="mysql://DB_USER:DB_PASS@DB_HOST:3306/DB_NAME"`

Escape special characters in the password or use URL encoding if necessary.

### Prisma schema (core excerpt)

Update `prisma/schema.prisma` to use the MySQL provider:

    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL")
    }

    model User {
      id               Int      @id @default(autoincrement())
      name             String?
      email            String   @unique
      passwordHash     String
      stripeCustomerId String?
      createdAt        DateTime @default(now())
    }

Adjust fields and indexes as needed for your domain.

### Setup & Migrations

Run local migrations and generate the client:

- Install Prisma and initialize (if not done):

  npm install prisma @prisma/client
  npx prisma init

- Create and apply migrations:

  npx prisma migrate dev --name init

- Generate the client (usually run automatically):

  npx prisma generate

Migrations are stored in `prisma/migrations`.

### `lib/prisma.ts` (recommended singleton for Next.js)

Use a singleton Prisma client to avoid exhausting connections during hot reloads in development. Put this file at `lib/prisma.ts`:

    import { PrismaClient } from '@prisma/client';

    declare global {
      var prisma: PrismaClient | undefined;
    }

    const prisma = global.prisma || new PrismaClient();

    if (process.env.NODE_ENV === 'development') global.prisma = prisma;

    export { prisma };

Import with:

`import { prisma } from "@/lib/prisma";`

### Production notes

- Use connection pooling or Prisma Data Proxy for serverless environments.
- On platforms like PlanetScale, follow their recommended workflow (avoid direct migrations against production when using non-blocking schemas; use a separate shadow DB or deploy with their tooling).
- Set appropriate connection limits and monitor connections.

### Troubleshooting

- If you see connection errors, verify `DATABASE_URL` and network access.
- For schema drift, run `npx prisma migrate dev --name fix` after updating `schema.prisma`.
- If Prisma client types seem stale, run `npx prisma generate`.

This section can be expanded with deployment-specific steps (Vercel, Railway, PlanetScale) as needed.
