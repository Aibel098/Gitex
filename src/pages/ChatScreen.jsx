import React, { useState, useEffect, useRef } from "react";
import { Phone, Send, Mic, Video, X, ArrowLeft } from "lucide-react";
import { AuthButton, ArrowButton, Logo, CustomLink, CategoryItem } from "../components/ReusableButton";


const ChatScreen = () => {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatMessages")) || [
      { text: "Hello! How can I help you?", sender: "bot" },
    ];
  });
  const [newMessage, setNewMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      
      setTimeout(() => {
        const botReply = { text: "I'm looking for a driver...", sender: "bot" };
        setMessages((prev) => [...prev, botReply]);
      }, 1500);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4 flex justify-between items-center relative">
          <ArrowButton />
        <h2 className="text-lg font-semibold mx-auto">Driver Chat</h2>
        <div className="flex gap-3">
          <button onClick={() => setIsCalling(true)}>
            <Phone size={24} className="text-white" />
          </button>
          <button onClick={() => setIsCalling(true)}>
            <Video size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-yellow-500 text-white self-end ml-auto" : "bg-white text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          className="flex-1 p-3 border rounded-md focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-yellow-500 rounded-full">
          <Send size={20} className="text-white" />
        </button>
        <button className="ml-2 p-2 bg-yellow-500 rounded-full">
          <Mic size={20} className="text-white" />
        </button>
      </div>

      {/* Call Overlay */}
      {isCalling && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
          <h2 className="text-xl font-semibold">Calling...</h2>
          <button
            className="mt-4 p-3 bg-red-500 rounded-full"
            onClick={() => setIsCalling(false)}
          >
            <X size={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;