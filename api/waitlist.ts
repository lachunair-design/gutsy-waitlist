import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, asc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { waitlistEmails, insertWaitlistSchema } from "../shared/schema.js";

const BASELINE_COUNT = 1280;

// Database connection
const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  const client = postgres(process.env.DATABASE_URL, { prepare: false });
  return drizzle(client);
};

// Calculate position based on referrals and join time
const calculatePosition = async (db: ReturnType<typeof getDb>, userId: number): Promise<number> => {
  const result = await db
    .select({ id: waitlistEmails.id })
    .from(waitlistEmails)
    .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

  const position = result.findIndex((row) => row.id === userId) + 1;
  return position || result.length;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = getDb();
    const data = insertWaitlistSchema.parse(req.body);

    // Check if email already exists
    const [existing] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.email, data.email));

    if (existing) {
      const position = await calculatePosition(db, existing.id);
      return res.status(200).json({
        message: "Welcome back!",
        referralCode: existing.referralCode,
        position,
        referralCount: existing.referralCount,
      });
    }

    // Generate unique referral code
    const referralCode = nanoid(8).toUpperCase();

    // If referred by someone, increment their referral count
    if (data.referredBy) {
      await db
        .update(waitlistEmails)
        .set({ referralCount: sql`${waitlistEmails.referralCount} + 1` })
        .where(eq(waitlistEmails.referralCode, data.referredBy));
    }

    // Insert new user
    const [newUser] = await db
      .insert(waitlistEmails)
      .values({
        email: data.email,
        referralCode,
        referredBy: data.referredBy || null,
        referralCount: 0,
      })
      .returning();

    const position = await calculatePosition(db, newUser.id);

    res.status(201).json({
      referralCode: newUser.referralCode,
      position,
      referralCount: newUser.referralCount,
    });
  } catch (error) {
    console.error("Waitlist signup error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("not configured")) {
      return res.status(503).json({ message: "Service temporarily unavailable" });
    }

    res.status(500).json({ message: "Failed to join waitlist" });
  }
}
