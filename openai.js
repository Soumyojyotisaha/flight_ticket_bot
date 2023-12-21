// Import necessary modules
import dotenv from 'dotenv';
import axios from 'axios';
import promptSync from 'prompt-sync';

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

const userPrompt = prompt('Tell me where you want to travel 🛬 and on what date 📅 (format: MM/DD/YY)?');

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

const fixedPrompt1 = `The user wants to travel from ${userPrompt} on ${formattedDate}, so print the Origin Airport code, Destination Airport Code, and trip Date (${formattedDate}Dont includ eYear in the ${formattedDate}).`;

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
    prompt: `${fixedPrompt1}`,
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

  // Print the extracted values
  console.log('Origin Airport Code:', origin);
  console.log('Destination Airport Code:', destin);
  console.log('Trip Date:', trDate);
})
.catch(error => {
  // Handle errors during the API request
  console.error('Error:', error.message);
});

// Export the extractVariables function for external use
export { extractVariables };

