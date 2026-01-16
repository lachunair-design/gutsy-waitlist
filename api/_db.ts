import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

const connectionString = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (connectionString) {
  try {
    const sql = neon(connectionString);
    db = drizzle(sql, { schema });
  } catch (error) {
    console.error("Failed to initialize database connection:", error);
  }
} else {
  console.error("DATABASE_URL environment variable is not set");
}

export { db };
