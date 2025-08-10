"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin-auth";
import { isHelpIconKey } from "@/lib/admin-types";
import { parseNonNegativeInt, parsePositiveInt } from "@/lib/parsers";
import {
  archiveHelpCategory,
  archiveHelpQuestion,
  createHelpCategory,
  createHelpQuestion,
  restoreHelpCategory,
  restoreHelpQuestion,
  updateHelpCategory,
  updateHelpQuestion,
} from "@/lib/help-center";

const MAX_CATEGORY_TITLE_LENGTH = 120;
const MAX_QUESTION_LENGTH = 255;
const MAX_ANSWER_LENGTH = 5000;

function parseReturnCategoryId(formData: FormData): number | null {
  return parsePositiveInt(String(formData.get("returnCategoryId") ?? "").trim());
}

function buildHelpCenterPath(
  categoryId: number | null,
  key: "error" | "notice",
  value: string,
): string {
  const searchParams = new URLSearchParams();

  if (categoryId !== null) {
    searchParams.set("category", String(categoryId));
  }

  searchParams.set(key, value);

  return `/admin/help-center?${searchParams.toString()}`;
}

function redirectWithState(
  categoryId: number | null,
  key: "error" | "notice",
  value: string,
): never {
  redirect(buildHelpCenterPath(categoryId, key, value));
}

function revalidateHelpCenterPages() {
  revalidatePath("/admin/help-center");
  revalidatePath("/help");
}

async function requireHelpCenterAccess() {
  await requireAdminUser();
}

export async function createHelpCategoryAction(formData: FormData) {
  await requireHelpCenterAccess();

  const title = String(formData.get("title") ?? "").trim();
  const iconKey = String(formData.get("iconKey") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "").trim();
  const sortOrder = sortOrderRaw === "" ? null : parseNonNegativeInt(sortOrderRaw);

  if (
    !title ||
    title.length > MAX_CATEGORY_TITLE_LENGTH ||
    !isHelpIconKey(iconKey) ||
    (sortOrderRaw !== "" && sortOrder === null)
  ) {
    redirectWithState(null, "error", "invalid-category");
  }

  const categoryId = await createHelpCategory({
    title,
    iconKey,
    sortOrder,
  });

  revalidateHelpCenterPages();
  redirectWithState(categoryId, "notice", "category-created");
}

