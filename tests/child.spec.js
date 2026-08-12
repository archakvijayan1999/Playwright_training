const {test,expect} = require('@playwright/test')
test('TC:01 - child tab', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentlink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //Listen for any new page pending, rejected, fullfilled
        documentlink.click() //new page ie opened
    ]);
    //extract a particular text from the child page
    const text = await newPage.locator(".red").textContent();
    console.log(text)
    //getting email from the text
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});