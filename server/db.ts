import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

let _db: NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema> {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. Please provision a database in your environment."
      );
    }

    if (process.env.DATABASE_URL.includes('neon.tech')) {
      const sql = neon(process.env.DATABASE_URL);
      _db = drizzleNeon(sql, { schema });
      console.log('[DB] Connected to Neon database via HTTP');
    } else {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      });
      _db = drizzlePg(pool, { schema });
      console.log('[DB] Connected to PostgreSQL database via node-postgres');
    }
  }
  return _db;
}
