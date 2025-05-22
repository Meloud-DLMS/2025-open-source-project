import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Home.css';
import '../style/Friends.css';

export default function AddFriend() {
  const [friendId, setFriendId] = useState('');
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAdd = () => {
    setMessage(`${friendId}님에게 친구 요청을 보냈습니다.`);
    setFriendId('');
  };

  return (
    <div className="page-background">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={true}
        handleLogin={() => {}}
        handleLogout={() => {}}
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
      <div style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2 className="page-title">친구 추가</h2>
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          placeholder="친구 ID 또는 이메일 입력"
        />
        <button onClick={handleAdd}>친구 요청</button>
        {message && <p className="success-message fade-in-slide">{message}</p>}
      </div>
    </div>
  );
}
