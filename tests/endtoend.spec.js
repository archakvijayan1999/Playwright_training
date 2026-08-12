const {test,expect} = require('@playwright/test')
test('End to End Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName = "ZARA COAT 3"
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
   const count = await products.count();
   for (let i = 0; i < count; i++) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink='/dashboard/cart']").click()
   //confirming cart the page load
   await page.locator("div li").first().waitFor();
   //confirming the item in cart
   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
   expect(bool).toBeTruthy();
   //checking out 
   await page.locator("text=Checkout").click();
   //to enter text sequentially
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   // In case of delay due to traffic we can add a delay 
  // await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 })
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   expect(page.locator(".user__name [type='text']").first()).toHaveText(MailId);
   //fill in card details
   const cardInput = page.locator(".field:has-text('Credit Card Number')");
   await cardInput.locator('input').fill('4542 9931 9292 2290');
   await page.locator(".input.ddl").first().selectOption('05');
   await page.locator(".input.ddl").last().selectOption('11');
   // Example: Find the .field.small container that contains "CVV", then locate its input
   await page.locator('.field.small', { hasText: 'CVV' }).locator('input').fill('123');
   // Targets the specific field block containing 'Name on Card', then selects its input box
   await page.locator(".field:has-text('Name on Card')").locator("input").fill("Archa Vijayan");
   //place order
   await page.locator('a.action__submit', { hasText: 'Place Order' }).click();
   //Verify the text in order complete page
   await expect(page.locator("h1:has-text('Thankyou for the order.')")).toHaveText(" Thankyou for the order. ");
   //Extract order ID
   const OrderId = await page.locator("td label").last().textContent();
   const OrderID= OrderId.split("|")[1].trim(" ");
   console.log(OrderID)
   //Navigation to order history
   await page.locator("td label").first().click();
   //
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); i++) {
     const ActualOrderId = await rows.nth(i).locator("th").textContent();
      if (OrderID == ActualOrderId) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   //verify the order ID in order history details page
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(OrderID.includes(orderIdDetails)).toBeTruthy();




   


   await page.pause();

});

