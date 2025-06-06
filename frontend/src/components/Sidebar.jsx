import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, handleLogin, handleLogout, username }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    toggleSidebar();
    navigate('/login');
  };

  const logoutAndRedirect = () => {
    handleLogout();               // 상태 업데이트
    alert('로그아웃되었습니다.');    // ✅ 알림창 추가
    toggleSidebar();              // 사이드바 닫기
    navigate('/');                // 홈으로 이동
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar-button" onClick={toggleSidebar}>X</button>

      {isLoggedIn ? (
        <div className="sidebar-content">
          <div className="sidebar-profile">
            <p className="username">Welcome, {username || 'Guest'}!</p>
            <button onClick={logoutAndRedirect} className="sidebar-button">Logout</button>
          </div>

          <nav className="sidebar-nav">
            <Link to="/friends/add" className="sidebar-nav-link">Add Friend</Link>
            <Link to="/friends" className="sidebar-nav-link">Friend List</Link>
            <a onClick={() => { navigate('/messages'); toggleSidebar(); }}>Message Box</a>
          </nav>

          <div className="sidebar-footer">
            <a href="#" className="sidebar-nav-link">Setting</a>
            <a href="#" className="sidebar-nav-link">Help & FAQ</a>
          </div>
        </div>
      ) : (
        <div className="sidebar-content">
          <div className="sidebar-login">
            <button onClick={goToLogin} className="sidebar-button login-button">Login</button>
          </div>
          <div className="sidebar-footer">
            <a href="#" className="sidebar-nav-link">Setting</a>
            <a href="#" className="sidebar-nav-link">Help & FAQ</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
