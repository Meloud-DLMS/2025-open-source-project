import React, { useState } from 'react';
import '../style/memorialspace.css';
import moonImage from '../../public/assets/moon.png';
import starImage from '../assets/images/공개별.png'; // 모든 별에 이 이미지 사용

// MOON 관련 상수들을 컴포넌트 외부에 정의하여 generateStar 함수가 접근 가능하게 합니다.
const MOON_CENTER_X_PERCENT = 50;
const MOON_RADIUS_PERCENT_X = 15;
const MOON_CENTER_Y_PERCENT = 50;
const MOON_RADIUS_PERCENT_Y = 20;

// 별 생성 로직 함수
const generateStar = (isNew = false, starData = {}) => {
    const size = Math.random() * 60 + 20; // 별 크기 (20px ~ 80px)

    let x, y;
    let attempts = 0;
    const MAX_ATTEMPTS = 50; // 최대 시도 횟수: 달 이미지와 겹치지 않는 위치를 찾기 위함

    do {
        x = Math.random() * 100;
        y = Math.random() * 100;

        // 달 이미지 영역 계산 (퍼센트 단위)
        const moonLeftBound = MOON_CENTER_X_PERCENT - MOON_RADIUS_PERCENT_X;
        const moonRightBound = MOON_CENTER_X_PERCENT + MOON_RADIUS_PERCENT_X;
        const moonTopBound = MOON_CENTER_Y_PERCENT - MOON_RADIUS_PERCENT_Y;
        const moonBottomBound = MOON_CENTER_Y_PERCENT + MOON_RADIUS_PERCENT_Y;

        // 현재 별 위치가 달 영역 안에 있는지 확인
        const isInMoonX = x >= moonLeftBound && x <= moonRightBound;
        const isInMoonY = y >= moonTopBound && y <= moonBottomBound;

        // 달 영역 밖에 있다면 루프 종료
        if (!(isInMoonX && isInMoonY)) {
            break;
        }
        attempts++;
    } while (attempts < MAX_ATTEMPTS);

    // 만약 여러 번 시도해도 달 영역 밖을 찾지 못하면 강제로 특정 영역에 배치
    if (attempts >= MAX_ATTEMPTS) {
        x = Math.random() * moonLeftBound; // 달 왼쪽에 배치
        y = Math.random() * 100;
    }

    return {
        id: Math.random(), // 고유 ID
        size: size, // 별 크기
        x: x, // x 좌표 (퍼센트)
        y: y, // y 좌표 (퍼센트)
        isNew: isNew, // 새로 생성된 별인지 여부
        title: starData.title || '', // 추모글 제목
        content: starData.content || '', // 추모글 내용
        author: starData.author || '', // 작성자
        photos: starData.photos || [], // 사진 파일 배열
        isPublic: starData.isPublic !== undefined ? starData.isPublic : true, // 공개 여부 (기본 공개)
        password: starData.password || '', // 비밀번호 (비공개 시)
    };
};

// 초기 별 데이터 (여기서 실제 저장된 별 데이터를 불러오는 백엔드 연동 로직이 필요)
const initialStars = [];

