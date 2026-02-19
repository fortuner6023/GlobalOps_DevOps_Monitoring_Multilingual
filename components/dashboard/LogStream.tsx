"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/lib/language-context";
import { getLevelColor } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { Download, Filter } from "lucide-react";
import type { Log } from "@/lib/supabase";

const ALL_LEVELS = ["ALL", "ERROR", "WARNING", "INFO", "DEBUG"] as const;
const ALL_SERVICES = ["ALL", "authentication", "api-gateway", "database", "payment", "notification", "user-service"] as const;

export function LogStream() {
  const { language } = useLanguage();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [isRealtime, setIsRealtime] = useState(false);
  const [levelFilter, setLevelFilter] = useState<string>("ALL");
  const [serviceFilter, setServiceFilter] = useState<string>("ALL");

  const fetchInitialLogs = useCallback(async () => {
    try {
      const res = await fetch(`/api/logs?limit=50&language=${language}`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    setLoading(true);
    fetchInitialLogs();
  }, [fetchInitialLogs]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const channel = supabase
      .channel("logs-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "logs" },
        (payload) => {
          const newLog = payload.new as Log;
          setLogs((prev) => [newLog, ...prev].slice(0, 100));
          setIsRealtime(true);
        }
      )
      .subscribe();

    const interval = setInterval(async () => {
      if (isRealtime) return;
      try {
        const res = await fetch(`/api/logs?limit=1&language=${language}`);
        const data = await res.json();
        if (data.logs?.[0]) {
          setLogs((prev) => {
            const newLog = {
              ...data.logs[0],
              id: crypto.randomUUID?.() || Math.random().toString(36),
            };
            return [newLog, ...prev].slice(0, 100);
          });
        }
      } catch {
        // ignore polling errors
      }
    }, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [language, isRealtime]);

  const filteredLogs = logs.filter((log) => {
    if (levelFilter !== "ALL" && log.level !== levelFilter) return false;
    if (serviceFilter !== "ALL" && log.service !== serviceFilter) return false;
    return true;
  });

  const exportCSV = () => {
    const header = "timestamp,level,service,message\n";
    const rows = filteredLogs
      .map(
        (l) =>
          `${l.timestamp},${l.level},${l.service},"${l.message.replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="rounded-md border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {ALL_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l === "ALL" ? "All Levels" : l}
            </option>
          ))}
        </select>

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="rounded-md border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {ALL_SERVICES.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "All Services" : s}
            </option>
          ))}
        </select>

        <span className="ml-auto text-xs text-muted-foreground">
          {filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""}
        </span>

        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {/* Live indicator — animation spans are isolated in LiveDot so the
          Lingo Compiler doesn't serialize them as span0/span1 placeholders
          inside the translated string. */}
      {isRealtime && (
        <div className="flex items-center gap-2 text-xs text-green-400">
          <LiveDot />
          <span>Live — Real-time streaming active</span>
        </div>
      )}

      {/* Log list */}
      {filteredLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <ActivityIcon className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm">
            {logs.length === 0
              ? "No logs yet. Generate some demo data to get started."
              : "No logs match the current filters."}
          </p>
        </div>
      ) : (
        filteredLogs.map((log) => (
          <Card
            key={log.id}
            className="p-4 hover:border-primary/20 transition-all cursor-pointer animate-slide-in"
            onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
          >
            <div className="flex items-start gap-3">
              <Badge variant={getLevelColor(log.level)} className="mt-0.5 shrink-0">
                {log.level}
              </Badge>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary">{log.service}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 break-words">{log.message}</p>

                {expandedLog === log.id && log.metadata && (
                  <div className="mt-3 rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Metadata</p>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                    {log.stack_trace && (
                      <>
                        <p className="text-xs font-medium text-muted-foreground mt-3 mb-2">
                          Stack Trace
                        </p>
                        <pre className="text-xs text-red-400/80 overflow-x-auto whitespace-pre-wrap">
                          {log.stack_trace}
                        </pre>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

// Isolated into its own component so Lingo Compiler treats it as a single
// opaque element and doesn't serialize the inner spans as span0/span1.
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
    </span>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}
