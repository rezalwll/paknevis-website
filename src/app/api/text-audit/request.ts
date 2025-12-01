import { TextAuditRequestError } from "./errors";

export const MAX_AUDIT_TEXT_LENGTH = 20_000;

export async function readTextAuditRequest(request: Request): Promise<string> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    throw new TextAuditRequestError(400, "INVALID_JSON", "بدنهٔ درخواست باید JSON معتبر باشد.");
  }

  if (!payload || typeof payload !== "object" || typeof (payload as { text?: unknown }).text !== "string") {
    throw new TextAuditRequestError(422, "INVALID_TEXT", "فیلد text باید یک رشته باشد.");
  }

  const text = (payload as { text: string }).text;
  if (text.length > MAX_AUDIT_TEXT_LENGTH) {
    throw new TextAuditRequestError(
      413,
      "TEXT_TOO_LONG",
      `متن نباید بیشتر از ${MAX_AUDIT_TEXT_LENGTH.toLocaleString("fa-IR")} نویسه باشد.`,
    );
  }

  return text;
}
