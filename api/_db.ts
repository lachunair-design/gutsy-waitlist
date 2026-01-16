import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

const connectionString = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (connectionString) {
  try {
    const client = postgres(connectionString, {
      prepare: false,
      ssl: 'require',
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  } catch (error) {
    console.error("Failed to initialize database connection:", error);
  }
} else {
  console.error("DATABASE_URL environment variable is not set");
}

export { db };
