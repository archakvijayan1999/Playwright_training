class LoginPage{
    constructor(page)
    {
        this.userName = page.locator('#userEmail');
        this.Password = page.locator('#userPassword');
        this.LoginButton = page.locator('#login');
        this.page = page;
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async ValidLogin(username,password)
    {
        await this.userName.fill(username);
        await this.Password.fill(password);
        await this.LoginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage}