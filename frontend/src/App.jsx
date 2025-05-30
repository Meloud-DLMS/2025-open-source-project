import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ChatbotProvider, useChatbot } from './contexts/ChatbotContext';
import Chatbot from './components/Chatbot';
import './style/AppGlobal.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import FriendsList from './pages/FriendsList';
import AddFriend from './pages/AddFriend';
import AccountLookupIntro from './pages/AccountLookupIntro';
import RealNameVerificationPage from './pages/RealNameVerificationPage';
import AccountDeleteRequestPage from './pages/AccountDeleteRequestPage';
import AccountDeleteFinalPage from './pages/AccountDeleteFinalPage';
import AccountDeleteComplete from './pages/AccountDeleteComplete';
import UndeletableAccountPage from './pages/UndeletableAccountPage';
import UndeletableAccountFinalPage from './pages/UndeletableAccountFinalPage';
import UndeletableAccountComplete from './pages/UndeletableAccountComplete';
import WillWrite from './pages/WillWrite';
import MemorialSpace from './pages/memorialspace';
import MessageBox from './pages/MessageBox';
import DeathCertificate from './pages/deathcertificate';

const ChatbotToggleButton = () => {
  const { toggleChatbot } = useChatbot();
  return (
    <button className="chatbot-toggle-button" onClick={toggleChatbot}>
      <img src="/public/assets/faq-icon.png" alt="FAQ 챗봇 아이콘" />
    </button>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const authProps = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername
  };

  return (
    <BrowserRouter>
      <ChatbotProvider>
        <Routes>
          <Route path="/" element={<Home {...authProps} />} />
          <Route path="/login" element={<Login {...authProps} />} />
          <Route path="/join" element={<Join {...authProps} />} />
          <Route path="/friends" element={<FriendsList {...authProps} />} />
          <Route path="/friends/add" element={<AddFriend {...authProps} />} />
          <Route path="/account" element={<AccountLookupIntro {...authProps} />} />
          <Route path="/real-name" element={<RealNameVerificationPage {...authProps} />} />
          <Route path="/account/delete-request" element={<AccountDeleteRequestPage {...authProps} />} />
          <Route path="/account/delete-final" element={<AccountDeleteFinalPage {...authProps} />} />
          <Route path="/account/delete-complete" element={<AccountDeleteComplete {...authProps} />} />
          <Route path="/account/undeletable" element={<UndeletableAccountPage {...authProps} />} />
          <Route path="/account/undeletable-final" element={<UndeletableAccountFinalPage {...authProps} />} />
          <Route path="/account/undeletable-complete" element={<UndeletableAccountComplete {...authProps} />} />
          <Route path="/will/write" element={<WillWrite {...authProps} />} />
          <Route path="/memorial" element={<MemorialSpace {...authProps} />} />
          <Route path="/deathcertificate" element={<DeathCertificate {...authProps} />} />
          <Route path="/messages" element={<MessageBox {...authProps} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ChatbotToggleButton />
        <Chatbot />
      </ChatbotProvider>
    </BrowserRouter>
  );
}
