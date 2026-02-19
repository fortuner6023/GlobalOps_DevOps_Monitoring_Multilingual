"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSeverityColor } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { Alert } from "@/lib/supabase";

interface AlertCardProps {
  alert: Alert;
  onStatusChange: (id: string, status: "acknowledged" | "resolved") => void;
}

const statusStyles: Record<string, string> = {
  active: "bg-red-500/20 text-red-400 border-red-500/30",
  acknowledged: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
};

export function AlertCard({ alert, onStatusChange }: AlertCardProps) {
  return (
    <Card className="p-5 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${
                statusStyles[alert.status]
              }`}
            >
              {alert.status}
            </span>
          </div>
          <h3 className="text-base font-semibold mb-1">{alert.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
          <p className="text-xs text-muted-foreground">
            Created {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
          </p>
        </div>

        {alert.status === "active" && (
          <div className="flex flex-col gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(alert.id, "acknowledged")}
            >
              Acknowledge
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onStatusChange(alert.id, "resolved")}
            >
              Resolve
            </Button>
          </div>
        )}

        {alert.status === "acknowledged" && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onStatusChange(alert.id, "resolved")}
          >
            Resolve
          </Button>
        )}
      </div>
    </Card>
  );
}
