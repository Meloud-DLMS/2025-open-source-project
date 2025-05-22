// src/pages/RealNameVerificationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AccountManage.module.css';
import backgroundImage from '../assets/images/backgroundAccountManage.jpg';

const RealNameVerificationPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [ssnFront, setSsnFront] = useState('');
    const [ssnBack, setSsnBack] = useState('');

    const handleNextClick = () => {
        if (name.trim() !== '' && ssnFront.length === 6 && ssnBack.length === 7) {
            navigate('/account-delete-request');
        } else {
            alert('모든 정보를 올바르게 입력해주세요.');
        }
    };

    return (
        <div className={styles['query-page-wrapper']}>
            <div className={styles['background-overlay']}></div>

            <header className={styles.header}>
                <div className={styles.logo} onClick={() => navigate('/')}>MELOUD</div>
                <nav className={styles.navbar}>
                    <span className={styles['nav-item']}>ACCOUNT</span>
                    <span className={styles['nav-item']}>WILL</span>
                    <span className={styles['nav-item']}>MEMORIAL</span>
                </nav>
                <div className={styles.profile}>Profile</div>
            </header>

            <main className={styles['black-box']}>
                <h2 className={styles.title}>실명 인증</h2>
                <p className={styles['text-small']}>
                    본인인증된 정보와 아래 입력하는 이용자가 불일치 할 경우, 본인확인 내역 조회 불가능합니다.<br />
                    정보주체 권리행사 서비스는 정보주체(이용자)의 주민등록번호 등을 통한 본인확인(인증) 내역 조회를 위한 플랫폼이며,<br />
                    페이지 접소(이용) 종료 시 모든 정보는 즉시 <span style={{ color: 'red' }}>삭제</span>됩니다.
                </p>
                <div className={styles['form-box']}>
                    <div className={styles['form-row']}>
                        <label className={styles['text-label']}>이름</label>
                        <input
                            className={styles['input-box']}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className={styles['text-label']}>주민등록번호</label>
                        <input
                            className={styles['input-box']}
                            type="text"
                            value={ssnFront}
                            onChange={(e) => setSsnFront(e.target.value)}
                            maxLength={6}
                        />
                        <input
                            className={styles['input-box']}
                            type="text"
                            value={ssnBack}
                            onChange={(e) => setSsnBack(e.target.value)}
                            maxLength={7}
                        />
                    </div>
                    <div className={styles['button-wrapper']}>
                        <button
                            className={styles['gray-button']}
                            onClick={handleNextClick}
                        >
                            다음
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RealNameVerificationPage;