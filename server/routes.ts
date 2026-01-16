import { Router, type Request, type Response } from "express";
import { storage } from "./storage.js"; // Critical fix: added .js extension
import { insertWaitlistSchema } from "../shared/schema";
import { z } from "zod";

export const router = Router();

// POST /api/waitlist - Signup
router.post("/waitlist", async (req: Request, res: Response) => {
  try {
    const data = insertWaitlistSchema.parse(req.body);
    const user = await storage.addToWaitlist(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Failed to join waitlist" });
  }
});

// GET /api/waitlist/count - Live Social Proof
router.get("/waitlist/count", async (_req: Request, res: Response) => {
  try {
    const count = await storage.getCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to get count" });
  }
});

// GET /api/waitlist/user/:code - Success Page Data
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
      // Security: masked email for display
      email: user.email.slice(0, 3) + "***@" + user.email.split("@")[1],
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});
