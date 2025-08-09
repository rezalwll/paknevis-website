const SAFE_ADMIN_PREFIX = "/admin";

export function buildPathWithState(
  path: string,
  key: "error" | "notice",
  value: string,
): string {
  const searchParams = new URLSearchParams({ [key]: value });
  return `${path}?${searchParams.toString()}`;
}

export function getSafeAdminRedirectPath(value: string | null, fallback: string): string {
  if (!value || !value.startsWith(SAFE_ADMIN_PREFIX)) {
    return fallback;
  }

  if (value.includes("://") || value.startsWith("//") || value.includes("\n") || value.includes("\r")) {
    return fallback;
  }

  return value;
}
