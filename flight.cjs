const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function scrapeMakeMyTripData() {
  const origin = "BOM";
  const destin = "DEL";
  const trDate = "2023-12-11";

  const baseDataUrl = `https://tickets.paytm.com/flights/flightSearch/${origin}/${destin}/1/0/0/E/${trDate}`;
  try {
    const browser = await puppeteer.launch({ args: ['--disable-http2'] });
    const page = await browser.newPage();

    console.log("Requesting URL: " + baseDataUrl);
    await page.goto(baseDataUrl);
    await page.waitForTimeout(5000); // Using waitForTimeout instead of new Promise(resolve => setTimeout(resolve, 5000))

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

    // // Extracting flight name, duration, and price
    // const flightsData = [];
    // const regex = /(\d+ seats left)?(?:.*?Flight Details)(.*?)(\d{1,2}h \d{1,2}m)Non-Stop(?:.*?₹)(\d+(?:,\d{3})*)(?:Flat \d+ off)?(?:.*?View Fare).*?/g;

    // let match;
    // while ((match = regex.exec(elementTextContent)) !== null) {
    //   const seatsLeft = match[1] ? match[1].trim() : '';
    //   const flightName = match[2].trim();  // Use match[2] for the flight name
    //   const flightDuration = match[3].trim();
    //   const flightPrice = match[4].replace(/,/g, '');
  

    //   // Add the flight data to the flightsData array
    //   flightsData.push({
    //      flight_name: flightName,
    //     flight_duration: flightDuration,
    //     // flight_departure_time: flightDepartureTime,
    //     // flight_arrival_time: flightArrivalTime,
    //     flight_price: flightPrice,
    //   });
    // }

    // // Save data to CSV file
    // const csvWriter = createCsvWriter({
    //   path: 'flights5_data.csv',
    //   header: [
    //     { id: 'flight_name', title: 'Flight Name' },
    //     { id: 'flight_duration', title: 'Flight Duration' },
    //     { id: 'flight_price', title: 'Flight Price' },
    //     { id: 'flight_departure_time',title:'Flight Departure Time'},
    //     { id: 'flight_arrival_time',title:'Flight Arrival Time'}
    //   ],
    // });

    // // Use await with writeRecords to ensure it completes before logging success
    // await csvWriter.writeRecords(flightsData);
    // console.log('CSV file written successfully');

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

// Call the async function
scrapeMakeMyTripData();
