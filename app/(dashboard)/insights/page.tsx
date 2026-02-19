import { InsightsPanel } from "@/components/dashboard/InsightsPanel";

export const dynamic = "force-dynamic";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered analysis of your logs and alerts
        </p>
      </div>
      <InsightsPanel />
    </div>
  );
}
