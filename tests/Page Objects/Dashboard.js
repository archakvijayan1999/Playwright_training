class Dashboard{
    constructor(page)
    {
        this.products =page.locator(".card-body");
        this.productsText = page.locator(".card-body b")
        this.AddtoCart = page.locator("[routerlink='/dashboard/cart']")
    }

   async searchProductAddCart(productName)
   {
     const titles = await this.productsText.allTextContents();
   console.log(titles); 
   const count = await this.products.count();
   for (let i = 0; i < count; i++) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await this.products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   }
   async NavigatetoCart()
   {
       await this.AddtoCart.click()

   }
}

module.exports={Dashboard}