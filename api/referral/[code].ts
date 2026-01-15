import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getByReferralCode } from "../_storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const code = req.query.code as string;
    const user = await getByReferralCode(code);

    if (!user) {
      return res.status(404).json({ valid: false });
    }

    res.json({ valid: true, referrerEmail: user.email.slice(0, 3) + "***" });
  } catch (error) {
    console.error("Referral validation error:", error);
    res.status(500).json({ error: "Failed to validate referral" });
  }
}
