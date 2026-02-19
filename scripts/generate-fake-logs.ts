// Demo data generator script
// Run with: npx tsx scripts/generate-fake-logs.ts

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const services = [
  "authentication",
  "api-gateway",
  "database",
  "payment",
  "notification",
  "user-service",
];

const logLevels = ["ERROR", "WARNING", "INFO", "DEBUG"] as const;

const messages: Record<string, string[]> = {
  ERROR: [
    "Connection timeout after 30000ms",
    "Failed to authenticate user: invalid token",
    "Database connection pool exhausted",
    "Payment processing failed: gateway timeout",
    "Memory usage exceeded 90% threshold",
    "SSL certificate verification failed",
    "Rate limit exceeded for API endpoint /api/users",
    "Disk space critically low on volume /data",
  ],
  WARNING: [
    "High latency detected on database queries (>500ms)",
    "Cache miss rate increased to 45%",
    "API response time degraded by 30%",
    "Connection pool usage at 75%",
    "Memory usage approaching threshold at 80%",
    "Deprecated API version being used by 3 clients",
    "Background job queue depth exceeding normal levels",
    "Certificate expiring in 14 days",
  ],
  INFO: [
    "Service deployed successfully v2.4.1",
    "Database migration completed: added index on users.email",
    "Auto-scaling triggered: 3 → 5 instances",
    "Backup completed successfully (2.3 GB)",
    "Health check passed for all endpoints",
    "New API key generated for service account",
    "Configuration reload completed",
    "Scheduled maintenance window started",
  ],
  DEBUG: [
    "Request received: GET /api/users?page=1&limit=20",
    "Cache hit for key: user:12345:profile",
    "Database query executed in 12ms",
    "WebSocket connection established from 192.168.1.100",
    "JWT token validated successfully for user admin@example.com",
    "Background job completed: email_queue processing",
    "Retry attempt 1/3 for external API call",
    "Response sent: 200 OK (45ms)",
  ],
};

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLog() {
  const level = randomItem(logLevels);
  return {
    level,
    service: randomItem(services),
    message: randomItem(messages[level]),
    metadata: {
      user_id: `usr_${Math.random().toString(36).slice(2, 10)}`,
      request_id: `req_${Math.random().toString(36).slice(2, 14)}`,
      duration_ms: Math.floor(Math.random() * 2000),
    },
    stack_trace:
      level === "ERROR"
        ? `Error: ${randomItem(messages.ERROR)}\n    at handler (/app/api/route.ts:42:11)\n    at processRequest (/app/middleware.ts:18:5)`
        : undefined,
  };
}

async function generateFakeLogs(count: number = 50) {
  console.log(`Generating ${count} fake logs...`);

  for (let i = 0; i < count; i++) {
    const log = generateLog();

    try {
      const res = await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      });

      if (res.ok) {
        console.log(`[${i + 1}/${count}] Created ${log.level} log for ${log.service}`);
      } else {
        console.error(`[${i + 1}/${count}] Failed: ${res.status}`);
      }
    } catch (error) {
      console.error(`[${i + 1}/${count}] Error:`, error);
    }

    // Small delay to simulate real-time ingestion
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log("Done! Generated", count, "logs.");
}

generateFakeLogs(50);
