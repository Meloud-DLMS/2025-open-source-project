import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login      from './views/login/Login';
import SelectPage from './views/login/SelectPage';
import SignUpPage from './views/login/SignUpPage';

export default function App() {
  console.log('▶ App.jsx 렌더링 OK');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