function MemorialSpace() {
    const [stars, setStars] = useState(initialStars); // 초기 별 데이터를 설정
    const [showForm, setShowForm] = useState(false); // 추모글 폼 표시 여부
    // 폼 입력 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태
    const [password, setPassword] = useState(''); // 비밀번호 설정 상태

    // 선택된 별의 데이터 (추모글 팝업에 표시될 내용)
    const [selectedStar, setSelectedStar] = useState(null);
    // 비밀번호 입력 팝업 관련 상태
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState(''); // 사용자가 입력한 비밀번호
    const [currentPrivateStar, setCurrentPrivateStar] = useState(null); // 현재 비밀번호를 입력해야 하는 비공개 별

    // 새로운 별을 생성하고 별 배열에 추가
    const addStar = () => {
        const newStar = generateStar(true, { // isNew: true로 설정하여 새로운 별 스타일 적용
            title: title,
            content: content,
            author: author,
            photos: photos,
            isPublic: isPublic,
            password: isPublic ? '' : password, // 공개면 비밀번호 없음, 비공개면 비밀번호 저장
        });
        setStars(prevStars => [...prevStars, newStar]); // 기존 별 배열에 새 별 추가
        console.log('새 별이 추가되었습니다:', newStar);
    };

    // 파일 입력 변경 핸들러
    const handleFileChange = (e) => {
        setPhotos([...e.target.files]); // 선택된 파일들을 photos 상태에 저장
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        // 필수 입력 필드 유효성 검사
        if (!title && !content && !author && photos.length === 0) {
            alert('제목, 내용, 작성자 또는 사진 중 최소 하나는 입력해야 합니다.');
            return;
        }
        if (!author) { // 작성자는 필수
            alert('작성자 이름을 입력해주세요.');
            return;
        }
        if (!isPublic && !password) { // 비공개인데 비밀번호가 없으면 경고
            alert('비공개 시 비밀번호를 설정해야 합니다.');
            return;
        }

        addStar(); // 새로운 별 추가 함수 호출

        alert('추모글이 성공적으로 작성되어 새로운 별이 추가되었습니다!');
        // 폼 초기화
        setTitle('');
        setContent('');
        setAuthor('');
        setPhotos([]);
        setIsPublic(true); // 기본값으로 초기화
        setPassword('');
        setShowForm(false); // 폼 닫기
    };

    // 별 클릭 핸들러: 별 클릭 시 추모글 팝업 표시 또는 비밀번호 팝업 표시
    const handleStarClick = (star) => {
        // 팝업이 이미 열려있고, 같은 별을 다시 클릭하면 팝업 닫기
        if (selectedStar && selectedStar.id === star.id) {
            setSelectedStar(null);
            return;
        }
        // 비밀번호 팝업이 이미 열려있고, 같은 별을 다시 클릭하면 팝업 닫기
        if (showPasswordPrompt && currentPrivateStar && currentPrivateStar.id === star.id) {
            setShowPasswordPrompt(false);
            setCurrentPrivateStar(null);
            setPasswordAttempt(''); // 입력 필드 초기화
            return;
        }


        if (star.isPublic) {
            // 공개 별이면 바로 내용 표시
            if (star.title || star.content || star.photos.length > 0) {
                setSelectedStar(star);
            } else {
                setSelectedStar(null); // 내용이 없으면 팝업 안 띄움
            }
            setShowPasswordPrompt(false); // 혹시 열려있을 비밀번호 팝업 닫기
        } else {
            // 비공개 별이면 비밀번호 입력 팝업 표시
            setShowPasswordPrompt(true);
            setCurrentPrivateStar(star); // 현재 비공개 별 저장
            setPasswordAttempt(''); // 입력 필드 초기화
            setSelectedStar(null); // 추모글 팝업이 혹시 열려있다면 닫기
        }
    };

    // 비밀번호 입력 팝업 제출 핸들러
    const handlePasswordSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        if (currentPrivateStar && passwordAttempt === currentPrivateStar.password) {
            // 비밀번호 일치
            setSelectedStar(currentPrivateStar); // 추모글 내용 표시
            setShowPasswordPrompt(false); // 비밀번호 팝업 닫기
            setCurrentPrivateStar(null); // 상태 초기화
            setPasswordAttempt(''); // 입력 필드 초기화
        } else {
            // 비밀번호 불일치
            alert('비밀번호가 올바르지 않습니다.');
            setPasswordAttempt(''); // 다시 입력하도록 필드 초기화
        }
    };


    return (
        <div className="memorialspace-page">
            {/* 배경 별들 렌더링 */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className={`star-container
                        ${star.isNew ? 'new-star-container' : ''}
                        ${!star.isPublic ? 'private-star-container' : ''}
                        ${(!star.title && !star.content && star.author === '') ? 'empty-star-container' : ''}`}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                    }}
                    onClick={() => handleStarClick(star)}
                >
                    <img
                        src={starImage} // ⭐ 모든 별은 starImage를 사용합니다.
                        alt={star.isPublic ? "공개 별" : "비공개 별"}
                        className="star-image"
                        style={{
                            width: star.size,
                            height: star.size,
                        }}
                    />
                    {/* 작성자가 있고, 내용이 있거나 공개인 경우에만 작성자 이름 표시 */}
                    {star.author && (star.title || star.content || star.isPublic) && (
                        <p className="star-author">{star.author}</p>
                    )}
                </div>
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
            {selectedStar && (selectedStar.title || selectedStar.content || selectedStar.photos.length > 0) && (
                <div className="memorial-popup-overlay">
                    {/* selectedStar.isPublic 값에 따라 클래스 추가 */}
                    <div className={`memorial-popup ${selectedStar.isPublic ? 'public-memorial-popup' : 'private-memorial-popup'}`}>
                        {/* 팝업 닫기 버튼 */}
                        <button onClick={() => setSelectedStar(null)} className="popup-close-button">&times;</button>
                        {/* 팝업 제목 */}
                        <h3>{selectedStar.title}</h3>
                        {/* 팝업 작성자 */}
                        <p className="popup-author">작성자: {selectedStar.author}</p>
                        {/* 팝업 내용 (pre-wrap 스타일 적용) */}
                        <p className="popup-content-text" style={{ whiteSpace: 'pre-wrap' }}>{selectedStar.content}</p>
                        {/* 팝업 사진들 */}
                        {selectedStar.photos.length > 0 && (
                            <div className="popup-photos">
                                {selectedStar.photos.map((photo, index) => (
                                    // URL.createObjectURL은 File 객체에만 유효합니다.
                                    // 만약 백엔드에서 이미지 URL을 받는다면 photo 자체가 URL이 될 수 있습니다.
                                    // 여기서는 임시로 File 객체로 가정합니다.
                                    <img key={index} src={URL.createObjectURL(photo)} alt={`추모 사진 ${index + 1}`} className="popup-photo" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 비밀번호 입력 팝업 */}
            {showPasswordPrompt && (
                <div className="memorial-popup-overlay"> {/* 오버레이 재사용 */}
                    {/* 비밀번호 입력 팝업은 자체적으로 다른 그림자/배경을 가질 수 있도록 password-prompt-popup 클래스를 유지 */}
                    <div className="memorial-popup password-prompt-popup">
                        <button onClick={() => { setShowPasswordPrompt(false); setCurrentPrivateStar(null); setPasswordAttempt(''); }} className="popup-close-button">&times;</button>
                        <h3>비공개 추모글입니다.</h3>
                        <p>비밀번호를 입력해주세요.</p>
                        <form onSubmit={handlePasswordSubmit} className="password-form">
                            <input
                                type="password"
                                className="memorialspace-input-field password-input"
                                value={passwordAttempt}
                                onChange={(e) => setPasswordAttempt(e.target.value)}
                                placeholder="비밀번호"
                                required
                                autoFocus // 팝업 열리면 바로 입력 포커스
                            />
                            <button type="submit" className="memorialspace-submit-button password-submit-button">확인</button>
                        </form>
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
                            multiple // 여러 파일 선택 가능
                            accept="image/*" // 이미지 파일만 선택 가능
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
                                required // 비공개 시 비밀번호 필수
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