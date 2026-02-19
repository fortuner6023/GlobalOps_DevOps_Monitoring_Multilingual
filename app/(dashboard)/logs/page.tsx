import { LogStream } from "@/components/dashboard/LogStream";

export const dynamic = "force-dynamic";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logs</h1>
        <p className="text-muted-foreground mt-1">
          Real-time log streaming with automatic translation
        </p>
      </div>
      <LogStream />
    </div>
  );
}
