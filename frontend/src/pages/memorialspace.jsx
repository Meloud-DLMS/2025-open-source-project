import React, { useState, useEffect } from 'react';
import '../style/memorialspace.css';
import moonImage from '../../public/assets/moon.png'; 
import starImage from '../assets/images/별.png'; 

// MOON 관련 상수들을 컴포넌트 외부에 정의하여 generateStar 함수가 접근 가능하게 합니다.
const MOON_CENTER_X_PERCENT = 50;
const MOON_RADIUS_PERCENT_X = 15;
const MOON_CENTER_Y_PERCENT = 50;
const MOON_RADIUS_PERCENT_Y = 20;

// 별 생성 로직 함수
const generateStar = (isNew = false, starData = {}) => {
  const size = Math.random() * 60 + 20; // 별 크기

  let x, y;
  let attempts = 0;
  const MAX_ATTEMPTS = 50; // 최대 시도 횟수

  do {
    x = Math.random() * 100;
    y = Math.random() * 100;

    const moonLeftBound = MOON_CENTER_X_PERCENT - MOON_RADIUS_PERCENT_X;
    const moonRightBound = MOON_CENTER_X_PERCENT + MOON_RADIUS_PERCENT_X;
    const moonTopBound = MOON_CENTER_Y_PERCENT - MOON_RADIUS_PERCENT_Y;
    const moonBottomBound = MOON_CENTER_Y_PERCENT + MOON_RADIUS_PERCENT_Y;

    const isInMoonX = x >= moonLeftBound && x <= moonRightBound;
    const isInMoonY = y >= moonTopBound && y <= moonBottomBound;

    if (!(isInMoonX && isInMoonY)) {
      break;
    }
    attempts++;
  } while (attempts < MAX_ATTEMPTS);

  if (attempts >= MAX_ATTEMPTS) {
    x = Math.random() * moonLeftBound;
    y = Math.random() * 100;
  }

  return {
    id: Math.random(),
    size: size,
    x: x,
    y: y,
    isNew: isNew,
    title: starData.title || '',
    content: starData.content || '',
    author: starData.author || '',
    photos: starData.photos || [],
    isPublic: starData.isPublic !== undefined ? starData.isPublic : true,
    password: starData.password || '', // 비밀번호 필드 추가
  };
};

// 초기 별 데이터: 테스트를 위해 실제 내용이 있는 별들을 포함시킵니다.
const initialStars = [
  // 공개 별 (클릭하면 바로 팝업)
  generateStar(false, {
    title: '사랑하는 우리 엄마',
    content: '엄마, 보고 싶어요. 항상 저를 지켜봐 주세요.\n사랑해요.',
    author: '딸 은진',
    isPublic: true,
  }),
  generateStar(false, {
    title: '나의 친구에게',
    content: '함께했던 모든 추억들 영원히 기억할게. 편히 쉬렴.',
    author: '오랜 친구',
    isPublic: true,
  }),
  // 비공개 별 (아직 비밀번호 입력창 없이 팝업 안 뜨게)
  generateStar(false, {
    title: '비밀스러운 이야기',
    content: '이 글은 비공개로 설정된 추모글입니다. 비밀번호를 입력해야 볼 수 있습니다.',
    author: '익명',
    isPublic: false,
    password: 'testpassword', // 임시 비밀번호
  }),
  // 내용이 없는 빈 별 (클릭해도 팝업 안 뜨게)
  generateStar(false, {
    title: '', content: '', author: '', isPublic: true,
  }),
];


