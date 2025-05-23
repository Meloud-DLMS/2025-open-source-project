import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';
import Sidebar from '../components/SideBar';

import mainImage from '../../public/assets/main.jpg';
import accountIcon from '../../public/assets/account.png';
import memorialIcon from '../../public/assets/memorial.png';
import willIcon from '../../public/assets/will.png';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const cardsSectionRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleShareButtonClick = () => {
    if (isLoggedIn) {
      cardsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
      />
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
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1>Become a star<br />in the MELOUD sky.</h1>
            <p>Write your will, share your love, and let your story live on beyond time.</p>
            <button className="share-button" onClick={handleShareButtonClick}>
              Share On with Meloud +
            </button>
          </div>
        </section>
        <section className="cards-section" ref={cardsSectionRef}> {/* ref 연결 */}
          <div className="card"  onClick={() => navigate('/account-lookup')} style={{ cursor: 'pointer' }}>
            <img src={accountIcon} alt="Account Icon" className="card-icon" />
            <h3>Check My Account</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <span className="card-arrow">&gt;</span>
          </div>
          <div className="card" onClick={() => navigate('/will/write')} style={{ cursor: 'pointer' }}>
            <img src={willIcon} alt="Will Icon" className="card-icon" />
            <h3>Preparation of Will</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <span className="card-arrow">&gt;</span>
          </div>
          <div className="card">
            <img src={memorialIcon} alt="Memorial Icon" className="card-icon" />
            <h3>Memorial Space</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
