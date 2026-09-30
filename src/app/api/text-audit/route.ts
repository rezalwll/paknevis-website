import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { analyzePersianText } from "@/lib/text-audit";

import { TextAuditRequestError } from "./errors";
import { readTextAuditRequest } from "./request";

export const runtime = "nodejs";

function resolveRequestId(request: Request): string {
  const supplied = request.headers.get("x-request-id")?.trim();
  return supplied && /^[a-zA-Z0-9_-]{8,80}$/.test(supplied) ? supplied : randomUUID();
}

export async function POST(request: Request) {
  const requestId = resolveRequestId(request);
  const headers = { "Cache-Control": "no-store", "X-Request-Id": requestId };

  try {
    const text = await readTextAuditRequest(request);
    const report = analyzePersianText(text);

    return NextResponse.json({ ok: true, report, meta: { requestId } }, { headers });
  } catch (error) {
    if (error instanceof TextAuditRequestError) {
      return NextResponse.json(
        { ok: false, error: { code: error.code, message: error.message }, meta: { requestId } },
        { status: error.status, headers },
      );
    }

    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "ممیزی متن انجام نشد." }, meta: { requestId } },
      { status: 500, headers },
    );
  }
}
