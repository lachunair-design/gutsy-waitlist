import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import { waitlistEmails } from "../shared/schema.js";

const BASELINE_COUNT = 1280;

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
    const db = getDb();
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistEmails);

    const count = Number(result.count) + BASELINE_COUNT;

    res.status(200).json({ count });
  } catch (error) {
    console.error("Count error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("not configured")) {
      return res.status(503).json({ message: "Service temporarily unavailable" });
    }

    res.status(500).json({ message: "Failed to get count" });
  }
}
