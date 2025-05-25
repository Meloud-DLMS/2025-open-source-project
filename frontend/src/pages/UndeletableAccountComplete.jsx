import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/complete.module.css';
import backgroundImage from '../assets/images/main.jpg';
import mailImage from '../assets/images/mail.png';

const UndeletableAccountComplete = () => {
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
                <img src={mailImage} alt="메일 저장 완료" className={styles.checkImage} />
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 요청메일 저장 완료</h2>
                <p className={styles.description}>
                    사망인증서가 인증되면 자동으로 메일이 전송됩니다<br />
                    경우에 따라 발송되지 않을 수 있습니다
                </p>
                <button className={styles.homeButton} onClick={() => navigate('/')}>
                    홈
                </button>
            </div>
        </div>
    );
};

export default UndeletableAccountComplete;
