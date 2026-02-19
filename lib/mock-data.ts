import type { Log, Alert, AIInsight, DashboardStats } from "./supabase";

const services = [
  "authentication",
  "api-gateway",
  "database",
  "payment",
  "notification",
  "user-service",
];

const errorMessages = [
  "Connection timeout after 30000ms",
  "Failed to authenticate user: invalid token",
  "Database connection pool exhausted",
  "Payment processing failed: gateway timeout",
  "Memory usage exceeded 90% threshold",
  "SSL certificate verification failed",
  "Rate limit exceeded for API endpoint /api/users",
  "Disk space critically low on volume /data",
];

const warningMessages = [
  "High latency detected on database queries (>500ms)",
  "Cache miss rate increased to 45%",
  "API response time degraded by 30%",
  "Connection pool usage at 75%",
  "Memory usage approaching threshold at 80%",
  "Deprecated API version being used by 3 clients",
  "Background job queue depth exceeding normal levels",
  "Certificate expiring in 14 days",
];

const infoMessages = [
  "Service deployed successfully v2.4.1",
  "Database migration completed: added index on users.email",
  "Auto-scaling triggered: 3 → 5 instances",
  "Backup completed successfully (2.3 GB)",
  "Health check passed for all endpoints",
  "New API key generated for service account",
  "Configuration reload completed",
  "Scheduled maintenance window started",
];

const debugMessages = [
  "Request received: GET /api/users?page=1&limit=20",
  "Cache hit for key: user:12345:profile",
  "Database query executed in 12ms",
  "WebSocket connection established from 192.168.1.100",
  "JWT token validated successfully for user admin@example.com",
  "Background job completed: email_queue processing",
  "Retry attempt 1/3 for external API call",
  "Response sent: 200 OK (45ms)",
];

function randomId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(hoursBack: number = 24): string {
  const now = new Date();
  const offset = Math.floor(Math.random() * hoursBack * 60 * 60 * 1000);
  return new Date(now.getTime() - offset).toISOString();
}

export function generateMockLog(): Log {
  const level = randomItem(["ERROR", "WARNING", "INFO", "DEBUG"] as const);
  const messageMap = {
    ERROR: errorMessages,
    WARNING: warningMessages,
    INFO: infoMessages,
    DEBUG: debugMessages,
  };

  return {
    id: randomId(),
    timestamp: randomDate(),
    level,
    service: randomItem(services),
    message: randomItem(messageMap[level]),
    original_language: "en",
    metadata: {
      user_id: `usr_${Math.random().toString(36).slice(2, 10)}`,
      request_id: `req_${Math.random().toString(36).slice(2, 14)}`,
      duration_ms: Math.floor(Math.random() * 2000),
    },
    stack_trace: level === "ERROR" ? `Error: ${randomItem(errorMessages)}\n    at handler (/app/api/route.ts:42:11)\n    at processRequest (/app/middleware.ts:18:5)` : null,
    created_at: new Date().toISOString(),
  };
}

export function generateMockLogs(count: number = 50): Log[] {
  return Array.from({ length: count }, () => generateMockLog())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function generateMockAlert(): Alert {
  const severity = randomItem(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const);
  const status = randomItem(["active", "acknowledged", "resolved"] as const);

  const alertTemplates = [
    { title: "High Error Rate Detected", description: "Error rate exceeded 5% threshold on api-gateway service. Current rate: 8.3%" },
    { title: "Database Connection Pool Exhausted", description: "All 100 connections in the pool are in use. New requests are being queued." },
    { title: "Memory Usage Critical", description: "Memory usage on payment-service has reached 95%. Immediate action required." },
    { title: "SSL Certificate Expiring", description: "SSL certificate for api.globalops.dev expires in 7 days. Renewal required." },
    { title: "Disk Space Low", description: "Available disk space on /data volume is below 10%. Currently at 8.2% free." },
    { title: "Service Unresponsive", description: "notification-service has not responded to health checks for the past 5 minutes." },
    { title: "Unusual Traffic Pattern", description: "Traffic spike detected: 300% increase in requests to /api/auth endpoint." },
    { title: "Deployment Failure", description: "Deployment of user-service v2.5.0 failed. Rolling back to v2.4.9." },
  ];

  const template = randomItem(alertTemplates);

  return {
    id: randomId(),
    title: template.title,
    description: template.description,
    severity,
    status,
    original_language: "en",
    created_by: null,
    created_at: randomDate(48),
    updated_at: new Date().toISOString(),
    resolved_at: status === "resolved" ? new Date().toISOString() : null,
    metadata: null,
  };
}

export function generateMockAlerts(count: number = 10): Alert[] {
  return Array.from({ length: count }, () => generateMockAlert())
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function generateMockInsight(): AIInsight {
  const insights = [
    {
      insight_type: "pattern",
      title: "Recurring Database Timeouts",
      description: "Detected a pattern of database connection timeouts occurring every 4 hours, correlating with the scheduled batch processing job. Consider optimizing the batch queries or increasing the connection pool size during batch windows.",
      severity: "HIGH" as const,
    },
    {
      insight_type: "anomaly",
      title: "Unusual Authentication Failures",
      description: "Authentication failure rate spiked by 400% in the last hour from IP range 203.0.113.0/24. This could indicate a brute-force attack. Recommend enabling rate limiting and investigating the source.",
      severity: "CRITICAL" as const,
    },
    {
      insight_type: "recommendation",
      title: "Optimize API Gateway Caching",
      description: "Analysis shows 60% of API gateway requests are cache misses for frequently accessed resources. Implementing a Redis cache layer could reduce response times by an estimated 40%.",
      severity: "MEDIUM" as const,
    },
    {
      insight_type: "pattern",
      title: "Memory Leak in User Service",
      description: "Memory usage in user-service shows a steady 2% increase per hour without corresponding load increase. This suggests a memory leak, likely in the session management module.",
      severity: "HIGH" as const,
    },
    {
      insight_type: "recommendation",
      title: "Enable Auto-Scaling for Payment Service",
      description: "Payment service consistently hits 80% CPU during peak hours (14:00-18:00 UTC). Configuring auto-scaling with a threshold of 70% would improve reliability.",
      severity: "LOW" as const,
    },
  ];

  const template = randomItem(insights);

  return {
    id: randomId(),
    ...template,
    related_logs: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => randomId()),
    metadata: null,
    language: "en",
    created_at: randomDate(72),
  };
}

export function generateMockInsights(count: number = 5): AIInsight[] {
  return Array.from({ length: count }, () => generateMockInsight())
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function generateMockStats(): DashboardStats {
  return {
    totalLogs: 1247 + Math.floor(Math.random() * 100),
    errorCount: 23 + Math.floor(Math.random() * 10),
    warningCount: 89 + Math.floor(Math.random() * 20),
    activeAlerts: 5 + Math.floor(Math.random() * 3),
    criticalAlerts: 2 + Math.floor(Math.random() * 2),
    servicesMonitored: 6,
  };
}
