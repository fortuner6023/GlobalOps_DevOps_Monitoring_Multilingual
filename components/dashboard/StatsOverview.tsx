"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Activity, AlertCircle, AlertTriangle, TrendingUp, Server, Shield } from "lucide-react";
import type { DashboardStats } from "@/lib/supabase";

function useCountUp(target: number, duration = 900): number {
  const [count, setCount] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (target === prev.current) return;
    const start = prev.current;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + eased * (target - start)));
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = target;
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

function AnimatedStat({ value }: { value: number }) {
  const count = useCountUp(value);
  return <>{count.toLocaleString()}</>;
}

export function StatsOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-16 animate-pulse rounded bg-muted" />
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    { label: "Total Logs", value: stats.totalLogs, icon: Activity, color: "text-blue-400" },
    { label: "Errors", value: stats.errorCount, icon: AlertCircle, color: "text-red-400" },
    { label: "Warnings", value: stats.warningCount, icon: AlertTriangle, color: "text-amber-400" },
    { label: "Active Alerts", value: stats.activeAlerts, icon: TrendingUp, color: "text-orange-400" },
    { label: "Critical", value: stats.criticalAlerts, icon: Shield, color: "text-rose-500" },
    { label: "Services", value: stats.servicesMonitored, icon: Server, color: "text-green-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statCards.map((stat) => (
        <Card key={stat.label} className="p-4 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <stat.icon className={`h-5 w-5 shrink-0 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold tabular-nums">
                <AnimatedStat value={stat.value} />
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
