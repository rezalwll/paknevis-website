import { getDb, ensureAppSchema } from "@/lib/db";
import {
  canManageAssignments,
  isAdminRole,
  isMessageStatus,
  type AdminRole,
  type AdminUserSummary,
  type AuthenticatedAdminUser,
  type ContactMessageDetails,
  type ContactMessageListFilters,
  type ContactMessageListResult,
  type MessageDashboardCounts,
  type MessageStatus,
} from "@/lib/admin-types";

type AdminLoginRecord = {
  id: number;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  passwordHash: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function parseNumericId(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function getMessageAccessClause(user: AuthenticatedAdminUser) {
  if (user.role !== "support_agent") {
    return {
      sql: "",
      values: [] as unknown[],
    };
  }

  return {
    sql: "(cm.assigned_to IS NULL OR cm.assigned_to = $1)",
    values: [user.id] as unknown[],
  };
}

function buildMessageWhereClause(
  filters: ContactMessageListFilters,
  user: AuthenticatedAdminUser,
) {
  const baseAccess = getMessageAccessClause(user);
  const clauses = baseAccess.sql ? [baseAccess.sql] : [];
  const values = [...baseAccess.values];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    const index = values.length;
    clauses.push(
      `(cm.first_name ILIKE $${index} OR cm.last_name ILIKE $${index} OR cm.email ILIKE $${index} OR cm.phone ILIKE $${index} OR cm.message ILIKE $${index})`,
    );
  }

  if (filters.status && isMessageStatus(filters.status)) {
    values.push(filters.status);
    clauses.push(`cm.status = $${values.length}`);
  }

  if (filters.assignedTo && user.role !== "support_agent") {
    if (filters.assignedTo === "unassigned") {
      clauses.push("cm.assigned_to IS NULL");
    } else {
      const parsedAssignedTo = parseNumericId(filters.assignedTo);

      if (parsedAssignedTo) {
        values.push(parsedAssignedTo);
        clauses.push(`cm.assigned_to = $${values.length}`);
      }
    }
  }

  return {
    sql: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
    values,
  };
}

function mapPublicAdminUser(row: {
  id: number;
  email: string;
  full_name: string;
  role: string;
}): AuthenticatedAdminUser {
  if (!isAdminRole(row.role)) {
    throw new Error("INVALID_ADMIN_ROLE");
  }

  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
  };
}

export async function findAdminUserByEmail(email: string): Promise<AdminLoginRecord | null> {
  await ensureAppSchema();

  const result = await getDb().query<{
    id: number;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    password_hash: string;
  }>(
    `
      SELECT id, email, full_name, role, is_active, password_hash
      FROM admin_users
      WHERE email = $1
      LIMIT 1
    `,
    [normalizeEmail(email)],
  );

  const row = result.rows[0];

  if (!row || !isAdminRole(row.role)) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    isActive: row.is_active,
    passwordHash: row.password_hash,
  };
}

export async function touchAdminLastLogin(userId: number): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      UPDATE admin_users
      SET last_login_at = NOW()
      WHERE id = $1
    `,
    [userId],
  );
}

export async function createAdminSessionRecord(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      INSERT INTO admin_sessions (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt.toISOString()],
  );
}

export async function deleteAdminSessionRecord(tokenHash: string): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      DELETE FROM admin_sessions
      WHERE token_hash = $1
    `,
    [tokenHash],
  );
}

