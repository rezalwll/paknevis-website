import { TextAuditRequestError } from "./errors";

export const MAX_AUDIT_TEXT_LENGTH = 20_000;
export const MAX_AUDIT_REQUEST_BYTES = 64_000;

export async function readTextAuditRequest(request: Request): Promise<string> {
  const rawBody = await request.text();
  const payloadBytes = new TextEncoder().encode(rawBody).byteLength;

  if (payloadBytes > MAX_AUDIT_REQUEST_BYTES) {
    throw new TextAuditRequestError(413, "PAYLOAD_TOO_LARGE", "حجم درخواست از حد مجاز بیشتر است.");
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
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
