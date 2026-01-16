import { Router, type Request, type Response } from "express";
import { storage } from "./storage.js"; 
// This line below is the most important fix:
import { insertWaitlistSchema } from "../shared/schema.js"; 
import { z } from "zod";

export const router = Router();

router.post("/waitlist", async (req: Request, res: Response) => {
  try {
    const data = insertWaitlistSchema.parse(req.body);
    const user = await storage.addToWaitlist(data);
    res.status(201).json(user);
  } catch (error) {
    // If the server hits an error, this ensures it sends JSON, not HTML
    // This stops the "Unexpected token A" error from appearing
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to join waitlist" });
  }
});

router.get("/waitlist/count", async (_req: Request, res: Response) => {
  try {
    const count = await storage.getCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to get count" });
  }
});

router.get("/waitlist/user/:code", async (req: Request, res: Response) => {
  try {
    const user = await storage.getByReferralCode(req.params.code);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});
