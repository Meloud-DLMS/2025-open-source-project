import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import FriendsList from './pages/FriendsList';
import AddFriend from './pages/AddFriend';
import AccountLookupIntro from './pages/AccountLookupIntro';
import RealNameVerificationPage from './pages/RealNameVerificationPage';
import WillWrite from './pages/WillWrite';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authProps = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home {...authProps} />} />
        <Route path="/login" element={<Login {...authProps} />} />
        <Route path="/join" element={<Join {...authProps} />} />
        <Route path="/friends" element={<FriendsList {...authProps} />} />
        <Route path="/friends/add" element={<AddFriend {...authProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/account-lookup" element={<AccountLookupIntro />} />
        <Route path="/real-name" element={<RealNameVerificationPage />} />
        <Route path="/will/write" element={<WillWrite {...authProps}/>} />
      </Routes>
    </BrowserRouter>
  );
}
