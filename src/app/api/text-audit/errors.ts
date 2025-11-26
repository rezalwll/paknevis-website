export class TextAuditRequestError extends Error {
  constructor(
    readonly status: number,
    readonly code: "INVALID_JSON" | "INVALID_TEXT" | "TEXT_TOO_LONG",
    message: string,
  ) {
    super(message);
    this.name = "TextAuditRequestError";
  }
}
