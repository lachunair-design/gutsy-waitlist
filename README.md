# GUTSY Waitlist

**The Lightest Protein in the World** — Born in Dubai. Launching 2026.

GUTSY is a gut-health focused performance brand. Plant-based peptides, enzymatically pre-broken for zero bloating and instant absorption.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter
- **State**: TanStack Query
- **Validation**: Zod + React Hook Form

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push database schema
npm run db:push

# Run development server
npm run dev
```

## Project Structure

```
├── client/src/
│   ├── components/     # Brutalist UI components
│   ├── hooks/          # useWaitlist, useCountdown
│   ├── lib/            # Utils & query client
│   └── App.tsx         # Main app
├── server/
│   ├── routes.ts       # API endpoints
│   ├── storage.ts      # Database operations
│   └── index.ts        # Server entry
├── shared/
│   └── schema.ts       # Drizzle schema
└── public/             # Static assets
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/waitlist` | Join waitlist |
| GET | `/api/waitlist/:id` | Get user by ID |
| PATCH | `/api/waitlist/:id/priority` | Update priority quiz |
| GET | `/api/count` | Get waitlist count |
| GET | `/api/referral/:code` | Validate referral code |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `GMAIL_USER` | SMTP email address |
| `GMAIL_PASSWORD` | SMTP app password |
| `VITE_APP_URL` | Base URL for referral links |

## Brand Colors

- **Cream**: `#F3EEE4` (background)
- **Red**: `#F20028` (primary CTA)
- **Yellow**: `#FFB300` (accent)
- **Black**: `#000000` (text/borders)

## Deployment

Optimized for Vercel with PostgreSQL (Neon/Vercel Postgres).
