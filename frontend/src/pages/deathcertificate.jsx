// src/pages/deathcertificate.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/deathcertificate.css';

function DeathCertificate() {
  const [name, setName] = useState('');
  const [ssnPart1, setSsnPart1] = useState('');
  const [ssnPart2, setSsnPart2] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // 파일 선택을 위한 상태

  const navigate = useNavigate();
  const fileInputRef = useRef(null); // 파일 입력 필드에 접근하기 위한 useRef 훅

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    console.log('이름:', name);
    console.log('주민등록번호 앞자리:', ssnPart1);
    console.log('주민등록번호 뒷자리:', ssnPart2);
    console.log('선택된 파일:', selectedFile ? selectedFile.name : '없음');

    // 입력 필드 유효성 검사 (파일 포함)
    if (!name || !ssnPart1 || !ssnPart2 || !selectedFile) {
        alert('이름, 주민등록번호, 그리고 사망 인증 파일을 모두 입력(선택)해주세요.');
        return; // 필수 값 없으면 함수 종료
    }

    // ⭐⭐ 임시 사망 인증 로직 ⭐⭐
    // 1. 선택된 파일 이름의 첫 세 글자를 가져옴
    const fileNamePrefix = selectedFile.name.substring(0, 3);
    // 2. 입력된 이름의 첫 세 글자를 가져옴
    //    (이름이 세 글자 미만일 경우를 대비하여 length 체크)
    const enteredNamePrefix = name.length >= 3 ? name.substring(0, 3) : name;


    // 파일 이름의 첫 세 글자와 입력된 이름의 첫 세 글자가 일치하는지 확인
    if (fileNamePrefix === enteredNamePrefix) {
      alert('사망 증명서 확인이 완료되었습니다. 추모 공간으로 이동합니다.');
      localStorage.setItem('memorialAuth', 'true');
      navigate('/memorial'); // 추모 공간 페이지로 이동 (App.jsx 라우트와 일치)
    } else {
      alert('입력된 이름과 사망 증명서 내의 이름이 일치하지 않습니다. 다시 확인해주세요.');
      localStorage.removeItem('memorialAuth'); // 인증 실패 시 플래그 삭제 (선택 사항)
    }
  };

  const handleImageUploadAreaClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 입력 필드를 클릭
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // 선택된 첫 번째 파일 저장
    } else {
      setSelectedFile(null); // 파일 선택 취소 시
    }
  };

  return (
    <div className="death-certificate-page">
      <div className="dc-content-wrapper">
        <h2 className="page-title">Memorial Space</h2>

        <p className="form-instruction">추억할 분의 이름과 주민등록번호를 입력해주세요</p>

        <div className="form-container">
          {/* 이미지 업로드 영역 */}
           <div className="image-upload-area" onClick={handleImageUploadAreaClick}>
            <span className="upload-icon">+</span>
            <p className="upload-text">
              {/* 여기에 수정 */}
              {selectedFile ? (
                `선택된 파일: ${selectedFile.name}`
              ) : (
                <> {/* React Fragment 사용 */}
                  사망 인증이 완료되지 않았습니다.
                  <br /> {/* 줄 바꿈 태그 */}
                  사망 인증을 위한 파일을 업로드해주세요.
                </>
              )}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.jpg,.jpeg,.png"
            />
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