// src/pages/deathcertificate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import '../style/deathcertificate.css'; // 해당 페이지의 CSS 파일 임포트

function DeathCertificate() {
  const [name, setName] = useState('');
  const [ssnPart1, setSsnPart1] = useState(''); // 주민등록번호 앞자리 상태
  const [ssnPart2, setSsnPart2] = useState(''); // 주민등록번호 뒷자리 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    console.log('이름:', name);
    console.log('주민등록번호 앞자리:', ssnPart1);
    console.log('주민등록번호 뒷자리:', ssnPart2);

    // ⭐⭐ 백엔드 연동 전 임시 사망 인증 로직 ⭐⭐
    // 실제 서비스에서는 여기에 백엔드 API 호출 로직을 구현해야 합니다.
    // 백엔드는 입력된 이름과 주민등록번호를 실제 사망자 정보와 대조하여
    // 인증 성공 여부를 프론트엔드로 반환해야 합니다.

    // 예시: '홍길동'과 특정 주민등록번호를 입력하면 인증 성공
    if (name === '홍길동' && ssnPart1 === '900101' && ssnPart2 === '1234567') {
      alert('사망 증명서 확인이 완료되었습니다. 추모 공간으로 이동합니다.');
      // ⭐ 인증 성공 시 로컬 스토리지에 플래그 저장
      localStorage.setItem('memorialAuth', 'true');
      navigate('/memorialspace'); // 추모 공간 페이지로 이동
    } else {
      alert('이름과 주민등록번호를 올바르게 입력해주세요. (예: 홍길동 / 900101-1234567)');
      // 인증 실패 시 로컬 스토리지 플래그 삭제 (선택 사항, 없어도 무방)
      localStorage.removeItem('memorialAuth');
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
            {/* p 태그 안의 p 태그는 HTML 유효성 오류를 발생시킬 수 있으므로, 하나로 합쳤습니다. */}
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
                placeholder="" // placeholder 유지
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="ssn">SOCIAL SECURITY NUMBER</label>
              <div className="ssn-input-group">
                <input
                  type="text"
                  maxLength="6" // 주민등록번호 앞 6자리
                  className="ssn-part"
                  value={ssnPart1}
                  onChange={(e) => {
                    // 숫자만 입력 가능하도록 필터링
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSsnPart1(value);
                    }
                  }}
                  placeholder="" // placeholder 유지
                  required
                />
                <span>-</span>
                <input
                  type="password" /* 보안을 위해 password 타입 유지 */
                  maxLength="7" // 주민등록번호 뒤 7자리
                  className="ssn-part"
                  value={ssnPart2}
                  onChange={(e) => {
                    // 숫자만 입력 가능하도록 필터링
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSsnPart2(value);
                    }
                  }}
                  placeholder="" // placeholder 유지
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