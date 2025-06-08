import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import styles from '../style/AccountDeleteRequestPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const UndeletableAccountPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [selectedTab, setSelectedTab] = useState('undeletable');
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
            fetch("http://localhost:8000/accountShow")
                .then(res => res.json())
                .then(data => {
                    setAccounts(data); // 받아온 전체 데이터를 accounts에 저장
                });
        }, []);

    const handleNavigate = (tab) => {
        if (tab === 'deletable') {
            navigate('/account/delete-request');
        } else if (tab === 'undeletable') {
            navigate('/account/undeletable');
        }
    };

    const handleSelect = (id) => {
        setSelectedItem((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (selectedItem.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
        fetch("http://localhost:8000/requestAccountByString", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // 예시: site_URL_list라는 이름으로 배열을 보냄
            body: JSON.stringify({
                site_URL: selectedItem // selectedItem은 문자열(단일 site_URL)
            })
        })
        .then((res) => {
            if (!res.ok) throw new Error("요청 실패");
            return res.json();
        })
        .then((data) => {
            alert("요청이 완료되었습니다!");
            navigate('/account/undeletable-final');
        })
        .catch((error) => {
            alert("요청 처리 중 오류가 발생했습니다: " + error.message);
        });
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
                                    {acc.is_auto === 'N' && (
                                        <>
                                            <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedItem.includes(acc.site_URL)}
                                                onChange={() => handleSelect(acc.site_URL)}
                                            />
                                            </td>
                                            <td>{acc.site_URL }</td>
                                            <td>{acc.site_name}</td>
                                            <td>{acc.note}</td>
                                        </>
                                    )}
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