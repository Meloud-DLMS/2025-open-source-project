// src/pages/deathcertificate.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/deathcertificate.css';

function DeathCertificate() {
  const [name, setName] = useState('');
  const [ssnPart1, setSsnPart1] = useState('');
  const [ssnPart2, setSsnPart2] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('이름:', name);
    console.log('주민등록번호 앞자리:', ssnPart1);
    console.log('주민등록번호 뒷자리:', ssnPart2);

    // ⭐⭐ 백엔드 연동 전 임시 사망 인증 로직 ⭐⭐
    // 예시: '홍길동'과 특정 주민등록번호를 입력하면 인증 성공
    if (name === '홍길동' && ssnPart1 === '900101' && ssnPart2 === '1234567') {
      alert('사망 증명서 확인이 완료되었습니다. 추모 공간으로 이동합니다.');
      // ⭐ 인증 성공 시 로컬 스토리지에 플래그 저장
      localStorage.setItem('memorialAuth', 'true');
      // --- [수정 시작] App.jsx의 라우트 경로와 일치하도록 /memorial로 변경 ---
      navigate('/memorial'); // 추모 공간 페이지로 이동
      // --- [수정 끝] ---
    } else {
      alert('이름과 주민등록번호를 올바르게 입력해주세요. (예: 홍길동 / 900101-1234567)');
      localStorage.removeItem('memorialAuth'); // 인증 실패 시 플래그 삭제 (선택 사항)
    }
  };

  return (
    <div className="death-certificate-page">
      <div className="dc-content-wrapper">
        <h2 className="page-title">Memorial Space</h2>

        <p className="form-instruction">추억할 분의 이름과 주민등록번호를 입력해주세요</p>

        <div className="form-container">
          <div className="image-upload-area">
            <span className="upload-icon">+</span>
            <p className="upload-text">
              사망 인증이 완료되지 않았습니다.<br/>
              사망 인증을 위한 파일을 업로드해주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="verification-form">
            <div className="input-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="ssn">SOCIAL SECURITY NUMBER</label>
              <div className="ssn-input-group">
                <input
                  type="text"
                  maxLength="6"
                  className="ssn-part"
                  value={ssnPart1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSsnPart1(value);
                    }
                  }}
                  placeholder=""
                  required
                />
                <span>-</span>
                <input
                  type="password"
                  maxLength="7"
                  className="ssn-part"
                  value={ssnPart2}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSsnPart2(value);
                    }
                  }}
                  placeholder=""
                  required
                />
              </div>
            </div>

            <button type="submit" className="certify-button">Certify</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeathCertificate;