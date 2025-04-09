import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직
    navigate('/select');
  };

  return (
    <div className="login-page">
      <header className="navbar">
        <div className="navbar-logo">MELOUD</div>
      </header>

      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="login-title">LOGIN</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button type="submit">로그인</button>
          </form>
          <div className="links">
            <a href="#!">ID/PW 찾기</a>
            <a href="#!">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
