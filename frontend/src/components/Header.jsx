import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

export default function Header({ toggleSidebar, isLoggedIn, username }) {
  const navigate = useNavigate();

  const handleMemorialClick = () => {
    const isMemorialAuthenticated = localStorage.getItem('memorialAuth');
    if (isMemorialAuthenticated === 'true') {
      navigate('/memorial');
    } else {
      navigate('/deathcertificate');
    }
  };

  return (
    <header className="home-header">
      <div className="logo" onClick={() => navigate('/')}>MELOUD</div>
      <nav className="home-nav">
        <button onClick={() => navigate('/account')} className="nav-item-button">ACCOUNT</button>
        <button onClick={() => navigate('/will/write')} className="nav-item-button">WILL</button>
        <button onClick={handleMemorialClick} className="nav-item-button">MEMORIAL</button>
      </nav>
      <button className="profile-button" onClick={toggleSidebar}>
        {isLoggedIn ? ('Profile') : 'Login'}
      </button>
    </header>
  );
}
