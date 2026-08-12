const { expect } = require("@playwright/test");
class Orderhistory {
    constructor(page) {
        this.orderhistory = page.locator("tbody");
        this.page = page;

    }

    async verifyorderID(OrderID) {
        await this.orderhistory.waitFor();
        const rows = await this.page.locator("tbody tr");
        for (let i = 0; i < await rows.count(); i++) {
            const ActualOrderId = await rows.nth(i).locator("th").textContent();
            if (OrderID == ActualOrderId) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async verifyorderid(OrderID){
        const orderIdDetails = await this.page.locator(".col-text").textContent();
        expect(OrderID.includes(orderIdDetails)).toBeTruthy();
    }
}

module.exports = {Orderhistory}