// import { puppeteer } from 'puppeteer';
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// async function scrapeMakeMyTripData() {
//   const origin = "BOM";
//   const destin = "DEL";
//   const trDate = process.argv[2] ;

//   const baseDataUrl = `https://www.makemytrip.com/flight/search?itinerary=${origin}-${destin}-${trDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&=&cabinClass=E&ccde=IN&lang=eng`;
 
//   try {
//     const browser = await puppeteer.launch({ headless: "new", args: ['--disable-http2'] });
//     // Use the new Headless mode
//     const page = await browser.newPage();

//     console.log("Requesting URL: " + baseDataUrl);
//     await page.goto(baseDataUrl, { timeout: 20000 }); // Set timeout to 60 seconds
//     await page.screenshot({path:'flights.png'});

//     const elementXPath = '//*[@id="left-side--wrapper"]/div[2]';

//     console.log("Waiting for the element to be visible...");
//     await page.waitForXPath(elementXPath);

//     console.log("Scrolling document to the bottom...");
//     for (let j = 0; j < 50; j++) {
//       await page.evaluate(() => {
//         window.scrollTo(0, document.body.scrollHeight);
//       });
//     }

//     console.log("Getting data from DOM...");
//     // const body = await page.content();
//     // const spanFlightName = await page.$$('span.airways-name');
//     // const pFlightCode = await page.$$('p.fli-code');
//     // const divDeptTime = await page.$$('div.dept-time');
//     // const pDeptCity = await page.$$('p.dept-city');
//     // const pFlightDuration = await page.$$('p.fli-duration');
//     // const pArrivalTime = await page.$$('p.reaching-time.append_bottom3');
//     // const pArrivalCity = await page.$$('p.arrival-city');
//     // const spanFlightCost = await page.$$('span.actual-price');

//     // const flightsData = [["flight_name", "flight_code", "departure_time", "departure_city", "flight_duration", "arrival_time", "arrival_city", "flight_cost"]];

//     // for (let j = 0; j < spanFlightName.length; j++) {
//     //   const flightName = await page.evaluate(el => el.textContent, spanFlightName[j]);
//     //   const flightCode = await page.evaluate(el => el.textContent, pFlightCode[j]);
//     //   const deptTime = await page.evaluate(el => el.textContent, divDeptTime[j]);
//     //   const deptCity = await page.evaluate(el => el.textContent, pDeptCity[j]);
//     //   const flightDuration = await page.evaluate(el => el.textContent, pFlightDuration[j]);
//     //   const arrivalTime = await page.evaluate(el => el.textContent, pArrivalTime[j]);
//     //   const arrivalCity = await page.evaluate(el => el.textContent, pArrivalCity[j]);
//     //   const flightCost = await page.evaluate(el => el.textContent, spanFlightCost[j]);

//     //   flightsData.push([flightName, flightCode, deptTime, deptCity, flightDuration, arrivalTime, arrivalCity, flightCost]);
//     // }

//     // const outputFile = `FlightsData_${origin}-${destin}-${trDate.split("/")[0]}-${trDate.split("/")[1]}-${trDate.split("/")[2]}.csv`;

//     // console.log("Writing flight data to file: " + outputFile + " ...");
//     // fs.writeFileSync(outputFile, flightsData.map(row => row.join(',')).join('\n'));

//     // console.log("Data Extracted and Saved to File.");

//     await browser.close();
//   } catch (error) {
//     console.error(error);
//   }
// }

// scrapeMakeMyTripData();
