import playwright from 'playwright';

async function bookingResult(origin, destin, trDate, flightChosen) {
  const browser = await playwright.chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://secure.yatra.com/social/common/yatra/signin.htm");
  await page.waitForTimeout(2000);
  await page.fill('[placeholder="Email ID / Mobile Number"]', '8670489274');
  await page.waitForTimeout(1000);
  await page.click('[role="button"][name="Continue"]');
  await page.waitForTimeout(2000);
  await page.fill('[placeholder="Enter your password"]', 'Test@1234');
  await page.waitForTimeout(2000);
  await page.click('[role="button"][name="Login"]');
  await page.waitForTimeout(2000);
  await page.waitForURL('https://www.yatra.com/');
  await page.waitForTimeout(2000);

  // Set origin
  await page.getByRole('textbox', { name: 'Depart From' }).click();
  await page.getByText(`(${origin})`).click();
  await page.waitForTimeout(2000);

  // Set destination
  await page.getByRole('textbox', { name: 'Going To' }).click();
  await page.getByText(`(${destin})`).click();
  await page.waitForTimeout(2000);

  // Set departure date
  await page.getByLabel('Departure Date').click();
  await page.getByTitle(`${trDate}`).click();
  await page.waitForTimeout(2000);

  // Search for flights
  await page.getByRole('button', { name: 'Search Flights' }).click();
  await page.waitForTimeout(2000);

  // Filter by price
  await page.locator('span').filter({ hasText: 'Price' }).locator('span').click();

  // Search by price 
  await page.getByText(`${flightChosen} Fare Summary Fare`).click();
  
  const successMessage = 'Login successful!';
  await browser.close();
  return successMessage;
}

export { bookingResult };
