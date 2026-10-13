import { test, expect } from "@playwright/test";

const profiles = [
  { path: "/automotive/", title: /ForgeLine Auto Care/, heading: /Keep your vehicle ready/, content: /Brake Service/ },
  { path: "/hairdresser/", title: /Juniper Hair Studio/, heading: /A good hair day/, content: /Color Services/ },
  { path: "/hvac/", title: /Northstar Heating & Air/, heading: /Comfort at home/, content: /AC Repair/ },
  { path: "/retirement-home/", title: /Willow Creek Senior Living/, heading: /A community to belong to/, content: /Family Resources/ },
  { path: "/recording-artist/", title: /MajorE/, heading: /The story is personal/, content: /Who Is MajorE/ },
  { path: "/music-producer/", title: /Deep Tone Studios/, heading: /Bring the idea/, content: /Beat Licensing/ },
];

for (const profile of profiles) {
  test(`${profile.path} renders its industry content and contact path`, async ({ page }) => {
    await page.goto(profile.path);
    await expect(page).toHaveTitle(profile.title);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(profile.heading);
    await expect(page.getByText(profile.content, { exact: false }).first()).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#process")).toBeVisible();
    await expect(page.locator("#showcase")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator("#contact").getByRole("link")).toHaveAttribute("href", /^mailto:/);
  });
}

test("industry navigation links target existing sections", async ({ page }) => {
  for (const profile of profiles) {
    await page.goto(profile.path);
    const links = await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link").evaluateAll((items) =>
      items.map((item) => item.getAttribute("href")).filter((href): href is string => Boolean(href)),
    );
    for (const href of links) {
      if (href.startsWith("#")) {
        await expect(page.locator(href)).toHaveCount(1);
      }
    }
  }
});

test("industry pages do not overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const profile of profiles) {
    await page.goto(profile.path);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, profile.path).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("demo directory links to all six industry templates", async ({ page }) => {
  await page.goto("/demos/");
  await expect(page).toHaveTitle(/Industry Website Demos/);
  for (const profile of profiles) {
    await expect(page.getByRole("link", { name: /Explore template/ }).filter({ has: page.locator(`a[href="${profile.path}"]`) })).toHaveCount(0);
    await expect(page.locator(`a[href="${profile.path}"]`)).toBeVisible();
  }
});
