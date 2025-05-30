// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 챗봇 관련 임포트 (추가된 부분)
import { ChatbotProvider, useChatbot } from './contexts/ChatbotContext';
import Chatbot from './components/Chatbot';
import './style/AppGlobal.css'; // 챗봇 버튼 및 오버레이를 위한 글로벌 CSS

// 기존 페이지 컴포넌트 임포트
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
import DeathCertificate from './pages/deathcertificate';

// 챗봇 토글 버튼 컴포넌트 정의 (App 함수 외부에)
const ChatbotToggleButton = () => {
  const { toggleChatbot } = useChatbot();
  return (
    <button className="chatbot-toggle-button" onClick={toggleChatbot}>
      {/* 챗봇 아이콘 이미지 (public/assets/faq-icon.png로 저장) */}
      <img src="/public/assets/faq-icon.png" alt="FAQ 챗봇 아이콘" />
    </button>
  );
};


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authProps = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <BrowserRouter>
      {/* ChatbotProvider로 전체 라우팅 및 챗봇 컴포넌트 감싸기 */}
      <ChatbotProvider>
        <Routes>
          <Route path="/" element={<Home {...authProps} />} />
          <Route path="/login" element={<Login {...authProps} />} />
          <Route path="/join" element={<Join {...authProps} />} />
          <Route path="/friends" element={<FriendsList {...authProps} />} />
          <Route path="/friends/add" element={<AddFriend {...authProps} />} />
          <Route path="/account" element={<AccountLookupIntro />} />
          <Route path="/real-name" element={<RealNameVerificationPage />} />
          <Route path="/account/delete-request" element={<AccountDeleteRequestPage />} />
          <Route path="/account/delete-final" element={<AccountDeleteFinalPage />} />
          <Route path="/account/delete-complete" element={<AccountDeleteComplete />} />
          <Route path="/account/undeletable" element={<UndeletableAccountPage />} />
          <Route path="/account/undeletable-final" element={<UndeletableAccountFinalPage />} />
          <Route path="/account/undeletable-complete" element={<UndeletableAccountComplete />} />
          <Route path="/will/write" element={<WillWrite {...authProps} />} />
          <Route path="/memorial" element={<MemorialSpace />} />
          <Route path="/deathcertificate" element={<DeathCertificate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* 챗봇 토글 버튼과 챗봇 UI 컴포넌트 렌더링 */}
        <ChatbotToggleButton />
        <Chatbot />
      </ChatbotProvider>
    </BrowserRouter>
  );
}