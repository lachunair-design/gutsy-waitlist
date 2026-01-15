import { eq, desc, asc, sql } from "drizzle-orm";
import { db } from "./db";
import { waitlistEmails, type WaitlistEmail, type InsertWaitlist, type UpdatePriorityAccess } from "../shared/schema";
import { nanoid } from "nanoid";

// Baseline count for social proof
const BASELINE_COUNT = 12;

export class DBStorage {
  // Generate unique 8-character referral code
  private generateReferralCode(): string {
    return nanoid(8).toUpperCase();
  }

  // Calculate position based on referralCount (desc) and joinedAt (asc)
  async calculatePosition(userId: number): Promise<number> {
    const result = await db
      .select({ id: waitlistEmails.id })
      .from(waitlistEmails)
      .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

    const position = result.findIndex((row) => row.id === userId) + 1;
    return position;
  }

  // Add new user to waitlist
  async addToWaitlist(data: InsertWaitlist): Promise<WaitlistEmail> {
    const referralCode = this.generateReferralCode();

    // If referred by someone, increment their referral count
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

    // Calculate and update position
    const position = await this.calculatePosition(newUser.id);
    await db
      .update(waitlistEmails)
      .set({ position })
      .where(eq(waitlistEmails.id, newUser.id));

    return { ...newUser, position };
  }

  // Get user by email
  async getByEmail(email: string): Promise<WaitlistEmail | null> {
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.email, email));
    return user || null;
  }

  // Get user by ID
  async getById(id: number): Promise<WaitlistEmail | null> {
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.id, id));
    return user || null;
  }

  // Get user by referral code
  async getByReferralCode(code: string): Promise<WaitlistEmail | null> {
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.referralCode, code));
    return user || null;
  }

  // Update priority access quiz data
  async updatePriorityAccess(id: number, data: UpdatePriorityAccess): Promise<WaitlistEmail | null> {
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

  // Get total waitlist count (with baseline)
  async getCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistEmails);
    return Number(result.count) + BASELINE_COUNT;
  }

  // Recalculate all positions (run periodically or after referral changes)
  async recalculateAllPositions(): Promise<void> {
    const users = await db
      .select()
      .from(waitlistEmails)
      .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

    for (let i = 0; i < users.length; i++) {
      await db
        .update(waitlistEmails)
        .set({ position: i + 1 })
        .where(eq(waitlistEmails.id, users[i].id));
    }
  }
}

export const storage = new DBStorage();
