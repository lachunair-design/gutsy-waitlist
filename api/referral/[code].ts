import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { waitlistEmails } from "../../shared/schema.js";

// Database connection
const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  const client = postgres(process.env.DATABASE_URL, { prepare: false });
  return drizzle(client);
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
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: "Referral code is required" });
    }

    const db = getDb();
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.referralCode, code));

    if (!user) {
      return res.status(404).json({ valid: false });
    }

    res.status(200).json({
      valid: true,
      referrerEmail: user.email.slice(0, 3) + "***"
    });
  } catch (error) {
    console.error("Referral validation error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("not configured")) {
      return res.status(503).json({ message: "Service temporarily unavailable" });
    }

    res.status(500).json({ error: "Failed to validate referral" });
  }
}
