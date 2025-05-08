import React, { useState } from 'react';
import { FaArrowLeft, FaUserFriends, FaSearch, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/FriendPage.css';

export default function FriendPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('list');

  // 예시용 더미 데이터
  const friendsMock = [
    { name: '홍길동', birth: '1990-01-01' },
    { name: '이순신', birth: '1975-04-28' },
  ];
  const requestsMock = [
    { name: '강감찬', birth: '1985-07-15' },
  ];

  return (
    <div className="friend-page">
      <header className="friend-page__nav">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>친구 관리</h1>
      </header>

      <nav className="friend-page__tabs">
        <button
          className={tab === 'list' ? 'active' : ''}
          onClick={() => setTab('list')}
        >
          <FaUserFriends /> 친구목록
        </button>
        <button
          className={tab === 'search' ? 'active' : ''}
          onClick={() => setTab('search')}
        >
          <FaSearch /> 친구찾기
        </button>
        <button
          className={tab === 'request' ? 'active' : ''}
          onClick={() => setTab('request')}
        >
          <FaEnvelope /> 친구요청
        </button>
      </nav>

      <section className="friend-page__content">
        {tab === 'list' && (
          <div className="friend-list">
            {friendsMock.map((f) => (
              <div className="friend-card" key={f.name}>
                <div>
                  <h2>{f.name}</h2>
                  <p>생년월일: {f.birth}</p>
                  <p>{f.info}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'search' && (
          <div className="friend-search">
            <input type="text" placeholder="친구 이름 검색" />
            <button>검색</button>
          </div>
        )}

        {tab === 'request' && (
          <div className="friend-requests">
            {requestsMock.map((r) => (
              <div className="friend-card" key={r.name}>
                <div>
                  <h2>{r.name}</h2>
                  <p>생년월일: {r.birth}</p>
                </div>
                <div>
                  <button className="accept">수락</button>
                  <button className="decline">거절</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
);
}
