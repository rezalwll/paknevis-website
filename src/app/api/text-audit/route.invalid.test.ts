import { describe, expect, it } from "vitest";

import { MAX_AUDIT_TEXT_LENGTH } from "./request";
import { POST } from "./route";

describe("POST /api/text-audit invalid requests", () => {
  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost/api/text-audit", {
        method: "POST",
        body: "{invalid",
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: { code: "INVALID_JSON" },
    });
  });

  it("rejects missing text and oversized input", async () => {
    const missing = await POST(
      new Request("http://localhost/api/text-audit", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    );
    const oversized = await POST(
      new Request("http://localhost/api/text-audit", {
        method: "POST",
        body: JSON.stringify({ text: "ا".repeat(MAX_AUDIT_TEXT_LENGTH + 1) }),
      }),
    );

    expect(missing.status).toBe(422);
    expect(oversized.status).toBe(413);
  });

  it("rejects a multibyte payload before parsing its contents", async () => {
    const response = await POST(
      new Request("http://localhost/api/text-audit", {
        method: "POST",
        body: JSON.stringify({ text: "ا".repeat(40_000) }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "PAYLOAD_TOO_LARGE" },
    });
  });
});
