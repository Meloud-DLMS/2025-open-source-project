// pages/memorialspace.jsx
import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import '../style/memorialspace.css';
import moonImage from '../../public/assets/moon.png';
import starImage from '../assets/images/공개별.png';

const MOON_CENTER_X_PERCENT = 50;
const MOON_RADIUS_PERCENT_X = 15;
const MOON_CENTER_Y_PERCENT = 50;
const MOON_RADIUS_PERCENT_Y = 20;

const generateStar = (isNew = false, starData = {}) => {
    const size = Math.random() * 60 + 20;
    let x, y;
    let attempts = 0;
    const MAX_ATTEMPTS = 50;
    do {
        x = Math.random() * 100;
        y = Math.random() * 100;
        const moonLeftBound = MOON_CENTER_X_PERCENT - MOON_RADIUS_PERCENT_X;
        const moonRightBound = MOON_CENTER_X_PERCENT + MOON_RADIUS_PERCENT_X;
        const moonTopBound = MOON_CENTER_Y_PERCENT - MOON_RADIUS_PERCENT_Y;
        const moonBottomBound = MOON_CENTER_Y_PERCENT + MOON_RADIUS_PERCENT_Y;
        const isInMoonX = x >= moonLeftBound && x <= moonRightBound;
        const isInMoonY = y >= moonTopBound && y <= moonBottomBound;
        if (!(isInMoonX && isInMoonY)) break;
        attempts++;
    } while (attempts < MAX_ATTEMPTS);
    if (attempts >= MAX_ATTEMPTS) {
        x = Math.random() * moonLeftBound;
        y = Math.random() * 100;
    }
    return {
        id: Math.random(),
        size,
        x,
        y,
        isNew,
        title: starData.title || '',
        content: starData.content || '',
        author: starData.author || '',
        photos: starData.photos || [],
        isPublic: starData.isPublic !== undefined ? starData.isPublic : true,
        password: starData.password || '',
    };
};

const initialStars = [];

