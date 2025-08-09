type ErrorLogMeta = Record<string, string | number | boolean | null | undefined>;

export function logServerError(message: string, error: unknown, meta?: ErrorLogMeta): void {
  const safeError =
    error instanceof Error
      ? { name: error.name, message: error.message }
      : { name: "UnknownError", message: "Unknown error" };

  console.error(message, {
    ...meta,
    error: safeError,
  });
}
