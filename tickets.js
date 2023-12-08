import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

const tools = [new Calculator(), new SerpAPI];
const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

async function scrapeflightData() {
  const origin = "AMD";
  const destin = "MAA";
  const trDate = "2023-12-19";

  const baseDataUrl = `https://tickets.paytm.com/flights/flightSearch/${origin}/${destin}/1/0/0/E/${trDate}`;
  
  try {
    const browser = await puppeteer.launch({ args: ['--disable-http2'] });
    const page = await browser.newPage();

    console.log("Requesting URL: " + baseDataUrl);
    await page.goto(baseDataUrl);
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'flights.png' });
    const elementXPath = '//*[@id="flightsList"]';
    await page.waitForXPath(elementXPath);

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
    scrapedData=elementTextContent;

    // Return the scraped data
    return {
      origin,
      destination: destin,
      travelDate: trDate,
      flightsData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Initialize the LangChain agent executor
const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  agentType: "openai-functions",
  verbose: true,
});

// Call the scraping function to get data
const scrapedData = await scrapeflightData();
// console.log(scrapedData);
// Use the scraped data in your LangChain agent
if (scrapedData) {
  
  const result = await executor.run(`Cheapest flight ticket from ${scrapedData.origin} to ${scrapedData.destination} on ${scrapedData.travelDate}`);
  console.log(result);
} else {
  console.log("Scraping failed. Check the logs for details.");
}