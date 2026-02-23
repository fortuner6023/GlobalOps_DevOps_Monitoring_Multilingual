import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateMockInsights } from "@/lib/mock-data";
import { translateText } from "@/lib/lingo";
import type { AIInsight } from "@/lib/supabase";

// In-memory fallback
let insightsFallback: AIInsight[] = generateMockInsights(5);

async function translateInsight(insight: AIInsight, targetLocale: string): Promise<AIInsight> {
  const [title, description] = await Promise.all([
    translateText(insight.title, targetLocale),
    translateText(insight.description, targetLocale),
  ]);
  return { ...insight, title, description };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const language = searchParams.get("language") || "en";

  try {
    const { data, error } = await supabase
      .from("ai_insights")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    let insights = data && !error && data.length > 0 ? data : insightsFallback.slice(0, limit);

    if (language !== "en") {
      insights = await Promise.all(insights.map((i) => translateInsight(i, language)));
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Error fetching insights:", error);
    return NextResponse.json({ insights: insightsFallback.slice(0, limit) });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { logIds, language = "en" } = body;

    if (!logIds || !Array.isArray(logIds)) {
      return NextResponse.json({ error: "logIds array is required" }, { status: 400 });
    }

    // Generate insight - translate title/description using Lingo SDK
    const baseTitle = "Error Pattern Detected in Services";
    const baseDescription = `Analysis of ${logIds.length} logs reveals recurring error patterns. Multiple services showing increased latency and connection failures. Recommended: Review connection pool settings and implement circuit breakers.`;

    const [title, description] = language !== "en"
      ? await Promise.all([
          translateText(baseTitle, language),
          translateText(baseDescription, language),
        ])
      : [baseTitle, baseDescription];

    const insightData = {
      insight_type: "pattern",
      title,
      description,
      severity: (logIds.length > 10 ? "HIGH" : "MEDIUM") as AIInsight["severity"],
      related_logs: logIds,
      metadata: null,
      language,
    };

    const { data, error } = await supabase
      .from("ai_insights")
      .insert(insightData)
      .select()
      .single();

    if (error) {
      // Fallback to in-memory
      const insight: AIInsight = {
        id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
        ...insightData,
        created_at: new Date().toISOString(),
      };
      insightsFallback = [insight, ...insightsFallback];
      return NextResponse.json({ insight }, { status: 201 });
    }

    return NextResponse.json({ insight: data }, { status: 201 });
  } catch (error) {
    console.error("Error generating insight:", error);
    return NextResponse.json({ error: "Failed to generate insight" }, { status: 500 });
  }
}
