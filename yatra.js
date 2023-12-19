// Import necessary modules
import playwright from 'playwright';
import prompt from 'prompt-sync';

// Function to get Yatra search results
const getYatraResult = async (origin, destin, trDate) => {
  // Launch the Chromium browser
  const browser = await playwright.chromium.launch({
    headless: false,
  });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the Yatra website
  await page.goto('https://www.yatra.com/');
  await page.waitForTimeout(2000);

  // Set origin location
  await page.getByRole('textbox', { name: 'Depart From' }).click();
  await page.getByText(`(${origin})`).click();
  await page.waitForTimeout(2000);

  // Set destination location
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
  await page.waitForTimeout(5000);

  // Filter search results by price
  await page.locator('span').filter({ hasText: 'Price' }).locator('span').click();
  await page.waitForTimeout(2000);

  // Extract and log all text at the specified XPath
  const result = await page.$eval(
    '//*[@id="Flight-APP"]/section/section[2]/section[1]/div[2]/div[2]/div',
    (element) => element.textContent.trim()
  );

  // Close the browser
  await browser.close();

  // Return the extracted result
  return result;
};

// Export the function for external use
export { getYatraResult };
