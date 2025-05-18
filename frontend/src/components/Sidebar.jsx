import React from 'react';

export default function Sidebar({ isOpen, onClose, isLoggedIn, onLogin, onLogout }) {
  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>

      {/* 상단 헤더 */}
      <div className="sidebar-header">
        {isLoggedIn ? (
          <>
            <span className="username">user123</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={onLogin}>Login</button>
        )}
      </div>

      {/* 로그인 시 메뉴 */}
      {isLoggedIn && (
        <ul className="sidebar-menu">
          <li><a href="#">Add Friend</a></li>
          <li><a href="#">Friend List</a></li>
          <li><a href="#">Message Box</a></li>
        </ul>
      )}

      {/* 항상 보이는 하단 메뉴 */}
      <ul className="sidebar-footer">
        <li><a href="#">Setting</a></li>
        <li><a href="#">Help &amp; FAQ</a></li>
      </ul>
    </div>
  );
}
