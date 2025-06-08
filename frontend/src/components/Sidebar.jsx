import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, handleLogin, handleLogout, username }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    toggleSidebar();
    navigate('/login');
  };

  const logoutAndRedirect = async () => {
  try {
    // 로그아웃 API 엔드포인트로 POST 요청
    const response = await fetch('http://localhost:8000/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함 (Cross-Origin 요청 시 필수)
    });

    if (!response.ok) {
      throw new Error('로그아웃 요청 실패');
    }

    // 상태 업데이트 (예: handleLogout)
    handleLogout();
    alert('로그아웃되었습니다.');
    toggleSidebar();
    navigate('/');
  } catch (error) {
      console.error('로그아웃 중 오류:', error);
      alert('로그아웃에 실패했습니다.');
    }
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
