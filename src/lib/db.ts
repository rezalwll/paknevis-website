import { Pool, type PoolConfig } from "pg";

import type { ContactFormData } from "@/lib/contact";

type GlobalDbState = typeof globalThis & {
  __paknevisDbPool__?: Pool;
  __paknevisSchemaReady__?: Promise<void>;
};

const globalDb = globalThis as GlobalDbState;

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
            full_name VARCHAR(120) NOT NULL,
            password_hash TEXT NOT NULL,
            role VARCHAR(32) NOT NULL CHECK (role IN ('super_admin', 'support_manager', 'support_agent')),
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            last_login_at TIMESTAMPTZ NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
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
