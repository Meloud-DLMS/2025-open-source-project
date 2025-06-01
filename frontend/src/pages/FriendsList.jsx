import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Home.css';
import '../style/Friends.css';

const dummyFriends = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
];

export default function FriendsList({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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