const { test, expect } = require('@playwright/test')
const { POManager } = require('./Page Objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/endtoendPO.json")))
for (const data of dataset) {

    test(`TC 01 - E2E Order Test for ${data.MailId}`, async ({ page }) => {
        const productName = "ZARA COAT 3"
        const products = page.locator(".card-body");
        const CCNumber = "4542 9931 9292 2290"
        const CCExpiryDate = "05"
        const CCExpiryMonth = "11"
        const FullName = "Archa Vijayan"
        const CVV = "123"
        const Country = "India"

        const poManager = new POManager(page);
        //Login
        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.ValidLogin(data.MailId, data.password);
        //Dashboard
        const dashboard = poManager.getDashboardPage();
        await dashboard.searchProductAddCart(productName);
        await dashboard.NavigatetoCart();

        //Cart
        const cart = poManager.getCartPage();
        await cart.verifyProduct();
        await cart.checkOut();

        //checkout
        const checkout = poManager.getCheckoutPage();
        await checkout.selectcountry(Country);
        await checkout.verifyemailID(data.MailId);
        await checkout.fillcreditcarddetails(CCNumber, CCExpiryDate, CCExpiryMonth, FullName, CVV);
        const OrderID = await checkout.ExtractOrderID();

        

        //Orderhistory
        
        const orderhistory = poManager.getOrderhistoryPage();
        await orderhistory.verifyorderID(OrderID);
        await orderhistory.verifyorderid(OrderID)


    });
}
