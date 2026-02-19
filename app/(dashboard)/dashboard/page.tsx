import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { LogStream } from "@/components/dashboard/LogStream";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { GenerateDemoButton } from "@/components/dashboard/GenerateDemoButton";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your services in real-time</p>
        </div>
        <GenerateDemoButton />
      </div>

      <StatsOverview />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
          <LogStream />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