function MemorialSpace({ isLoggedIn, setIsLoggedIn, username }) {
    const [stars, setStars] = useState(initialStars);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [password, setPassword] = useState('');
    const [selectedStar, setSelectedStar] = useState(null);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [currentPrivateStar, setCurrentPrivateStar] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const addStar = () => {
        const newStar = generateStar(true, {
            title,
            content,
            author,
            photos,
            isPublic,
            password: isPublic ? '' : password,
        });
        setStars(prevStars => [...prevStars, newStar]);
        alert('추모글이 성공적으로 작성되어 새로운 별이 추가되었습니다!');
        setTitle('');
        setContent('');
        setAuthor('');
        setPhotos([]);
        setIsPublic(true);
        setPassword('');
        setShowForm(false);
    };

    const handleFileChange = (e) => {
        setPhotos([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title && !content && !author && photos.length === 0) {
            alert('제목, 내용, 작성자 또는 사진 중 최소 하나는 입력해야 합니다.');
            return;
        }
        if (!author) {
            alert('작성자 이름을 입력해주세요.');
            return;
        }
        if (!isPublic && !password) {
            alert('비공개 시 비밀번호를 설정해야 합니다.');
            return;
        }
        addStar();
    };

    const handleStarClick = (star) => {
        if (selectedStar?.id === star.id) {
            setSelectedStar(null);
            return;
        }
        if (showPasswordPrompt && currentPrivateStar?.id === star.id) {
            setShowPasswordPrompt(false);
            setCurrentPrivateStar(null);
            setPasswordAttempt('');
            return;
        }
        if (star.isPublic) {
            setSelectedStar(star.title || star.content || star.photos.length ? star : null);
            setShowPasswordPrompt(false);
        } else {
            setShowPasswordPrompt(true);
            setCurrentPrivateStar(star);
            setPasswordAttempt('');
            setSelectedStar(null);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (currentPrivateStar && passwordAttempt === currentPrivateStar.password) {
            setSelectedStar(currentPrivateStar);
            setShowPasswordPrompt(false);
            setCurrentPrivateStar(null);
            setPasswordAttempt('');
        } else {
            alert('비밀번호가 올바르지 않습니다.');
            setPasswordAttempt('');
        }
    };

    return (
        <div className="memorialspace-page">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isLoggedIn={isLoggedIn}
                handleLogin={() => setIsLoggedIn(true)}
                handleLogout={() => setIsLoggedIn(false)}
                username={username}
            />
            <header className="home-header" style={{ zIndex: 1000}}>
                <div className="logo" onClick={() => window.location.href = '/'}>MELOUD</div>
                <button className="profile-button" onClick={() => setIsSidebarOpen(true)}>Profile</button>
            </header>

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
                        src={starImage}
                        alt={star.isPublic ? "공개 별" : "비공개 별"}
                        className="star-image"
                        style={{ width: star.size, height: star.size }}
                    />
                    {star.author && (star.title || star.content || star.isPublic) && (
                        <p className="star-author">{star.author}</p>
                    )}
                </div>
            ))}

            <div className="moon-container">
                <img src={moonImage} alt="Full Moon" className="moon-image" />
                <p className="intro-text">
                    당신은 지금<br />기억이 별처럼 빛나는 곳으로 들어가고 있습니다.
                </p>
                <button onClick={() => setShowForm(true)} className="memorialspace-submit-button">
                    추모글 작성
                </button>
            </div>

            {selectedStar && (
                <div className="memorial-popup-overlay">
                    <div className={`memorial-popup ${selectedStar.isPublic ? 'public-memorial-popup' : 'private-memorial-popup'}`}>
                        <button onClick={() => setSelectedStar(null)} className="popup-close-button">&times;</button>
                        <h3>{selectedStar.title}</h3>
                        <p className="popup-author">작성자: {selectedStar.author}</p>
                        <p className="popup-content-text" style={{ whiteSpace: 'pre-wrap' }}>{selectedStar.content}</p>
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

            {showForm && (
                <div className="memorialspace-form-window show">
                    <div className="window-header">
                        <span className="window-title">추모글 작성</span>
                        <button className="close-button" onClick={() => setShowForm(false)}>&times;</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">제목</label>
                            <input id="title" className="memorialspace-input-field" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">작성자</label>
                            <input id="author" className="memorialspace-input-field" value={author} onChange={e => setAuthor(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">내용</label>
                            <textarea id="content" className="memorialspace-textarea-field" value={content} onChange={e => setContent(e.target.value)} rows="10" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photos">사진 업로드</label>
                            <input type="file" id="photos" className="memorialspace-file-input" onChange={handleFileChange} multiple accept="image/*" />
                        </div>
                        <div className="form-group privacy-options">
                            <label>공개 여부</label>
                            <label><input type="radio" name="privacy" value="public" checked={isPublic} onChange={() => setIsPublic(true)} /> 공개</label>
                            <label><input type="radio" name="privacy" value="private" checked={!isPublic} onChange={() => setIsPublic(false)} /> 비공개</label>
                        </div>
                        {!isPublic && (
                            <div className="form-group">
                                <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" className="memorialspace-input-field" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        )}
                        <button type="submit" className="memorialspace-submit-button">추모글 작성 완료</button>
                    </form>
                </div>
            )}

            {showPasswordPrompt && (
                <div className="memorial-popup-overlay">
                    <div className="memorial-popup password-prompt-popup">
                        <button onClick={() => { setShowPasswordPrompt(false); setCurrentPrivateStar(null); setPasswordAttempt(''); }} className="popup-close-button">&times;</button>
                        <h3>비공개 추모글입니다.</h3>
                        <p>비밀번호를 입력해주세요.</p>
                        <form onSubmit={handlePasswordSubmit} className="password-form">
                            <input type="password" className="memorialspace-input-field password-input" value={passwordAttempt} onChange={e => setPasswordAttempt(e.target.value)} required />
                            <button type="submit" className="memorialspace-submit-button password-submit-button">확인</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MemorialSpace;