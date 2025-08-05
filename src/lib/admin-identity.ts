const ADMIN_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_USERNAME_REGEX = /^[a-z0-9._-]{3,40}$/;

export function normalizeAdminEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidAdminEmail(value: string): boolean {
  return ADMIN_EMAIL_REGEX.test(normalizeAdminEmail(value));
}

export function normalizeAdminUsername(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidAdminUsername(value: string): boolean {
  return ADMIN_USERNAME_REGEX.test(normalizeAdminUsername(value));
}

export function createAdminUsernameBaseFromEmail(email: string): string {
  const localPart = normalizeAdminEmail(email).split("@")[0] ?? "";
  const normalized = localPart
    .replace(/[^a-z0-9._-]+/g, ".")
    .replace(/[._-]{2,}/g, ".")
    .replace(/^[._-]+|[._-]+$/g, "")
    .slice(0, 40);

  return normalized.length >= 3 ? normalized : "admin";
}

export function buildUniqueAdminUsername(
  preferredBase: string,
  takenUsernames: Set<string>,
): string {
  const base = normalizeAdminUsername(preferredBase).slice(0, 40) || "admin";

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
