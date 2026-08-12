const {test,expect} = require('@playwright/test')
test('TC:01 - child tab', async ({page})=>{

    const date =  18;
    const Month = 5;
    const year = 2027;
    const expectedList = [Month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(Month)-1).click();
    await page.locator('.react-calendar__tile', { hasText: date }).click();
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
    expect(Number(value)).toEqual(expectedList[i]); 
    }   
});