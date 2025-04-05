import React, { useState } from 'react';

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
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input name="username" placeholder="아이디를 입력하세요" onChange={handleChange} />

                <label>비밀번호</label>
                <input name="password" type="password" placeholder="비밀번호를 입력하세요" onChange={handleChange} />

                <label>비밀번호 확인</label>
                <input name="confirmPassword" type="password" placeholder="비밀번호를 다시 입력하세요" onChange={handleChange} />

                <label>이름</label>
                <input name="name" placeholder="닉네임을 입력하세요" onChange={handleChange} />

                <label>생년월일</label>
                <input name="birth" placeholder="예: 2000-01-01" onChange={handleChange} />

                <label>이메일</label>
                <input name="email" type="email" placeholder="이메일 주소를 입력하세요" onChange={handleChange} />

                <div style={{ margin: '1rem 0' }}>
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                        />{' '}
                        약관에 동의합니다
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    계정 생성
                </button>
            </form>
        </div>
    );
}

export default SignUpPage;
