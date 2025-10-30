import { describe, expect, it } from "vitest";

import { normalizePersianText } from "./normalize";

describe("normalizePersianText", () => {
  it("normalizes Arabic letter variants and digits", () => {
    expect(normalizePersianText("عربي كد ١٢٣")).toBe("عربی کد ۱۲۳");
  });

  it("normalizes line endings without trimming author text", () => {
    expect(normalizePersianText(" سطر اول\r\nسطر دوم ")).toBe(" سطر اول\nسطر دوم ");
  });
});
