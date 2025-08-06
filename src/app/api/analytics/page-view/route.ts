import { NextResponse, type NextRequest } from "next/server";

import {
  isLikelyBotUserAgent,
  normalizeTrackedPath,
  recordPageView,
} from "@/lib/page-views";

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");

  if (isLikelyBotUserAgent(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  const payload = (await request.json().catch(() => null)) as { path?: unknown } | null;
  const normalizedPath =
    typeof payload?.path === "string" ? normalizeTrackedPath(payload.path) : null;

  if (!normalizedPath) {
    return new NextResponse(null, { status: 204 });
  }

  await recordPageView(normalizedPath);

  return new NextResponse(null, { status: 204 });
}
