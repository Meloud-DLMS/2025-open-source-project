import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectPage.css';

function SelectPage() {
  const navigate = useNavigate();

  const handleOption1 = () => {
    // 유산 상속 하기 메인 페이지 이동
    alert('유산 상속 하기를 진행합니다.');
  };

  // 유산 상속 받기 메인 페이지 이동동
  const handleOption2 = () => {
    alert('유산 상속 받기를 진행합니다.');
  };

  const handleLogout = () => {
    // 로그아웃 로직
    navigate('/');
  };

  return (
    <div className="select-wrapper">
      <header className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-logo">MELOUD</h1>
        </div>
        <div className="navbar-right">
          <span className="mailbox-icon">✉</span>
          <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
        </div>
      </header>
      <main className="main-content">
        <div className="cards-container">
          <div className="card" onClick={handleOption1}>
            <h2>유산 상속 하기</h2>
            <p>유산 상속을 시작합니다.</p>
          </div>
          <div className="card" onClick={handleOption2}>
            <h2>유산 상속 받기</h2>
            <p>유산 상속 받기를 시작합니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SelectPage;
