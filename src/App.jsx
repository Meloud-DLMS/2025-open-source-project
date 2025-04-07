import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SelectPage from './SelectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select" element={<SelectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
