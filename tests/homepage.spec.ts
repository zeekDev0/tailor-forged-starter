
import { test, expect } from "@playwright/test";

test("homepage has the correct title and main heading", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Tailor Forged Marketing/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Your business deserves a website/i,
    }),
  ).toBeVisible();
});

test("service and contact sections are reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#services")).toBeVisible();
  await expect(page.locator("#process")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Get a Website Quote/ }).first(),
  ).toHaveAttribute("href", "#contact");
});

test("mobile layout does not create horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});
