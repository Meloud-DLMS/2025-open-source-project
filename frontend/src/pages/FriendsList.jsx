import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Home.css';
import '../style/Friends.css';

const dummyFriends = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
];

export default function FriendsList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-background">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={true}
        handleLogin={() => {}}
        handleLogout={() => {}}
        username={username}
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
        <h2 className="page-title">Friend List</h2>
        <ul className="friend-list">
          {dummyFriends.map((friend) => (
            <li key={friend.id} className="friend-card">
              <p>{friend.name}</p>
              <p>{friend.email}</p>
              <button>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
