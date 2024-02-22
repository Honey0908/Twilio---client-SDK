# Send Meeting Reminder Using Twilio Call

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Run the Project](#run-the-project)
- [Project Structure](#project-structure)
- [Twilio Integration](#twilio-integration)

## Introduction

This project is a demonstration of leveraging the Twilio Client SDK to enable direct calling capabilities from within a web browser.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Twilio Account](https://www.twilio.com/) with Account SID, Auth Token, and a Twilio phone number

## Getting Started

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Honey0908/twilio-voice-sdk-demo
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd twilio-voice-sdk-demo
   ```

3. **Install Dependencies:**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Configuration

Before running the project, set up your environment variables:

1. **Create `.env` file in server Directory:**

   In the root of the `server` directory, create a `.env` file and add variables according env.example file:

   Replace the placeholder values with your Twilio credentials and server URL.

2. **Create `.env` file in Client Directory:**

   In the root of the `client` directory, create a `.env` file and add the following:

   ```env
   VITE_SERVER_URL=your_server_url
   ```

   Replace the placeholder value with your server URL.

### Run the Project

Now, you're ready to run the Meeting Reminder Project:

1. **Start the Server:**

   ```bash
   cd server
   node index.js
   ```

2. **Start Ngrok for Local Development (Optional):**

   ```bash
   ngrok http 3000
   ```

   Use the Ngrok-provided URL as your public `SERVER_URL` for Twilio webhook configuration.

3. **Open a New Terminal and Start the Client:**
   ```bash
   cd client
   npm run dev
   ```

## Project Structure

```bash
├── client
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   └── Timer.tsx
│   │   ├── main.tsx
│   │   ├── Phone.tsx
│   │   ├── Services.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── readme.md
└── server
    ├── config.js
    ├── handleCall.js
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── voiceToken.js
```

## Twilio Integration

This project leverages Twilio for handling phone call interactions. Ensure that you have a Twilio account, and configure your Twilio Account SID, Auth Token, API key SID, API secret, twilio Phone Number and twiml App SID in the server's .env file.
