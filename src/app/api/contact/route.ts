import { NextResponse } from "next/server";

import { validateContactPayload } from "@/lib/contact";
import { insertContactMessage } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "درخواست ارسالی معتبر نیست.",
      },
      { status: 400 },
    );
  }

  const validation = validateContactPayload(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await insertContactMessage(validation.data);

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save contact form message.", error);

    return NextResponse.json(
      {
        ok: false,
        message: "ثبت پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
