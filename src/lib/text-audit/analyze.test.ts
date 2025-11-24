import { describe, expect, it } from "vitest";

import { analyzePersianText } from "./analyze";
import type { TextAuditRule } from "./types";

const rules: TextAuditRule[] = [
  {
    id: "double-space",
    title: "فاصلهٔ تکراری",
    category: "spacing",
    severity: "warning",
    pattern: " {2,}",
    flags: "gu",
    message: "بین واژه‌ها بیش از یک فاصله وجود دارد.",
    suggestion: "فاصله‌های اضافی را حذف کنید.",
    example: "دو  فاصله",
    replacement: " ",
  },
  {
    id: "ascii-question",
    title: "علامت پرسش لاتین",
    category: "punctuation",
    severity: "info",
    pattern: "\\?",
    flags: "gu",
    message: "در متن فارسی از علامت پرسش فارسی استفاده کنید.",
    suggestion: "؟",
    example: "چرا?",
    replacement: "؟",
  },
];

describe("analyzePersianText", () => {
  it("returns ordered findings with stable source locations", () => {
    const report = analyzePersianText("چرا?\nدو  فاصله", { rules });

    expect(report.issues).toHaveLength(2);
    expect(report.issues[0]).toMatchObject({ ruleId: "ascii-question", line: 1, column: 4 });
    expect(report.issues[1]).toMatchObject({ ruleId: "double-space", line: 2 });
  });

  it("supports category and severity filters", () => {
    const report = analyzePersianText("چرا? دو  فاصله", {
      rules,
      categories: ["spacing"],
      minimumSeverity: "warning",
    });

    expect(report.issues.map((issue) => issue.ruleId)).toEqual(["double-space"]);
  });

  it("caps untrusted input findings", () => {
    const report = analyzePersianText("? ? ? ?", { rules, maxIssues: 2 });
    expect(report.issues).toHaveLength(2);
  });
});
