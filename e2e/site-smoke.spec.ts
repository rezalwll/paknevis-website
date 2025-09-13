import { expect, test } from "@playwright/test";

test("loads the Persian landing page and primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/پاک.نویس/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: /ویرایش هوشمند متن فارسی/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "دانلود افزونهٔ وُرد" })).toBeVisible();
});
