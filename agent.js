
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
import { getYatraResult} from './yatra.js' // Import the getYatraResult function
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

  console.log('LangChain Result:', langChainResult);
}

main();