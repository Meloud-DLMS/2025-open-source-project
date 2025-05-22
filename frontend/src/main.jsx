import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';       // 전역 스타일 (있다면)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
