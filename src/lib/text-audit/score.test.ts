import { describe, expect, it } from "vitest";

import { calculateAuditSummary } from "./score";

describe("calculateAuditSummary", () => {
  it("weights errors more heavily than warnings and information", () => {
    expect(calculateAuditSummary(["error", "warning", "info"])).toEqual({
      total: 3,
      errors: 1,
      warnings: 1,
      info: 1,
      score: 87,
    });
  });

  it("never returns a negative score", () => {
    expect(calculateAuditSummary(Array.from({ length: 20 }, () => "error")).score).toBe(0);
  });
});
