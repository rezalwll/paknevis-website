"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createAdminUserRecord, updateAdminUserActiveState } from "@/lib/admin-data";
import { hashPassword, requireAdminRole } from "@/lib/admin-auth";
import { isAdminRole } from "@/lib/admin-types";
import { buildPathWithState } from "@/lib/http";
import {
  isValidAdminEmail,
  isValidAdminUsername,
  normalizeAdminEmail,
  normalizeAdminUsername,
} from "@/lib/admin-identity";
import { parsePositiveInt } from "@/lib/parsers";

function redirectWithState(path: string, key: "error" | "notice", value: string): never {
  redirect(buildPathWithState(path, key, value));
}

export async function createAdminUserAction(formData: FormData) {
  await requireAdminRole(["super_admin"]);

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = normalizeAdminEmail(String(formData.get("email") ?? ""));
  const username = normalizeAdminUsername(String(formData.get("username") ?? ""));
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "");

  if (
    !fullName ||
    !isValidAdminEmail(email) ||
    !isValidAdminUsername(username) ||
    password.length < 8 ||
    !isAdminRole(role)
  ) {
    redirectWithState("/admin/users", "error", "invalid-user");
  }

  try {
    const passwordHash = await hashPassword(password);

    await createAdminUserRecord({
      email,
      username,
      fullName,
      role,
      passwordHash,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as Error & { code?: string }).code === "23505"
    ) {
      const constraint = (error as Error & { constraint?: string }).constraint ?? "";

      if (constraint.includes("username")) {
        redirectWithState("/admin/users", "error", "username-taken");
      }

      redirectWithState("/admin/users", "error", "email-taken");
    }

    throw error;
  }

  revalidatePath("/admin/users");
  redirectWithState("/admin/users", "notice", "user-created");
}

export async function toggleAdminUserActiveAction(formData: FormData) {
  const currentUser = await requireAdminRole(["super_admin"]);
  const targetUserId = parsePositiveInt(String(formData.get("userId") ?? ""));
  const nextActiveState = String(formData.get("nextActiveState") ?? "") === "true";

  if (targetUserId === null) {
    redirectWithState("/admin/users", "error", "invalid-user");
  }

  if (targetUserId === currentUser.id && !nextActiveState) {
    redirectWithState("/admin/users", "error", "self-disable");
  }

  try {
    await updateAdminUserActiveState(targetUserId, nextActiveState);
  } catch (error) {
    if (error instanceof Error && error.message === "LAST_SUPER_ADMIN") {
      redirectWithState("/admin/users", "error", "last-super-admin");
    }

    throw error;
  }

  revalidatePath("/admin/users");
  redirectWithState("/admin/users", "notice", "user-updated");
}
