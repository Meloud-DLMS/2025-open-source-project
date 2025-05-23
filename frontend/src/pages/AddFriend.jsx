import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Home.css';
import '../style/Friends.css';

export default function AddFriend({ isLoggedIn, setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    // TODO: 실제 API로 대체
    const dummy = [
      { id: 1, name: '홍길동', email: 'hong@example.com' },
      { id: 2, name: '김철수', email: 'kim@example.com' },
    ];
    const filtered = dummy.filter(user =>
      user.name.includes(query) || user.email.includes(query)
    );
    setResults(filtered);
  };

  const handleRequest = (name) => {
    setMessage(`Sent a friend request to ${name}`);
    setTimeout(() => setMessage(''), 3000); // 3초 후 메시지 제거
  };

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

      <div style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2 className="page-title">Add Friend</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Friend's name or email"
        />
        <button onClick={handleSearch}>Search</button>

        {message && <p className="success-message fade-in-slide">{message}</p>}

        <ul className="search-results">
          {results.map(user => (
            <li key={user.id} className="friend-card">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <button onClick={() => handleRequest(user.name)}>Request</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
