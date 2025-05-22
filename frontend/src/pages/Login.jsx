import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Auth.css';

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [stayLogged, setStayLogged] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoggedIn(true);
    setSidebarOpen(false);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
      />

      <header className="auth-header">
        <Link to="/" className="logo">MELOUD</Link>
        <button className="profile-btn" onClick={() => setSidebarOpen(true)}>Profile</button>
      </header>

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