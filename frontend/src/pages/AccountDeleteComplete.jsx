import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/complete.module.css';
import backgroundImage from '../assets/images/main.jpg';
import checkImage from '../assets/images/Check.png';

const AccountDeleteComplete = () => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.wrapper}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.overlay}></div>

            <div className={styles.logo} onClick={() => navigate('/')}>
                MELOUD
            </div>

            <div className={styles.content}>
                <img src={checkImage} alt="완료" className={styles.checkImage} />
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 신청 완료</h2>
                <p className={styles.description}>
                    사망인증서가 인증되면 자동으로 웹사이트 회원이 탈퇴됩니다
                </p>
                <button className={styles.homeButton} onClick={() => navigate('/')}>
                    홈
                </button>
            </div>
        </div>
    );
};

export default AccountDeleteComplete;
