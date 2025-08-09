import type { PoolClient } from "pg";

import {
  isHelpIconKey,
  type HelpCategory,
  type HelpQuestion,
  type PublicHelpCategory,
} from "@/lib/admin-types";
import { ensureAppSchema, getDb } from "@/lib/db";
import { logServerError } from "@/lib/server-log";

type DbClient = PoolClient;

type HelpCategoryRow = {
  id: number;
  title: string;
  icon_key: string;
  sort_order: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

type HelpQuestionRow = {
  id: number;
  category_id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

function mapHelpQuestion(row: HelpQuestionRow): HelpQuestion {
  return {
    id: row.id,
    categoryId: row.category_id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
    isArchived: row.is_archived,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapHelpCategory(
  row: HelpCategoryRow,
  questions: HelpQuestion[],
): HelpCategory {
  if (!isHelpIconKey(row.icon_key)) {
    throw new Error("INVALID_HELP_ICON");
  }

  return {
    id: row.id,
    title: row.title,
    iconKey: row.icon_key,
    sortOrder: row.sort_order,
    isArchived: row.is_archived,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    questions,
  };
}

function buildCategoryMap(
  categoryRows: HelpCategoryRow[],
  questionRows: HelpQuestionRow[],
): HelpCategory[] {
  const questionsByCategory = new Map<number, HelpQuestion[]>();

  for (const row of questionRows) {
    const current = questionsByCategory.get(row.category_id) ?? [];
    current.push(mapHelpQuestion(row));
    questionsByCategory.set(row.category_id, current);
  }

  return categoryRows.map((row) =>
    mapHelpCategory(row, questionsByCategory.get(row.id) ?? []),
  );
}

async function getNextCategorySortOrder(client: DbClient): Promise<number> {
  const result = await client.query<{ next_sort_order: number }>(`
    SELECT COALESCE(MAX(sort_order), 0)::int + 1 AS next_sort_order
    FROM help_categories
  `);

  return result.rows[0]?.next_sort_order ?? 1;
}

async function getNextQuestionSortOrder(
  client: DbClient,
  categoryId: number,
): Promise<number> {
  const result = await client.query<{ next_sort_order: number }>(
    `
      SELECT COALESCE(MAX(sort_order), 0)::int + 1 AS next_sort_order
      FROM help_questions
      WHERE category_id = $1
    `,
    [categoryId],
  );

  return result.rows[0]?.next_sort_order ?? 1;
}

async function ensureCategoryExists(
  client: DbClient,
  categoryId: number,
): Promise<void> {
  const result = await client.query(
    `
      SELECT id
      FROM help_categories
      WHERE id = $1
      LIMIT 1
    `,
    [categoryId],
  );

  if (result.rowCount === 0) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
}

export async function listHelpCategories(): Promise<HelpCategory[]> {
  await ensureAppSchema();

  const [categoriesResult, questionsResult] = await Promise.all([
    getDb().query<HelpCategoryRow>(`
      SELECT
        id,
        title,
        icon_key,
        sort_order,
        is_archived,
        created_at,
        updated_at
      FROM help_categories
      ORDER BY is_archived ASC, sort_order ASC, id ASC
    `),
    getDb().query<HelpQuestionRow>(`
      SELECT
        id,
        category_id,
        question,
        answer,
        sort_order,
        is_archived,
        created_at,
        updated_at
      FROM help_questions
      ORDER BY category_id ASC, is_archived ASC, sort_order ASC, id ASC
    `),
  ]);

  return buildCategoryMap(categoriesResult.rows, questionsResult.rows);
}

export async function listPublicHelpCategories(): Promise<PublicHelpCategory[]> {
  try {
    await ensureAppSchema();

    const categoriesResult = await getDb().query<HelpCategoryRow>(`
    SELECT
      hc.id,
      hc.title,
      hc.icon_key,
      hc.sort_order,
      hc.is_archived,
      hc.created_at,
      hc.updated_at
    FROM help_categories AS hc
    WHERE hc.is_archived = FALSE
      AND EXISTS (
        SELECT 1
        FROM help_questions AS hq
        WHERE hq.category_id = hc.id
          AND hq.is_archived = FALSE
      )
    ORDER BY hc.sort_order ASC, hc.id ASC
  `);

    const categoryIds = categoriesResult.rows.map((row) => row.id);

    if (categoryIds.length === 0) {
      return [];
    }

    const questionsResult = await getDb().query<HelpQuestionRow>(
      `
      SELECT
        id,
        category_id,
        question,
        answer,
        sort_order,
        is_archived,
        created_at,
        updated_at
      FROM help_questions
      WHERE category_id = ANY($1::bigint[])
        AND is_archived = FALSE
      ORDER BY category_id ASC, sort_order ASC, id ASC
      `,
      [categoryIds],
    );

    return buildCategoryMap(categoriesResult.rows, questionsResult.rows).map(
      (category) => ({
        id: category.id,
        title: category.title,
        iconKey: category.iconKey,
        sortOrder: category.sortOrder,
        questions: category.questions.map((question) => ({
          id: question.id,
          question: question.question,
          answer: question.answer,
          sortOrder: question.sortOrder,
        })),
      }),
    );
  } catch (error) {
    logServerError("Failed to load public help center categories.", error);
    return [];
  }
}

export async function createHelpCategory(input: {
  title: string;
  iconKey: string;
  sortOrder: number | null;
}): Promise<number> {
  await ensureAppSchema();

  if (!isHelpIconKey(input.iconKey)) {
    throw new Error("INVALID_ICON");
  }

  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const sortOrder = input.sortOrder ?? (await getNextCategorySortOrder(client));

    const result = await client.query<{ id: number }>(
      `
        INSERT INTO help_categories (title, icon_key, sort_order, is_archived)
        VALUES ($1, $2, $3, FALSE)
        RETURNING id
      `,
      [input.title.trim(), input.iconKey, sortOrder],
    );

    const categoryId = result.rows[0]?.id;

    if (!categoryId) {
      throw new Error("CATEGORY_CREATE_FAILED");
    }

    await client.query("COMMIT");
    return categoryId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateHelpCategory(input: {
  categoryId: number;
  title: string;
  iconKey: string;
  sortOrder: number;
}): Promise<void> {
  await ensureAppSchema();

  if (!isHelpIconKey(input.iconKey)) {
    throw new Error("INVALID_ICON");
  }

  const result = await getDb().query(
    `
      UPDATE help_categories
      SET
        title = $2,
        icon_key = $3,
        sort_order = $4,
        updated_at = NOW()
      WHERE id = $1
    `,
    [input.categoryId, input.title.trim(), input.iconKey, input.sortOrder],
  );

  if (result.rowCount === 0) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
}

export async function archiveHelpCategory(categoryId: number): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE help_categories
      SET is_archived = TRUE, updated_at = NOW()
      WHERE id = $1
    `,
    [categoryId],
  );

  if (result.rowCount === 0) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
}

export async function restoreHelpCategory(categoryId: number): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE help_categories
      SET is_archived = FALSE, updated_at = NOW()
      WHERE id = $1
    `,
    [categoryId],
  );

  if (result.rowCount === 0) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
}

export async function createHelpQuestion(input: {
  categoryId: number;
  question: string;
  answer: string;
  sortOrder: number | null;
}): Promise<void> {
  await ensureAppSchema();

  const client = await getDb().connect();

  try {
    await client.query("BEGIN");
    await ensureCategoryExists(client, input.categoryId);
    const sortOrder =
      input.sortOrder ?? (await getNextQuestionSortOrder(client, input.categoryId));

    await client.query(
      `
        INSERT INTO help_questions (
          category_id,
          question,
          answer,
          sort_order,
          is_archived
        )
        VALUES ($1, $2, $3, $4, FALSE)
      `,
      [input.categoryId, input.question.trim(), input.answer.trim(), sortOrder],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateHelpQuestion(input: {
  questionId: number;
  question: string;
  answer: string;
  sortOrder: number;
}): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE help_questions
      SET
        question = $2,
        answer = $3,
        sort_order = $4,
        updated_at = NOW()
      WHERE id = $1
    `,
    [input.questionId, input.question.trim(), input.answer.trim(), input.sortOrder],
  );

  if (result.rowCount === 0) {
    throw new Error("QUESTION_NOT_FOUND");
  }
}

export async function archiveHelpQuestion(questionId: number): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE help_questions
      SET is_archived = TRUE, updated_at = NOW()
      WHERE id = $1
    `,
    [questionId],
  );

  if (result.rowCount === 0) {
    throw new Error("QUESTION_NOT_FOUND");
  }
}

export async function restoreHelpQuestion(questionId: number): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE help_questions
      SET is_archived = FALSE, updated_at = NOW()
      WHERE id = $1
    `,
    [questionId],
  );

  if (result.rowCount === 0) {
    throw new Error("QUESTION_NOT_FOUND");
  }
}
