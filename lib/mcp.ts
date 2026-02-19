// Lingo MCP (Tool #5) - AI-powered insights via Cursor MCP
import type { Log } from "./supabase";

export function formatLogsForMCP(logs: Log[]) {
  return logs.map((log) => ({
    message: log.message,
    level: log.level,
    timestamp: log.timestamp,
    service: log.service,
  }));
}

export function generateInsightPrompt(logs: Log[], language: string): string {
  const formattedLogs = formatLogsForMCP(logs);
  const logSummary = JSON.stringify(formattedLogs, null, 2);

  return `Analyze the following DevOps logs and provide insights in ${language}:

${logSummary}

Please provide:
1. Key patterns observed
2. Anomalies or concerning trends
3. Actionable recommendations
4. Overall system health assessment

Respond entirely in ${language}.`;
}

// MCP Setup Instructions:
// 1. Open Cursor Settings → MCP tab
// 2. Add new MCP server:
//    - Name: Lingo.dev
//    - Command: npx
//    - Args: ["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]
// 3. Restart Cursor
// 4. Verify green status indicator
