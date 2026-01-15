import { eq, desc, asc, sql } from "drizzle-orm";
import { db } from "./_db";
import { waitlistEmails, type WaitlistEmail, type InsertWaitlist, type UpdatePriorityAccess } from "../shared/schema";
import { nanoid } from "nanoid";

const BASELINE_COUNT = 12;

function generateReferralCode(): string {
  return nanoid(8).toUpperCase();
}

export async function calculatePosition(userId: number): Promise<number> {
  const result = await db
    .select({ id: waitlistEmails.id })
    .from(waitlistEmails)
    .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

  return result.findIndex((row) => row.id === userId) + 1;
}

export async function addToWaitlist(data: InsertWaitlist): Promise<WaitlistEmail> {
  const referralCode = generateReferralCode();

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
    })
    .returning();

  const position = await calculatePosition(newUser.id);
  await db
    .update(waitlistEmails)
    .set({ position })
    .where(eq(waitlistEmails.id, newUser.id));

  return { ...newUser, position };
}

export async function getByEmail(email: string): Promise<WaitlistEmail | null> {
  const [user] = await db
    .select()
    .from(waitlistEmails)
    .where(eq(waitlistEmails.email, email));
  return user || null;
}

export async function getById(id: number): Promise<WaitlistEmail | null> {
  const [user] = await db
    .select()
    .from(waitlistEmails)
    .where(eq(waitlistEmails.id, id));
  return user || null;
}

export async function getByReferralCode(code: string): Promise<WaitlistEmail | null> {
  const [user] = await db
    .select()
    .from(waitlistEmails)
    .where(eq(waitlistEmails.referralCode, code));
  return user || null;
}

export async function updatePriorityAccess(id: number, data: UpdatePriorityAccess): Promise<WaitlistEmail | null> {
  const [updated] = await db
    .update(waitlistEmails)
    .set({
      priorityAccess: true,
      proteinUsage: data.proteinUsage,
      biggestIssues: data.biggestIssues,
      purchaseLikelihood: data.purchaseLikelihood,
    })
    .where(eq(waitlistEmails.id, id))
    .returning();
  return updated || null;
}

export async function getCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEmails);
  return Number(result.count) + BASELINE_COUNT;
}
