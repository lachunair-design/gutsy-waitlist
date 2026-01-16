# CLAUDE.md - AI Assistant Guide for GUTSY Waitlist

This document provides comprehensive guidance for AI assistants (like Claude) working on the GUTSY Waitlist codebase. It covers architecture, conventions, patterns, and best practices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Architecture & Patterns](#architecture--patterns)
5. [Database Schema](#database-schema)
6. [Naming Conventions](#naming-conventions)
7. [Code Style & Patterns](#code-style--patterns)
8. [Development Workflows](#development-workflows)
9. [Key Files Reference](#key-files-reference)
10. [Common Tasks](#common-tasks)

---

## Project Overview

**GUTSY** is a gut-health focused performance brand launching in 2026. This codebase powers the waitlist landing page with a viral referral system.

**Core Features**:
- Email waitlist signup with referral tracking
- Position-based priority (more referrals = better position)
- Priority access quiz for engagement
- Countdown timer to product launch
- Social sharing functionality

**Brand Identity**:
- **Colors**: Cream (#F3EEE4), Red (#F20028), Yellow (#FFB300), Black (#000000)
- **Font**: Uto (custom brand font)
- **Style**: Brutalist design with bold typography

---

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Backend
- **Express.js** - API server
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Neon Database** - Serverless PostgreSQL
- **Nodemailer** - Email notifications

### Development Tools
- **tsx** - TypeScript execution
- **Drizzle Kit** - Database migrations
- **Concurrently** - Run dev servers in parallel

---

## Directory Structure

```
gutsy-waitlist/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Button.tsx     # CVA-based button with variants
│   │   │   ├── EmailForm.tsx  # Main signup form
│   │   │   ├── WaitlistForm.tsx
│   │   │   ├── WaitlistPopup.tsx
│   │   │   ├── WelcomePopup.tsx
│   │   │   ├── Countdown.tsx
│   │   │   └── Accordion.tsx  # Radix UI wrapper
│   │   ├── pages/             # Route components
│   │   │   ├── home.tsx       # Landing page
│   │   │   └── success.tsx    # Post-signup page
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useWaitlist.ts # API data fetching hooks
│   │   │   └── useCountdown.ts
│   │   ├── lib/               # Utilities
│   │   │   ├── queryClient.ts # React Query config
│   │   │   └── utils.ts       # Helper functions
│   │   ├── assets/            # Images and fonts
│   │   ├── App.tsx            # Router & providers
│   │   ├── main.tsx           # React entry point
│   │   └── index.css          # Global styles + Tailwind
│   └── index.html             # HTML template
│
├── server/                    # Express backend
│   ├── index.ts               # Server entry & middleware
│   ├── routes.ts              # API route definitions
│   ├── storage.ts             # Database operations (DBStorage class)
│   └── db.ts                  # Drizzle ORM initialization
│
├── api/                       # Vercel serverless functions (alternative)
│   ├── waitlist.ts            # POST /api/waitlist
│   ├── count.ts               # GET /api/count
│   ├── referral/[code].ts     # GET /api/referral/:code
│   ├── waitlist/[id].ts       # GET /api/waitlist/:id
│   ├── waitlist/user/[code].ts
│   └── waitlist/[id]/priority.ts # PATCH /api/waitlist/:id/priority
│
├── shared/                    # Shared code (frontend + backend)
│   └── schema.ts              # Drizzle + Zod schemas
│
├── Configuration files
│   ├── tsconfig.json          # Frontend TypeScript config
│   ├── tsconfig.server.json   # Backend TypeScript config
│   ├── vite.config.ts         # Vite build & proxy config
│   ├── tailwind.config.ts     # Tailwind theme customization
│   ├── drizzle.config.ts      # Database migration config
│   ├── postcss.config.js      # PostCSS plugins
│   ├── vercel.json            # Vercel deployment config
│   ├── package.json           # Dependencies & scripts
│   ├── .env.example           # Environment variables template
│   └── README.md              # Project documentation
```

---

## Architecture & Patterns

### Frontend-Backend Communication

**API Communication Pattern**:
```typescript
// Centralized fetch wrapper in client/src/hooks/useWaitlist.ts
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }
    throw new Error(`Server Error: ${response.status}`);
  }

  return response.json();
}
```

**Key Principles**:
- All API requests go through `/api/*` prefix
- Errors return JSON with `{ message: string }` format
- Content-type checking prevents HTML error page parsing
- Vite proxies `/api/*` to `http://localhost:3000` in development

### State Management Strategy

**Server State** (React Query):
- Waitlist count
- User data by ID
- Referral validation
- Query cache with 5-minute stale time

**UI State** (React useState):
- Modal open/closed states
- Form input values (via react-hook-form)
- Accordion expand/collapse

**Persistent State** (localStorage):
- `gutsy_referral_code` - User's own referral code
- `gutsy_referred_by` - Referral code from URL params
- `gutsy_popup_viewed` - Welcome popup view tracking

### Dual API Architecture

The codebase supports **two deployment modes**:

1. **Express Server** (Primary - `/server/routes.ts`):
   - Single Node.js server process
   - Runs on port 3000
   - Better for local development

2. **Vercel Serverless** (Alternative - `/api` directory):
   - Individual serverless functions
   - Auto-scaling on Vercel platform
   - Better for production deployment

**Both use the same database operations** from `DBStorage` class.

---

## Database Schema

### Table: `waitlist_emails`

```typescript
{
  // Core fields
  id: serial PRIMARY KEY
  email: text UNIQUE NOT NULL
  joinedAt: timestamp DEFAULT NOW()

  // Referral system
  referralCode: text UNIQUE NOT NULL    // nanoid(8).toUpperCase()
  referredBy: text nullable             // Who referred this user
  referralCount: integer DEFAULT 0      // How many users they referred

  // Priority access quiz
  priorityAccess: boolean DEFAULT false
  proteinUsage: text nullable
  biggestIssues: text nullable
  purchaseLikelihood: text nullable
}
```

### Position Calculation Logic

**Not stored in database** - calculated on-demand:

```typescript
// server/storage.ts:57-65
async calculatePosition(userId: number): Promise<number> {
  const allUsers = await db
    .select()
    .from(waitlistEmails)
    .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

  const position = allUsers.findIndex((u) => u.id === userId) + 1;
  return position;
}
```

**Ranking Logic**:
1. Higher `referralCount` = better position
2. If tied, earlier `joinedAt` = better position
3. Every 3 referrals = +5 position improvement (mentioned in UI)

### Social Proof Baseline

```typescript
// server/storage.ts:18
const BASELINE_COUNT = 1280;

// Displayed count = actual DB count + baseline
```

---

## Naming Conventions

### Files & Folders

| Type | Convention | Examples |
|------|------------|----------|
| React Components | PascalCase | `EmailForm.tsx`, `WaitlistPopup.tsx` |
| Pages | lowercase | `home.tsx`, `success.tsx` |
| Hooks | `use` prefix, camelCase | `useWaitlist.ts`, `useCountdown.ts` |
| Utilities | lowercase | `utils.ts`, `queryClient.ts` |
| API routes (Vercel) | Bracket params | `[code].ts`, `[id].ts` |
| Config files | lowercase | `vite.config.ts`, `drizzle.config.ts` |

### Functions & Variables

```typescript
// Database operations (storage.ts)
getByEmail()
getByReferralCode()
addToWaitlist()
calculatePosition()

// React hooks
useJoinWaitlist()      // Mutation
useUpdatePriority()    // Mutation
useWaitlistCount()     // Query
useValidateReferral()  // Query

// Components
EmailForm              // Form component
WaitlistPopup          // Modal component
Countdown              // Display component
```

### CSS & Styling

**Tailwind Custom Colors**:
```typescript
// tailwind.config.ts
gutsyCream: "#F3EEE4"
gutsyRed: "#F20028"
gutsyYellow: "#FFB300"
gutsyBlack: "#000000"
gutsyPurple: "#8B5CF6"
gutsyOrange: "#F97316"
```

**Custom Component Classes**:
```css
/* client/src/index.css */
.btn-pill        /* Primary CTA button */
.card-premium    /* Premium card styling */
.input-fluid     /* Form input styling */
```

**Typography**:
- `tracking-tightest` = `-0.06em` (tight letter spacing)
- Font family: `Uto` (custom) with fallback to Georgia

---

## Code Style & Patterns

### TypeScript Configuration

**Strict Mode Enabled**:
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

**Path Aliases**:
```json
{
  "@/*": "./client/src/*",
  "@shared/*": "./shared/*"
}
```

Usage:
```typescript
import { cn } from "@/lib/utils";
import { waitlistEmails } from "@shared/schema";
```

### React Component Pattern

**Standard Functional Component**:
```typescript
interface ComponentProps {
  variant?: "light" | "dark";
  buttonText?: string;
  onSuccess?: (data: WaitlistEmail) => void;
}

export default function ComponentName({
  variant = "light",
  buttonText = "Join Waitlist",
  onSuccess
}: ComponentProps) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return <div>{/* JSX */}</div>;
}
```

### Form Handling Pattern

**React Hook Form + Zod**:
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

### API Handler Pattern (Express)

**Standard Route Structure**:
```typescript
router.post("/waitlist", async (req: Request, res: Response) => {
  try {
    // 1. Validate input with Zod
    const data = insertWaitlistSchema.parse(req.body);

    // 2. Perform database operation
    const user = await storage.addToWaitlist(data);

    // 3. Return JSON response
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    res.status(500).json({
      message: "Failed to join waitlist"
    });
  }
});
```

**Error Handling Priority**:
1. Schema validation errors (Zod) → 400
2. Business logic errors → 400/409
3. Database errors → 500
4. Always return JSON (never HTML)

### Database Operations Pattern

**DBStorage Class** (`server/storage.ts`):
```typescript
export class DBStorage {
  // Private helper methods
  private generateReferralCode(): string {
    return nanoid(8).toUpperCase();
  }

  // Public API methods
  async addToWaitlist(data: InsertWaitlist): Promise<WaitlistEmail> {
    // 1. Check for existing email
    const existing = await this.getByEmail(data.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    // 2. Generate unique referral code
    const referralCode = this.generateReferralCode();

    // 3. Update referrer if applicable
    if (data.referredBy) {
      await db.update(waitlistEmails)
        .set({ referralCount: sql`${waitlistEmails.referralCount} + 1` })
        .where(eq(waitlistEmails.referralCode, data.referredBy));
    }

    // 4. Insert new user
    const [newUser] = await db.insert(waitlistEmails)
      .values({ ...data, referralCode })
      .returning();

    // 5. Calculate and attach position
    const position = await this.calculatePosition(newUser.id);
    return { ...newUser, position };
  }
}
```

### Custom Hooks Pattern

**Data Fetching Hook**:
```typescript
export function useWaitlistCount() {
  return useQuery({
    queryKey: ["waitlist-count"],
    queryFn: () => apiRequest<{ count: number }>("/count"),
  });
}
```

**Mutation Hook**:
```typescript
export function useJoinWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InsertWaitlist) =>
      apiRequest<WaitlistEmail>("/waitlist", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate count to refetch
      queryClient.invalidateQueries({ queryKey: ["waitlist-count"] });
    },
  });
}
```

---

## Development Workflows

### Initial Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd gutsy-waitlist

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, GMAIL credentials, etc.

# 4. Push database schema
npm run db:push

# 5. Start development servers
npm run dev
```

### Development Scripts

```bash
# Run both frontend and backend (recommended)
npm run dev

# Run frontend only (Vite dev server on port 5173)
npm run dev:client

# Run backend only (Express server on port 3000)
npm run dev:server

# Build for production
npm run build

# Start production server
npm start

# Database management
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (DB GUI)
```

### Git Workflow

**Branch Naming**:
- Feature branches: `claude/feature-name-sessionid`
- Example: `claude/claude-md-mkgib4eez37mxs6h-fF6xu`

**Commit Messages**:
- Descriptive, target specific files
- Examples: "Update routes.ts", "Add priority quiz feature"

**Pushing Changes**:
```bash
# Always push to the designated branch
git push -u origin claude/claude-md-mkgib4eez37mxs6h-fF6xu
```

### Database Migrations

**Schema Changes**:
1. Edit `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Verify with `npm run db:studio`

**Example Schema Update**:
```typescript
// shared/schema.ts
export const waitlistEmails = pgTable("waitlist_emails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  // Add new column
  phoneNumber: text("phone_number"),
});
```

---

## Key Files Reference

### Essential Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `vite.config.ts` | Build & dev server | Proxy `/api` → `http://localhost:3000` |
| `tailwind.config.ts` | Theme customization | Custom colors, fonts, animations |
| `drizzle.config.ts` | Database config | Schema path, migrations, connection |
| `tsconfig.json` | Frontend TypeScript | Path aliases, strict mode |
| `tsconfig.server.json` | Backend TypeScript | Module resolution, strict mode |
| `vercel.json` | Deployment config | Rewrites for SPA routing |

### Core Business Logic Files

| File | Lines | Purpose |
|------|-------|---------|
| `server/storage.ts` | ~120 | All database operations |
| `server/routes.ts` | ~100 | Express API endpoints |
| `shared/schema.ts` | ~60 | Database + validation schemas |
| `client/src/hooks/useWaitlist.ts` | ~80 | API integration hooks |
| `client/src/components/EmailForm.tsx` | ~150 | Main signup form |

### Important Constants

```typescript
// server/storage.ts:18
const BASELINE_COUNT = 1280;  // Social proof baseline

// client/src/pages/home.tsx (launch date)
const launchDate = new Date("2026-03-15T00:00:00");

// Referral code generation
nanoid(8).toUpperCase()  // e.g., "A1B2C3D4"
```

---

## Common Tasks

### Adding a New API Endpoint

**1. Define Schema** (`shared/schema.ts`):
```typescript
export const myNewSchema = z.object({
  field: z.string(),
});

export type MyNewData = z.infer<typeof myNewSchema>;
```

**2. Add Database Method** (`server/storage.ts`):
```typescript
async myNewOperation(data: MyNewData) {
  const result = await db.insert(table).values(data).returning();
  return result[0];
}
```

**3. Create Route** (`server/routes.ts`):
```typescript
router.post("/my-endpoint", async (req, res) => {
  try {
    const data = myNewSchema.parse(req.body);
    const result = await storage.myNewOperation(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Operation failed" });
  }
});
```

**4. Create Hook** (`client/src/hooks/useWaitlist.ts`):
```typescript
export function useMyNewMutation() {
  return useMutation({
    mutationFn: (data: MyNewData) =>
      apiRequest("/my-endpoint", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}
```

### Adding a New Component

**1. Create File** (`client/src/components/MyComponent.tsx`):
```typescript
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 bg-gutsyCream">
      <h2 className="font-black text-gutsyBlack">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="btn-pill">
          Click Me
        </button>
      )}
    </div>
  );
}
```

**2. Use in Page**:
```typescript
import MyComponent from "@/components/MyComponent";

function HomePage() {
  return <MyComponent title="Hello" onAction={() => alert("Clicked")} />;
}
```

### Modifying the Referral System

**Key Locations**:
- Position calculation: `server/storage.ts:57-65`
- Referral tracking: `server/storage.ts:26-51`
- Referral UI logic: `client/src/components/EmailForm.tsx:40-60`
- Referral rewards display: `client/src/pages/home.tsx:200-250`

**Important**: Referral count affects position ranking. Changes should maintain:
1. Increment `referralCount` when someone joins with code
2. Order by `referralCount DESC, joinedAt ASC`
3. Update UI to reflect new rewards/rules

### Adding Environment Variables

**1. Add to `.env.example`**:
```
MY_NEW_VAR=example_value
```

**2. Update `vite.config.ts`** (if frontend needs it):
```typescript
define: {
  'process.env.MY_VAR': JSON.stringify(process.env.VITE_MY_VAR),
}
```

**3. Use in Code**:
```typescript
// Backend (server/)
const myVar = process.env.MY_NEW_VAR;

// Frontend (client/)
const myVar = import.meta.env.VITE_MY_VAR;
```

### Debugging Common Issues

**Issue: API requests fail with CORS**
- **Cause**: Vite proxy misconfigured
- **Fix**: Check `vite.config.ts` proxy settings point to `http://localhost:3000`

**Issue: Database query returns empty**
- **Cause**: Schema not pushed to database
- **Fix**: Run `npm run db:push`

**Issue: Referral code not persisting**
- **Cause**: localStorage cleared or not saving
- **Fix**: Check `EmailForm.tsx` localStorage.setItem calls

**Issue: Position calculation incorrect**
- **Cause**: Missing await on calculatePosition
- **Fix**: Ensure `await storage.calculatePosition(userId)` is called

---

## Best Practices for AI Assistants

### When Making Changes

1. **Always read files before editing** - Never propose changes to code you haven't read
2. **Maintain existing patterns** - Follow the established conventions in this document
3. **Test locally** - Use `npm run dev` to verify changes work
4. **Check types** - Ensure TypeScript compiles without errors
5. **Update dependencies carefully** - This is a production waitlist, breaking changes affect real users

### Code Quality Standards

- **TypeScript strict mode** - No `any` types without good reason
- **Error handling** - Always wrap async operations in try-catch
- **Validation** - Use Zod schemas for all external input
- **Naming** - Follow conventions in [Naming Conventions](#naming-conventions)
- **Comments** - Add comments for complex business logic only

### Security Considerations

- **Input validation** - Always validate with Zod before database operations
- **SQL injection** - Use Drizzle ORM parameterized queries (never string concatenation)
- **Email validation** - Use Zod email validator
- **Rate limiting** - Consider adding rate limiting for public endpoints
- **Environment variables** - Never commit `.env` file

### Performance Considerations

- **Query caching** - React Query handles this automatically
- **Database indexing** - `email` and `referralCode` are indexed (unique constraints)
- **Position calculation** - Expensive operation, only call when necessary
- **Asset optimization** - Images should be optimized, use lazy loading

---

## Referral System Deep Dive

### How It Works

**Step-by-step Flow**:

1. **User A signs up**:
   - Gets unique 8-char referral code (e.g., `GUTSY123`)
   - Code stored in localStorage as `gutsy_referral_code`
   - Can share link: `https://gutsy.com?ref=GUTSY123`

2. **User B clicks referral link**:
   - URL param `?ref=GUTSY123` captured
   - Stored in localStorage as `gutsy_referred_by`
   - Persists across page reloads

3. **User B signs up**:
   - Form submits with `referredBy: "GUTSY123"`
   - Database increments User A's `referralCount` by 1
   - User B's `referredBy` field set to `"GUTSY123"`

4. **Position Calculation**:
   - All users sorted by `referralCount DESC, joinedAt ASC`
   - User A moves up in queue for each referral

### Referral Rewards (UI Display)

From `client/src/pages/home.tsx:200-250`:

| Referrals | Reward |
|-----------|--------|
| 3 friends | Move up 5 positions |
| 10 friends | Move up 20 positions + early access |
| 25 friends | Free starter pack |

**Note**: Only the "move up X positions" is enforced by the ranking algorithm. Other rewards are promotional copy.

### Code References

**Backend**:
- Referral code generation: `server/storage.ts:20-22`
- Referral count increment: `server/storage.ts:39-43`
- Position calculation: `server/storage.ts:57-65`

**Frontend**:
- Referral param capture: `client/src/components/EmailForm.tsx:40-49`
- Referral code storage: `client/src/components/EmailForm.tsx:82-84`
- Referral link sharing: `client/src/pages/success.tsx:50-80`

---

## Troubleshooting Guide

### Development Environment Issues

**Problem**: `npm run dev` fails with "port already in use"
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in server/index.ts
const PORT = process.env.PORT || 3001;
```

**Problem**: Database connection fails
```bash
# Check DATABASE_URL in .env
echo $DATABASE_URL

# Test connection with Drizzle Studio
npm run db:studio
```

**Problem**: Frontend can't reach backend API
- Check Vite proxy in `vite.config.ts`
- Ensure backend is running on port 3000
- Check browser console for CORS errors

### Production Issues

**Problem**: Email sending fails
- Verify `GMAIL_USER` and `GMAIL_PASSWORD` in environment
- Ensure app password is used (not regular password)
- Check Nodemailer configuration in `server/routes.ts`

**Problem**: Referral links broken
- Check `VITE_APP_URL` environment variable
- Ensure URL includes protocol (https://)
- Verify URL param parsing in `EmailForm.tsx`

**Problem**: Position not updating after referral
- Check referral code validity in database
- Verify `referralCount` incremented in database
- Ensure position recalculation is called

---

## Future Enhancements (Considerations)

When adding new features, consider these patterns:

1. **Email Notifications**:
   - Template system in `server/`
   - Nodemailer already configured
   - Send welcome email after signup

2. **Analytics**:
   - Track signup sources
   - Monitor referral conversion rates
   - Add Google Analytics or Plausible

3. **Admin Dashboard**:
   - View all waitlist users
   - Export to CSV
   - Manual position adjustment
   - Create in `/admin` route

4. **A/B Testing**:
   - Test different copy variants
   - Optimize referral rewards messaging
   - Use feature flags

5. **Rate Limiting**:
   - Prevent spam signups
   - Implement in `server/index.ts` middleware
   - Use `express-rate-limit` package

---

## Contact & Support

For questions about this codebase:
- Check the GitHub repository issues
- Review commit history for context on recent changes
- Consult the README.md for deployment instructions

---

**Last Updated**: 2026-01-16
**Version**: 1.0
**Maintained by**: AI assistants working on GUTSY Waitlist
