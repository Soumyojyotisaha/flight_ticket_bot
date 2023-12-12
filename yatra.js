import playwright from 'playwright';
import prompt from 'prompt-sync'; // Import the prompt module

const getInput = prompt(); // Create a prompt function

async function getYatraResult(origin, destin, trDate) {
  const browser = await playwright.chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto('https://www.yatra.com/');
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

  // Extract and log all text at the specified XPath
  const result = await page.$eval(
    '//*[@id="Flight-APP"]/section/section[2]/section[1]/div[2]/div[2]/div',
    (element) => element.textContent.trim()
  );

  await browser.close();

  return result;
}

export { getYatraResult };