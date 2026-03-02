import { NextRequest, NextResponse } from "next/server";
import { getData, setData } from "@/lib/kv";

// Simple bearer token auth for external access (Claude sessions, scripts).
// Internal app requests (same origin) skip auth.
function isAuthorized(request: NextRequest): boolean {
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");

  // Allow same-origin requests (the app itself)
  if (referer || origin) return true;

  // External requests need the API key
  const apiKey = process.env.DATA_API_KEY;
  if (!apiKey) return false;

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${apiKey}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const data = await getData();
  if (!data) {
    return NextResponse.json(null, { status: 204 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await setData(body);
  return NextResponse.json({ ok: true });
}
