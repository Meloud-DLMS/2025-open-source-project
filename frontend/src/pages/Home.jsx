import React, { useState } from 'react';
import '../style/Home.css';
import Sidebar from '../components/SideBar';

// 이미지 파일 import
import mainImage from '../../public/assets/main.jpg'; 
import accountIcon from '../../public/assets/account.png'; 
import memorialIcon from '../../public/assets/memorial.png'; 
import willIcon from '../../public/assets/will.png';  

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 임시 관리

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 로그인 상태 변경 함수 (임시)
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="home-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className="main-content">
        <header className="home-header">
          <div className="logo">MELOUD</div>
          <nav className="home-nav">
            <a href="#">ACCOUNT</a>
            <a href="#">WILL</a>
            <a href="#">MEMORIAL</a>
          </nav>
          <button className="profile-button" onClick={toggleSidebar}>Profile</button>
        </header>
        <section className="hero-section" style={{ backgroundImage: `url(${mainImage})` }}>
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1>Become a star<br />in the MELOUD sky.</h1>
            <p>Write your will, share your love, and let your story live on beyond time.</p>
            <button className="share-button">Share On with Meloud +</button>
          </div>
        </section>
        <section className="cards-section">
          <div className="card">
            <img src={accountIcon} alt="Account Icon" className="card-icon" />
            <h3>Check My Account</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
          <div className="card">
            <img src={willIcon} alt="Will Icon" className="card-icon" />
            <h3>Preparation of Will</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
          <div className="card">
            <img src={memorialIcon} alt="Memorial Icon" className="card-icon" />
            <h3>Memorial Space</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
        </section>
        {/* 여기에 푸터 추가 가능 */}
      </div>
    </div>
  );
};

export default Home;