import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import styles from '../style/AccountDeleteRequestPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const AccountDeleteRequestPage = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
    const [selectedTab, setSelectedTab] = useState('deletable');
    const [checkedItems, setCheckedItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const [accounts, setAccounts] = useState([]);

    // 서버에서 계정 데이터 전체를 받아와 accounts에 저장
    useEffect(() => {
        fetch("http://localhost:8000/accountShow")
            .then(res => res.json())
            .then(data => {
                setAccounts(data); // 받아온 전체 데이터를 accounts에 저장
            });
    }, []);

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
            // 체크된 모든 계정 객체 찾기
            const checkedAccounts = accounts.filter(acc => checkedItems.includes(String(acc.site_URL)));

            if (checkedAccounts.length === 0) {
                alert("선택된 계정 정보를 찾을 수 없습니다.");
                return;
            }

            // 여러 계정 삭제 요청을 Promise.all로 처리
            Promise.all(
                checkedAccounts.map(account =>
                    fetch("http://localhost:8000/deleteAccountByString", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ site_URL: account.site_URL })
                    })
                    .then(res => res.json())
                    .then(data => ({
                        site_URL: account.site_URL,
                        status: data.status,
                        message: data.message,
                    }))
                    .catch(error => ({
                        site_URL: account.site_URL,
                        status: "fail",
                        message: error.toString(),
                    }))
                )
            ).then(results => {
                // 전체 결과 처리
                const successCount = results.filter(r => r.status === "success").length;
                const failResults = results.filter(r => r.status !== "success");

                if (successCount > 0) {
                    alert(`${successCount}개 계정 삭제 요청이 완료되었습니다!`);
                    // 삭제된 계정 목록에서 제거
                    // setAccounts(accounts.filter(acc => !checkedItems.includes(acc.id)));
                    // setCheckedItems([]);
                }
                if (failResults.length > 0) {
                    alert(
                        failResults.map(r => `${r.site_URL}: ${r.message}`).join('\n')
                    );
                }

                // (원래 있던 페이지 이동 코드)
                navigate('/account/delete-final');
            });
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
                username={username}
            />

            <Header
                toggleSidebar={toggleSidebar}
                isLoggedIn={isLoggedIn}
                username={username}
            />

            <div className={styles.overlay}></div>

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
                                    {acc.is_auto === 'Y' && (
                                        <>
                                            <td>
                                            <input
                                                type="checkbox"
                                                checked={checkedItems.includes(acc.site_URL)}
                                                onChange={() => handleCheck(acc.site_URL)}
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
