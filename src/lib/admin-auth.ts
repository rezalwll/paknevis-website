import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createAdminSessionRecord,
  deleteAdminSessionRecord,
  findAdminSessionUser,
  findAdminUserByEmail,
  touchAdminLastLogin,
} from "@/lib/admin-data";
import { type AdminRole, type AuthenticatedAdminUser } from "@/lib/admin-types";

const scryptAsync = promisify(scrypt);
const SESSION_COOKIE_NAME = "paknevis_admin_session";
const SESSION_TTL_DAYS = 7;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [algorithm, saltHex, digestHex] = storedHash.split("$");

  if (algorithm !== "scrypt" || !saltHex || !digestHex) {
    return false;
  }

  const expected = Buffer.from(digestHex, "hex");
  const derivedKey = (await scryptAsync(password, Buffer.from(saltHex, "hex"), 64)) as Buffer;

  if (expected.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(expected, derivedKey);
}

export async function authenticateAdminUser(
  email: string,
  password: string,
): Promise<AuthenticatedAdminUser | null> {
  const candidate = await findAdminUserByEmail(email);

  if (!candidate || !candidate.isActive) {
    return null;
  }

  const passwordMatches = await verifyPassword(password, candidate.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  await touchAdminLastLogin(candidate.id);

  return {
    id: candidate.id,
    email: candidate.email,
    fullName: candidate.fullName,
    role: candidate.role,
  };
}

export async function beginAdminSession(userId: number): Promise<void> {
  const rawToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await createAdminSessionRecord(userId, hashToken(rawToken), expiresAt);

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: rawToken,
    expires: expiresAt,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function endAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (existingToken) {
    await deleteAdminSessionRecord(hashToken(existingToken));
  }

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getCurrentAdminUser(): Promise<AuthenticatedAdminUser | null> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!rawToken) {
    return null;
  }

  return findAdminSessionUser(hashToken(rawToken));
}

export async function requireAdminUser(): Promise<AuthenticatedAdminUser> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function requireAdminRole(
  allowedRoles: AdminRole[],
): Promise<AuthenticatedAdminUser> {
  const user = await requireAdminUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/admin");
  }

  return user;
}
