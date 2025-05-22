
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';

const UndeletableAccountPage = ({ undeletableAccounts }) => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleRadioChange = (index) => {
        setSelectedIndex(index);
    };

    const handleEmailWrite = () => {
        if (selectedIndex !== null) {
            navigate('/account-delete-email');
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

                <div className={styles.buttonRow}>
                    <button
                        className={styles.blackButton}
                        onClick={() => navigate('/account-delete-request')}
                    >
                        회원 탈퇴 신청 가능
                    </button>
                    <button className={styles.grayButton}>회원 탈퇴 신청 불가</button>
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
                            {undeletableAccounts?.map(({ url, provider, note }, index) => (
                                <tr key={url}>
                                    <td>
                                        <input
                                            type="radio"
                                            name="account"
                                            checked={selectedIndex === index}
                                            onChange={() => handleRadioChange(index)}
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
                        onClick={handleEmailWrite}
                        disabled={selectedIndex === null}
                    >
                        삭제 요청 메일 작성
                    </button>
                </div>
            </main>
        </div>
    );
};

export default UndeletableAccountPage;
