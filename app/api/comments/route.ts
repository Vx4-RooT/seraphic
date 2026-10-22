import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "birthday_comments";
const MAX_NAME_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 500;

function getConfig() {
  const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return null;
  return { baseUrl, serviceKey };
}

function headers(serviceKey: string, extra?: Record<string, string>) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function GET() {
  const config = getConfig();
  if (!config) {
    return NextResponse.json({ error: "Comments are not configured yet." }, { status: 503 });
  }

  try {
    const response = await fetch(
      `${config.baseUrl}/rest/v1/${TABLE}?select=id,name,message,created_at&order=created_at.desc&limit=50`,
      { headers: headers(config.serviceKey), cache: "no-store" },
    );
    if (!response.ok) {
      console.error("Supabase comments read failed:", response.status);
      return NextResponse.json({ error: "Could not load comments." }, { status: 502 });
    }
    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "Could not connect to the message archive." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const config = getConfig();
  if (!config) {
    return NextResponse.json({ error: "Comments are not configured yet." }, { status: 503 });
  }

  let body: { name?: unknown; message?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid message." }, { status: 400 });
  }

  // Silently accept honeypot submissions so basic bots do not learn the check failed.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Name must be between 1 and 40 characters." }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message must be between 1 and 500 characters." }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.baseUrl}/rest/v1/${TABLE}?select=id,name,message,created_at`, {
      method: "POST",
      headers: headers(config.serviceKey, { Prefer: "return=representation" }),
      body: JSON.stringify({ name, message }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supabase comments insert failed:", response.status);
      return NextResponse.json({ error: "Your note could not be saved. Please try again." }, { status: 502 });
    }

    const inserted = (await response.json()) as Array<{ id: string; name: string; message: string; created_at: string }>;
    return NextResponse.json({ ok: true, comment: inserted[0] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not connect to the message archive." }, { status: 502 });
  }
}
