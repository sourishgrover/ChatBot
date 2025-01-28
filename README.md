# Chatbot Project

This is a simple chatbot application built using **React** for the frontend and **Node.js** with **SQLite** for the backend. The chatbot uses the Gemini API to generate responses and stores the chat history in a SQLite database.

## Features

- **User and Bot Messages**: Users can send messages, and the bot responds using the Gemini API.
- **Chat History**: All messages are stored in a SQLite database and displayed in the chat interface.
- **Auto-Scroll**: The chat window automatically scrolls to the latest message.
- **Thinking Indicator**: The bot shows a "Thinking..." message while generating a response.

## Technologies Used

- **Frontend**: React, React Icons
- **Backend**: Node.js, Express.js, SQLite
- **API**: Gemini API

## Project Structure
chatbot/
├── backend/
│ ├── db/
│ │ └── database.js
│ ├── models/
│ │ └── messageModel.js
│ ├── routes/
│ │ └── messageRoutes.js
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatForm.jsx
│ │ │ ├── ChatIcon.jsx
│ │ │ └── ChatMessage.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
└── README.md
