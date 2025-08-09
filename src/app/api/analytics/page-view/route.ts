import { NextResponse, type NextRequest } from "next/server";

import {
  isLikelyBotUserAgent,
  normalizeTrackedPath,
  recordPageView,
} from "@/lib/page-views";
import { logServerError } from "@/lib/server-log";

export const runtime = "nodejs";

type PageViewPayload = {
  path?: unknown;
};

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");

  if (isLikelyBotUserAgent(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  const payload = (await request.json().catch(() => null)) as PageViewPayload | null;
  const normalizedPath =
    typeof payload?.path === "string" ? normalizeTrackedPath(payload.path) : null;

  if (!normalizedPath) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    await recordPageView(normalizedPath);
  } catch (error) {
    logServerError("Failed to record page view.", error, { path: normalizedPath });
  }

  return new NextResponse(null, { status: 204 });
}
