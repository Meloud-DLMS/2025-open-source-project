import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Auth.css';

export default function Join({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', pw: '', confirmPw: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { pw, confirmPw, email } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pw.length < 6) {
      setError('비밀번호는 최소 6자리 이상이어야 합니다.');
    } else if (pw !== confirmPw) {
      setError('비밀번호가 일치하지 않습니다.');
    } else if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
    } else {
      setIsLoggedIn(true);
      setUsername(form.name);
      setSidebarOpen(false);
    }
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
        <h2>Join Us</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="password" name="pw" placeholder="PW (6자리 이상)" value={form.pw} onChange={handleChange} required />
          <input type="password" name="confirmPw" placeholder="Confirm PW" value={form.confirmPw} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-Mail" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </section>
    </div>
  );
}
