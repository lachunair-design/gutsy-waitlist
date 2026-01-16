import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, asc } from "drizzle-orm";
import { z } from "zod";
import { waitlistEmails, updatePriorityAccessSchema } from "../../../shared/schema.js";

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
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const id = parseInt(req.query.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const data = updatePriorityAccessSchema.parse(req.body);
    const db = getDb();

    const [updated] = await db
      .update(waitlistEmails)
      .set({
        priorityAccess: data.priorityAccess,
        proteinUsage: data.proteinUsage || null,
        biggestIssues: data.biggestIssues || null,
        purchaseLikelihood: data.purchaseLikelihood || null,
      })
      .where(eq(waitlistEmails.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    const position = await calculatePosition(db, updated.id);

    res.status(200).json({ ...updated, position });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }

    console.error("Priority update error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("not configured")) {
      return res.status(503).json({ message: "Service temporarily unavailable" });
    }

    res.status(500).json({ error: "Failed to update priority access" });
  }
}
