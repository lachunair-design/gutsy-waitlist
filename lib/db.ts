import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema.js"; // Explicit extension

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Check your environment variables.");
}

const connectionString = process.env.DATABASE_URL;

// Setting max: 1 prevents "Too many connections" errors during development
const client = postgres(connectionString, { max: 1 });

export const db = drizzle(client, { schema });
