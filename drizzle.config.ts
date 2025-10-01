import { defineConfig } from "drizzle-kit";

// For Railway: DATABASE_URL is set when PostgreSQL service is added
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️  DATABASE_URL not found. Add PostgreSQL service in Railway dashboard.");
  console.warn("   The application will continue but database operations will fail.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl || "postgresql://placeholder",
  },
});
