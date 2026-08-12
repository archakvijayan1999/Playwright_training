const{test}=require('@playwright/test');

test('TC 01', async({page})=>{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
await page.locator('#userEmail').fill("archakvijayan1999@gmail.com");
await page.locator('#userPassword').fill("Archa@1999");
await page.locator('#login').click()
});