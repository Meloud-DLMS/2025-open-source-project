import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import styles from '../style/AccountDeleteRequestPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const UndeletableAccountPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [selectedTab, setSelectedTab] = useState('undeletable');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navigate = useNavigate();

    const accounts = [
        { id: 1, url: 'accounts.kakao.com', company: '(주)카카오', note: '민원처리 시 불이익 발생 웹사이트' },
        { id: 2, url: 'baemin.com', company: '(주)우아한형제들', note: '개인정보 미수집 웹사이트' },
        { id: 3, url: 'card.nonghyup.com', company: 'NH농협카드', note: '민원처리 시 불이익 발생 웹사이트' }
    ];

    const handleNavigate = (tab) => {
        if (tab === 'deletable') {
            navigate('/account/delete-request');
        } else if (tab === 'undeletable') {
            navigate('/account/undeletable');
        }
    };

    const handleSelect = (id) => {
        setSelectedItem(id);
    };

    const handleSubmit = () => {
        if (selectedItem) {
            navigate('/account/undeletable-final');
        }
    };

    return (
        <div
            className={styles.wrapper}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isLoggedIn={isLoggedIn}
                handleLogin={() => setIsLoggedIn(true)}
                handleLogout={() => setIsLoggedIn(false)}
            />

            <div className={styles.overlay}></div>

            <div className={styles.header}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    MELOUD
                </div>
                <div className={styles.profileButton} onClick={toggleSidebar}>
                    Profile
                </div>
            </div>

            <div className={styles.innerContent}>
                <h2 className={styles.title}>사후 웹사이트 회원 탈퇴 신청</h2>

                <div className={styles.tabContainer}>
                    <button
                        className={`${styles.tab} ${selectedTab === 'deletable' ? styles.active : ''}`}
                        onClick={() => handleNavigate('deletable')}
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
                                            checked={selectedItem === acc.id}
                                            onChange={() => handleSelect(acc.id)}
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
                        disabled={!selectedItem}
                        onClick={handleSubmit}
                    >
                        삭제 요청 메일 작성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UndeletableAccountPage;
