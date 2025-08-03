"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { assignContactMessage, updateContactMessageStatus } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import { isMessageStatus } from "@/lib/admin-types";

function getSafeRedirectPath(value: string | null, fallback: string): string {
  if (!value || !value.startsWith("/admin")) {
    return fallback;
  }

  return value;
}

export async function updateMessageStatusAction(formData: FormData) {
  const actor = await requireAdminUser();
  const messageId = Number.parseInt(String(formData.get("messageId") ?? ""), 10);
  const status = String(formData.get("status") ?? "");
  const redirectTo = getSafeRedirectPath(
    typeof formData.get("redirectTo") === "string"
      ? String(formData.get("redirectTo"))
      : null,
    "/admin/messages",
  );

  if (!Number.isInteger(messageId) || messageId <= 0 || !isMessageStatus(status)) {
    redirect(redirectTo);
  }

  await updateContactMessageStatus({
    actor,
    messageId,
    status,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${messageId}`);
  redirect(redirectTo);
}

export async function assignMessageAction(formData: FormData) {
  const actor = await requireAdminUser();
  const messageId = Number.parseInt(String(formData.get("messageId") ?? ""), 10);
  const assignedToRaw = String(formData.get("assignedTo") ?? "").trim();
  const redirectTo = getSafeRedirectPath(
    typeof formData.get("redirectTo") === "string"
      ? String(formData.get("redirectTo"))
      : null,
    "/admin/messages",
  );

  if (!Number.isInteger(messageId) || messageId <= 0) {
    redirect(redirectTo);
  }

  const assignedTo =
    assignedToRaw === ""
      ? null
      : Number.isInteger(Number.parseInt(assignedToRaw, 10))
        ? Number.parseInt(assignedToRaw, 10)
        : null;

  await assignContactMessage({
    actor,
    messageId,
    assignedTo,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${messageId}`);
  redirect(redirectTo);
}
