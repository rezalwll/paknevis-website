"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { assignContactMessage, updateContactMessageStatus } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/admin-auth";
import { isMessageStatus } from "@/lib/admin-types";
import { getSafeAdminRedirectPath } from "@/lib/http";
import { parsePositiveInt } from "@/lib/parsers";

type RedirectFormValue = FormDataEntryValue | null;

export async function updateMessageStatusAction(formData: FormData) {
  const actor = await requireAdminUser();
  const messageId = parsePositiveInt(String(formData.get("messageId") ?? ""));
  const status = String(formData.get("status") ?? "");
  const redirectValue = formData.get("redirectTo") as RedirectFormValue;
  const redirectTo = getSafeAdminRedirectPath(
    typeof redirectValue === "string" ? redirectValue : null,
    "/admin/messages",
  );

  if (messageId === null || !isMessageStatus(status)) {
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
  const messageId = parsePositiveInt(String(formData.get("messageId") ?? ""));
  const assignedToRaw = String(formData.get("assignedTo") ?? "").trim();
  const redirectValue = formData.get("redirectTo") as RedirectFormValue;
  const redirectTo = getSafeAdminRedirectPath(
    typeof redirectValue === "string" ? redirectValue : null,
    "/admin/messages",
  );

  if (messageId === null) {
    redirect(redirectTo);
  }

  const parsedAssignedTo = parsePositiveInt(assignedToRaw);
  const assignedTo = assignedToRaw === "" ? null : parsedAssignedTo;

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
