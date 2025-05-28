import React, { useState, useEffect } from 'react';
import '../style/memorialspace.css'; // CSS 파일 임포트
import moonImage from '../assets/images/달.png'; // 달 이미지 경로 (public 폴더 기준)
import starImage from '../assets/images/별.png'; // 별 이미지 경로 (public 폴더 기준)

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
    generateStar(false, {
        title: '우리 강아지 별이',
        content: '별아, 하늘에서도 행복하게 뛰어놀렴. 항상 기억할게.',
        author: '별이 엄마',
        isPublic: true,
    }),
    generateStar(false, {
        title: '소중한 선생님께',
        content: '선생님의 가르침 잊지 않겠습니다. 편안히 잠드소서.',
        author: '제자 일동',
        isPublic: true,
    }),
];


function MemorialSpace() {
    const [stars, setStars] = useState(initialStars); // 초기 별 데이터를 설정
    const [showForm, setShowForm] = useState(false); // 추모글 폼 표시 여부
    // 폼 입력 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [password, setPassword] = useState(''); // 비밀번호 설정 상태

    // 선택된 별의 데이터 (추모글 팝업에 표시될 내용)
    const [selectedStar, setSelectedStar] = useState(null);

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
        setIsPublic(true);
        setPassword('');
        setShowForm(false); // 폼 닫기
    };

    // 별 클릭 핸들러: 별 클릭 시 추모글 팝업 표시
    const handleStarClick = (star) => {
        // 팝업이 이미 열려있고, 같은 별을 다시 클릭하면 팝업 닫기
        if (selectedStar && selectedStar.id === star.id) {
            setSelectedStar(null);
            return;
        }

        // 별에 제목이나 내용이 있어야 팝업을 띄움
        if (star.title || star.content) {
            // 비공개 별 처리 (현재는 비밀번호 입력 없이 그냥 띄움 - 추후 비밀번호 입력 로직 추가 예정)
            // if (!star.isPublic) {
            //   alert('이 추모글은 비공개입니다. 비밀번호를 입력해야 합니다.');
            //   // 여기에 비밀번호 입력 모달 등을 띄우는 로직 추가
            //   return;
            // }
            setSelectedStar(star); // 선택된 별 상태 업데이트 -> 팝업 표시
        } else {
            // 내용이 없는 별은 팝업을 띄우지 않음
            setSelectedStar(null);
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
                        // 커서는 이제 star-container에 의해 제어됩니다.
                    }}
                    onClick={() => handleStarClick(star)} // 컨테이너에 클릭 이벤트 적용
                >
                    <img
                        src={starImage}
                        alt={star.isPublic ? "공개 별" : "비공개 별"}
                        className="star-image" // 별 이미지 자체에 대한 클래스
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
            {/* selectedStar가 있고, 내용이 있을 때만 팝업을 띄움 (사진이 있으면 띄움) */}
            {selectedStar && (selectedStar.title || selectedStar.content || selectedStar.photos.length > 0) && (
                <div className="memorial-popup-overlay">
                    <div className="memorial-popup">
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