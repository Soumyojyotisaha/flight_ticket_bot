const puppeteer = require('puppeteer');

async function scrapeMakeMyTripData() {
  const origin = "BOM";
  const destin = "DEL";
  const trDate = "2023-12-11";

  const baseDataUrl =  `https://tickets.paytm.com/flights/flightSearch/${origin}/${destin}/1/0/0/E/${trDate}`;
  try {
    const browser = await puppeteer.launch({ args: ['--disable-http2'] });
    const page = await browser.newPage();

    console.log("Requesting URL: " + baseDataUrl);
    await page.goto(baseDataUrl);
    await new Promise(resolve => setTimeout(resolve, 5000));

    await page.screenshot({ path: 'flights.png' });


    const elementXPath = '//*[@id="flightsList"]';

    console.log("Waiting for the element to be visible...");
    await page.waitForXPath(elementXPath);

    console.log("Scrolling document to the bottom...");
    for (let j = 0; j < 100; j++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }

    console.log("Getting data from DOM...");

    // Extract and log the text content of the selected element
    const elementHandle = await page.$x(elementXPath);
    const elementTextContent = await page.evaluate(element => element.textContent, elementHandle[0]);
    console.log("Scraped Data:", elementTextContent);

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

// Call the async function
scrapeMakeMyTripData();
