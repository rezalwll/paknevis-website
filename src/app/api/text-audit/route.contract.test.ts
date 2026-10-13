import { describe, expect, it } from "vitest";

import { POST } from "./route";

describe("POST /api/text-audit response contract", () => {
  it("returns a versioned report and disables intermediary caching", async () => {
    const response = await POST(
      new Request("http://localhost/api/text-audit", {
        method: "POST",
        body: JSON.stringify({ text: "یک متن سالم." }),
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": "test-request-2026",
        },
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBe("test-request-2026");
    expect(body).toMatchObject({
      ok: true,
      report: {
        version: "1.0",
        summary: { total: 0, score: 100 },
        metrics: { words: 3 },
      },
      meta: { requestId: "test-request-2026" },
    });
  });
});
