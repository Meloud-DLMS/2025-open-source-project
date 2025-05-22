import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';
import mailImage from '@/assets/images/mail.png';

const UndeletableAccountComplete = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            {/* 배경 이미지 및 오버레이 */}
            <img src={backgroundImage} alt="background" className={styles.backgroundImage} />
            <div className={styles.overlay}></div>

            {/* 헤더 */}
            <header className={styles.header}>
                <div className={styles.logo}>MELOUD</div>
                <nav className={styles.navbar}>
                    <span className={styles.navItem}>ACCOUNT</span>
                    <span className={styles.navItem}>WILL</span>
                    <span className={styles.navItem}>MEMORIAL</span>
                </nav>
                <div className={styles.profile}>Profile</div>
            </header>

            {/* 완료 화면 */}
            <main className={styles.mainContent}>
                <img src={mailImage} alt="메일 완료" style={{ width: '100px', height: '100px', marginBottom: '30px' }} />
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 요청메일 저장 완료</h2>
                <p className={styles.subtitle}>
                    사망인증서가 인증되면 자동으로 메일이 전송됩니다<br />
                    <span style={{ fontSize: '13px', opacity: 0.8 }}>* 경우에 따라 발송되지 않을 수 있습니다</span>
                </p>
                <button
                    className={styles['gray-button']}
                    style={{ marginTop: '30px' }}
                    onClick={() => navigate('/')}
                >
                    홈
                </button>
            </main>
        </div>
    );
};

export default UndeletableAccountComplete;