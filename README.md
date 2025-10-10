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
