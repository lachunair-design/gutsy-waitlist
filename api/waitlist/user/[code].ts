import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, asc } from "drizzle-orm";
import { waitlistEmails } from "../../../shared/schema.js";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    const db = getDb();
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.referralCode, code));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Recalculate position to ensure it's current
    const position = await calculatePosition(db, user.id);

    res.status(200).json({
      position,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      // Masked email for display security
      email: user.email.slice(0, 3) + "***@" + user.email.split("@")[1],
    });
  } catch (error) {
    console.error("Get user by code error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("not configured")) {
      return res.status(503).json({ message: "Service temporarily unavailable" });
    }

    res.status(500).json({ error: "Failed to get user" });
  }
}
