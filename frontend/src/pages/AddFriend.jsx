import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Home.css';
import '../style/Friends.css';

export default function AddFriend({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
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
    setTimeout(() => setMessage(''), 3000);
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

      <main className="content-body" style={{ paddingTop: '120px', textAlign: 'center' }}>
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
      </main>
    </div>
  );
}