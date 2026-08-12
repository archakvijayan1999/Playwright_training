const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayLoad = {userEmail:"archakvijayan1999@gmail.com",userPassword:"Archa@1999"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
})

test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token );
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i =0; i<await rows.count(); ++i)
    {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId.trim()))
       {
           await rows.nth(i).locator("button").first().click();
           break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails.trim())).toBeTruthy();
});