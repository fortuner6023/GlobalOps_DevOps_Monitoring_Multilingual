"use client";

import { useState } from "react";
import { generateMockLog } from "@/lib/mock-data";
import { Zap } from "lucide-react";

export function GenerateDemoButton() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const logs = Array.from({ length: 10 }, () => generateMockLog());
      await Promise.all(
        logs.map((log) =>
          fetch("/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              level: log.level,
              service: log.service,
              message: log.message,
              metadata: log.metadata,
              stack_trace: log.stack_trace,
              original_language: "en",
            }),
          })
        )
      );
      setCount((c) => c + 10);
      // Brief flash to confirm
      setTimeout(() => setCount(0), 2500);
    } catch (err) {
      console.error("Failed to generate demo data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
    >
      <Zap className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
      {loading
        ? "Generating…"
        : count > 0
        ? `+${count} logs added!`
        : "Generate Demo Logs"}
    </button>
  );
}