export async function deleteExpiredAdminSessions(): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      DELETE FROM admin_sessions
      WHERE expires_at <= NOW()
    `,
  );
}

export async function findAdminSessionUser(
  tokenHash: string,
): Promise<AuthenticatedAdminUser | null> {
  await ensureAppSchema();
  await deleteExpiredAdminSessions();

  const result = await getDb().query<{
    id: number;
    email: string;
    full_name: string;
    role: string;
  }>(
    `
      SELECT au.id, au.email, au.full_name, au.role
      FROM admin_sessions AS sessions
      INNER JOIN admin_users AS au
        ON au.id = sessions.user_id
      WHERE sessions.token_hash = $1
        AND sessions.expires_at > NOW()
        AND au.is_active = TRUE
      LIMIT 1
    `,
    [tokenHash],
  );

  const row = result.rows[0];

  if (!row || !isAdminRole(row.role)) {
    return null;
  }

  return mapPublicAdminUser(row);
}

export async function listAdminUsers(): Promise<AdminUserSummary[]> {
  await ensureAppSchema();

  const result = await getDb().query<{
    id: number;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
  }>(
    `
      SELECT id, email, full_name, role, is_active, last_login_at, created_at
      FROM admin_users
      ORDER BY created_at DESC
    `,
  );

  const users: AdminUserSummary[] = [];

  for (const row of result.rows) {
    if (!isAdminRole(row.role)) {
      continue;
    }

    users.push({
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      role: row.role,
      isActive: row.is_active,
      lastLoginAt: row.last_login_at,
      createdAt: row.created_at,
    });
  }

  return users;
}

export async function listAssignableAdmins(): Promise<AuthenticatedAdminUser[]> {
  await ensureAppSchema();

  const result = await getDb().query<{
    id: number;
    email: string;
    full_name: string;
    role: string;
  }>(
    `
      SELECT id, email, full_name, role
      FROM admin_users
      WHERE is_active = TRUE
      ORDER BY full_name ASC
    `,
  );

  const admins: AuthenticatedAdminUser[] = [];

  for (const row of result.rows) {
    if (!isAdminRole(row.role)) {
      continue;
    }

    admins.push(mapPublicAdminUser(row));
  }

  return admins;
}

export async function createAdminUserRecord(input: {
  email: string;
  fullName: string;
  role: AdminRole;
  passwordHash: string;
}): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      INSERT INTO admin_users (email, full_name, password_hash, role)
      VALUES ($1, $2, $3, $4)
    `,
    [normalizeEmail(input.email), input.fullName.trim(), input.passwordHash, input.role],
  );
}

export async function updateAdminUserActiveState(
  targetUserId: number,
  nextActiveState: boolean,
): Promise<void> {
  await ensureAppSchema();

  if (!nextActiveState) {
    const superAdminCount = await getDb().query<{ count: number }>(
      `
        SELECT COUNT(*)::int AS count
        FROM admin_users
        WHERE role = 'super_admin'
          AND is_active = TRUE
          AND id <> $1
      `,
      [targetUserId],
    );

    const target = await getDb().query<{ role: string }>(
      `
        SELECT role
        FROM admin_users
        WHERE id = $1
        LIMIT 1
      `,
      [targetUserId],
    );

    if (
      target.rows[0]?.role === "super_admin" &&
      (superAdminCount.rows[0]?.count ?? 0) === 0
    ) {
      throw new Error("LAST_SUPER_ADMIN");
    }
  }

  await getDb().query(
    `
      UPDATE admin_users
      SET is_active = $2
      WHERE id = $1
    `,
    [targetUserId, nextActiveState],
  );
}

export async function getAdminDashboardCounts(
  user: AuthenticatedAdminUser,
): Promise<MessageDashboardCounts> {
  await ensureAppSchema();

  const access = getMessageAccessClause(user);
  const whereClause = access.sql ? `WHERE ${access.sql}` : "";

  const result = await getDb().query<{
    total_count: number;
    new_count: number;
    in_progress_count: number;
    resolved_count: number;
  }>(
    `
      SELECT
        COUNT(*)::int AS total_count,
        COUNT(*) FILTER (WHERE cm.status = 'new')::int AS new_count,
        COUNT(*) FILTER (WHERE cm.status = 'in_progress')::int AS in_progress_count,
        COUNT(*) FILTER (WHERE cm.status = 'resolved')::int AS resolved_count
      FROM contact_messages AS cm
      ${whereClause}
    `,
    access.values,
  );

  const row = result.rows[0];

  return {
    totalCount: row?.total_count ?? 0,
    newCount: row?.new_count ?? 0,
    inProgressCount: row?.in_progress_count ?? 0,
    resolvedCount: row?.resolved_count ?? 0,
  };
}

