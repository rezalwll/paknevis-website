import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

import pg from "pg";

const { Pool } = pg;
const scryptAsync = promisify(scrypt);

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function hashPassword(password) {
  const salt = randomBytes(16);
  const digest = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${Buffer.from(digest).toString("hex")}`;
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function isValidUsername(value) {
  return /^[a-z0-9._-]{3,40}$/.test(normalizeUsername(value));
}

function createUsernameBaseFromEmail(email) {
  const localPart = email.trim().toLowerCase().split("@")[0] || "";
  const normalized = localPart
    .replace(/[^a-z0-9._-]+/g, ".")
    .replace(/[._-]{2,}/g, ".")
    .replace(/^[._-]+|[._-]+$/g, "")
    .slice(0, 40);

  return normalized.length >= 3 ? normalized : "admin";
}

function buildUniqueUsername(preferredBase, takenUsernames) {
  const base = normalizeUsername(preferredBase).slice(0, 40) || "admin";

  if (!takenUsernames.has(base)) {
    return base;
  }

  for (let counter = 2; counter < 10000; counter += 1) {
    const suffix = `-${counter}`;
    const candidate = `${base.slice(0, 40 - suffix.length)}${suffix}`;

    if (!takenUsernames.has(candidate)) {
      return candidate;
    }
  }

  throw new Error("USERNAME_GENERATION_FAILED");
}

async function backfillAdminUsernames(client) {
  const result = await client.query(`
    SELECT id, email, username
    FROM admin_users
    ORDER BY id ASC
  `);
  const takenUsernames = new Set();

  for (const row of result.rows) {
    if (row.username?.trim()) {
      takenUsernames.add(normalizeUsername(row.username));
    }
  }

  for (const row of result.rows) {
    if (row.username?.trim()) {
      continue;
    }

    const username = buildUniqueUsername(
      createUsernameBaseFromEmail(row.email),
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

async function ensureSchema(pool) {
  const client = await pool.connect();

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

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  const email = getRequiredEnv("ADMIN_BOOTSTRAP_EMAIL").trim().toLowerCase();
  const password = getRequiredEnv("ADMIN_BOOTSTRAP_PASSWORD");
  const fullName = (process.env.ADMIN_BOOTSTRAP_FULL_NAME || "Site Administrator").trim();
  const explicitUsername = process.env.ADMIN_BOOTSTRAP_USERNAME
    ? normalizeUsername(process.env.ADMIN_BOOTSTRAP_USERNAME)
    : "";

  const pool = new Pool({
    host: getRequiredEnv("POSTGRES_HOST"),
    port: Number(getRequiredEnv("POSTGRES_PORT")),
    user: getRequiredEnv("POSTGRES_USER"),
    password: getRequiredEnv("POSTGRES_PASSWORD"),
    database: getRequiredEnv("POSTGRES_DB"),
  });

  try {
    await ensureSchema(pool);
    const passwordHash = await hashPassword(password);
    let username = explicitUsername;

    if (username && !isValidUsername(username)) {
      throw new Error("ADMIN_BOOTSTRAP_USERNAME must be 3-40 chars: a-z, 0-9, dot, dash, underscore.");
    }

    if (!username) {
      const takenResult = await pool.query(
        `
          SELECT username
          FROM admin_users
          WHERE email <> $1
        `,
        [email],
      );
      username = buildUniqueUsername(
        createUsernameBaseFromEmail(email),
        new Set(takenResult.rows.map((row) => normalizeUsername(row.username))),
      );
    }

    const result = await pool.query(
      `
        INSERT INTO admin_users (email, username, full_name, password_hash, role, is_active)
        VALUES ($1, $2, $3, $4, 'super_admin', TRUE)
        ON CONFLICT (email)
        DO UPDATE
        SET
          username = EXCLUDED.username,
          full_name = EXCLUDED.full_name,
          password_hash = EXCLUDED.password_hash,
          role = 'super_admin',
          is_active = TRUE
        RETURNING id
      `,
      [email, username, fullName, passwordHash],
    );

    console.log(
      `Bootstrap admin is ready. user_id=${result.rows[0]?.id ?? "unknown"} email=${email} username=${username}`,
    );
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
