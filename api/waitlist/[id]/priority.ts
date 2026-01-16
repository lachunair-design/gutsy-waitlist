import type { VercelRequest, VercelResponse } from "@vercel/node";
// ADD .js HERE
import { updatePriorityAccessSchema } from "../../../shared/schema.js"; 
// ADD .js HERE
import { updatePriorityAccess } from "../../../lib/storage.js"; 
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const id = parseInt(req.query.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const data = updatePriorityAccessSchema.parse(req.body);
    const updated = await updatePriorityAccess(id, data);

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
}
