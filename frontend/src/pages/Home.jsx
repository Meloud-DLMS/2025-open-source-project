import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 임포트
import '../style/Home.css';
import Sidebar from '../components/SideBar';

import mainImage from '../../public/assets/main.jpg';
import accountIcon from '../../public/assets/account.png';
import memorialIcon from '../../public/assets/memorial.png';
import willIcon from '../../public/assets/will.png';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 임시 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const cardsSectionRef = useRef(null); // 카드 섹션으로 스크롤하기 위한 ref

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 로그인 상태 변경 함수 (SideBar 또는 다른 인증 로직에서 호출될 것으로 예상)
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handleShareButtonClick = () => {
    if (isLoggedIn) {
      // 로그인 상태이면 cards-section으로 스크롤
      cardsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // 비로그인 상태이면 로그인 페이지로 이동
      navigate('/login'); // '/login'은 실제 로그인 페이지 라우트 경로로 변경해야 합니다.
    }
  };

    const checkMemorialAuthAndNavigate = () => {
    const isMemorialAuth = localStorage.getItem('memorialAuth');

    // ⭐ lyl 추가: 추모 공간 들어갈 때 사망인증서 인증 한 번만 할 수 있도록
    // kye값: 홍길동, 900101-1234567 (백엔드에서 수정 필요)
    // 만약 제대로 수행하는지 알고 싶으면 
    // 1. F12로 개발자 모드 열기
    // 2. Application 탭 -> Local storage -> memorialAuth 삭제제
    if (isMemorialAuth === 'true') {
      // 인증된 경우, 바로 MemorialSpace로 이동
      navigate('/memorialspace');
    } else {
      // 인증되지 않은 경우, DeathCertificate 페이지로 이동하여 인증 요청
      alert('추모 공간에 입장하려면 사망인증서 인증이 필요합니다.');
      navigate('/deathcertificate');
    }
  };

  // ⭐ lyl 추가: 상단 메뉴 MEMORIAL 클릭 핸들러
  const handleTopMemorialClick = () => {
    checkMemorialAuthAndNavigate();
  };

  // ⭐ lyl 추가: 하단 Memorial Space 카드 클릭 핸들러
  const handleCardMemorialClick = () => {
   checkMemorialAuthAndNavigate();
  };

  return (
    <div className="home-container"> {/* 이 컨테이너가 전체 페이지를 감쌀 경우 여기에 배경 적용 고려 */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin} // Sidebar에서 로그인 성공 시 호출
        handleLogout={handleLogout} // Sidebar에서 로그아웃 시 호출
      />
      <div className="main-content">
        <header className="home-header">
          <div className="logo">MELOUD</div>
          <nav className="home-nav">
            <a href="#">ACCOUNT</a>
            <a href="#">WILL</a>
            {/* ⭐ 수정: 상단 MEMORIAL을 button으로 변경하고 onClick 핸들러 연결 */}
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
            <button className="share-button" onClick={handleShareButtonClick}> {/* onClick 핸들러 연결 */}
              Share On with Meloud +
            </button>
          </div>
        </section>
        <section className="cards-section" ref={cardsSectionRef}> {/* ref 연결 */}
          <div className="card" onClick={() => navigate('/account-lookup')} style={{ cursor: 'pointer' }}>
            <img src={accountIcon} alt="Account Icon" className="card-icon" />
            <h3>Check My Account</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <span className="card-arrow">&gt;</span>
          </div>
          <div className="card">
            <img src={willIcon} alt="Will Icon" className="card-icon" />
            <h3>Preparation of Will</h3>
            <p>서비스 설명 또는 추가 정보</p>
            <a href="#" className="card-arrow">&gt;</a>
          </div>
          {/* ⭐ 수정: 하단 Memorial Space 카드의 전체 div에 onClick 핸들러 연결 */}
          {/* 하단 화살표 <a> 태그는 제거하거나 <Link>로 변경할 수도 있습니다. */}
          <div className="card" onClick={handleCardMemorialClick} style={{ cursor: 'pointer' }}> {/* ⭐ 여기에 onClick 추가 */}
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