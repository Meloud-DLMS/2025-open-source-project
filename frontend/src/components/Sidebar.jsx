import React from 'react';
import './Sidebar.css'; // Sidebar 전용 CSS 파일

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar-button" onClick={toggleSidebar}>X</button>
      {isLoggedIn ? (
        // 로그인 시 사이드바 내용
        <div className="sidebar-content">
          <div className="sidebar-profile">
            <p className="username">Username</p>
            <button onClick={handleLogout} className="sidebar-button">Logout</button>
          </div>
          <nav className="sidebar-nav">
            {/* <a href="#">Smart ID</a>  <-- 이 부분을 삭제 또는 주석 처리 */}
            <a href="#">Add Friend</a>
            <a href="#">Friend List</a>
            <a href="#">Message Box</a>
          </nav>
          <div className="sidebar-footer">
            <a href="#">Setting</a>
            <a href="#">Help & FAQ</a>
          </div>
        </div>
      ) : (
        // 로그아웃 시 사이드바 내용 (기존과 동일)
        <div className="sidebar-content">
          <div className="sidebar-login">
            <button onClick={handleLogin} className="sidebar-button login-button">Login</button>
          </div>
          <div className="sidebar-footer">
            <a href="#">Setting</a>
            <a href="#">Help & FAQ</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;