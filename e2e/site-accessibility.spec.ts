import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("keeps the public landing page free of serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  expect(serious).toEqual([]);
});
