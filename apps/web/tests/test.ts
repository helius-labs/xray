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

// test.describe("test nav stats", () => {
//     test("tps can load", async ({ page }) => {
//         await page.goto("/");

//         expect(await page.getByTestId("stats-tps"));
//     });
//     test("price can load", async ({ page }) => {
//         await page.goto("/");

//         expect(await page.getByTestId("stats-price"));
//     });
// });

// test.describe("test search", () => {
//     const tokenAddress = "HxhWkVpk5NS4Ltg5nij2G671CKXFRKPK8vy271Ub4uEK";
//     const backpackName = "@xray";
//     const bonfidaDomain = "qudo.sol";
//     const bonfidaResolution = "qudoGprpXXPMwV2TaVgwWbPD7c2GBydfoc6AUr4oWmq";
//     const ansDomain = "scammo.abc";
//     const ansResolution = "7hPhaUpydpvm8wtiS3k4LPZKUmivQRs7YQmpE1hFshHx";

//     test("can load base58 wallet address", async ({ page }) => {
//         const xrayWallet = "xraya1y1LychBoLaaDrDE9X27kRUMrHweWbkavvzByR";
//         const expectedTransaction =
//             "4iWewsETFG98vcWWaX9QKyv1MJZkFLay4mxQLbjuzoxuwg9UwVbYEKToh57kvtec3519q36vFVzpTYzthy5npr3F";

//         await page.goto("/");

//         const input = await page.getByTestId("search-input");

//         await input.fill(xrayWallet);

//         await page.keyboard.press("Enter");

//         expect(await page.getByTestId(expectedTransaction));

//         expect(page).toHaveURL(`http://localhost:4173/${xrayWallet}/wallet`);
//     });

//     // test("can load base58 token address", async ({ page }) => {
//     //     await page.goto("/");

//     //     const input = await page.getByTestId("search-input");

//     //     input.fill(tokenAddress);

//     //     await page.keyboard.press("Enter");

//     //     expect(page).toHaveURL(`http://localhost:4173/${tokenAddress}/token`);

//     //     expect(await page.getByTestId("transactions-loaded"));
//     // });

//     // test("can load backpack token address", async ({ page }) => {
//     //     await page.goto("/");

//     //     const input = await page.getByTestId("search-input");

//     //     input.fill(tokenAddress);

//     //     await page.keyboard.press("Enter");

//     //     expect(page).toHaveURL(`http://localhost:4173/${tokenAddress}/token`);

//     //     expect(await page.getByTestId("transactions-loaded"));
//     // });
// });
