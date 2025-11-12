import { describe, expect, it } from "vitest";

import { calculateTextMetrics } from "./metrics";

describe("calculateTextMetrics", () => {
  it("counts Persian words, paragraphs and reading time", () => {
    const metrics = calculateTextMetrics("این یک جمله است.\n\nاین پاراگراف دوم است؟");

    expect(metrics.words).toBe(8);
    expect(metrics.paragraphs).toBe(2);
    expect(metrics.sentences).toBe(2);
    expect(metrics.readingMinutes).toBe(1);
  });

  it("returns zero reading time for empty input", () => {
    expect(calculateTextMetrics("   ").readingMinutes).toBe(0);
  });
});
