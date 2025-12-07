import { NextResponse } from "next/server";

import { analyzePersianText } from "@/lib/text-audit";

import { TextAuditRequestError } from "./errors";
import { readTextAuditRequest } from "./request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const text = await readTextAuditRequest(request);
    const report = analyzePersianText(text);

    return NextResponse.json({ ok: true, report }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof TextAuditRequestError) {
      return NextResponse.json(
        { ok: false, error: { code: error.code, message: error.message } },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "ممیزی متن انجام نشد." } },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
