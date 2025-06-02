import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import '../style/Home.css';
import '../style/Friends.css';

export default function FriendsList({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  // 👇 fetchFriends를 밖으로 뺍니다.
  const fetchFriends = async () => {
    try {
      const res = await fetch(`http://localhost:8000/friends/friend-list?user_id=${username}`);
      if (!res.ok) {
        throw new Error('서버 응답 오류');
      }
      const data = await res.json();
      setFriends(data);
    } catch (error) {
      console.error('친구 목록을 불러오지 못했습니다:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchFriends();
    }
  }, [username]);

  // 👇 친구 삭제 핸들러 함수 추가
  const handleDeleteFriend = async (friendId) => {
    try {
      const response = await fetch("http://localhost:8000/friends/remove-friend", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: username,
          friend_id: friendId
        }),
      });

      if (response.ok) {
        alert("친구가 삭제되었습니다.");
        fetchFriends(); // 목록 새로고침
      } else {
        const err = await response.json();
        alert("삭제 실패: " + err.detail);
      }
    } catch (error) {
      alert("에러 발생: " + error.message);
    }
  };

  return (
    <div className="page-background">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
        username={username}
      />

      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      <div style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2 className="page-title">Friend List</h2>
        <ul className="friend-list">
          {friends.length === 0 ? (
            <p>친구가 없습니다.</p>
          ) : (
            friends.map((friend) => (
              <li key={friend.user_id} className="friend-card">
                <p>{friend.full_name}</p>
                <p>{friend.user_id}</p>
                <button onClick={() => handleDeleteFriend(friend.user_id)}>delete</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
