
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';

const AccountDeleteFinalPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedAccounts, userInfo } = location.state || {};

    const [phone, setPhone] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [authCode, setAuthCode] = useState('');

    const isAuthValid = authCode.length === 6;

    const handleSubmit = () => {
        if (isAuthValid) {
            // 이후 서버로 제출하는 로직 추가 예정
            alert('삭제 요청이 완료되었습니다.');
            navigate('/');
        }
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

            <main className={styles.mainContent}>
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 신청</h2>

                <div className={`${styles.blackBox} ${styles.accountBox}`}>
                    <table className={styles.accountTable}>
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>웹사이트 URL</th>
                                <th>사업자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedAccounts?.map(({ url, provider }, index) => (
                                <tr key={url}>
                                    <td>{index + 1}</td>
                                    <td>{url}</td>
                                    <td>{provider}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '30px' }}>
                        <h3 className={styles['text-label']}>요구인</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <span className={styles['text-small']}>이름</span>
                                <span className={styles['text-small']}>{userInfo?.name || '홍길동'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <span className={styles['text-small']}>생년월일</span>
                                <span className={styles['text-small']}>{userInfo?.birth || 'YYYYMMDD'}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '24px' }}>
                                <span className={styles['text-small']}>전화번호</span>
                                <input className={styles['input-box']} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span className={styles['text-small']}>메일</span>
                                <input className={styles['input-box']} type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                                <span>@</span>
                                <input className={styles['input-box']} type="text" value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)} />
                                <button className={styles['black-button']}>인증요청</button>
                                <input className={styles['input-box']} placeholder="인증번호 입력" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        className={styles.mainButton}
                        onClick={handleSubmit}
                        disabled={!isAuthValid}
                    >
                        삭제 요청
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AccountDeleteFinalPage;