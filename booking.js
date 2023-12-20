// Import the Playwright library
import playwright from 'playwright';

// Function to handle the booking process on the Yatra website
async function bookingResult(origin, destin, trDate, flightChosen,divId) {
  // Launch a Chromium browser instance
  const browser = await playwright.chromium.launch({
    headless: false, // Set to true for headless mode
  });

  // Create a new page in the browser
  const page = await browser.newPage();

  // Navigate to the Yatra website
  await page.goto('https://www.yatra.com/');

  // Wait for 2 seconds to ensure page load and stability
  await page.waitForTimeout(2000);

  // Set origin airport
  await page.getByRole('textbox', { name: 'Depart From' }).click();
  await page.getByText(`(${origin})`).click();
  await page.waitForTimeout(2000);

  // Set destination airport
  await page.getByRole('textbox', { name: 'Going To' }).click();
  await page.getByText(`(${destin})`).click();
  await page.waitForTimeout(2000);

  // Set departure date
  await page.getByLabel('Departure Date').click();
  await page.getByTitle(`${trDate}`).click();
  await page.waitForTimeout(2000);

  await page.getByText('Non Stop Flights').click();
  
  // Search for flights
  await page.getByRole('button', { name: 'Search Flights' }).click();
  await page.waitForTimeout(2000);

  // Select the desired flight based on the chosen flight code
  await page.click(`text=${flightChosen}`);
  await page.waitForTimeout(1000);

  const first11Characters = divId.substring(0, 11);
  await page.waitForTimeout(1000);
  const divSelector = `div[id^="${first11Characters}"]`;
  await page.waitForTimeout(2000);
  await page.click(divSelector);
  await page.waitForTimeout(2000);
 // Click on the "Flight Details" element
  await page.click(`${divSelector} .flight-detail`);
  await page.waitForTimeout(2000);

 // Click on the "Book Now" button
 await page.click(`${divSelector} button.full-width.secondary-button`);
 await page.waitForTimeout(2000);

 await page.getByPlaceholder('Your Promo Code').click();
 await page.locator('label').filter({ hasText: 'PAYUPI' }).locator('span').first().click();


  // Fill in user details for booking
  await page.getByRole('textbox', { name: 'Email ID', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email ID', exact: true }).pressSequentially('contact.soumyojyotisaha@gmail.com', { delay: 100 });
  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).pressSequentially('7001813062', { delay: 100 });
  await page.waitForTimeout(2000);

  // Toggle the option to send booking details
  await page.locator('label').filter({ hasText: 'Also send my booking details' }).locator('span i').click();

  // Select passenger title and enter name details
  await page.locator('#title0').selectOption('Mr');
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('First & Middle Name').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'First & Middle Name' }).pressSequentially('Soumyojyoti', { delay: 100 });
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Last Name' }).pressSequentially('Saha', { delay: 100 });
  await page.waitForTimeout(2000);

  // Continue to the next step
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(3000);

  // Confirm the booking
  await page.locator('#traveller-dom').getByRole('button', { name: 'Confirm' }).click();

  // Wait for confirmation and proceed
  await page.waitForTimeout(3000);
  const yesPleaseButton = page.getByRole('button', { name: 'Yes, Please' });

if (yesPleaseButton) {
  // Element found, click the button
  await yesPleaseButton.click();
} else {
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Proceed To Payment' }).click();
  await page.waitForTimeout(3000);

  // Continue without securing the connection
  await page.getByRole('button', { name: 'Continue without securing' }).click();
  await page.waitForTimeout(3000);

  // Choose the UPI payment method
  await page.getByRole('link', { name: 'UPI' }).click();
  await page.waitForTimeout(3000);

  // Enter UPI details and initiate payment
  await page.getByLabel('Virtual Payment Address').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Virtual Payment Address').pressSequentially('7001813062@ybl', { delay: 100 });
  await page.getByRole('button', { name: 'Pay Now' }).click();

  // Wait for the payment to complete
  await page.waitForTimeout(20000);

  // Close the browser
  await browser.close();

}
  // await page.getByRole('button', { name: 'Yes, Please' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Proceed To Payment' }).click();
  await page.waitForTimeout(3000);

  // Continue without securing the connection
  await page.getByRole('button', { name: 'Continue without securing' }).click();
  await page.waitForTimeout(3000);

  // Choose the UPI payment method
  await page.getByRole('link', { name: 'UPI' }).click();
  await page.waitForTimeout(3000);

  // Enter UPI details and initiate payment
  await page.getByLabel('Virtual Payment Address').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Virtual Payment Address').pressSequentially('7001813062@ybl', { delay: 100 });
  await page.getByRole('button', { name: 'Pay Now' }).click();

  // Wait for the payment to complete
  await page.waitForTimeout(20000);

  // Close the browser
  await browser.close();
}

// Export the bookingResult function for external use
export { bookingResult };
