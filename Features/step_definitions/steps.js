const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../tests/Page Objects/POManager');

// Test Data
const productName = "ZARA COAT 3";
const CCNumber = "4542 9931 9292 2290";
const CCExpiryDate = "05";
const CCExpiryMonth = "11";
const FullName = "Archa Vijayan";
const CVV = "123";
const Country = "India";

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    
    this.poManager = new POManager(this.page);
    this.username = username;

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.ValidLogin(username, password);
});

When('Add {string} to Cart', async function (product) {
    const dashboard = this.poManager.getDashboardPage();
    await dashboard.searchProductAddCart(product);
    await dashboard.NavigatetoCart();
});

Then('Verify {string} is displayed in the Cart', async function (product) {
    const cart = this.poManager.getCartPage();
    await cart.verifyProduct(product); // Passed parameter
    await cart.checkOut();
});

When('Enter valid details and Place the Order', async function () {
    const checkout = this.poManager.getCheckoutPage();
    await checkout.selectcountry(Country);
    await checkout.verifyemailID(this.username); // Used saved username
    await checkout.fillcreditcarddetails(CCNumber, CCExpiryDate, CCExpiryMonth, FullName, CVV);
    
    this.OrderID = await checkout.ExtractOrderID();
});

Then('Verify order is present in the OrderHistory', async function () {
    const orderhistory = this.poManager.getOrderhistoryPage();
    await orderhistory.verifyorderID(this.OrderID);
    await orderhistory.verifyorderid(this.OrderID);
    
    await this.browser.close();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    
    this.poManager = new POManager(this.page);
    this.username = username;

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.ValidLogin(username, password);

});
       
       
         Then('Verify Error message is displayed', async function () {
            Then('Verify Error message is displayed', async function () {
    const errorMessageLocator = this.page.locator("[style*='block']");
    
    await errorMessageLocator.waitFor();

    console.log(await errorMessageLocator.textContent());

    await expect(errorMessageLocator).toContainText("Incorrect");
});
         });
       