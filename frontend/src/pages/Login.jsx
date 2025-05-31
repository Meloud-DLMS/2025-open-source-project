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

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('로그아웃되었습니다.');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ 반드시 form data 방식으로 전송해야 함
      const formData = new URLSearchParams();
      formData.append('username', id);
      formData.append('password', pw);

      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 포함
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${id}님 환영합니다!`);
        setIsLoggedIn(true);
        setUsername(id);
        navigate('/');
      } else {
        const errorData = await response.json();
        let msg = '';
        if (typeof errorData.detail === 'string') {
          msg = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          msg = errorData.detail.map(d => d.msg || JSON.stringify(d)).join(', ');
        } else if (typeof errorData.detail === 'object') {
          msg = JSON.stringify(errorData.detail);
        } else {
          msg = JSON.stringify(errorData);
        }
        alert(`❌ 로그인 실패: ${msg}`);
      }
    } catch (error) {
      alert('⚠️ 서버 오류 또는 네트워크 에러');
      console.error('Login error:', error);
    }
  };

  

  return (
    <div className="auth-page">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={handleLogout}
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
