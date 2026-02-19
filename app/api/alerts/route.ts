import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateMockAlerts } from "@/lib/mock-data";
import { translateAlert } from "@/lib/lingo";
import type { Alert } from "@/lib/supabase";

// In-memory fallback store
let alertsFallback: Alert[] = generateMockAlerts(10);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const language = searchParams.get("language") || "en";

  try {
    let query = supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);

    const { data, error } = await query;

    let alerts = data && !error && data.length > 0 ? data : [...alertsFallback];

    if (status && !data) {
      alerts = alerts.filter((a) => a.status === status);
    }

    if (language !== "en") {
      alerts = await Promise.all(alerts.map((a) => translateAlert(a, language)));
    }

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json({ alerts: alertsFallback });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, severity, metadata } = body;

    if (!title || !description || !severity) {
      return NextResponse.json(
        { error: "title, description, and severity are required" },
        { status: 400 }
      );
    }

    const alertData = {
      title,
      description,
      severity,
      status: "active" as const,
      original_language: "en",
      metadata: metadata || null,
    };

    const { data, error } = await supabase
      .from("alerts")
      .insert(alertData)
      .select()
      .single();

    if (error) {
      // Fallback to in-memory
      const alert: Alert = {
        id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
        ...alertData,
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        resolved_at: null,
      };
      alertsFallback = [alert, ...alertsFallback];
      return NextResponse.json({ alert }, { status: 201 });
    }

    return NextResponse.json({ alert: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (status === "resolved") {
      updateData.resolved_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("alerts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // Fallback to in-memory
      const index = alertsFallback.findIndex((a) => a.id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Alert not found" }, { status: 404 });
      }
      alertsFallback[index] = {
        ...alertsFallback[index],
        status,
        updated_at: new Date().toISOString(),
        resolved_at: status === "resolved" ? new Date().toISOString() : alertsFallback[index].resolved_at,
      };
      return NextResponse.json({ alert: alertsFallback[index] });
    }

    return NextResponse.json({ alert: data });
  } catch (error) {
    console.error("Error updating alert:", error);
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}
