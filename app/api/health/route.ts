import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function GET() {
  const startedAt = performance.now();
  let databaseStatus: "connected" | "unavailable" = "connected";
  let databaseLatencyMs: number | null = null;

  try {
    await db.execute(sql`select 1`);
  } catch {
    databaseStatus = "unavailable";
  }

  if (databaseStatus === "connected") {
    databaseLatencyMs = Math.round((performance.now() - startedAt) * 100) / 100;
  }

  const authConfigured = Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.NEXTAUTH_SECRET
  );
  const memory = process.memoryUsage();
  const healthy = databaseStatus === "connected" && authConfigured;

  return Response.json(
    {
      status: healthy ? "ok" : "degraded",
      checkedAt: new Date().toISOString(),
      checks: {
        application: { status: "ok" },
        runtime: {
          status: "ok",
          engine: "nodejs",
          nodeVersion: process.version,
          uptimeSeconds: Math.floor(process.uptime()),
          memory: {
            residentBytes: memory.rss,
            heapUsedBytes: memory.heapUsed,
            heapTotalBytes: memory.heapTotal,
          },
        },
        database: { status: databaseStatus, latencyMs: databaseLatencyMs },
        authentication: { status: authConfigured ? "configured" : "missing_configuration" },
      },
    },
    { status: healthy ? 200 : 503 }
  );
}
