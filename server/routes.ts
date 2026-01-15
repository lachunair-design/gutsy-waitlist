import { Router, type Request, type Response } from "express";
import { storage } from "./storage";
import { insertWaitlistSchema, updatePriorityAccessSchema } from "../shared/schema";
import { z } from "zod";

export const router = Router();

// POST /api/waitlist - Add email to waitlist
router.post("/waitlist", async (req: Request, res: Response) => {
  try {
    const data = insertWaitlistSchema.parse(req.body);

    // Check if email already exists
    const existing = await storage.getByEmail(data.email);
    if (existing) {
      return res.status(400).json({
        error: "Email already registered",
        user: existing,
      });
    }

    const user = await storage.addToWaitlist(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Waitlist signup error:", error);
    res.status(500).json({ error: "Failed to join waitlist" });
  }
});

// GET /api/waitlist/:id - Get user by ID
router.get("/waitlist/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await storage.getById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// PATCH /api/waitlist/:id/priority - Update priority access quiz
router.patch("/waitlist/:id/priority", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const data = updatePriorityAccessSchema.parse(req.body);
    const updated = await storage.updatePriorityAccess(id, data);

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Priority update error:", error);
    res.status(500).json({ error: "Failed to update priority access" });
  }
});

// GET /api/waitlist/count - Get total waitlist count
router.get("/count", async (_req: Request, res: Response) => {
  try {
    const count = await storage.getCount();
    res.json({ count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ error: "Failed to get count" });
  }
});

// GET /api/referral/:code - Validate referral code
router.get("/referral/:code", async (req: Request, res: Response) => {
  try {
    const user = await storage.getByReferralCode(req.params.code);
    if (!user) {
      return res.status(404).json({ valid: false });
    }
    res.json({ valid: true, referrerEmail: user.email.slice(0, 3) + "***" });
  } catch (error) {
    console.error("Referral validation error:", error);
    res.status(500).json({ error: "Failed to validate referral" });
  }
});
