import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertWaitlistSchema } from "../shared/schema";
import { addToWaitlist, getByEmail } from "./_storage";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
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
    const data = insertWaitlistSchema.parse(req.body);

    const existing = await getByEmail(data.email);
    if (existing) {
      return res.status(200).json({
        message: "Welcome back!",
        referralCode: existing.referralCode,
        position: existing.position,
        referralCount: existing.referralCount,
      });
    }

    const user = await addToWaitlist(data);
    res.status(201).json({
      referralCode: user.referralCode,
      position: user.position,
      referralCount: user.referralCount,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }

    const message = error instanceof Error ? error.message : "Failed to join waitlist";
    console.error("Waitlist signup error:", error);
    res.status(500).json({ error: message });
  }
}
