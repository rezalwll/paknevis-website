"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authenticateAdminUser, beginAdminSession } from "@/lib/admin-auth";
import {
  clearFailedLoginAttempts,
  getRemainingLoginCooldownSeconds,
  registerFailedLoginAttempt,
} from "@/lib/admin-rate-limit";

type LoginActionState = {
  error: string;
};

function getClientAddress(rawValue: string | null): string {
  if (!rawValue) {
    return "unknown";
  }

  return rawValue.split(",")[0]?.trim() || "unknown";
}

export async function loginAdminAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const identifier = String(formData.get("identifier") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!identifier || !password) {
    return {
      error: "ایمیل یا یوزرنیم و رمز عبور الزامی است.",
    };
  }

  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");
  const clientAddress = forwardedFor
    ? getClientAddress(forwardedFor)
    : realIp
      ? getClientAddress(realIp)
      : "unknown";
  const rateLimitKey = `${clientAddress}:${identifier}`;
  const retryAfterSeconds = getRemainingLoginCooldownSeconds(rateLimitKey);

  if (retryAfterSeconds > 0) {
    return {
      error: `تلاش‌های ورود بیش از حد بوده است. ${retryAfterSeconds} ثانیه دیگر دوباره امتحان کنید.`,
    };
  }

  const adminUser = await authenticateAdminUser(identifier, password);

  if (!adminUser) {
    registerFailedLoginAttempt(rateLimitKey);
    return {
      error: "اطلاعات ورود معتبر نیست.",
    };
  }

  clearFailedLoginAttempts(rateLimitKey);
  await beginAdminSession(adminUser.id);
  redirect("/admin");
}
