import type { VercelRequest, VercelResponse } from "@vercel/node";
// ADDED .js EXTENSION HERE
import { getByReferralCode, calculatePosition } from "../../../lib/storage.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    const user = await getByReferralCode(code);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Recalculate position to ensure it's current
    const position = await calculatePosition(user.id);

    res.json({
      position,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      // Masked email for display security
      email: user.email.slice(0, 3) + "***@" + user.email.split("@")[1],
    });
  } catch (error) {
    // This catch block now sends JSON, preventing the "A" error
    console.error("Get user by code error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
}
