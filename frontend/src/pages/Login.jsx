import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Auth.css';

export default function Login({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [stayLogged, setStayLogged] = useState(false);
  const navigate = useNavigate(); // ✅ 추가

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUsername(id);
    setSidebarOpen(false);
    navigate('/'); // ✅ 로그인 후 홈으로
  };

  return (
    <div className="auth-page">
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

      <section className="auth-section">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="ID" value={id} onChange={e => setId(e.target.value)} required />
          <input type="password" name="pw" placeholder="PW" value={pw} onChange={e => setPw(e.target.value)} required />
          <label className="stay-logged">
            <input type="checkbox" checked={stayLogged} onChange={() => setStayLogged(!stayLogged)} /> Stay Logged In
          </label>
          <button type="submit" className="auth-btn">Sign In</button>
          <div className="auth-links">
            <a href="/join">Join Us</a>
            <span>|</span>
            <a href="#">Find ID</a>
            <span>|</span>
            <a href="#">Find PW</a>
          </div>
        </form>
      </section>
    </div>
  );
}
