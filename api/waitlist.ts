import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertWaitlistSchema } from "../shared/schema";
import { addToWaitlist, getByEmail } from "./_storage";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = insertWaitlistSchema.parse(req.body);

    const existing = await getByEmail(data.email);
    if (existing) {
      return res.status(400).json({
        error: "Email already registered",
        user: existing,
      });
    }

    const user = await addToWaitlist(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Waitlist signup error:", error);
    res.status(500).json({ error: "Failed to join waitlist" });
  }
}
