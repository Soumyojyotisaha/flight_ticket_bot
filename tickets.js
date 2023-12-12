import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

const tools = [new Calculator(), new SerpAPI()];
const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

async function scrapeflightData() {
  const origin = "BOM";
  const destin = "DEL";
  const trDate = "12-12-2023";

  const baseDataUrl = `https://www.happyfares.in/flights/origin=${origin}&destination=${destin}&onward=${destin}&return=&type=DOMESTIC&class=ECONOMY&adult=1&child=0&infant=0&direct=&discount=&nocache=&defence=&originName=guwahati&destinationName=new%20delhi&BType=&student=&senior=&doctor=`;
  
  try {
    const browser = await puppeteer.launch({ args: ['--disable-http2'] });
    const page = await browser.newPage();

    console.log("Requesting URL: " + baseDataUrl);
    await page.goto(baseDataUrl);

    const elementXPath = '//*[@id="main"]/main/div/div/div/div[4]';
    await page.waitForXPath(elementXPath);

    for (let j = 0; j < 100; j++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }

    console.log("Getting data from DOM...");

    const elementHandle = await page.$x(elementXPath);
    const elementTextContent = await page.evaluate(element => element.textContent, elementHandle[0]);
    console.log("Scraped Data:", elementTextContent);
    await browser.close();

    return {
      origin,
      destination: destin,
      travelDate: trDate,
      flightsData: elementTextContent,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  agentType: "openai-functions",
  // verbose: true,
});

const scrapedData = await scrapeflightData();

if (scrapedData) {
  const cheapestFlightQuery = `Cheapest flight ticket from ${scrapedData.origin} to ${scrapedData.destination} on ${scrapedData.travelDate}`;
  const result = await executor.run(cheapestFlightQuery);

  // console.log("Scraped Data:", scrapedData.flightsData);
  console.log("Query:", cheapestFlightQuery);
  console.log("LangChain Result:", result);


  const cheapestFlightInfo = result?.output; // Adjust this based on LangChain response structure

  if (cheapestFlightInfo) {
    console.log("Cheapest Flight Information:", cheapestFlightInfo);
  } else {
    console.log("Failed to extract cheapest flight information from LangChain result.");
  }
} else {
  console.log("Scraping failed. Check the logs for details.");
}
