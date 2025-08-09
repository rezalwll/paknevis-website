import { NextResponse } from "next/server";

import { validateContactPayload } from "@/lib/contact";
import { insertContactMessage } from "@/lib/db";
import { logServerError } from "@/lib/server-log";
import { sendUserCommentChrome } from "@/lib/user-comments-chrome";

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
    await sendUserCommentChrome(validation.data);
  } catch (error) {
    logServerError("Failed to send contact form message to user-comments-chrome service.", error);

    return NextResponse.json(
      {
        ok: false,
        message: "ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
      },
      { status: 502 },
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
    logServerError("Failed to save contact form message.", error);

    return NextResponse.json(
      {
        ok: false,
        message: "ثبت پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
