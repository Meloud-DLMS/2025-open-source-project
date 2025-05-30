import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Home.css';
import '../style/MessageBox.css';

export default function MessageBox({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'friend',
      content: '김영희님이 친구 요청을 보냈습니다.',
      time: '2분 전',
      isRead: false,
    },
    {
      id: 2,
      type: 'will',
      content: '故 홍길동님의 사망이 확인되었습니다. 유언장이 도착했습니다.',
      time: '1시간 전',
      isRead: false,
    },
    {
      id: 3,
      type: 'notice',
      content: 'MELOUD 시스템 점검이 5월 30일 오전 2시에 예정되어 있습니다.',
      time: '어제',
      isRead: true,
    }
  ]);

  const handleCardClick = (msg) => {
    setMessages(prev =>
      prev.map(m => m.id === msg.id ? { ...m, isRead: true } : m)
    );
    setSelectedMessage(msg);
  };

  return (
    <div className="page-background">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
        username={username}
      />

      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      <main className="message-container">
        <h2 className="message-title">Message Box</h2>
        <div className="message-grid">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`message-card ${msg.isRead ? 'read' : 'unread'}`}
              onClick={() => handleCardClick(msg)}
            >
              <div className="msg-type">
                {msg.type === 'friend' ? '친구 요청'
                  : msg.type === 'will' ? '유언장 도착'
                  : '공지사항'}
              </div>
              <div className="msg-content">{msg.content.slice(0, 20)}...</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))}
        </div>
      </main>

      {selectedMessage && (
        <div className="popup-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>
              {selectedMessage.type === 'friend' ? '친구 요청'
                : selectedMessage.type === 'will' ? '유언장 도착'
                : '공지사항'}
            </h3>
            <p>{selectedMessage.content}</p>
            <span className="popup-time">{selectedMessage.time}</span>
            <button className="popup-close" onClick={() => setSelectedMessage(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
