import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './views/jsx/Login';
import SelectPage from './views/jsx/SelectPage';
import FriendPage from './views/jsx/FriendPage';
import SignUpPage from './views/jsx/SignUpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/friend" element={<FriendPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </BrowserRouter>
  );
}
