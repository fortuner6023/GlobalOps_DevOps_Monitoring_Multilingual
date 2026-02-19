"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/lib/language-context";
import { getSeverityColor } from "@/lib/utils";
import { Lightbulb, RefreshCw } from "lucide-react";
import type { AIInsight } from "@/lib/supabase";

export function InsightsPanel() {
  const { language } = useLanguage();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await fetch(`/api/insights?limit=10&language=${language}`);
      const data = await res.json();
      setInsights(data.insights || []);
    } catch (err) {
      console.error("Failed to fetch insights:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    setLoading(true);
    fetchInsights();
  }, [fetchInsights]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logIds: ["demo-1", "demo-2", "demo-3"], language }),
      });
      await fetchInsights();
    } catch (err) {
      console.error("Failed to generate insight:", err);
    } finally {
      setGenerating(false);
    }
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
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{insights.length} insight{insights.length !== 1 ? "s" : ""}</span>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${generating ? "animate-spin" : ""}`} />
          {generating ? "Generating…" : "Generate"}
        </button>
      </div>

      {insights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Lightbulb className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm">No insights generated yet.</p>
          <p className="text-xs mt-1">Click Generate to analyze logs.</p>
        </div>
      ) : (
        insights.map((insight) => (
          <Card key={insight.id} className="p-4 hover:border-primary/20 transition-colors animate-slide-in">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant={getSeverityColor(insight.severity)}>{insight.severity}</Badge>
                  <Badge variant="secondary">{insight.insight_type}</Badge>
                </div>
                <h4 className="text-sm font-semibold mb-1">{insight.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {insight.related_logs.length} related log{insight.related_logs.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
