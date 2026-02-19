import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateMockStats } from "@/lib/mock-data";

export async function GET() {
  try {
    const [logsRes, errorsRes, warningsRes, alertsRes, criticalRes, servicesRes] =
      await Promise.all([
        supabase.from("logs").select("*", { count: "exact", head: true }),
        supabase.from("logs").select("*", { count: "exact", head: true }).eq("level", "ERROR"),
        supabase.from("logs").select("*", { count: "exact", head: true }).eq("level", "WARNING"),
        supabase.from("alerts").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase
          .from("alerts")
          .select("*", { count: "exact", head: true })
          .eq("status", "active")
          .eq("severity", "CRITICAL"),
        supabase.from("logs").select("service"),
      ]);

    // If any query errors, fall back to mock
    if (logsRes.error || errorsRes.error || alertsRes.error) {
      return NextResponse.json(generateMockStats());
    }

    const uniqueServices = new Set(
      (servicesRes.data || []).map((r: { service: string }) => r.service)
    );

    const totalLogs = logsRes.count || 0;

    // If database is empty, return mock stats so dashboard looks populated
    if (totalLogs === 0) {
      return NextResponse.json(generateMockStats());
    }

    return NextResponse.json({
      totalLogs,
      errorCount: errorsRes.count || 0,
      warningCount: warningsRes.count || 0,
      activeAlerts: alertsRes.count || 0,
      criticalAlerts: criticalRes.count || 0,
      servicesMonitored: uniqueServices.size,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(generateMockStats());
  }
}
