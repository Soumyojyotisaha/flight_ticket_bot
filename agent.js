import {initializeAgentExecutorWithOptions} from "langchain/agents";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {SerpAPI} from "langchain/tools";
import {Calculator} from "langchain/tools/calculator";
import dotenv from 'dotenv';
dotenv.config();

const tools=[new Calculator(),new SerpAPI];
const llm=new ChatOpenAI({modelName:"gpt-3.5-turbo",temperature:0});
const executor=await initializeAgentExecutorWithOptions
(tools,llm,{

    agentType:"openai-functions",
    verbose:true,
});
const result=await executor.run("cheapest flight ticket from bombay to delhi tomorrow!Show me price in rupees and provide the itenary with booking links");

console.log(result);