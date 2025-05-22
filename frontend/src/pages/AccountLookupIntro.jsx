import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';

const AccountQueryPage = () => {
    const navigate = useNavigate();

    const handleCheckClick = () => {
        navigate('/real-name');
    };

    return (
        <div>
            {/* 배경 이미지 및 검정 오버레이 */}
            <img src={backgroundImage} alt="background" className={styles['background-image']} />
            <div className={styles['background-overlay']}></div>

            {/* 상단 헤더 */}
            <header>
                <div className={styles.logo} onClick={() => {}}>MELOUD</div>
                <nav className={styles.navbar}>
                    <span className={styles['nav-item']}>ACCOUNT</span>
                    <span className={styles['nav-item']}>WILL</span>
                    <span className={styles['nav-item']}>MEMORIAL</span>
                </nav>
                <div className={styles.profile}>Profile</div>
            </header>

            {/* 본문 콘텐츠 */}
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '280px' }}>
                <h1 className={styles.title}>계정 조회</h1>
                <p className={styles.subtitle}>내 정보로 가입된 계정을 조회하고 미리 삭제 설정하세요</p>
                <button className={styles['gray-button']} onClick={handleCheckClick}>
                    확인하러 가기 →
                </button>
            </main>
        </div>
    );
};

export default AccountQueryPage;
