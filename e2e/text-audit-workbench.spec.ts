import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("reviews Persian text with keyboard and filter controls", async ({ page }) => {
  await page.goto("/tools/text-audit");

  const editor = page.getByRole("textbox", { name: "متن برای بررسی" });
  await editor.click();
  await editor.press("Control+A");
  await editor.pressSequentially("اين  متن،ادامه");
  await editor.press("Control+Enter");

  await expect(page.getByRole("heading", { name: "پیشنهادهای ویرایشی" })).toBeVisible();
  await expect(page.getByText("۳ مورد")).toBeVisible();

  await page.getByRole("checkbox", { name: "فاصله‌گذاری" }).uncheck();
  await expect(page.getByText("۲ مورد")).toBeVisible();

  await page.getByLabel("حداقل شدت پیشنهاد").selectOption("error");
  await expect(page.getByText("۱ مورد")).toBeVisible();
});

test("keeps the text-audit journey free of serious accessibility violations", async ({ page }) => {
  await page.goto("/tools/text-audit");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  expect(serious).toEqual([]);
});