export async function updateHelpCategoryAction(formData: FormData) {
  await requireHelpCenterAccess();

  const categoryId = parsePositiveInt(String(formData.get("categoryId") ?? "").trim());
  const title = String(formData.get("title") ?? "").trim();
  const iconKey = String(formData.get("iconKey") ?? "").trim();
  const sortOrder = parseNonNegativeInt(String(formData.get("sortOrder") ?? "").trim());

  if (
    categoryId === null ||
    !title ||
    title.length > MAX_CATEGORY_TITLE_LENGTH ||
    !isHelpIconKey(iconKey) ||
    sortOrder === null
  ) {
    redirectWithState(categoryId, "error", "invalid-category");
  }

  try {
    await updateHelpCategory({
      categoryId,
      title,
      iconKey,
      sortOrder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "CATEGORY_NOT_FOUND") {
      redirectWithState(categoryId, "error", "invalid-category-id");
    }

    if (error instanceof Error && error.message === "INVALID_ICON") {
      redirectWithState(categoryId, "error", "invalid-category");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(categoryId, "notice", "category-updated");
}

export async function archiveHelpCategoryAction(formData: FormData) {
  await requireHelpCenterAccess();

  const categoryId = parsePositiveInt(String(formData.get("categoryId") ?? "").trim());

  if (categoryId === null) {
    redirectWithState(null, "error", "invalid-category-id");
  }

  try {
    await archiveHelpCategory(categoryId);
  } catch (error) {
    if (error instanceof Error && error.message === "CATEGORY_NOT_FOUND") {
      redirectWithState(categoryId, "error", "invalid-category-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(categoryId, "notice", "category-archived");
}

export async function restoreHelpCategoryAction(formData: FormData) {
  await requireHelpCenterAccess();

  const categoryId = parsePositiveInt(String(formData.get("categoryId") ?? "").trim());

  if (categoryId === null) {
    redirectWithState(null, "error", "invalid-category-id");
  }

  try {
    await restoreHelpCategory(categoryId);
  } catch (error) {
    if (error instanceof Error && error.message === "CATEGORY_NOT_FOUND") {
      redirectWithState(categoryId, "error", "invalid-category-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(categoryId, "notice", "category-restored");
}

export async function createHelpQuestionAction(formData: FormData) {
  await requireHelpCenterAccess();

  const categoryId = parsePositiveInt(String(formData.get("categoryId") ?? "").trim());
  const returnCategoryId = parseReturnCategoryId(formData);
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "").trim();
  const sortOrder = sortOrderRaw === "" ? null : parseNonNegativeInt(sortOrderRaw);
  const targetCategoryId = returnCategoryId ?? categoryId;

  if (
    categoryId === null ||
    !question ||
    question.length > MAX_QUESTION_LENGTH ||
    !answer ||
    answer.length > MAX_ANSWER_LENGTH ||
    (sortOrderRaw !== "" && sortOrder === null)
  ) {
    redirectWithState(targetCategoryId, "error", "invalid-question");
  }

  try {
    await createHelpQuestion({
      categoryId,
      question,
      answer,
      sortOrder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "CATEGORY_NOT_FOUND") {
      redirectWithState(targetCategoryId, "error", "invalid-category-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(targetCategoryId, "notice", "question-created");
}

export async function updateHelpQuestionAction(formData: FormData) {
  await requireHelpCenterAccess();

  const questionId = parsePositiveInt(String(formData.get("questionId") ?? "").trim());
  const returnCategoryId = parseReturnCategoryId(formData);
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrder = parseNonNegativeInt(String(formData.get("sortOrder") ?? "").trim());

  if (
    questionId === null ||
    !question ||
    question.length > MAX_QUESTION_LENGTH ||
    !answer ||
    answer.length > MAX_ANSWER_LENGTH ||
    sortOrder === null
  ) {
    redirectWithState(returnCategoryId, "error", "invalid-question");
  }

  try {
    await updateHelpQuestion({
      questionId,
      question,
      answer,
      sortOrder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "QUESTION_NOT_FOUND") {
      redirectWithState(returnCategoryId, "error", "invalid-question-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(returnCategoryId, "notice", "question-updated");
}

export async function archiveHelpQuestionAction(formData: FormData) {
  await requireHelpCenterAccess();

  const questionId = parsePositiveInt(String(formData.get("questionId") ?? "").trim());
  const returnCategoryId = parseReturnCategoryId(formData);

  if (questionId === null) {
    redirectWithState(returnCategoryId, "error", "invalid-question-id");
  }

  try {
    await archiveHelpQuestion(questionId);
  } catch (error) {
    if (error instanceof Error && error.message === "QUESTION_NOT_FOUND") {
      redirectWithState(returnCategoryId, "error", "invalid-question-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(returnCategoryId, "notice", "question-archived");
}

export async function restoreHelpQuestionAction(formData: FormData) {
  await requireHelpCenterAccess();

  const questionId = parsePositiveInt(String(formData.get("questionId") ?? "").trim());
  const returnCategoryId = parseReturnCategoryId(formData);

  if (questionId === null) {
    redirectWithState(returnCategoryId, "error", "invalid-question-id");
  }

  try {
    await restoreHelpQuestion(questionId);
  } catch (error) {
    if (error instanceof Error && error.message === "QUESTION_NOT_FOUND") {
      redirectWithState(returnCategoryId, "error", "invalid-question-id");
    }

    throw error;
  }

  revalidateHelpCenterPages();
  redirectWithState(returnCategoryId, "notice", "question-restored");
}
