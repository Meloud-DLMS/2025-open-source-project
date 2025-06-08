import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import styles from '../style/RealNameVerificationPage.module.css';
import backgroundImage from '../assets/images/backgroundAccountManage.jpg';

const RealNameVerificationPage = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const [name, setName] = useState('');
    const [idFront, setIdFront] = useState('');
    const [idBack, setIdBack] = useState('');

    const isFormComplete = name && idFront.length === 6 && idBack.length === 7;
    const navigate = useNavigate();

    const handleNext = () => {
        if (isFormComplete) navigate('/account/delete-request');
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
                <h2 className={styles.title}>실명 인증</h2>
                <p className={styles.desc}>
                    본인인증한 정보와 아래 입력하는 이용자가 불일치 할 경우, 본인확인 내역 조회 불가능합니다.
                </p>
                <p className={styles.notice}>
                    정보주체 권리행사 서비스는 정보주체(이용자)의 주민등록번호 등을 통한 본인확인(인증) 내역 조회를 위한 플랫폼이며,
                    홈페이지 접속(이용) 종료 시 모든 정보는 즉시 <span className={styles.red}>삭제</span>됩니다.
                </p>

                <div className={styles.formRow}>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={styles.label}>주민등록번호</label>
                        <div className={styles.ssnGroup}>
                            <input
                                type="text"
                                maxLength={6}
                                value={idFront}
                                onChange={(e) => setIdFront(e.target.value)}
                                className={styles.input}
                            />
                            <span className={styles.hyphen}>-</span>
                            <input
                                type="password"
                                maxLength={7}
                                value={idBack}
                                onChange={(e) => setIdBack(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.button}
                        onClick={handleNext}
                        disabled={!isFormComplete}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RealNameVerificationPage;