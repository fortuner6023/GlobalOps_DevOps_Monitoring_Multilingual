import { describe, it, expect } from "vitest";
import {
  generateMockLog,
  generateMockLogs,
  generateMockAlert,
  generateMockAlerts,
  generateMockInsight,
  generateMockInsights,
  generateMockStats,
} from "../mock-data";

describe("generateMockLog", () => {
  it("returns a log with all required fields", () => {
    const log = generateMockLog();
    expect(log.id).toBeDefined();
    expect(log.timestamp).toBeDefined();
    expect(["ERROR", "WARNING", "INFO", "DEBUG"]).toContain(log.level);
    expect(log.service).toBeDefined();
    expect(log.message).toBeDefined();
    expect(log.original_language).toBe("en");
    expect(log.metadata).toBeDefined();
    expect(log.created_at).toBeDefined();
  });

  it("includes stack trace only for ERROR level", () => {
    // Generate many logs to get variety
    const logs = Array.from({ length: 100 }, () => generateMockLog());
    const nonErrorWithTrace = logs.filter(
      (l) => l.level !== "ERROR" && l.stack_trace !== null
    );
    expect(nonErrorWithTrace).toHaveLength(0);
  });
});

describe("generateMockLogs", () => {
  it("generates the specified number of logs", () => {
    const logs = generateMockLogs(10);
    expect(logs).toHaveLength(10);
  });

  it("returns logs sorted by timestamp descending", () => {
    const logs = generateMockLogs(20);
    for (let i = 1; i < logs.length; i++) {
      expect(new Date(logs[i - 1].timestamp).getTime()).toBeGreaterThanOrEqual(
        new Date(logs[i].timestamp).getTime()
      );
    }
  });

  it("defaults to 50 logs", () => {
    const logs = generateMockLogs();
    expect(logs).toHaveLength(50);
  });
});

describe("generateMockAlert", () => {
  it("returns an alert with all required fields", () => {
    const alert = generateMockAlert();
    expect(alert.id).toBeDefined();
    expect(alert.title).toBeDefined();
    expect(alert.description).toBeDefined();
    expect(["CRITICAL", "HIGH", "MEDIUM", "LOW"]).toContain(alert.severity);
    expect(["active", "acknowledged", "resolved"]).toContain(alert.status);
    expect(alert.original_language).toBe("en");
  });

  it("sets resolved_at only when status is resolved", () => {
    const alerts = Array.from({ length: 100 }, () => generateMockAlert());
    const badAlerts = alerts.filter(
      (a) => a.status !== "resolved" && a.resolved_at !== null
    );
    expect(badAlerts).toHaveLength(0);
  });
});

describe("generateMockAlerts", () => {
  it("generates the specified number of alerts", () => {
    expect(generateMockAlerts(5)).toHaveLength(5);
  });

  it("returns alerts sorted by created_at descending", () => {
    const alerts = generateMockAlerts(10);
    for (let i = 1; i < alerts.length; i++) {
      expect(new Date(alerts[i - 1].created_at).getTime()).toBeGreaterThanOrEqual(
        new Date(alerts[i].created_at).getTime()
      );
    }
  });
});

describe("generateMockInsight", () => {
  it("returns an insight with all required fields", () => {
    const insight = generateMockInsight();
    expect(insight.id).toBeDefined();
    expect(insight.insight_type).toBeDefined();
    expect(insight.title).toBeDefined();
    expect(insight.description).toBeDefined();
    expect(["CRITICAL", "HIGH", "MEDIUM", "LOW"]).toContain(insight.severity);
    expect(insight.related_logs.length).toBeGreaterThan(0);
    expect(insight.language).toBe("en");
  });
});

describe("generateMockInsights", () => {
  it("generates the specified number of insights", () => {
    expect(generateMockInsights(3)).toHaveLength(3);
  });
});

describe("generateMockStats", () => {
  it("returns stats with positive values", () => {
    const stats = generateMockStats();
    expect(stats.totalLogs).toBeGreaterThan(0);
    expect(stats.errorCount).toBeGreaterThan(0);
    expect(stats.warningCount).toBeGreaterThan(0);
    expect(stats.activeAlerts).toBeGreaterThan(0);
    expect(stats.criticalAlerts).toBeGreaterThan(0);
    expect(stats.servicesMonitored).toBe(6);
  });
});
