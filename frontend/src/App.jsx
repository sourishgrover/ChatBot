import React, { useEffect, useRef, useState } from 'react';
import ChatIcon from './components/chatIcon';
import { IoIosArrowDown } from "react-icons/io";
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();

 
  const saveMessage = async (role, text) => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, text }),
      });
      const data = await response.json();
      console.log('Message saved:', data);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

 
  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

 
  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
    };

    
    await saveMessage('user', history[history.length - 1].text);

    
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);

    
      await saveMessage('model', apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  
  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <>
      <div className="constiner">
        <div className="chatpop-up">
          <div className="chat-header">
            <div className="header-info">
              <ChatIcon />
              <h2 className='logo-text'>Chatbot</h2>
            </div>
            <button><IoIosArrowDown /></button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            <div className="message bot-message">
              <ChatIcon />
              <p className='message-text'>
                hi There <br /> How are you ?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-fotter">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;