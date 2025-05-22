// src/pages/AccountLookupIntro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AccountManage.module.css';

const AccountLookupIntro = () => {
    const navigate = useNavigate();

    const handleCheckClick = () => {
        navigate('/real-name');
    };

    const handleLogoClick = () => {
        navigate('/');  
    };

    return (
        <div className={styles['query-page-wrapper']}>
            <div className={styles['background-overlay']}></div>

            <header className={styles.header}>
                <div className={styles.logo} onClick={handleLogoClick}>MELOUD</div>
                <nav className={styles.navbar}>
                    <span className={styles['nav-item']}>ACCOUNT</span>
                    <span className={styles['nav-item']}>WILL</span>
                    <span className={styles['nav-item']}>MEMORIAL</span>
                </nav>
                <div className={styles.profile}>Profile</div>
            </header>

            <main className={styles['main-content']}>
                <h1 className={styles.title}>계정 조회</h1>
                <p className={styles.subtitle}>내 정보로 가입된 계정을 조회하고 미리 삭제 설정하세요</p>
                <button className={styles['gray-button']} onClick={handleCheckClick}>
                    확인하러 가기 →
                </button>
            </main>
        </div>
    );
};

export default AccountLookupIntro;