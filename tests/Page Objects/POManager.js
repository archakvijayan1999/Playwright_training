const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./Cart'); // 👈 Import CartPage
const { Dashboard } = require('./Dashboard');
const { Checkout } = require('./Checkout');
const {Orderhistory} = require('./Orderhistory');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new Dashboard(this.page);
        this.cartPage = new CartPage(this.page); 
        this.checkoutPage = new Checkout(this.page);
        this.orderhistoryPage = new Orderhistory(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderhistoryPage(){
        return this.orderhistoryPage
    }
}

module.exports = { POManager };