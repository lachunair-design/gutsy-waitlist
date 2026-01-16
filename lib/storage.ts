import { eq, desc, asc, sql } from "drizzle-orm";
import { db } from "./db.js";
import {
  waitlistEmails,
  type WaitlistEmail,
  type InsertWaitlist,
  type UpdatePriorityAccess
} from "../shared/schema.js";
import { nanoid } from "nanoid";

const BASELINE_COUNT = 1280; // Brand social proof

function generateReferralCode(): string {
  return nanoid(8).toUpperCase();
}

// Live calculation of rank based on referrals and join time
export async function calculatePosition(userId: number): Promise<number> {
  const result = await db
    .select({ id: waitlistEmails.id })
    .from(waitlistEmails)
    .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

  const position = result.findIndex((row) => row.id === userId) + 1;
  return position || result.length;
}

export async function addToWaitlist(data: InsertWaitlist): Promise<WaitlistEmail> {
  const existing = await getByEmail(data.email);
  if (existing) return existing;

  const referralCode = generateReferralCode();

  // Viral Rewards: +1 referral count for the person who shared the link
  if (data.referredBy) {
    await db
      .update(waitlistEmails)
      .set({ referralCount: sql`${waitlistEmails.referralCount} + 1` })
      .where(eq(waitlistEmails.referralCode, data.referredBy));
  }

  const [newUser] = await db
    .insert(waitlistEmails)
    .values({
      email: data.email,
      referralCode,
      referredBy: data.referredBy || null,
      referralCount: 0,
    })
    .returning();

  const position = await calculatePosition(newUser.id);
  return { ...newUser, position };
}

export async function getByEmail(email: string): Promise<WaitlistEmail | null> {
  const [user] = await db.select().from(waitlistEmails).where(eq(waitlistEmails.email, email));
  if (!user) return null;
  const position = await calculatePosition(user.id);
  return { ...user, position };
}

export async function getById(id: number): Promise<WaitlistEmail | null> {
  const [user] = await db.select().from(waitlistEmails).where(eq(waitlistEmails.id, id));
  if (!user) return null;
  const position = await calculatePosition(user.id);
  return { ...user, position };
}

export async function getByReferralCode(code: string): Promise<WaitlistEmail | null> {
  const [user] = await db.select().from(waitlistEmails).where(eq(waitlistEmails.referralCode, code));
  if (!user) return null;
  const position = await calculatePosition(user.id);
  return { ...user, position };
}

export async function getCount(): Promise<number> {
  const [result] = await db.select({ count: sql<number>`count(*)` }).from(waitlistEmails);
  return Number(result.count) + BASELINE_COUNT;
}

export async function updatePriorityAccess(
  id: number,
  data: UpdatePriorityAccess
): Promise<WaitlistEmail | null> {
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

  if (!updated) return null;
  const position = await calculatePosition(updated.id);
  return { ...updated, position };
}