export async function listContactMessages(
  filters: ContactMessageListFilters,
  user: AuthenticatedAdminUser,
): Promise<ContactMessageListResult> {
  await ensureAppSchema();

  const pageSize = Math.max(1, Math.min(filters.pageSize, 50));
  const currentPage = Math.max(1, filters.page);
  const whereClause = buildMessageWhereClause(filters, user);
  const offset = (currentPage - 1) * pageSize;

  const countResult = await getDb().query<{ count: number }>(
    `
      SELECT COUNT(*)::int AS count
      FROM contact_messages AS cm
      ${whereClause.sql}
    `,
    whereClause.values,
  );

  const totalCount = countResult.rows[0]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const result = await getDb().query<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    status: string;
    assignedTo: number | null;
    assignedToName: string | null;
    readAt: string | null;
    createdAt: string;
    updatedAt: string;
  }>(
    `
      SELECT
        cm.id,
        cm.first_name AS "firstName",
        cm.last_name AS "lastName",
        cm.email,
        cm.phone,
        cm.message,
        cm.status,
        cm.assigned_to AS "assignedTo",
        au.full_name AS "assignedToName",
        cm.read_at AS "readAt",
        cm.created_at AS "createdAt",
        cm.updated_at AS "updatedAt"
      FROM contact_messages AS cm
      LEFT JOIN admin_users AS au
        ON au.id = cm.assigned_to
      ${whereClause.sql}
      ORDER BY cm.created_at DESC
      LIMIT $${whereClause.values.length + 1}
      OFFSET $${whereClause.values.length + 2}
    `,
    [...whereClause.values, pageSize, offset],
  );

  const items: ContactMessageListResult["items"] = [];

  for (const row of result.rows) {
    if (!isMessageStatus(row.status)) {
      continue;
    }

    items.push({
      ...row,
      status: row.status,
    });
  }

  return {
    items,
    totalCount,
    totalPages,
    currentPage,
  };
}

export async function getContactMessageById(
  messageId: number,
  user: AuthenticatedAdminUser,
): Promise<ContactMessageDetails | null> {
  await ensureAppSchema();

  const access = getMessageAccessClause(user);
  const values: unknown[] = [messageId, ...access.values];
  const accessSql = access.sql ? `AND ${access.sql.replaceAll("$1", "$2")}` : "";

  const result = await getDb().query<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    status: string;
    assignedTo: number | null;
    assignedToName: string | null;
    readAt: string | null;
    createdAt: string;
    updatedAt: string;
  }>(
    `
      WITH updated_message AS (
        UPDATE contact_messages AS cm
        SET
          read_at = COALESCE(cm.read_at, NOW()),
          updated_at = CASE
            WHEN cm.read_at IS NULL THEN NOW()
            ELSE cm.updated_at
          END
        WHERE cm.id = $1
          ${accessSql}
        RETURNING cm.*
      )
      SELECT
        updated_message.id,
        updated_message.first_name AS "firstName",
        updated_message.last_name AS "lastName",
        updated_message.email,
        updated_message.phone,
        updated_message.message,
        updated_message.status,
        updated_message.assigned_to AS "assignedTo",
        au.full_name AS "assignedToName",
        updated_message.read_at AS "readAt",
        updated_message.created_at AS "createdAt",
        updated_message.updated_at AS "updatedAt"
      FROM updated_message
      LEFT JOIN admin_users AS au
        ON au.id = updated_message.assigned_to
      LIMIT 1
    `,
    values,
  );

  const row = result.rows[0];

  if (!row || !isMessageStatus(row.status)) {
    return null;
  }

  return {
    ...row,
    status: row.status,
  };
}

export async function updateContactMessageStatus(input: {
  messageId: number;
  status: MessageStatus;
  actor: AuthenticatedAdminUser;
}): Promise<void> {
  await ensureAppSchema();

  const access = getMessageAccessClause(input.actor);
  const values: unknown[] = [input.status, input.messageId, ...access.values];
  const accessSql = access.sql ? `AND ${access.sql.replaceAll("$1", "$3")}` : "";

  const result = await getDb().query(
    `
      UPDATE contact_messages AS cm
      SET status = $1, updated_at = NOW()
      WHERE cm.id = $2
        ${accessSql}
    `,
    values,
  );

  if (result.rowCount === 0) {
    throw new Error("MESSAGE_NOT_FOUND");
  }
}

export async function assignContactMessage(input: {
  messageId: number;
  assignedTo: number | null;
  actor: AuthenticatedAdminUser;
}): Promise<void> {
  await ensureAppSchema();

  if (!canManageAssignments(input.actor.role)) {
    throw new Error("FORBIDDEN");
  }

  if (input.assignedTo !== null) {
    const assignee = await getDb().query(
      `
        SELECT id
        FROM admin_users
        WHERE id = $1
          AND is_active = TRUE
        LIMIT 1
      `,
      [input.assignedTo],
    );

    if (assignee.rowCount === 0) {
      throw new Error("ASSIGNEE_NOT_FOUND");
    }
  }

  const result = await getDb().query(
    `
      UPDATE contact_messages
      SET assigned_to = $1, updated_at = NOW()
      WHERE id = $2
    `,
    [input.assignedTo, input.messageId],
  );

  if (result.rowCount === 0) {
    throw new Error("MESSAGE_NOT_FOUND");
  }
}
