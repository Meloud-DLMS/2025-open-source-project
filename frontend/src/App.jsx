import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/messages" element={<MessageBox {...authProps} />} />
      </Routes>
    </BrowserRouter>
  );
}
