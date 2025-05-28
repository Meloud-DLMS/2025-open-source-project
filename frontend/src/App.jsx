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
import DeathCertificate from './pages/deathcertificate';

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
        <Route path="/account" element={<AccountLookupIntro {...authProps} />} />
        <Route path="/real-name" element={<RealNameVerificationPage {...authProps} />} />
        <Route path="/account/delete-request" element={<AccountDeleteRequestPage {...authProps} />} />
        <Route path="/account/delete-final" element={<AccountDeleteFinalPage {...authProps} />} />
        <Route path="/account/delete-complete" element={<AccountDeleteComplete {...authProps} />} />
        <Route path="/account/undeletable" element={<UndeletableAccountPage {...authProps} />} />
        <Route path="/account/undeletable-final" element={<UndeletableAccountFinalPage {...authProps} />} />
        <Route path="/account/undeletable-complete" element={<UndeletableAccountComplete {...authProps} />} />
        <Route path="/will/write" element={<WillWrite {...authProps} />} />
        <Route path="/memorial" element={<MemorialSpace />} />
        <Route path="/deathcertificate" element={<DeathCertificate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
