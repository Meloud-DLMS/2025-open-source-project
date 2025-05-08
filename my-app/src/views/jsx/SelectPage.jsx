import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUserFriends } from 'react-icons/fa';
import '../css/SelectPage.css';

export default function SelectPage() {
  const navigate = useNavigate();

  return (
    <div className="select-page">
      <header className="sp-navbar">
        <div className="sp-navbar__logo" onClick={() => navigate('/login')}>
          MELOUD
        </div>
        <nav className="sp-navbar__menu">
          <FaEnvelope
            className="sp-navbar__icon"
            title="메시지함"
            onClick={() => navigate('/messages')}
          />
          <FaUserFriends
            className="sp-navbar__icon"
            title="친구목록"
            onClick={() => navigate('/friend')}
          />
          <button
            className="sp-navbar__logout"
            onClick={() => navigate('/login')}
          >
            LOGOUT
          </button>
        </nav>
      </header>

      {/* — 메인 버튼 두 개 (동일 색상) */}
      <main className="sp-main">
        <button
          className="sp-main__btn"
          onClick={() => navigate('/my-data')}
        >
          My 데이터 관리
        </button>
        <button
          className="sp-main__btn"
          onClick={() => navigate('/post-data')}
        >
          사후 데이터 관리
        </button>
      </main>
    </div>
  );
}
