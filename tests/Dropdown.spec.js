const {test,expect} = require('@playwright/test')
test('TC:01 - select from dropdown', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const documentlink = page.locator("[href*='documents-request']");
    const signInButton = page.locator('#signInBtn');
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption('consult');
    // await page.pause();
    //Radio Button Selection
    await page.locator(".radiotextsty").last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // to output true or false if the radio button is checked or not
    console.log(await page.locator(".radiotextsty").last().isChecked());
    //checkbox selection
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //uncheck
    await page.locator("#terms").uncheck();
    //since no assertions, we can use expect to check if the checkbox is unchecked
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //Blinking text - Assertion to check attribute 
    await expect(documentlink).toHaveAttribute('class','blinkingText');

});