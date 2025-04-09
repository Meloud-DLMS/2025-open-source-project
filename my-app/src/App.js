import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/login/HomePage';
import SignUpPage from './views/login/SignUpPage';
import SelectPage from './views/login/SelectPage'
import Login from './views/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 기본 페이지 */}
        <Route path="/signup" element={<SignUpPage />} /> {/* 회원가입 페이지 */}
        <Route path="/select" element={<SelectPage />} />
        <Route path="/login" element={<Login />} /> {/* 회원가입 페이지 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
