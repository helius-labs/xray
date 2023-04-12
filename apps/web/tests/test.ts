import { expect, test } from "@playwright/test";

test("home page can load", async ({ page }) => {
    await page.goto("/");

    expect(await page.textContent("h1")).toBe("XRAY");
});

test.describe("test menu", () => {
    test("menu can open and close", async ({ page }) => {
        await page.goto("/");

        const menuButton = await page.getByTestId("menu-button");

        await menuButton.click();

        expect(await page.getByTestId("menu-modal"));

        await page.getByTestId("hide-modal").click();

        expect(await page.getByTestId("menu-modal")).toBeHidden();
    });
});
