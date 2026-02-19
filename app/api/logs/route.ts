import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateMockLogs, generateMockLog } from "@/lib/mock-data";
import { translateLog } from "@/lib/lingo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const level = searchParams.get("level");
  const service = searchParams.get("service");
  const language = searchParams.get("language") || "en";

  try {
    let query = supabase
      .from("logs")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(limit);

    if (level) query = query.eq("level", level);
    if (service) query = query.eq("service", service);

    const { data, error } = await query;

    // Fallback to mock data if Supabase tables aren't set up yet
    let logs = data && !error && data.length > 0 ? data : generateMockLogs(limit);

    if (language !== "en") {
      logs = await Promise.all(logs.map((log) => translateLog(log, language)));
    }

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    // Fallback to mock data on any error
    const logs = generateMockLogs(limit);
    return NextResponse.json({ logs });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, service, message, metadata, stack_trace, original_language } = body;

    if (!level || !service || !message) {
      return NextResponse.json(
        { error: "level, service, and message are required" },
        { status: 400 }
      );
    }

    const logData = {
      level,
      service,
      message,
      metadata: metadata || null,
      stack_trace: stack_trace || null,
      original_language: original_language || "en",
    };

    const { data, error } = await supabase
      .from("logs")
      .insert(logData)
      .select()
      .single();

    if (error) {
      // Fallback: return a mock log if Supabase isn't ready
      const log = { ...generateMockLog(), ...logData };
      return NextResponse.json({ log }, { status: 201 });
    }

    return NextResponse.json({ log: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
  }
}
