// Import necessary modules and libraries
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import { getYatraResult } from './yatra.js';
import { bookingResult } from './booking.js';
import prompt from 'prompt-sync';

// Load environment variables from a .env file
dotenv.config();

// Function to get user input using prompt-sync
const getInput = prompt();

// Main asynchronous function
async function main() {
  // Get user input for origin, destination, and departure date
  const origin = getInput('Enter the origin airport code: ');
  const destin = getInput('Enter the destination airport code: ');
  const trDate = getInput('Enter the departure date (e.g., Friday, 5 January): ');

  // Fetch Yatra results for the given parameters
  const yatraResult = await getYatraResult(origin, destin, trDate);

  // Initialize language models and tools
  const tools = [new Calculator(), new SerpAPI];
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

  // Initialize agent executor with options
  const executor = await initializeAgentExecutorWithOptions(
    tools,
    llm,
    {
      agentType: "openai-functions",
      verbose: true,
    }
  );

  // Run the language model to generate a request for the cheapest flight
  const langChainResult = await executor.run(`Get me the cheapest flight from ${origin} to ${destin} on ${trDate} from Yatra Result: ${yatraResult}.The results should be shown row-wise as 1,2,3....Show only top 5 results.Extract the booking links for each too and display `);
  console.log(langChainResult);

  // Extract and display flight options from the language model result
  const flightOptions = extractFlightOptions(langChainResult);
  console.log(`Your Cheapest Flight options from ${origin} to ${destin} on ${trDate} are as follows :`);
  displayFlightOptions(flightOptions);

  // Prompt user to select a flight
  const selectedOption = getInput('Select a flight option (Enter the corresponding number): ');
  const flightChosen = flightOptions[selectedOption - 1].flightCode;
  console.log(flightChosen);

  // Initiate the booking process
  const bookingProcessResult = await bookingResult(origin, destin, trDate, flightChosen);
  console.log(bookingProcessResult);
}

// Function to extract flight options from the language model result
function extractFlightOptions(langChainResult) {
  const regex = /(\w{2}-\d{3,4}): Departure - \d{2}:\d{2} from .+Arrival - \d{2}:\d{2} in .+Duration - \d{1,2}h \d{1,2}m, Non-Stop, Fare - ([\d,]+)/g;
  const matches = [...langChainResult.matchAll(regex)];

  return matches.map((match, index) => ({
    option: index + 1,
    flightCode: match[1],
    fare: parseFloat(match[2].replace(/,/g, '')),
  }));
}

// Function to display flight options
function displayFlightOptions(options) {
  console.log('Flight Options:');
  options.forEach((opt) => {
    console.log(`${opt.option}. Flight Code: ${opt.flightCode}`);
  });
}

// Execute the main function
main();
