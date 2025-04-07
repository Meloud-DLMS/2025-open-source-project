import React, { useState } from 'react';
import styles from './SignUpPage.module.css';


function SignUpPage() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        birth: '',
        email: '',
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.agree) {
            alert('약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        // 백엔드와 연결: 회원가입 요청 보내기
        fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('서버 응답:', data);
                alert('회원가입 성공!');
                // TODO: 회원가입 성공 처리 로직
            })
            .catch((error) => {
                console.error('에러 발생:', error);
                alert('회원가입 중 문제가 발생했습니다.');
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>회원가입</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>아이디</label>
                <input
                    className={styles.input}
                    name="username"
                    placeholder="아이디를 입력하세요"
                    onChange={handleChange}
                />
    
                <label className={styles.label}>비밀번호</label>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                />
    
                <label className={styles.label}>비밀번호 확인</label>
                <input
                    className={styles.input}
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    onChange={handleChange}
                />
    
                <label className={styles.label}>이름</label>
                <input
                    className={styles.input}
                    name="name"
                    placeholder="닉네임을 입력하세요"
                    onChange={handleChange}
                />
    
                <label className={styles.label}>생년월일</label>
                <input
                    className={styles.input}
                    name="birth"
                    placeholder="예: 2000-01-01"
                    onChange={handleChange}
                />
    
                <label className={styles.label}>이메일</label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="이메일 주소를 입력하세요"
                    onChange={handleChange}
                />
    
                <div className={styles.checkboxContainer}>
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                        />
                        &nbsp;약관에 동의합니다
                    </label>
                </div>
    
                <button className={styles.button} type="submit">
                    계정 생성
                </button>
            </form>
        </div>
    );
    
}

export default SignUpPage;
