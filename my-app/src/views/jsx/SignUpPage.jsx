// React에서 컴포넌트를 만들기 위한 기본 import
import React, { useState } from 'react';
// 페이지 이동을 위한 훅 (로그인 페이지로 이동 등)
import { useNavigate } from 'react-router-dom';
// 스타일 파일 import (CSS 모듈 방식)
import styles from '../css/SignUpPage.module.css';

// 회원가입 페이지 컴포넌트 정의
function SignUpPage() {
    // 페이지 이동 함수 (예: 회원가입 후 로그인 페이지로 이동할 때 사용)
    const navigate = useNavigate();

    // 입력 폼 상태 관리 (아이디, 비번, 이메일 등)
    const [form, setForm] = useState({
        username: '',         // 아이디
        password: '',         // 비밀번호
        confirmPassword: '',  // 비밀번호 확인
        name: '',             // 이름
        birth: '',            // 생년월일
        email: '',            // 이메일
        agree: false          // 약관 동의 체크 여부
    });

    // 서버 요청 중인지 나타내는 로딩 상태
    const [loading, setLoading] = useState(false);

    // 사용자가 입력할 때마다 상태 업데이트
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 이메일 형식이 맞는지 확인하는 함수
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 빈 값이 있으면 alert로 막기
        for (let key of ['username', 'password', 'confirmPassword', 'name', 'birth', 'email']) {
            if (!form[key]) {
                alert(`${key} 항목을 입력해주세요.`);
                return;
            }
        }

        // 비밀번호와 확인 비밀번호가 같은지 확인
        if (form.password !== form.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 이메일 형식이 올바른지 확인
        if (!validateEmail(form.email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        // 약관 동의 여부 확인
        if (!form.agree) {
            alert('약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        // 모든 조건을 통과했으면 서버에 회원가입 요청
        setLoading(true); // 로딩 상태 true로 변경

        fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form), // form 객체를 JSON 문자열로 변환
        })
            .then((res) => res.json()) // 서버 응답을 JSON으로 파싱
            .then((data) => {
                if (data.error) {
                    // 서버에서 에러 메시지 전달한 경우
                    alert(data.error);
                } else {
                    alert('회원가입 성공!');
                    navigate('/login'); // 로그인 페이지로 이동
                }
            })
            .catch((err) => {
                console.error('에러 발생:', err);
                alert('회원가입 중 오류가 발생했습니다.');
            })
            .finally(() => {
                setLoading(false); // 로딩 상태 종료
            });
    };

    // 실제 화면에 보이는 부분
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>회원가입</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 아이디 입력 */}
                <label className={styles.label}>아이디</label>
                <input
                    className={styles.input}
                    name="username"
                    placeholder="아이디를 입력하세요"
                    onChange={handleChange}
                />

                {/* 비밀번호 입력 */}
                <label className={styles.label}>비밀번호</label>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                />

                {/* 비밀번호 확인 입력 */}
                <label className={styles.label}>비밀번호 확인</label>
                <input
                    className={styles.input}
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    onChange={handleChange}
                />

                {/* 이름 입력 */}
                <label className={styles.label}>이름</label>
                <input
                    className={styles.input}
                    name="name"
                    placeholder="이름 또는 닉네임을 입력하세요"
                    onChange={handleChange}
                />

                {/* 생년월일 입력 */}
                <label className={styles.label}>생년월일</label>
                <input
                    className={styles.input}
                    name="birth"
                    placeholder="예: 2000-01-01"
                    onChange={handleChange}
                />

                {/* 이메일 입력 */}
                <label className={styles.label}>이메일</label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="이메일 주소를 입력하세요"
                    onChange={handleChange}
                />

                {/* 약관 동의 체크박스 */}
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

                {/* 회원가입 버튼 */}
                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? '처리 중...' : '계정 생성'}
                </button>
            </form>
        </div>
    );
}


export default SignUpPage;