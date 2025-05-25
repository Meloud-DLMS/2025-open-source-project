import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AccountDeleteRequestPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const AccountDeleteRequestPage = () => {
    const [selectedTab, setSelectedTab] = useState('deletable');
    const [checkedItems, setCheckedItems] = useState([]);

    const accounts = [ //패치로 바꿔야함
        { id: 1, url: 'eis.cbnu.ac.kr', company: '충북대학교', note: '' },
        { id: 2, url: 'millie.co.kr', company: '밀리의서재', note: '' },
        { id: 3, url: 'playstation.co.kr', company: '플레이스테이션', note: '' }
    ];


    const navigate = useNavigate();
    const handleNavigate = (tab) => {
    if (tab === 'undeletable') {
        navigate('/account/undeletable'); 
        }
    };

    const handleCheck = (id) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (checkedItems.length > 0) {
            navigate('/account/delete-final'); 
        }
    };


    return (
        <div
            className={styles.wrapper}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.overlay}></div>
            <div className={styles.logo} onClick={() => navigate('/')}>
                MELOUD
            </div>
            <div className={styles.innerContent}>
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 신청</h2>

                <div className={styles.tabContainer}>
                    <button
                        className={`${styles.tab} ${selectedTab === 'deletable' ? styles.active : ''}`}
                        onClick={() => setSelectedTab('deletable')}
                    >
                        회원 탈퇴 신청 가능
                    </button>
                    <button
                        className={`${styles.tab} ${selectedTab === 'undeletable' ? styles.active : ''}`}
                        onClick={() => handleNavigate('undeletable')}
                    >
                        회원 탈퇴 신청 불가
                    </button>
                </div>

                <div className={styles.container}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>웹사이트 URL</th>
                                <th>사업자</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((acc) => (
                                <tr key={acc.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems.includes(acc.id)}
                                            onChange={() => handleCheck(acc.id)}
                                        />
                                    </td>
                                    <td>{acc.url}</td>
                                    <td>{acc.company}</td>
                                    <td>{acc.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.submitButton}
                        disabled={checkedItems.length === 0}
                        onClick={handleSubmit}
                    >
                        삭제 요청
                    </button>
</div>
            </div>
        </div>
    );
};

export default AccountDeleteRequestPage;
