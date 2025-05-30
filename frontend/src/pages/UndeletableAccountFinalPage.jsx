import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import styles from '../style/UndeletableAccountFinalPage.module.css';
import backgroundImage from '../assets/images/main.jpg';

const UndeletableAccountFinalPage = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleNext = () => {
        if (isFormFilled) {
            navigate('/account/undeletable-complete');
        }
    };

    return (
        <div
            className={styles.wrapper}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.overlay}></div>

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

            <div className={styles.formContainer}>
                <h2 className={styles.title}>계정 삭제 요청 메일</h2>

                <div className={styles.inputGroup}>
                    <label>받는사람</label>
                    <input
                        type="text"
                        value={formData.to}
                        onChange={(e) => handleChange('to', e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>제목</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>본문</label>
                    <textarea
                        value={formData.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        rows="10"
                    />
                </div>

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.nextButton}
                        onClick={handleNext}
                        disabled={!isFormFilled}
                    >
                        메일 저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UndeletableAccountFinalPage;
