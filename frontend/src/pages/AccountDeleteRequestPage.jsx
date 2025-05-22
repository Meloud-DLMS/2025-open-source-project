// 삭제 요청 가능한 계정 선택 페이지 (다중 선택 가능)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';

const deletableAccounts = [
    { url: 'eis.cbnu.ac.kr', provider: '충북대학교', note: '' },
    { url: 'millie.co.kr', provider: '밀리의서재', note: '' },
    { url: 'playstation.co.kr', provider: '플레이스테이션', note: '' }
];

const AccountDeleteRequestPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const toggleSelect = (url) => {
        setSelected(prev =>
            prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
        );
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

                <div className={styles.buttonRow}>
                    <button className={styles.grayButton}>회원 탈퇴 신청 가능</button>
                    <button
                        className={styles.blackButton}
                        onClick={() => navigate('/account-delete-email')}
                    >
                        회원 탈퇴 신청 불가
                    </button>
                </div>

                <div className={`${styles.blackBox} ${styles.accountBox}`}>
                    <table className={styles.accountTable}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>웹사이트 URL</th>
                                <th>사업자</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deletableAccounts.map(({ url, provider, note }) => (
                                <tr key={url}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(url)}
                                            onChange={() => toggleSelect(url)}
                                        />
                                    </td>
                                    <td>{url}</td>
                                    <td>{provider}</td>
                                    <td>{note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        className={styles.mainButton}
                        onClick={() => navigate('/account-delete-result')}
                        disabled={selected.length === 0}
                    >
                        삭제 요청
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AccountDeleteRequestPage;