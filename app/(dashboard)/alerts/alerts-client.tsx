"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Plus, AlertTriangle } from "lucide-react";
import type { Alert } from "@/lib/supabase";

type StatusFilter = "all" | "active" | "acknowledged" | "resolved";

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "acknowledged", label: "Acknowledged" },
  { key: "resolved", label: "Resolved" },
];

export default function AlertsPageClient() {
  const { language } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch(`/api/alerts?language=${language}`);
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    setLoading(true);
    fetchAlerts();
  }, [fetchAlerts]);

  const handleStatusChange = async (id: string, status: "acknowledged" | "resolved") => {
    try {
      await fetch("/api/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchAlerts();
    } catch (error) {
      console.error("Failed to update alert:", error);
    }
  };

  const handleCreateAlert = async () => {
    setCreating(true);
    try {
      await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Test Alert",
          description: "This is a test alert created from the dashboard to demonstrate the alert system.",
          severity: "MEDIUM",
        }),
      });
      fetchAlerts();
    } catch (error) {
      console.error("Failed to create alert:", error);
    } finally {
      setCreating(false);
    }
  };

  const counts: Record<StatusFilter, number> = {
    all: alerts.length,
    active: alerts.filter((a) => a.status === "active").length,
    acknowledged: alerts.filter((a) => a.status === "acknowledged").length,
    resolved: alerts.filter((a) => a.status === "resolved").length,
  };

  const visibleAlerts =
    statusFilter === "all" ? alerts : alerts.filter((a) => a.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-1">Manage and track system alerts</p>
        </div>
        <Button onClick={handleCreateAlert} disabled={creating}>
          <Plus className="h-4 w-4" />
          New Alert
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1 w-fit">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              statusFilter === tab.key
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                statusFilter === tab.key
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : visibleAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm">
            {alerts.length === 0 ? "No alerts found." : `No ${statusFilter} alerts.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}
