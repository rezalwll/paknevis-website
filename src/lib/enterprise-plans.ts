import type { PoolClient } from "pg";

import { getDb, ensureAppSchema } from "@/lib/db";
import type { EnterprisePlan, PublicEnterprisePlan } from "@/lib/admin-types";
import { logServerError } from "@/lib/server-log";

type EnterprisePlanRow = {
  id: number;
  title: string;
  price_million: string;
  user_count: number;
  description: string;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type DbClient = PoolClient;

function mapEnterprisePlan(row: EnterprisePlanRow): EnterprisePlan {
  return {
    id: row.id,
    title: row.title,
    priceMillion: Number(row.price_million),
    userCount: row.user_count,
    description: row.description,
    isPopular: row.is_popular,
    isActive: row.is_active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getNextSortOrder(client: DbClient): Promise<number> {
  const result = await client.query<{ next_sort_order: number }>(`
    SELECT COALESCE(MAX(sort_order), 0)::int + 1 AS next_sort_order
    FROM enterprise_plans
  `);

  return result.rows[0]?.next_sort_order ?? 1;
}

export async function listEnterprisePlans(): Promise<EnterprisePlan[]> {
  await ensureAppSchema();

  const result = await getDb().query<EnterprisePlanRow>(`
    SELECT
      id,
      title,
      price_million,
      user_count,
      description,
      is_popular,
      is_active,
      sort_order,
      created_at,
      updated_at
    FROM enterprise_plans
    ORDER BY is_active DESC, sort_order ASC, id ASC
  `);

  return result.rows.map(mapEnterprisePlan);
}

export async function listPublicEnterprisePlans(): Promise<PublicEnterprisePlan[]> {
  try {
    await ensureAppSchema();

    const result = await getDb().query<EnterprisePlanRow>(`
    SELECT
      id,
      title,
      price_million,
      user_count,
      description,
      is_popular,
      is_active,
      sort_order,
      created_at,
      updated_at
    FROM enterprise_plans
    WHERE is_active = TRUE
    ORDER BY sort_order ASC, id ASC
  `);

    return result.rows.map((row) => {
      const plan = mapEnterprisePlan(row);

      return {
        id: plan.id,
        title: plan.title,
        priceMillion: plan.priceMillion,
        userCount: plan.userCount,
        description: plan.description,
        isPopular: plan.isPopular,
        sortOrder: plan.sortOrder,
      };
    });
  } catch (error) {
    logServerError("Failed to load public enterprise plans.", error);
    return [];
  }
}

export async function createEnterprisePlan(input: {
  title: string;
  priceMillion: number;
  userCount: number;
  description: string;
  sortOrder: number | null;
  isPopular: boolean;
}): Promise<void> {
  await ensureAppSchema();

  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    if (input.isPopular) {
      await client.query(`
        UPDATE enterprise_plans
        SET is_popular = FALSE, updated_at = NOW()
        WHERE is_popular = TRUE
      `);
    }

    const sortOrder = input.sortOrder ?? (await getNextSortOrder(client));

    await client.query(
      `
        INSERT INTO enterprise_plans (
          title,
          price_million,
          user_count,
          description,
          is_popular,
          is_active,
          sort_order
        )
        VALUES ($1, $2, $3, $4, $5, TRUE, $6)
      `,
      [
        input.title.trim(),
        input.priceMillion,
        input.userCount,
        input.description.trim(),
        input.isPopular,
        sortOrder,
      ],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateEnterprisePlan(input: {
  planId: number;
  title: string;
  priceMillion: number;
  userCount: number;
  description: string;
  sortOrder: number;
}): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE enterprise_plans
      SET
        title = $2,
        price_million = $3,
        user_count = $4,
        description = $5,
        sort_order = $6,
        updated_at = NOW()
      WHERE id = $1
    `,
    [
      input.planId,
      input.title.trim(),
      input.priceMillion,
      input.userCount,
      input.description.trim(),
      input.sortOrder,
    ],
  );

  if (result.rowCount === 0) {
    throw new Error("PLAN_NOT_FOUND");
  }
}

export async function toggleEnterprisePlanActiveState(
  planId: number,
  nextActiveState: boolean,
): Promise<void> {
  await ensureAppSchema();

  const result = await getDb().query(
    `
      UPDATE enterprise_plans
      SET
        is_active = $2,
        is_popular = CASE WHEN $2 = FALSE THEN FALSE ELSE is_popular END,
        updated_at = NOW()
      WHERE id = $1
    `,
    [planId, nextActiveState],
  );

  if (result.rowCount === 0) {
    throw new Error("PLAN_NOT_FOUND");
  }
}

export async function setPopularEnterprisePlan(planId: number): Promise<void> {
  await ensureAppSchema();

  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const target = await client.query<{ is_active: boolean }>(
      `
        SELECT is_active
        FROM enterprise_plans
        WHERE id = $1
        LIMIT 1
      `,
      [planId],
    );

    if (target.rowCount === 0) {
      throw new Error("PLAN_NOT_FOUND");
    }

    if (!target.rows[0]?.is_active) {
      throw new Error("PLAN_NOT_ACTIVE");
    }

    await client.query(`
      UPDATE enterprise_plans
      SET is_popular = FALSE, updated_at = NOW()
      WHERE is_popular = TRUE
    `);

    await client.query(
      `
        UPDATE enterprise_plans
        SET is_popular = TRUE, updated_at = NOW()
        WHERE id = $1
      `,
      [planId],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
