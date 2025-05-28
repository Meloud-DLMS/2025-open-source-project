// src/pages/AccountLookupIntro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import styles from '../style/AccountLookupIntro.module.css';
import backgroundImage from '../assets/images/main.jpg';

const AccountLookupIntro = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/real-name');
    };

    return (
        <div
            className={styles.wrapper}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isLoggedIn={isLoggedIn}
                handleLogin={() => setIsLoggedIn(true)}
                handleLogout={() => setIsLoggedIn(false)}
            />

            <div className={styles.overlay}></div>

            
            <div className={styles.header}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    MELOUD
                </div>
                <div className={styles.profileButton} onClick={toggleSidebar}>
                    Profile
                </div>

            </div>

            <div className={styles.centered}>
                <h1 className={styles.title}>계정 조회</h1>
                <p className={styles.subtitle}>
                    내 정보로 가입된 계정을 조회하고 미리 삭제 설정하세요
                </p>
                <button className={styles.button} onClick={handleClick}>
                    확인하러 가기 →
                </button>
            </div>
        </div>
    );
};

export default AccountLookupIntro;
