const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async NavigatetoCart() {
        await this.cart.click();
    }


    async verifyProduct(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkOut() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
return this.page.locator(".cartSection h3", { hasText: productName });
   }
}

module.exports = { CartPage };