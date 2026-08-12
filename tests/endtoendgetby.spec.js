const {test,expect} = require('@playwright/test')
test('End to End Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName = "ZARA COAT 3"
    const Email = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const products = page.locator(".card-body");
    const MailId = "archakvijayan1999@gmail.com"
    await Email.fill(MailId);
    await password.fill('Archa@1999');
    await page.getByRole("button", {'name': 'Login' }).click();
    await page.waitForLoadState('networkidle');
    // if above step does not work we can wait until 1 below element to load to make sure this steps works
    await page.getByRole("button", {'name': ' HOME' }).waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.getByRole("button", {'name': 'Continue Shopping' }).waitFor();
   //confirming the item in cart
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole('button',{name:"Checkout"}).click();
   //to enter text sequentially
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name :"India"}).nth(1).click();
   //fill in card details
   await page.locator('.field', { hasText: 'Credit Card Number' }).getByRole('textbox').fill('4542 9931 9292 200');
   await page.locator('.field.small', { hasText: 'Expiry Date' }).getByRole('combobox').first().selectOption('05');
   await page.locator('.field.small', { hasText: 'Expiry Date' }).getByRole('combobox').last().selectOption('12');
   await page.locator('.field.small', { hasText: 'CVV Code' }).getByRole('textbox').fill('123');
   await page.locator(".field:has-text('Name on Card')").getByRole('textbox').fill("Archa Vijayan");
   await page.locator("a.action__submit", { hasText: 'Place Order' }).click();
   await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
   //Extract order ID
const rawText = await page.locator('.em-spacer-1 label').last().textContent();   
const cleanOrderId = rawText.split('|')[1].trim();
   console.log(cleanOrderId);
   //Navigation to order history
   await page.getByRole('button',{name:"ORDERS"}).click();   
const matchingRow = page.getByRole('row').filter({ hasText: cleanOrderId });
await matchingRow.getByRole('button', { name: 'View' }).click();
await page.pause();

});

