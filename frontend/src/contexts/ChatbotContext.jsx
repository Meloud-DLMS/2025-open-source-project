// src/contexts/ChatbotContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ChatbotContext = createContext(null);

export const ChatbotProvider = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, toggleChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};