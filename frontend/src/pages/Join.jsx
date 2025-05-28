import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/Auth.css';

export default function Join({ isLoggedIn, setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', pw: '', confirmPw: ''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { id, name, pw, confirmPw } = form;
      if (pw.length < 6) {
        setError('비밀번호는 최소 6자리 이상이어야 합니다.');
      } else if (pw !== confirmPw) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        try {
          const response = await fetch('/join', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              name,
              pw,
            }),
          });

          if (response.ok) {
            setIsLoggedIn(true);
            setSidebarOpen(false);
            navigate('/');
          } else {
            const data = await response.json();
            setError(data.message || '회원가입에 실패했습니다.');
          }
        } catch (err) {
          setError('서버와 통신 중 오류가 발생했습니다.');
        }
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
      />

      <header className="auth-header">
        <Link to="/" className="logo">MELOUD</Link>
        <button className="profile-btn" onClick={() => setSidebarOpen(true)}>Profile</button>
      </header>

      <section className="auth-section">
        <h2>Join Us</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="password" name="pw" placeholder="PW (6자리 이상)" value={form.pw} onChange={handleChange} required />
          <input type="password" name="confirmPw" placeholder="Confirm PW" value={form.confirmPw} onChange={handleChange} required />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </section>
    </div>
  );
}
