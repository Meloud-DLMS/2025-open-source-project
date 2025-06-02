# app/api/friends.py

from fastapi import APIRouter, HTTPException, Query, Depends, Body
from pydantic import BaseModel
from app.core.database import get_db_connection

router = APIRouter()

class FriendRequest(BaseModel):
    user_id: str
    friend_id: str

@router.post("/add-friend")
async def add_friend(request: FriendRequest):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB 연결 실패")

    try:
        cur = conn.cursor()
        
        # 이미 친구인지 확인
        cur.execute("SELECT 1 FROM friend_list WHERE user_id=%s AND friend_id=%s",
                    (request.user_id, request.friend_id))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="이미 친구입니다.")

        # 양방향 친구 관계 추가
        cur.execute("INSERT INTO friend_list (user_id, friend_id) VALUES (%s, %s)", 
                    (request.user_id, request.friend_id))
        cur.execute("INSERT INTO friend_list (user_id, friend_id) VALUES (%s, %s)", 
                    (request.friend_id, request.user_id))

        conn.commit()
        return {"message": "친구 추가 완료!"}
    finally:
        cur.close()
        conn.close()

    
@router.get("/friend-list")
def get_friend_list(user_id: str = Query(...)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB 연결 실패")
    try:
        cur = conn.cursor(dictionary=True)

        # 친구 ID 조회
        cur.execute("SELECT friend_id FROM friend_list WHERE user_id = %s", (user_id,))
        rows = cur.fetchall()
        if not rows:
            return []

        friend_ids = [row["friend_id"] for row in rows]
        format_strings = ','.join(['%s'] * len(friend_ids))

        # 친구 정보 가져오기
        cur.execute(f"""
            SELECT user_id, full_name 
            FROM users 
            WHERE user_id IN ({format_strings})
        """, tuple(friend_ids))

        friends_info = cur.fetchall()
        return friends_info
    finally:
        cur.close()
        conn.close()
    
class DeleteFriendRequest(BaseModel):
    user_id: str
    friend_id: str

@router.delete("/remove-friend")
async def remove_friend(request: DeleteFriendRequest = Body(...)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB 연결 실패")
    
    try:
        cur = conn.cursor()

        # 양방향 삭제
        cur.execute("DELETE FROM friend_list WHERE user_id=%s AND friend_id=%s", 
                    (request.user_id, request.friend_id))
        cur.execute("DELETE FROM friend_list WHERE user_id=%s AND friend_id=%s", 
                    (request.friend_id, request.user_id))

        conn.commit()
        return {"message": "친구 삭제 완료!"}
    finally:
        cur.close()
        conn.close()