// Import required modules
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import { getYatraResult } from './yatra.js';
import { bookingResult } from './booking.js';
import prompt from 'prompt-sync';

// Load environment variables
dotenv.config();

// Function to get user input using prompt-sync
const getInput = prompt();

/**
 * Main function to fetch Yatra results, interact with language models,
 * and initiate the booking process.
 * @param {string} a - Origin airport code 
 * @param {string} b - Destination airport code 
 * @param {string} c - Departure date 
 */
export async function agentResult(a=null, b=null, c=null) {
  // Get user input for origin, destination, and departure date
  const origin = a || getInput('Enter the origin airport code: ');
  const destin = b || getInput('Enter the destination airport code: ');
  const trDate = c || getInput('Enter the departure date (e.g., Friday, 5 January): ');

  console.log("Please wait ⌛, while we fetch your preferred data 🔜.....");
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
  const langChainResult = await executor.run(`Get me the cheapest flight from ${origin} to ${destin} on ${trDate} from Yatra Result: ${yatraResult}. The results should be shown row-wise as 1,2,3.... Show only top 5 results. The results should be in the format: example: Air India AI-560: Departure - 06:55 from New Delhi, Arrival - 09:20 in Hyderabad, Duration - 2h 25m, Non-Stop, Fare - 5,227 `);
  console.log(langChainResult);

  // Extract and display flight options from the language model result
  const flightOptions = extractFlightOptions(langChainResult);
  console.log(`Your Cheapest Flight options from ${origin} to ${destin} on ${trDate} are as follows :`);
  displayFlightOptions(flightOptions);

  // Prompt user to select a flight
  const selectedOption = getInput('Select a flight option (Enter the corresponding number): ');
  const flightChosen = flightOptions[selectedOption - 1].flightCode;
  console.log(flightChosen);

  const divId = origin + destin + flightChosen.replace('-', '');
  console.log("Your selected Airline ✈️ is:", divId);

  // Initiate the booking process
  const bookingProcessResult = await bookingResult(origin, destin, trDate, flightChosen, divId);
  console.log(bookingProcessResult);
}

/**
 * Extracts flight options from the language model result.
 * @param {string} langChainResult - Result from the language model.
 * @returns {Array} - Array of flight options.
 */
function extractFlightOptions(langChainResult) {
  const regex = /(\w{2}-\d{3,4}): Departure - \d{2}:\d{2} from .+Arrival - \d{2}:\d{2} in .+Duration - \d{1,2}h \d{1,2}m, Non-Stop, Fare - ([\d,]+)/g;
  const matches = [...langChainResult.matchAll(regex)];

  return matches.map((match, index) => ({
    option: index + 1,
    flightCode: match[1],
    fare: parseFloat(match[2].replace(/,/g, '')),
  }));
}

/**
 * Displays flight options.
 * @param {Array} options - Array of flight options.
 */
function displayFlightOptions(options) {
  console.log('Flight Options:');
  options.forEach((opt) => {
    console.log(`${opt.option}. Flight Code: ${opt.flightCode}`);
  });
}

// Execute the main function
// agentResult();
