const { test, expect, request } = require('@playwright/test');

const userAPayLoad = { email: "archakyahoo@yahoo.com", password: "Archa@1999" };
const userBPayLoad = { email: "archakvijayan1999@gmail.com", password: "Archa@1999" };

let userBToken;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponseB = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
        data: userBPayLoad
    });
    expect(loginResponseB.ok()).toBeTruthy();
    const loginResponseJsonB = await loginResponseB.json();
    userBToken = loginResponseJsonB.token;
});

test('Assignment 2: User B cannot access User A booking', async ({ page }) => {
    const apiContext = await request.newContext();

    // 1. Authenticate User A (Yahoo) completely via API calls
    const loginResponseA = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
        data: userAPayLoad
    });
    expect(loginResponseA.ok()).toBeTruthy();
    const loginResponseJsonA = await loginResponseA.json();
    const userAToken = loginResponseJsonA.token;

    // 🆕 FETCH A VALID DYNAMIC EVENT ID FROM THE SERVER
    const eventsResponse = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events", {
        headers: { 'Authorization': `Bearer ${userAToken}` }
    });
    expect(eventsResponse.ok()).toBeTruthy();
    const eventsJson = await eventsResponse.json();
    const liveEventId = eventsJson.data[0].id; // Grabs the ID of the first available event

    // 2. User A creates a booking programmatically using the real event ID
    const createBookingResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
        headers: {
            'Authorization': `Bearer ${userAToken}`,
            'Content-Type': 'application/json'
        },
        data: {
            eventId: liveEventId, // 🆕 Using the real ID instead of 1
            seatsBooked: 1
        }
    });
    expect(createBookingResponse.ok()).toBeTruthy();
    const bookingJson = await createBookingResponse.json();
    const bookingId = bookingJson.data.id; 

    // 3. Inject User B's token into the browser local storage
    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, userBToken);

    // 4. User B attempts to access User A's private booking URL directly
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${bookingId}`);

    // 5. Verify the "Access Denied" error message/page layout is visible to User B
    const errorBanner = page.locator('text=/Access Denied/i');
    await expect(errorBanner).toBeVisible();
});