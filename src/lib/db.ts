import { Pool, type PoolClient, type PoolConfig } from "pg";

import type { ContactFormData } from "@/lib/contact";
import {
  buildUniqueAdminUsername,
  createAdminUsernameBaseFromEmail,
  normalizeAdminUsername,
} from "@/lib/admin-identity";
import { DEFAULT_HELP_CENTER_CATEGORIES } from "@/lib/help-center-seed";

type GlobalDbState = typeof globalThis & {
  __paknevisDbPool__?: Pool;
  __paknevisSchemaReady__?: Promise<void>;
};

const globalDb = globalThis as GlobalDbState;

const DEFAULT_ENTERPRISE_PLANS = [
  {
    title: "طرح ۱",
    priceMillion: 77,
    userCount: 20,
    description: "توضیح کوتاه پلن. مناسب شروع کار.",
    isPopular: false,
  },
  {
    title: "طرح ۲",
    priceMillion: 127,
    userCount: 60,
    description: "امکانات بیشتر برای تیم‌های متوسط.",
    isPopular: true,
  },
  {
    title: "طرح ۳",
    priceMillion: 225,
    userCount: 130,
    description: "مناسب سازمان‌های رو به رشد.",
    isPopular: false,
  },
  {
    title: "طرح ۴",
    priceMillion: 320,
    userCount: 200,
    description: "پشتیبانی و امکانات کامل‌تر.",
    isPopular: false,
  },
  {
    title: "طرح ۵",
    priceMillion: 480,
    userCount: 350,
    description: "برای واحدهای بزرگ سازمانی.",
    isPopular: false,
  },
  {
    title: "طرح ۶",
    priceMillion: 650,
    userCount: 500,
    description: "پیکربندی اختصاصی و SLA.",
    isPopular: false,
  },
  {
    title: "طرح ۷",
    priceMillion: 900,
    userCount: 800,
    description: "بالاترین سطح خدمات و سفارشی‌سازی.",
    isPopular: false,
  },
] as const;

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getPoolConfig(): PoolConfig {
  const port = Number(getRequiredEnv("POSTGRES_PORT"));

  if (Number.isNaN(port)) {
    throw new Error("POSTGRES_PORT must be a valid number.");
  }

  return {
    host: getRequiredEnv("POSTGRES_HOST"),
    port,
    user: getRequiredEnv("POSTGRES_USER"),
    password: getRequiredEnv("POSTGRES_PASSWORD"),
    database: getRequiredEnv("POSTGRES_DB"),
  };
}

async function backfillAdminUsernames(client: PoolClient): Promise<void> {
  const result = await client.query<{
    id: number;
    email: string;
    username: string | null;
  }>(`
    SELECT id, email, username
    FROM admin_users
    ORDER BY id ASC
  `);

  const takenUsernames = new Set<string>();

  for (const row of result.rows) {
    if (row.username?.trim()) {
      takenUsernames.add(normalizeAdminUsername(row.username));
    }
  }

  for (const row of result.rows) {
    if (row.username?.trim()) {
      continue;
    }

    const username = buildUniqueAdminUsername(
      createAdminUsernameBaseFromEmail(row.email),
      takenUsernames,
    );

    await client.query(
      `
        UPDATE admin_users
        SET username = $2
        WHERE id = $1
      `,
      [row.id, username],
    );

    takenUsernames.add(username);
  }
}

export function getDb(): Pool {
  if (!globalDb.__paknevisDbPool__) {
    globalDb.__paknevisDbPool__ = new Pool(getPoolConfig());
  }

  return globalDb.__paknevisDbPool__;
}

