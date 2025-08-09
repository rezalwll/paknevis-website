"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminRole } from "@/lib/admin-auth";
import { buildPathWithState } from "@/lib/http";
import { parseNonNegativeInt, parsePositiveInt, parsePositiveNumber } from "@/lib/parsers";
import {
  createEnterprisePlan,
  setPopularEnterprisePlan,
  toggleEnterprisePlanActiveState,
  updateEnterprisePlan,
} from "@/lib/enterprise-plans";

function redirectWithState(path: string, key: "error" | "notice", value: string): never {
  redirect(buildPathWithState(path, key, value));
}

function revalidateEnterprisePlanPages() {
  revalidatePath("/admin/enterprise-plans");
  revalidatePath("/pricing");
  revalidatePath("/enterprise");
}

async function requireEnterprisePlanManager() {
  await requireAdminRole(["super_admin", "support_manager"]);
}

export async function createEnterprisePlanAction(formData: FormData) {
  await requireEnterprisePlanManager();

  const title = String(formData.get("title") ?? "").trim();
  const priceMillion = parsePositiveNumber(String(formData.get("priceMillion") ?? "").trim());
  const userCount = parsePositiveInt(String(formData.get("userCount") ?? "").trim());
  const description = String(formData.get("description") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "").trim();
  const sortOrder = sortOrderRaw === "" ? null : parseNonNegativeInt(sortOrderRaw);
  const makePopular = formData.get("makePopular") === "on";

  if (
    !title ||
    title.length > 120 ||
    priceMillion === null ||
    userCount === null ||
    !description ||
    description.length > 320 ||
    (sortOrderRaw !== "" && sortOrder === null)
  ) {
    redirectWithState("/admin/enterprise-plans", "error", "invalid-plan");
  }

  await createEnterprisePlan({
    title,
    priceMillion,
    userCount,
    description,
    sortOrder,
    isPopular: makePopular,
  });

  revalidateEnterprisePlanPages();
  redirectWithState("/admin/enterprise-plans", "notice", "plan-created");
}

export async function updateEnterprisePlanAction(formData: FormData) {
  await requireEnterprisePlanManager();

  const planId = parsePositiveInt(String(formData.get("planId") ?? "").trim());
  const title = String(formData.get("title") ?? "").trim();
  const priceMillion = parsePositiveNumber(String(formData.get("priceMillion") ?? "").trim());
  const userCount = parsePositiveInt(String(formData.get("userCount") ?? "").trim());
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = parseNonNegativeInt(String(formData.get("sortOrder") ?? "").trim());

  if (
    planId === null ||
    !title ||
    title.length > 120 ||
    priceMillion === null ||
    userCount === null ||
    !description ||
    description.length > 320 ||
    sortOrder === null
  ) {
    redirectWithState("/admin/enterprise-plans", "error", "invalid-plan");
  }

  try {
    await updateEnterprisePlan({
      planId,
      title,
      priceMillion,
      userCount,
      description,
      sortOrder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "PLAN_NOT_FOUND") {
      redirectWithState("/admin/enterprise-plans", "error", "invalid-plan-id");
    }

    throw error;
  }

  revalidateEnterprisePlanPages();
  redirectWithState("/admin/enterprise-plans", "notice", "plan-updated");
}

export async function toggleEnterprisePlanActiveAction(formData: FormData) {
  await requireEnterprisePlanManager();

  const planId = parsePositiveInt(String(formData.get("planId") ?? "").trim());
  const nextActiveState = String(formData.get("nextActiveState") ?? "") === "true";

  if (planId === null) {
    redirectWithState("/admin/enterprise-plans", "error", "invalid-plan-id");
  }

  try {
    await toggleEnterprisePlanActiveState(planId, nextActiveState);
  } catch (error) {
    if (error instanceof Error && error.message === "PLAN_NOT_FOUND") {
      redirectWithState("/admin/enterprise-plans", "error", "invalid-plan-id");
    }

    throw error;
  }

  revalidateEnterprisePlanPages();
  redirectWithState("/admin/enterprise-plans", "notice", "plan-status-updated");
}

export async function setPopularEnterprisePlanAction(formData: FormData) {
  await requireEnterprisePlanManager();

  const planId = parsePositiveInt(String(formData.get("planId") ?? "").trim());

  if (planId === null) {
    redirectWithState("/admin/enterprise-plans", "error", "invalid-plan-id");
  }

  try {
    await setPopularEnterprisePlan(planId);
  } catch (error) {
    if (error instanceof Error && error.message === "PLAN_NOT_FOUND") {
      redirectWithState("/admin/enterprise-plans", "error", "invalid-plan-id");
    }

    if (error instanceof Error && error.message === "PLAN_NOT_ACTIVE") {
      redirectWithState("/admin/enterprise-plans", "error", "inactive-plan");
    }

    throw error;
  }

  revalidateEnterprisePlanPages();
  redirectWithState("/admin/enterprise-plans", "notice", "plan-popular-updated");
}
