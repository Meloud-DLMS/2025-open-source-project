// src/App.jsx
import React from 'react';
import './App.css';

function App() {
    const goToLogin = () => {
        // 로그인 페이지 연결 예정 (나중에 라우터 연결 시 '/login'으로 이동)
        alert('로그인 페이지로 연결 예정!');
    };

    return (
        <div className="app">
            <header className="navbar">
                <div className="logo" onClick={() => window.location.reload()}>MELOUD</div>
                <nav className="nav-links">
                    <span>ACCOUNT</span>
                    <span>WILL</span>
                    <span>MEMORIAL</span>
                    <span>Profile</span>
                </nav>
            </header>

            <main className="hero">
                {/* 여기에 나중에 이미지 들어갈 예정 */}
                <div className="image-placeholder"></div>
                <h1>Become a <span className="highlight">star</span><br />in the <span className="highlight">MELOUD</span> sky.</h1>
                <p>Write your will, share your love, and let your story live on beyond time.</p>
                <button onClick={goToLogin}>Shine On with Meloud →</button>
            </main>
        </div>
    );
}

export default App;
