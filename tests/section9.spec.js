const {test,expect} = require('@playwright/test')
const BaseURL = "https://eventhub.rahulshettyacademy.com"
const Email = "archakvijayan1999@gmail.com"
const Password = "Archa@1999"
async function Login(page) {

await page.goto(BaseURL);
await page.getByPlaceholder("you@email.com").fill(Email);
await page.getByLabel("Password").fill(Password);
await page.locator('#login-btn').click();
await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

function futureDateValue() {
    const future = new Date();
    future.setDate(future.getDate() + 5); // Add 5 days
    
    // Dynamically extracts local YYYY-MM-DD format
    const datePart = future.toLocaleDateString('en-CA'); 
    
    // Combines with a fixed noon time string
    return `${datePart}T12:00`;
}

test('TC:01', async ({page})=>{
await Login(page);
await page.goto(`${BaseURL}/admin/events`);
await expect(page).toHaveURL(`${BaseURL}/admin/events`);
// Verify the browser URL matches your BaseURL + the admin events route path
await expect(page).toHaveURL(`${BaseURL}/admin/events`);
await page.locator("#event-title-input").fill(`Test Event ${Date.now()}`);
await page.getByPlaceholder("Describe the event…").fill("Test Description");
await page.getByLabel("City").fill("Bangalore");
await page.getByLabel("Venue").fill("Silicon Valley Tech Park");
await page.getByLabel("Price").fill("100");
await page.getByLabel("Total Seats").fill("50");

const dynamicFutureDate = futureDateValue();
await page.getByLabel("Event Date & Time").fill(dynamicFutureDate);
await page.locator("#add-event-btn").click();
await expect(page.getByText('Event created!')).toBeVisible();

//step 3
await page.goto(`${BaseURL}/events`);




});
