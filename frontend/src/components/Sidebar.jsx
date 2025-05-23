import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    toggleSidebar();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar-button" onClick={toggleSidebar}>X</button>
      {isLoggedIn ? (
        <div className="sidebar-content">
          <div className="sidebar-profile">
            <p className="username">Welcome!</p>
            <button onClick={handleLogout} className="sidebar-button">Logout</button>
          </div>
          <nav className="sidebar-nav">
            <a><Link to="/friends/add">Add Friend</Link></a>
            <a><Link to="/friends">Friend List</Link></a>
            <a href="#">Message Box</a>
          </nav>
          <div className="sidebar-footer">
            <a href="#">Setting</a>
            <a href="#">Help & FAQ</a>
          </div>
        </div>
      ) : (
        <div className="sidebar-content">
          <div className="sidebar-login">
            <button onClick={goToLogin} className="sidebar-button login-button">Login</button>
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