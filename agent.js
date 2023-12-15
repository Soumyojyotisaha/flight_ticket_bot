import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import { getYatraResult } from './yatra.js'; // Import the getYatraResult function
import { bookingResult } from './booking.js';
import prompt from 'prompt-sync'; // Import the prompt module
dotenv.config();

const getInput = prompt(); // Create a prompt function

async function main() {
  // Get user input
  const origin = getInput('Enter the origin airport code: ');
  const destin = getInput('Enter the destination airport code: ');
  const trDate = getInput('Enter the departure date (e.g., Friday, 5 January): ');

  const yatraResult = await getYatraResult(origin, destin, trDate);

  const tools = [new Calculator(), new SerpAPI];
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
  const executor = await initializeAgentExecutorWithOptions(
    tools,
    llm,
    {
      agentType: "openai-functions",
      verbose: true,
    }
  );

  const langChainResult = await executor.run(`Get me the cheapest flight from ${origin} to ${destin} on ${trDate}. Yatra Result: ${yatraResult}`);
  console.log(langChainResult);
  const flightOptions = extractFlightOptions(langChainResult);
  console.log(`Your Cheapest Flight options from ${origin} to ${destin} on ${trDate} are as follows :`);
  displayFlightOptions(flightOptions);

  // Prompt user to select a flight
  const selectedOption = getInput('Select a flight option (Enter the corresponding number): ');

  // Save the price amount of the selected option in the flightChosen variable
  const flightChosen = flightOptions[selectedOption - 1].flightCode;

  // Initiate the booking process
  const bookingProcessResult = await bookingResult(origin, destin, trDate, flightChosen);

  console.log(bookingProcessResult);
}

function extractFlightOptions(langChainResult) {
  const regex = /\d+\.\s.+Fare\s-\s([\d,]+)/g;
  const matches = [...langChainResult.matchAll(regex)];

  return matches.map((match, index) => ({
    option: index + 1,
    flightCode: `FL${index + 1}`, 
    option: index + 1,
    fare: parseFloat(match[1].replace(/,/g, '')), // Convert fare to a numeric value
  }));
}

function displayFlightOptions(options) {
  console.log('Flight Options:');
  options.forEach((opt) => {
    console.log(`${opt.option}. Flight Code: ${opt.flightCode}`);
  });
}

main();
