const { puppeteer } = require('puppeteer');
const fs = require('fs');

async function scrapeMakeMyTripData() {
  const origin = 'BOM';
  const destin = 'DEL';
  const trDate = process.argv[2];

  const baseDataUrl = `https://www.makemytrip.com/flight/search?itinerary=${origin}-${destin}-${trDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&=&cabinClass=E&ccde=IN&lang=eng`;

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-http2'] });
    const page = await browser.newPage();

    console.log('Requesting URL: ' + baseDataUrl);
    await page.goto(baseDataUrl, { timeout: 20000 });

    await page.screenshot({ path: 'flights.png' });

    const elementXPath = '//*[@id="left-side--wrapper"]/div[2]';

    console.log('Waiting for the element to be visible...');
    await page.waitForXPath(elementXPath);

    console.log('Scrolling document to the bottom...');
    for (let j = 0; j < 50; j++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      // Add a delay to allow the page to load additional content
      await page.waitForTimeout(1000);
    }

    console.log('Getting data from DOM...');

    const [spanFlightName, pFlightCode, divDeptTime, pDeptCity, pFlightDuration, pArrivalTime, pArrivalCity, spanFlightCost] = await Promise.all([
      page.$$('span.airways-name'),
      page.$$('p.fli-code'),
      page.$$('div.dept-time'),
      page.$$('p.dept-city'),
      page.$$('p.fli-duration'),
      page.$$('p.reaching-time.append_bottom3'),
      page.$$('p.arrival-city'),
      page.$$('span.actual-price'),
    ]);

    const flightsData = [];

    for (let j = 0; j < spanFlightName.length; j++) {
      const flightName = await page.evaluate(el => el.textContent, spanFlightName[j]);
      const flightCode = await page.evaluate(el => el.textContent, pFlightCode[j]);
      const deptTime = await page.evaluate(el => el.textContent, divDeptTime[j]);
      const deptCity = await page.evaluate(el => el.textContent, pDeptCity[j]);
      const flightDuration = await page.evaluate(el => el.textContent, pFlightDuration[j]);
      const arrivalTime = await page.evaluate(el => el.textContent, pArrivalTime[j]);
      const arrivalCity = await page.evaluate(el => el.textContent, pArrivalCity[j]);
      const flightCost = await page.evaluate(el => el.textContent, spanFlightCost[j]);

      flightsData.push({
        flight_name: flightName,
        flight_code: flightCode,
        departure_time: deptTime,
        departure_city: deptCity,
        flight_duration: flightDuration,
        arrival_time: arrivalTime,
        arrival_city: arrivalCity,
        flight_cost: flightCost,
      });
    }

    const outputFile = `FlightsData_${origin}-${destin}-${trDate.split('/')[0]}-${trDate.split('/')[1]}-${trDate.split('/')[2]}.csv`;

    console.log('Writing flight data to file: ' + outputFile + ' ...');
    fs.writeFileSync(outputFile, flightsData.map(row => Object.values(row).join(',')).join('\n'));

    console.log('Data Extracted and Saved to File.');

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

scrapeMakeMyTripData();
