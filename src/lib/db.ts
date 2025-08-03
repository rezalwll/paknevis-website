import { Pool, type PoolConfig } from "pg";

import type { ContactFormData } from "@/lib/contact";

type GlobalDbState = typeof globalThis & {
  __paknevisDbPool__?: Pool;
  __paknevisContactTableReady__?: Promise<void>;
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

export async function ensureContactMessagesTable(): Promise<void> {
  if (!globalDb.__paknevisContactTableReady__) {
    globalDb.__paknevisContactTableReady__ = getDb()
      .query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id BIGSERIAL PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(30) NOT NULL,
          message VARCHAR(220) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)
      .then(() => undefined)
      .catch((error) => {
        globalDb.__paknevisContactTableReady__ = undefined;
        throw error;
      });
  }

  await globalDb.__paknevisContactTableReady__;
}

export async function insertContactMessage(data: ContactFormData): Promise<void> {
  await ensureContactMessagesTable();

  await getDb().query(
    `
      INSERT INTO contact_messages (
        first_name,
        last_name,
        email,
        phone,
        message
      )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [data.firstName, data.lastName, data.email, data.phone, data.message],
  );
}
