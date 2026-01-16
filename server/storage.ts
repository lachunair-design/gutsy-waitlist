import { eq, desc, asc, sql } from "drizzle-orm";
import { db } from "./db.js"; // Explicit .js extension
import { waitlistEmails, type WaitlistEmail, type InsertWaitlist } from "../shared/schema";
import { nanoid } from "nanoid";

const BASELINE_COUNT = 1280; // Matches your frontend social proof

export class DBStorage {
  private generateReferralCode(): string {
    return nanoid(8).toUpperCase();
  }

  // Live calculation of rank based on referrals and join time
  async calculatePosition(userId: number): Promise<number> {
    const result = await db
      .select({ id: waitlistEmails.id })
      .from(waitlistEmails)
      .orderBy(desc(waitlistEmails.referralCount), asc(waitlistEmails.joinedAt));

    const position = result.findIndex((row) => row.id === userId) + 1;
    return position || result.length;
  }

  async addToWaitlist(data: InsertWaitlist): Promise<WaitlistEmail> {
    // Prevent duplicate signups
    const existing = await this.getByEmail(data.email);
    if (existing) return existing;

    const referralCode = this.generateReferralCode();

    // Referral logic: Every 3 sign-ups moves the referrer up 5 spots
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

    const position = await this.calculatePosition(newUser.id);
    return { ...newUser, position };
  }

  async getByEmail(email: string): Promise<WaitlistEmail | null> {
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.email, email));
    
    if (!user) return null;
    const position = await this.calculatePosition(user.id);
    return { ...user, position };
  }

  async getByReferralCode(code: string): Promise<WaitlistEmail | null> {
    const [user] = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.referralCode, code));

    if (!user) return null;
    const position = await this.calculatePosition(user.id);
    return { ...user, position };
  }

  async getCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistEmails);
    return Number(result.count) + BASELINE_COUNT;
  }
}

export const storage = new DBStorage();
