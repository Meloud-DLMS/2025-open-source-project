import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import styles from '../style/AccountDeleteFinalPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const AccountDeleteFinalPage = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        phone: '',
        email1: '',
        email2: '',
        code: ''
    });

    const [emailSent, setEmailSent] = useState(false);

    const accounts = [
        { id: 1, url: 'eis.cbnu.ac.kr', company: '충북대학교' },
        { id: 2, url: 'millie.co.kr', company: '밀리의서재' },
        { id: 3, url: 'playstation.co.kr', company: '플레이스테이션' }
    ];

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const isFormFilled = Object.values(formData).every((value) => value.trim() !== '');
    const isEmailFormFilled = formData.name && formData.birth && formData.phone && formData.email1 && formData.email2;

    const handleEmailVerification = () => {
        if (isEmailFormFilled) {
            setEmailSent(true);
            alert('인증번호가 발송되었습니다.');
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

                <div className={styles.container}>
                    <div className={styles.scrollContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>웹사이트 URL</th>
                                    <th>사업자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((acc, index) => (
                                    <tr key={acc.id}>
                                        <td>{index + 1}</td>
                                        <td>{acc.url}</td>
                                        <td>{acc.company}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputGroup}>
                            <label>이름</label>
                            <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>생년월일</label>
                            <input type="text" placeholder="예: 20030628" value={formData.birth} onChange={(e) => handleChange('birth', e.target.value)} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>전화번호</label>
                            <input type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>메일</label>
                            <div className={styles.emailGroup}>
                                <input type="text" value={formData.email1} onChange={(e) => handleChange('email1', e.target.value)} />
                                <span>@</span>
                                <input type="text" value={formData.email2} onChange={(e) => handleChange('email2', e.target.value)} />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <button
                                className={`${styles.verifyButton} ${!isEmailFormFilled ? styles.disabledVerifyButton : ''}`}
                                disabled={!isEmailFormFilled}
                                onClick={handleEmailVerification}
                            >
                                인증요청
                            </button>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                value={formData.code}
                                onChange={(e) => handleChange('code', e.target.value)}
                                className={styles.verificationInput}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.submitButton}
                        disabled={!isFormFilled}
                        onClick={() => navigate('/account/delete-complete')}
                    >
                        삭제 요청
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDeleteFinalPage;
