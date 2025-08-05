"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getAdminUserPasswordHashById,
  updateOwnAdminPassword,
  updateOwnAdminProfile,
} from "@/lib/admin-data";
import { hashPassword, requireAdminUser, verifyPassword } from "@/lib/admin-auth";
import {
  isValidAdminEmail,
  isValidAdminUsername,
  normalizeAdminEmail,
  normalizeAdminUsername,
} from "@/lib/admin-identity";

function redirectWithState(key: "error" | "notice", value: string): never {
  redirect(`/admin/profile?${key}=${encodeURIComponent(value)}`);
}

function revalidateAdminProfilePages() {
  revalidatePath("/admin");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/users");
}

export async function updateOwnProfileAction(formData: FormData) {
  const currentUser = await requireAdminUser();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = normalizeAdminEmail(String(formData.get("email") ?? ""));
  const username = normalizeAdminUsername(String(formData.get("username") ?? ""));

  if (
    !fullName ||
    fullName.length > 120 ||
    !isValidAdminEmail(email) ||
    !isValidAdminUsername(username)
  ) {
    redirectWithState("error", "invalid-profile");
  }

  try {
    await updateOwnAdminProfile({
      userId: currentUser.id,
      fullName,
      email,
      username,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as Error & { code?: string }).code === "23505"
    ) {
      const constraint = (error as Error & { constraint?: string }).constraint ?? "";

      if (constraint.includes("username")) {
        redirectWithState("error", "username-taken");
      }

      redirectWithState("error", "email-taken");
    }

    throw error;
  }

  revalidateAdminProfilePages();
  redirectWithState("notice", "profile-updated");
}

export async function changeOwnPasswordAction(formData: FormData) {
  const currentUser = await requireAdminUser();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const nextPassword = String(formData.get("nextPassword") ?? "");
  const nextPasswordConfirmation = String(formData.get("nextPasswordConfirmation") ?? "");

  if (
    !currentPassword ||
    nextPassword.length < 8 ||
    nextPassword !== nextPasswordConfirmation
  ) {
    redirectWithState("error", "invalid-password");
  }

  const currentPasswordHash = await getAdminUserPasswordHashById(currentUser.id);

  if (!currentPasswordHash) {
    redirectWithState("error", "invalid-profile");
  }

  const currentPasswordMatches = await verifyPassword(
    currentPassword,
    currentPasswordHash,
  );

  if (!currentPasswordMatches) {
    redirectWithState("error", "current-password");
  }

  await updateOwnAdminPassword({
    userId: currentUser.id,
    passwordHash: await hashPassword(nextPassword),
  });

  revalidateAdminProfilePages();
  redirectWithState("notice", "password-updated");
}
