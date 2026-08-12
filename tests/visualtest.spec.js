const { test, expect } = require('@playwright/test');

test('TC:01 Take Screenshot', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.screenshot({ path: 'visualtestTC01.png' });
});

test("TC: 02 Popup validations Screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").click();
    await page.screenshot({ path: 'visualtestTC02_1.png' })
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'visualtestTC02_2.png' })
})


test('TC:03 Compare Screenshot', async ({ page }) => {


    await page.goto("https://flightaware.com");
    expect(await page.screenshot()).toMatchSnapshot('image.png');

});