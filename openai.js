// Import necessary modules
import dotenv from 'dotenv';
import axios from 'axios';
import promptSync from 'prompt-sync';
import { agentResult } from './agent.js';

// Load environment variables from .env file
dotenv.config();

// Get OpenAI API key from environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Check if API key is missing and exit if so
if (!apiKey) {
  console.error('OpenAI API key is missing. Make sure to add it to the .env file.');
  process.exit(1);
}

// Use prompt-sync to get user input
const prompt = promptSync();
const text=`⢸⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣠⠤⢖⣒⣖⡶⠚⠚⠲⠤⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡠⠖⢉⣠⡾⠟⠉⠀⠠⣀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⠎⠀⢰⣿⠋⠀⠀⠀⠀⠀⠈⠓⠀⠀⣀⠤⠶⡛⣄⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡰⠃⣀⠀⠀⠀⠑⢄⠀⠀⠀⠀⣀⡤⠖⠋⢀⣠⣶⣿⡼⡄⠀⢸⣿⡖⠒⠦⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣷⣿⠿⣷⣄⠀⠀⠀⠳⡀⣰⢋⣡⣤⠀⠀⠀⠀⢻⣷⣧⡇⠀⠈⠻⢽⣈⠷⣦⣌⣑⠦⣄⡀⠀⢀⣠⣶⣦⠀⠀
⠸⣟⣤⣄⠈⢿⣧⠀⠀⠀⠹⡏⣿⢿⠈⡇⠀⣠⠴⠚⠉⠀⢱⠀⠀⠀⠀⠘⠳⠿⣿⣿⣿⣶⣭⣓⠿⣿⣿⣏⣀⠀
⠀⢿⡘⠞⢇⠘⣿⡇⠀⠀⠀⣧⣿⣛⠧⠛⠉⠀⠀⢀⡄⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢠⣽⣾⣝⡿⣿⣿⣿⠷⣦⣤
⠀⠈⢿⣮⡞⢠⣿⡧⠀⠀⠀⡇⠀⠀⠀⠀⠀⠸⠿⠉⢁⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⡏⢹⡏⠙⠿⠟⠉⠉⠉
⠀⠀⠀⠙⢿⡿⠟⠁⠀⠀⡼⠀⠀⠀⠀⠀⠀⢀⣠⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇⢸⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠙⠒⠒⢻⣷⡒⠦⠤⠄⠤⠠⠏⢻⠱⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣀⣸⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡴⠃⠉⢻⢷⣄⡀⠀⠀⢀⡼⡇⣸⡄⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⡟⠿⠟⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⢞⠋⠉⢢⡀⢣⢷⠉⠑⢲⣟⠀⣿⡿⠧⣴⣡⣶⡯⣷⣆⡀⠀⠀⠀⢱⠒⢻⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣏⠈⢇⠀⠸⡗⠁⢸⡆⠀⢸⣟⢀⣿⣠⣴⠾⠛⠻⢿⣿⡻⠉⠓⠦⣄⢸⠀⢸⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣤⣾⣿⠷⢧⣄⣼⠀⢀⣨⢿⣻⠿⠋⠁⠀⠀⠄⠀⠀⠈⠙⢒⣦⠄⢹⣤⡼⣀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡤⠖⢉⣤⠾⢿⡀⠀⠀⠈⣹⣿⣹⢶⣿⣥⣀⡀⠀⠀⠀⠀⠀⢀⣠⠶⠋⠁⠀⢸⠯⣅⠀⠙⠲⣄⠀⠀⠀
⠀⣰⠋⠀⠀⠘⠿⣿⣿⣿⣖⠢⢼⣿⣤⣽⣿⡀⠉⠑⠛⠿⢶⣶⣤⢶⣫⣵⡾⢻⣀⣤⡏⠀⣨⠇⠀⠀⠈⢳⡀⠀
⣰⠃⠓⢄⡀⠀⠀⠈⠙⠻⣿⣿⣶⣤⣈⠉⠉⢅⡀⠀⠀⠀⠀⠀⣿⡟⣋⡥⢖⣩⣿⠧⠒⠉⠀⠀⠀⠀⠀⠀⢳⡀
⡇⠀⠀⠀⠈⠑⠦⣄⠀⠀⠀⠉⠛⢿⣿⣷⣦⣄⡈⠑⠂⠀⣠⣴⣿⣯⣡⡶⠟⠉⠀⢀⣠⡄⠀⠀⠀⠀⠀⠀⢀⡇
⢿⠦⣄⠀⠀⠀⠀⠀⠉⠲⢤⡀⠀⠀⠈⠙⠻⢿⣿⣷⣶⣿⣋⡭⠔⠋⠁⠀⣠⢴⣺⠽⠻⣼⡀⠀⠀⠀⢀⡠⢞⡇
⠘⣆⠀⠉⠓⠤⣀⠀⠀⠀⠀⠈⠑⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⣿⠚⠉⠀⠀⣠⠽⣃⡤⠖⠋⠁⣤⡞⠀
⠀⠈⠳⣄⡀⠀⠈⠙⠢⢄⡀⠀⠀⠀⠀⠙⠒⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣄⡤⣒⡭⠖⢫⢹⠏⠀⣠⣾⠉⠀⠀
⠀⠀⠀⣼⣿⣷⣦⣄⠀⠀⠉⠓⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠗⠋⣁⡤⢒⣿⣿⣶⣿⠟⠁⠀⠀⠀
⠀⠀⢸⣿⣿⣿⣿⣿⣿⣶⣤⣀⠀⠈⠙⠢⠤⣄⣀⣀⣀⣀⣠⠤⠔⠊⠱⡟⢰⣋⣵⣿⣿⠿⠟⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡈⠀⠀⠀⠀⠀⠀⠀⠀⢁⣠⣴⣷⣿⡿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣤⣤⣶⣾⣿⡿⠟⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠿⢿⣿⣿⣿⣿⣿⠿⠿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐀𝐈𝐑𝐋𝐈𝐍𝐄 𝐓𝐈𝐂𝐊𝐄𝐓 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐈𝐎𝐍 (𝐂𝐋𝐈-𝐁𝐎𝐓)`;
console.log(text);
console.log('\n');
console.log('\n');

