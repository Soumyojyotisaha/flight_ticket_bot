# Cheapest Flight Ticket Generation and Booking CLI-BOT

## Overview

A Command Line Interface (CLI) bot designed to streamline the process of finding and booking the cheapest flight tickets for users. This bot integrates the latest langchain Model to gather user preferences and employs Playwright to automate interactions with Yatra.com. The langchain model analyzes scraped JSON data, presenting the top 5 cheapest flights. The bot guides the user through selecting a preferred ticket and utilizes Playwright for the final booking process. The entire end-to-end ticket booking process is automated, with user confirmation needed only for payment via phone notification.

<div align="center">
  <img src="https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/videoplayback.gif" alt="ui">
</div>

## Technologies Used

- **Node.js:** The backend scripting language.
- **JavaScript:** Language used for programming logic.
- **Langchain Model:** Utilized for natural language processing and understanding.
- **Open-ai 3.5 turbo:** AI model for advanced text generation and analysis.
- **PlayWright:** Automation tool for web interactions.
- **IDE_VS CODE:** Integrated Development Environment for code development.

## Framework Behind Langchain Agent Extractting the Cheapest Flight Data
![Flight](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/19050608-2160-42f2-b03d-831d117513ae.jpg)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Soumyojyotisaha/flight_ticket_bot.
   cd flight_ticket_bot
   npm install
   node cli_bot.js

2.**Usage:**
Input your travel preferences when prompted by the CLI-BOT.
The bot uses Playwright to scrape flight details from Yatra.com.
Langchain Model analyzes the data and presents the top 5 cheapest flights.
Select your preferred ticket, and the bot automates the final booking process.
Confirm the payment notification via phone for process completion.

3.**Contribution:**
Feel free to contribute to the project by submitting issues or pull requests. For major changes, please open an issue to discuss the proposed changes.

4.**License:**
This project is licensed under the MIT License - see the LICENSE file for details.
Replace the placeholders with your actual project details, and feel free to enhance the README based on your project's specific features and requirements.

<div align="center">
  <a href="https://www.youtube.com/watch?v=VQsUKE263XI">
    <img src="https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/gallery.jpg" alt="Watch the video" style="position: relative;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; font-weight: bold; color: white; text-shadow: 2px 2px 4px #000000;">
      Click Me
    </div>
  </a>
</div>


5.**Screenshots:**

*Step 1: UI and Initial Welcome Gesture.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/1.png)
*Step 2: Scraping of relevant information using langchain.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/2.png)
*Step 3: Automated Searching the mentioned flight details.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/2%60.png)
*Step 4: Showing the top 5 cheapest flights.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/3.png)
*Step 5: Asking user to select any one.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/4.png)
*Step 6: Redirecting to the booking section.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/5.png)
*Step 7: Filling passenger details.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/6.png)
*Step 8: Filling information.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/7.png)
*Step 9: Adding relevant travel insurance.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/8.png)
*Step 10: Redirecting to the Payments page.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/9.png)
*Step 11: Initiating payment link in the user's device.*
![ui](https://github.com/Soumyojyotisaha/flight_ticket_bot/blob/main/screenshots/10.jpg)
