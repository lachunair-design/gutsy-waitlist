import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCount } from "../lib/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const count = await getCount();
    res.json({ count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ error: "Failed to get count" });
  }
}