function MemorialSpace() {
  const [stars, setStars] = useState(initialStars); // 초기 별 데이터를 설정
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState(''); // 비밀번호 설정 상태

  // selectedStar는 이제 star 객체 자체를 저장합니다.
  const [selectedStar, setSelectedStar] = useState(null);

  const addStar = () => {
    const newStar = generateStar(true, {
      title: title,
      content: content,
      author: author,
      photos: photos,
      isPublic: isPublic,
      password: isPublic ? '' : password, // 비밀번호 저장
    });
    setStars(prevStars => [...prevStars, newStar]);
    console.log('새 별이 추가되었습니다:', newStar);
  };

  const handleFileChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 제목, 내용, 작성자 중 최소 하나는 있어야 함 (작성자도 필수로 변경)
    if (!title && !content && !author && photos.length === 0) {
      alert('제목, 내용, 작성자 또는 사진 중 최소 하나는 입력해야 합니다.');
      return;
    }
    if (!author) { // 작성자는 필수
      alert('작성자 이름을 입력해주세요.');
      return;
    }


    addStar(); // 새로운 별 추가

    alert('추모글이 성공적으로 작성되어 새로운 별이 추가되었습니다!');
    // 폼 초기화
    setTitle('');
    setContent('');
    setAuthor('');
    setPhotos([]);
    setIsPublic(true);
    setPassword(''); // 비밀번호 초기화
    setShowForm(false); // 폼 닫기
  };

  // 별 클릭 핸들러: 현재는 공개 별만 팝업이 뜨도록
  const handleStarClick = (star) => {
    // 팝업이 이미 열려있고, 같은 별을 다시 클릭하면 팝업 닫기
    if (selectedStar && selectedStar.id === star.id) {
      setSelectedStar(null);
      return;
    }

    // 조건: 별에 제목이나 내용이 있어야 팝업을 띄움
    if (star.title || star.content) {
      // 현재는 공개 여부 상관없이 팝업을 띄우도록 설정
      // (비공개 로직은 다음 단계에서 추가)
      setSelectedStar(star);
    } else {
      // 내용이 없는 별은 팝업을 띄우지 않음
      setSelectedStar(null);
    }
  };


  return (
    <div className="memorialspace-page">
      {/* 배경 별들 렌더링 */}
      {stars.map(star => (
        <img
          key={star.id}
          src={starImage}
          alt={star.isPublic ? "public star" : "private star"}
          // 여기를 수정합니다. `>` 문자를 제거합니다.
          className={`star
            ${star.isNew ? 'new-star' : ''}
            ${!star.isPublic ? 'private-star' : ''}
            ${(!star.title && !star.content) ? 'empty-star' : ''}`}
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            // 추모글이 없는 별은 클릭 커서 비활성화
            cursor: (!star.title && !star.content) ? 'default' : 'pointer',
          }}
          onClick={() => handleStarClick(star)}
        />
      ))}

      {/* 중앙 컨텐츠 - 달 이미지 및 문구 */}
      <div className="moon-container">
        <img src={moonImage} alt="Full Moon" className="moon-image" />
        <p className="intro-text">
          당신은 지금<br />기억이 별처럼 빛나는 곳으로 들어가고 있습니다.
        </p>
        <button onClick={() => setShowForm(true)} className="memorialspace-submit-button">
          추모글 작성
        </button>
      </div>

      {/* 추모글 내용 표시 팝업 (오버레이 및 중앙 정렬) */}
      {/* selectedStar가 있고, 내용이 있을 때만 팝업을 띄움 */}
      {selectedStar && (selectedStar.title || selectedStar.content || selectedStar.photos.length > 0) && (
        <div className="memorial-popup-overlay">
          <div className="memorial-popup">
            <button onClick={() => setSelectedStar(null)} className="popup-close-button">&times;</button>
            <h3>{selectedStar.title}</h3>
            <p className="popup-author">작성자: {selectedStar.author}</p>
            {/* whiteSpace: 'pre-wrap' 스타일 추가 */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{selectedStar.content}</p>
            {selectedStar.photos.length > 0 && (
              <div className="popup-photos">
                {selectedStar.photos.map((photo, index) => (
                  <img key={index} src={URL.createObjectURL(photo)} alt={`추모 사진 ${index + 1}`} className="popup-photo" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 추모글 작성 폼 (모달처럼 표시) */}
      <div className={`memorialspace-form-window ${showForm ? 'show' : ''}`}>
        <div className="window-header">
          <span className="window-title">추모글 작성</span>
          <button className="close-button" onClick={() => setShowForm(false)}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              className="memorialspace-input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="추모글 제목을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">작성자</label>
            <input
              type="text"
              id="author"
              className="memorialspace-input-field"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자 이름을 입력하세요"
              required // 작성자 필드 필수
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              className="memorialspace-textarea-field"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="고인과의 추억, 메시지 등을 자유롭게 작성해주세요..."
              rows="10"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="photos">사진 업로드</label>
            <input
              type="file"
              id="photos"
              className="memorialspace-file-input"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
            <p className="file-info">선택된 파일: {photos.length > 0 ? photos.map(file => file.name).join(', ') : '없음'}</p>
          </div>

          <div className="form-group privacy-options">
            <label>공개 여부</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                />
                공개
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={isPublic === false}
                  onChange={() => setIsPublic(false)}
                />
                비공개
              </label>
            </div>
          </div>
          {/* 비공개 선택 시 비밀번호 입력 필드 */}
          {!isPublic && (
            <div className="form-group">
              <label htmlFor="password">비밀번호 설정</label>
              <input
                type="password"
                id="password"
                className="memorialspace-input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요 (비공개 시)"
                required
              />
            </div>
          )}

          <button type="submit" className="memorialspace-submit-button">추모글 작성 완료</button>
        </form>
      </div>
    </div>
  );
}

export default MemorialSpace;