import React from 'react';
import '../style/Home.css';
import Sidebar from '../components/SideBar';
import { useState } from 'react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {/* 사이드바 */}
      <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          onLogin={() => { setIsLoggedIn(true); setSidebarOpen(false); }}
          onLogout={() => setIsLoggedIn(false)}
      />
      {/* 내비게이션 */}
      <nav className="navbar">
        <div className="logo">MELOUD</div>
        <ul className="nav-links">
          <li><a href="#">ACCOUNT</a></li>
          <li><a href="#">WILL</a></li>
          <li><a href="#">MEMORIAL</a></li>
        </ul>
        <button className="profile-btn" onClick={() => setSidebarOpen(true)}>
           Profile
        </button>
      </nav>

      {/* 히어로 섹션 */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            Become a star<br />
            in the MELOUD sky.
          </h1>
          <p>
            Write your will, share your love, and let your story live on beyond time.
          </p>
          <a href="#" className="btn">Shine On with Meloud →</a>
        </div>
      </section>

      {/* 기능 카드 섹션 */}
      <section className="features">
        <div className="card">
          <h2>Check My Account</h2>
          <div className="icon">
            <img src="/assets/account.svg" alt="Account Icon" />
          </div>
        </div>

        <div className="card highlight">
          <h2>Preparation of Will</h2>
          <div className="icon">
            <img src="/assets/will.svg" alt="Will Icon" />
          </div>
        </div>

        <div className="card">
          <h2>Memorial Space</h2>
          <div className="icon">
            <img src="/assets/memorial.svg" alt="Memorial Icon" />
          </div>
        </div>
      </section>
    </>
  );
}
