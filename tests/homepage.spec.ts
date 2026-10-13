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

test("navigation and primary calls to action point to the correct sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services" }))
    .toHaveAttribute("href", "#services");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Our Process" }))
    .toHaveAttribute("href", "#process");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Get a Quote" }))
    .toHaveAttribute("href", "#contact");
  await expect(page.getByRole("link", { name: /Get a Website Quote/ }).first())
    .toHaveAttribute("href", "#contact");
  await expect(page.getByRole("link", { name: /Start a Project/ }))
    .toHaveAttribute("href", "mailto:hello@tailorforged.com");
});

test("service and contact sections are reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#services")).toBeVisible();
  await expect(page.locator("#process")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("theme configuration is exposed as shared CSS variables", async ({ page }) => {
  await page.goto("/");

  const theme = await page.locator("body").evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      accent: styles.getPropertyValue("--color-accent").trim(),
      background: styles.backgroundColor,
      foreground: styles.getPropertyValue("--color-foreground").trim(),
    };
  });

  expect(theme.accent).toBe("#8B6A48");
  expect(theme.background).toBe("rgb(248, 247, 244)");
  expect(theme.foreground).toBe("#1E1E1C");
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
