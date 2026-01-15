import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// The core waitlist table for Gutsy
export const waitlistEmails = pgTable("waitlist_emails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),

  // Viral Referral System logic
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").default(0).notNull(),
  position: integer("position"),

  // Multi-Step Post-Signup Flow (Priority Access Quiz)
  priorityAccess: boolean("priority_access").default(false).notNull(),
  proteinUsage: text("protein_usage"),
  biggestIssues: text("biggest_issues"),
  purchaseLikelihood: text("purchase_likelihood"),
});

// Zod schemas for validating user input
export const insertWaitlistSchema = createInsertSchema(waitlistEmails).pick({
  email: true,
  referredBy: true,
}).extend({
  email: z.string().email("Please enter a valid email address."),
});

// Schema for updating the Priority Access Quiz data
export const updatePriorityAccessSchema = createInsertSchema(waitlistEmails).pick({
  proteinUsage: true,
  biggestIssues: true,
  purchaseLikelihood: true,
}).extend({
  priorityAccess: z.boolean().default(true),
});

export type WaitlistEmail = typeof waitlistEmails.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type UpdatePriorityAccess = z.infer<typeof updatePriorityAccessSchema>;
