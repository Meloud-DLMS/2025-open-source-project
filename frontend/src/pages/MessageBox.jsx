import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Home.css';
import '../style/Friends.css'; // 재사용
import '../style/MessageBox.css'; // 새로 추가

export default function MessageBox({ isLoggedIn, setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messages = [
    { id: 1, type: 'friend', content: '김영희님이 친구 요청을 보냈습니다.', time: '2분 전' },
    { id: 2, type: 'will', content: '故 홍길동님의 유언장이 도착했습니다.', time: '1시간 전' },
    { id: 3, type: 'notice', content: '서버 점검이 5월 24일 새벽 3시에 예정되어 있습니다.', time: '어제' },
  ];

  return (
    <div className="page-background">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
      />
      <header className="home-header">
        <Link to="/" className="logo">MELOUD</Link>
        <nav className="home-nav">
          <a href="#">ACCOUNT</a>
          <a href="#">WILL</a>
          <a href="#">MEMORIAL</a>
        </nav>
        <button className="profile-button" onClick={() => setSidebarOpen(true)}>Profile</button>
      </header>

      <main className="message-container">
        <h2 className="page-title">Message Box</h2>
        <ul className="message-list">
          {messages.map(msg => (
            <li key={msg.id} className={`message-item ${msg.type}`}>
              <p className="message-content">{msg.content}</p>
              <span className="message-time">{msg.time}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
