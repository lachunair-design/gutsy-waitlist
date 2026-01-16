import { Router, type Request, type Response } from "express";
import { storage } from "./storage.js"; 
import { insertWaitlistSchema } from "../shared/schema.js"; // Added .js extension
import { z } from "zod";

export const router = Router();

// POST /api/waitlist - Add email to waitlist
router.post("/waitlist", async (req: Request, res: Response) => {
  try {
    const data = insertWaitlistSchema.parse(req.body);

    // Check if email already exists
    const existing = await storage.getByEmail(data.email);
    if (existing) {
      return res.status(200).json(existing); // Return existing user data
    }

    const user = await storage.addToWaitlist(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error("Waitlist signup error:", error);
    res.status(500).json({ message: "Failed to join waitlist" });
  }
});

// GET /api/waitlist/count - Get total waitlist count (with baseline)
router.get("/waitlist/count", async (_req: Request, res: Response) => {
  try {
    const count = await storage.getCount();
    res.json({ count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ message: "Failed to get count" });
  }
});

// GET /api/waitlist/user/:code - Get user data by referral code for success page
router.get("/waitlist/user/:code", async (req: Request, res: Response) => {
  try {
    const user = await storage.getByReferralCode(req.params.code);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      position: user.position,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      // Masked email for display security
      email: user.email.slice(0, 3) + "***@" + user.email.split("@")[1],
    });
  } catch (error) {
    console.error("Get user by code error:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
});
