import React, { useState } from 'react';
import styles from '@/styles/AccountManage.module.css';
import backgroundImage from '@/assets/images/backgroundAccountManage.jpg';

const UndeletableAccountFinalPage = () => {
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSave = () => {
        if (to && subject && body) {
            alert('메일이 저장되었습니다.');
        } else {
            alert('모든 필드를 입력해주세요.');
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

            <main className={`${styles.blackBox}`} style={{ width: '700px', margin: '180px auto', padding: '30px' }}>
                <h2 className={styles.title}>메일</h2>

                <div style={{ margin: '20px 0' }}>
                    <div className={styles['text-label']}>받는사람</div>
                    <input
                        className={styles['input-box']}
                        type="email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="example@example.com"
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div className={styles['text-label']}>참조</div>
                    <input
                        className={styles['input-box']}
                        type="text"
                        value={cc}
                        onChange={(e) => setCc(e.target.value)}
                        placeholder="참조할 이메일"
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div className={styles['text-label']}>제목</div>
                    <input
                        className={styles['input-box']}
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="메일 제목"
                    />
                </div>

                <button className={styles['gray-button']} style={{ marginBottom: '10px' }}>템플릿</button>

                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="내용을 입력하세요"
                    style={{ width: '100%', height: '200px', resize: 'none', backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #999', overflowY: 'auto' }}
                />

                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <button className={styles['main-button']} onClick={handleSave}>메일 저장</button>
                </div>
            </main>
        </div>
    );
};

export default UndeletableAccountFinalPage;