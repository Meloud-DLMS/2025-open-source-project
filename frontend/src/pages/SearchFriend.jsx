import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Home.css';
import '../style/Friends.css';

export default function SearchFriend() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = () => {
    setResults([{ id: 3, name: '이영희', email: 'lee@example.com' }]);
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
        <h2 className="page-title">친구 검색</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름 또는 이메일 검색"
        />
        <button onClick={handleSearch}>검색</button>
        <ul className="search-results">
          {results.map((user) => (
            <li key={user.id}>
              <p>{user.name} ({user.email})</p>
              <button>친구 요청</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
