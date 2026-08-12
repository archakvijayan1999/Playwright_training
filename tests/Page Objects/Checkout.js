const { expect } = require("@playwright/test");
class Checkout {
    constructor(page) {
        this.page = page;
        this.countryfield = page.locator("[placeholder*='Country']");
        this.countrydropdown = page.locator(".ta-results");
        this.useremail = page.locator(".user__name [type='text']").first();
        this.ccnumberfield = page.locator(".field:has-text('Credit Card Number')");
        this.ccexpirymonthfield = page.locator(".input.ddl").first();
        this.ccexpirydatefield = page.locator(".input.ddl").last();
        this.ccCVVfield = page.locator('.field.small', { hasText: 'CVV' });
        this.ccnamefield = page.locator(".field:has-text('Name on Card')");
        this.placeorderbutton = page.locator('a.action__submit', { hasText: 'Place Order' });
        this.thankstext = page.locator("h1:has-text('Thankyou for the order.')");
        this.orderIDtext =page.locator("td label").last();
        this.orderhistory = page.locator("td label").first();

    }

    async selectcountry(country) {
        await this.countryfield.pressSequentially("ind");
        await this.countrydropdown.waitFor();
        const optionsCount = await this.countrydropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countrydropdown.locator("button").nth(i).textContent();
            if (text.trim() === country) {
                await this.countrydropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

   async verifyemailID(EmailID) {
    await expect(this.useremail).toHaveText(EmailID);
}

    async fillcreditcarddetails(CCNumber, CCExpiryDate, CCExpiryMonth, FullName, CVV) {
        await this.ccnumberfield.locator('input').fill(CCNumber);
        await this.ccexpirydatefield.selectOption(CCExpiryDate);
        await this.ccexpirymonthfield.selectOption(CCExpiryMonth);
        await this.ccnamefield.locator("input").fill(FullName);
        await this.ccCVVfield.locator('input').fill(CVV);
        await this.placeorderbutton.click();


    }

    async ExtractOrderID(){
        const OrderId = await this.orderIDtext.textContent();
        const OrderID = OrderId.split("|")[1].trim(" ");
        await this.orderhistory.click();
        return OrderID;

    }





}
module.exports = { Checkout };