const userPrompt = prompt('Tell me where you want to travel ✈️  and on what date 📅 (format: MM/DD/YY)?');

// Extract date from user prompt using regular expression and store it in userDate
const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/;
const extractedDate = userPrompt.match(dateRegex);
const userDate = extractedDate ? new Date(extractedDate[0]) : null;

function getDayOfWeek(date) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[date.getDay()];
}

// Format the date as "weekday, date month" for printing
const formattedDate = userDate
  ? `${getDayOfWeek(userDate)}, ${userDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}`
  : '';

const fixedPrompt1 = `The user wants to travel from ${userPrompt} on ${formattedDate}, so print the Origin Airport code, Destination Airport Code, and trip Date (${formattedDate}Dont include Year in the ${formattedDate}).`;
const fixedPrompt2= `The ${formattedDate} should be of the format example:{weekday, date month} like {Friday, 5 January}`;
// Define a function to extract variables
function extractVariables(answer) {
  const originMatch = answer.match(/Origin Airport Code: (\w+)/);
  const destinMatch = answer.match(/Destination Airport Code: (\w+)/);
  const trDateMatch = answer.match(/Trip Date: (.+)$/);

  // Check if the matches were successful
  const origin = originMatch ? originMatch[1] : 'N/A';
  const destin = destinMatch ? destinMatch[1] : 'N/A';
  const trDate = trDateMatch ? trDateMatch[1] : 'N/A';


  // Return the extracted values
  return { origin, destin, trDate };
}

// Make an HTTP POST request to the OpenAI API for text completion
axios.post(
  'https://api.openai.com/v1/engines/text-davinci-003/completions',
  {
    prompt: `${fixedPrompt1}${fixedPrompt2}`,
    max_tokens: 100  // Adjust as needed
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  }
)
.then(response => {
  // Extract and print the answer from the OpenAI API response
  const answer = response.data.choices[0].text.trim();
  console.log('Your requested itinerary ✈️ is as follows:\n', answer);

  // Extract information using the function
  const { origin, destin, trDate } = extractVariables(answer);

  agentResult(origin,destin,trDate)
  // Print the extracted values
  console.log(origin);
  console.log(destin);
  console.log(trDate);
})
.catch(error => {
  // Handle errors during the API request
  console.error('Error:', error.message);
});

// Export the extractVariables function for external use
export { extractVariables };
