const { test, expect } = require('@playwright/test')
test('End to End Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //abort
    // page.route('**/*.css', route =>
    //     route.abort()
    // );
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName = "ZARA COAT 3"
    //track request
    page.on('request', request => console.log(request.url()));
    //track response
    page.on('response', response => console.log(response.url(), response.status()));
    const Email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const products = page.locator(".card-body");
    const MailId = "archakvijayan1999@gmail.com"
    await Email.fill(MailId);
    await password.fill('Archa@1999');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    // if above step does not work we can wait until 1 below element to load to make sure this steps works
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});