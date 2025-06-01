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

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/search?query=${query}&exclude_user_id=${username}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleRequest = async (friendName, friendId) => {
    try {
      const response = await fetch("http://localhost:8000/friends/add-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: username,     // 로그인한 사용자
          friend_id: friendId    // 친구로 추가할 사용자
        })
      });
  
      if (response.ok) {
        setMessage(`✅ Sent a friend request to ${friendName}`);
      } else {
        const err = await response.json();
        setMessage(`❌ ${err.detail}`);
      }
    } catch (error) {
      console.error("Friend request error:", error);
      setMessage("❌ 요청 중 오류 발생");
    }
  
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
            <li key={user.user_id} className="friend-card">
              <p>{user.full_name}</p>
              <p>{user.user_id}</p>
              <button onClick={() => handleRequest(user.full_name, user.user_id)}>Request</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}