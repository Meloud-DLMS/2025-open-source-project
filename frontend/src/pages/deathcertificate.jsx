
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import '../style/deathcertificate.css'; // 해당 페이지의 CSS 파일 임포트

function DeathCertificate() {
  const [name, setName] = useState('');
  const [ssnPart1, setSsnPart1] = useState('');
  const [ssnPart2, setSsnPart2] = useState('');

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('이름:', name);
    console.log('주민등록번호 앞자리:', ssnPart1);
    console.log('주민등록번호 뒷자리:', ssnPart2);

    // 가상의 사망 인증 로직 (실제 서비스에서는 서버 통신 후 성공 시 이동)
    if (name && ssnPart1.length === 6 && ssnPart2.length === 7) {
      alert('사망 증명서 확인이 완료되었습니다. 추모 공간으로 이동합니다.');
      navigate('/memorialspace'); // **수정: 인증 완료 시 MemorialSpace 페이지로 이동**
    } else {
      alert('이름과 주민등록번호를 올바르게 입력해주세요.');
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
            <p className="upload-text">사망 인증이 완료되지 않았습니다.사망 인증을 위한 파일을 업로드해주세요.</p>
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
                  onChange={(e) => setSsnPart1(e.target.value)}
                  placeholder=""
                  required
                />
                <span>-</span>
                <input
                  type="password" /* 보안을 위해 password 타입으로 */
                  maxLength="7" // 주민등록번호 뒤 7자리
                  className="ssn-part"
                  value={ssnPart2}
                  onChange={(e) => setSsnPart2(e.target.value)}
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