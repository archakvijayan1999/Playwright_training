//import annotation from JAR
const {test,expect} = require('@playwright/test')

test('First playwright test', async function({browser})  //or ()=>
    {
      const context = await browser.newContext()
      const page =  await context.newPage()
      await page.goto('https://www.youtube.com/')    

    }
);

test('TC:02 - Title check', async ({browser})=>
    {
      const context = await browser.newContext();
      const page =  await context.newPage();
      await page.goto('https://www.google.com/');   
      // console.log(await page.title());
      await page.title();
      await expect(page).toHaveTitle("Google");
    }
); 

test('TC:03 - Extract error message on Login', async ({browser})=>
    {
      const context = await browser.newContext();
      const page =  await context.newPage();
      await page.goto('https://rahulshettyacademy.com/loginpagePractise/');   
      // console.log(await page.title());
      // await page.title();
      // await expect(page).toHaveTitle("Google");
      await page.locator('#username').fill('rahulshetty');
      await page.locator("[type='password']").fill('learning'); 
      await page.locator('#signInBtn').click();
      console.log(await page.locator("[style*='block']").textContent());
      //to find substring level
      await expect(page.locator("[style*='block']")).toContainText('Incorrect');
      //to find exact match
      await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.'); 

       }
);


test('TC:04 - Successful login and first element validation', async ({browser})=>
    {
      const context = await browser.newContext();
      const page =  await context.newPage();
      await page.goto('https://rahulshettyacademy.com/loginpagePractise/');   
      // console.log(await page.title());
      // await page.title();
      // await expect(page).toHaveTitle("Google");
      await page.locator('#username').fill('rahulshettyacademy');
      await page.locator("[type='password']").fill('Learning@830$3mK2'); 
      await page.locator('#signInBtn').click();
      console.log(await page.locator(".card-body a").first().textContent());
      //print all titles in the page
      const allTitles = await page.locator(".card-body a").allTextContents();
      console.log(allTitles);

       }
);

test('TC:05 - ASSIGNMENT - Successful login and first element validation', async ({browser})=>
    {
      const context = await browser.newContext();
      const page =  await context.newPage();
      const Email = page.locator('#userEmail')
      const Password = page.locator('#userPassword')
      const LoginButton = page.locator('#login')
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');   
      // console.log(await page.title());
      // await page.title();
      // await expect(page).toHaveTitle("Google");
      await Email.fill('archakvijayan1999@gmail.com');
      await Password.fill('Archa@1999'); 
      await LoginButton.click();
      // console.log(await page.locator(".card-body h5 b").first().textContent());
     //if want to print all the titles in the page ig above 1 step and execute below steps
     await page.waitForLoadState('networkidle');
      const allTitles = await page.locator(".card-body h5 b").allTextContents();
      console.log(allTitles);
    }
);


