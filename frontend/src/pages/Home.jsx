import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';
import Sidebar from '../components/SideBar';
import mainImage from '../assets/images/main.jpg';
import accountIcon from '../assets/images/account.png';
import memorialIcon from '../assets/images/memorial.png';
import willIcon from '../assets/images/will.png';

const Home = ({ isLoggedIn, setIsLoggedIn, username }) => {
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

  const handleAccountClick = () => {
    navigate('/account');
  };

const handleTopMemorialClick = () => {
    const isMemorialAuthenticated = localStorage.getItem('memorialAuth');

    if (isMemorialAuthenticated === 'true') {
      console.log('Home(상단): 사망 인증 완료 상태 감지. /memorial로 바로 이동합니다.');
      navigate('/memorial');
    } else {
      console.log('Home(상단): 사망 인증 필요. /deathcertificate 페이지로 이동합니다.');
      navigate('/deathcertificate');
    }
  };

  const handleCardMemorialClick = () => {
    const isMemorialAuthenticated = localStorage.getItem('memorialAuth');

    if (isMemorialAuthenticated === 'true') {
      console.log('Home(카드): 사망 인증 완료 상태 감지. /memorial로 바로 이동합니다.');
      navigate('/memorial');
    } else {
      console.log('Home(카드): 사망 인증 필요. /deathcertificate 페이지로 이동합니다.');
      navigate('/deathcertificate');
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
        username={username}
      />
      <div className="main-content">
        <header className="home-header">
          <div className="logo">MELOUD</div>
          <nav className="home-nav">
            <button onClick={handleAccountClick} className="nav-item-button"> 
              ACCOUNT
            </button>
            <button onClick={() => navigate('/will/write')} className="nav-item-button">
              WILL
            </button>
            <button onClick={handleTopMemorialClick} className="nav-item-button"> 
              MEMORIAL
            </button>
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
        <section className="cards-section" ref={cardsSectionRef}>
          <div className="card" onClick={() => navigate('/account')} style={{ cursor: 'pointer' }}>
            <img src={accountIcon} alt="Account Icon" className="card-icon" />
            <h3>Check My Account</h3>
            <p>Manage and delete your accounts.</p>
            <span className="card-arrow">&gt;</span>
          </div>
          <div className="card" onClick={() => navigate('/will/write')} style={{ cursor: 'pointer' }}>
            <img src={willIcon} alt="Will Icon" className="card-icon" />
            <h3>Preparation of Will</h3>
            <p>Write and store your digital will.</p>
            <span className="card-arrow">&gt;</span>
          </div>
          <div className="card" onClick={handleCardMemorialClick} style={{ cursor: 'pointer' }}>
            <img src={memorialIcon} alt="Memorial Icon" className="card-icon" />
            <h3>Memorial Space</h3>
            <p>Leave a tribute among the stars.</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
