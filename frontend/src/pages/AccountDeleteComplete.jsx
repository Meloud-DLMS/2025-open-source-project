import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';
import checkImage from '@/assets/images/Check.png';

const AccountDeleteComplete = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.wrapper}>
            <img src={backgroundImage} alt="background" className={styles.backgroundImage} />
            <div className={styles.overlay}></div>

            <header className={styles.header}>
                <div className={styles.logo}>MELOUD</div>
                <nav className={styles.navbar}>
                    <span className={styles.navItem}>ACCOUNT</span>
                    <span className={styles.navItem}>WILL</span>
                    <span className={styles.navItem}>MEMORIAL</span>
                </nav>
                <div className={styles.profile}>Profile</div>
            </header>

            <main className={styles.mainContent} style={{ marginTop: '200px', textAlign: 'center' }}>
                <img src={checkImage} alt="완료" style={{ width: '120px', marginBottom: '30px' }} />
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 신청 완료</h2>
                <p className={styles.subtitle} style={{ marginTop: '10px' }}>
                    사망증명서가 인증되면 자동으로 웹사이트 회원이 탈퇴됩니다
                </p>
                <button className={styles['gray-button']} onClick={goHome} style={{ marginTop: '40px' }}>
                    홈
                </button>
            </main>
        </div>
    );
};

export default AccountDeleteComplete;