export async function ensureAppSchema(): Promise<void> {
  if (!globalDb.__paknevisSchemaReady__) {
    globalDb.__paknevisSchemaReady__ = (async () => {
      const client = await getDb().connect();

      try {
        await client.query("BEGIN");

        await client.query(`
          CREATE TABLE IF NOT EXISTS admin_users (
            id BIGSERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(60) NOT NULL,
            full_name VARCHAR(120) NOT NULL,
            password_hash TEXT NOT NULL,
            role VARCHAR(32) NOT NULL CHECK (role IN ('super_admin', 'support_manager', 'support_agent')),
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            last_login_at TIMESTAMPTZ NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          ALTER TABLE admin_users
          ADD COLUMN IF NOT EXISTS username VARCHAR(60);
        `);

        await backfillAdminUsernames(client);

        await client.query(`
          ALTER TABLE admin_users
          ALTER COLUMN username SET NOT NULL;
        `);

        await client.query(`
          CREATE UNIQUE INDEX IF NOT EXISTS admin_users_username_key
          ON admin_users(username);
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS admin_sessions (
            id BIGSERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
            token_hash VARCHAR(64) NOT NULL UNIQUE,
            expires_at TIMESTAMPTZ NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS admin_sessions_user_id_idx
          ON admin_sessions(user_id);
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx
          ON admin_sessions(expires_at);
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS contact_messages (
            id BIGSERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(30) NOT NULL,
            message VARCHAR(220) NOT NULL,
            status VARCHAR(32) NOT NULL DEFAULT 'new',
            assigned_to BIGINT NULL REFERENCES admin_users(id) ON DELETE SET NULL,
            read_at TIMESTAMPTZ NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          ALTER TABLE contact_messages
          ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT 'new';
        `);

        await client.query(`
          ALTER TABLE contact_messages
          ADD COLUMN IF NOT EXISTS assigned_to BIGINT NULL REFERENCES admin_users(id) ON DELETE SET NULL;
        `);

        await client.query(`
          ALTER TABLE contact_messages
          ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ NULL;
        `);

        await client.query(`
          ALTER TABLE contact_messages
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
        `);

        await client.query(`
          UPDATE contact_messages
          SET status = 'new'
          WHERE status IS NULL;
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS contact_messages_status_idx
          ON contact_messages(status);
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS contact_messages_assigned_to_idx
          ON contact_messages(assigned_to);
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
          ON contact_messages(created_at DESC);
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS page_views (
            path VARCHAR(255) NOT NULL,
            view_date DATE NOT NULL,
            count INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (path, view_date)
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS page_views_view_date_idx
          ON page_views(view_date);
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS page_views_view_date_count_idx
          ON page_views(view_date, count DESC);
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS enterprise_plans (
            id BIGSERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            price_million NUMERIC(12, 2) NOT NULL CHECK (price_million > 0),
            user_count INTEGER NOT NULL CHECK (user_count > 0),
            description VARCHAR(320) NOT NULL,
            is_popular BOOLEAN NOT NULL DEFAULT FALSE,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS title VARCHAR(120) NOT NULL DEFAULT '';
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS price_million NUMERIC(12, 2) NOT NULL DEFAULT 1;
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS user_count INTEGER NOT NULL DEFAULT 1;
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS description VARCHAR(320) NOT NULL DEFAULT '';
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS is_popular BOOLEAN NOT NULL DEFAULT FALSE;
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
        `);

        await client.query(`
          ALTER TABLE enterprise_plans
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS enterprise_plans_active_sort_idx
          ON enterprise_plans(is_active, sort_order, id);
        `);

        await client.query(`
          CREATE UNIQUE INDEX IF NOT EXISTS enterprise_plans_single_popular_idx
          ON enterprise_plans ((1))
          WHERE is_popular = TRUE;
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS help_categories (
            id BIGSERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            icon_key VARCHAR(32) NOT NULL CHECK (
              icon_key IN ('user', 'credit_card', 'file_warning', 'laptop', 'help_circle', 'building')
            ),
            sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
            is_archived BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS help_questions (
            id BIGSERIAL PRIMARY KEY,
            category_id BIGINT NOT NULL REFERENCES help_categories(id) ON DELETE CASCADE,
            question VARCHAR(255) NOT NULL,
            answer TEXT NOT NULL,
            sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
            is_archived BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS help_categories_archived_sort_idx
          ON help_categories(is_archived, sort_order, id);
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS help_questions_category_archived_sort_idx
          ON help_questions(category_id, is_archived, sort_order, id);
        `);

        const enterprisePlanCount = await client.query<{ count: number }>(`
          SELECT COUNT(*)::int AS count
          FROM enterprise_plans
        `);

        if ((enterprisePlanCount.rows[0]?.count ?? 0) === 0) {
          for (const [index, plan] of DEFAULT_ENTERPRISE_PLANS.entries()) {
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
                plan.title,
                plan.priceMillion,
                plan.userCount,
                plan.description,
                plan.isPopular,
                index + 1,
              ],
            );
          }
        }

        const helpCategoryCount = await client.query<{ count: number }>(`
          SELECT COUNT(*)::int AS count
          FROM help_categories
        `);

        if ((helpCategoryCount.rows[0]?.count ?? 0) === 0) {
          for (const [categoryIndex, category] of DEFAULT_HELP_CENTER_CATEGORIES.entries()) {
            const insertedCategory = await client.query<{ id: number }>(
              `
                INSERT INTO help_categories (title, icon_key, sort_order, is_archived)
                VALUES ($1, $2, $3, FALSE)
                RETURNING id
              `,
              [category.title, category.iconKey, categoryIndex + 1],
            );

            const categoryId = insertedCategory.rows[0]?.id;

            if (!categoryId) {
              throw new Error("HELP_CATEGORY_SEED_FAILED");
            }

            for (const [questionIndex, item] of category.questions.entries()) {
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
                [categoryId, item.question, item.answer, questionIndex + 1],
              );
            }
          }
        }

        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    })().catch((error) => {
      globalDb.__paknevisSchemaReady__ = undefined;
      throw error;
    });
  }

  await globalDb.__paknevisSchemaReady__;
}

export async function insertContactMessage(data: ContactFormData): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      INSERT INTO contact_messages (
        first_name,
        last_name,
        email,
        phone,
        message,
        status
      )
      VALUES ($1, $2, $3, $4, $5, 'new')
    `,
    [data.firstName, data.lastName, data.email, data.phone, data.message],
  );
}
