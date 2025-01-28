import React, { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const ChatForm = ({ chatHistory ,setChatHistory , generateBotResponse}) => {

    const inputRef = useRef();

    const handelSubmit = (e)=>{
       e.preventDefault();

       const userMessage = inputRef.current.value.trim();
       if(!userMessage) return;

       setChatHistory((history) => [...history,{role:"user",text:userMessage}])

       setTimeout(() => {
        // Add "Thinking..." message to chat history
        setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
  
        // Generate bot response
        generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
      }, 600);

     
       
    }
  return (
    <div>
      <form action="#" className="chat-form"  onSubmit={handelSubmit}>
        <input
        ref={inputRef}
          type="text"
          placeholder="Message..."
          className="message-input"
          required
        />
        <button type="submit">
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
