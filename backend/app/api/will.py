from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Literal
from mysql.connector import MySQLConnection
from app.core.database import get_db
from app.api.auth import get_current_user 
import pymysql


router = APIRouter(prefix="/wills", tags=["wills"])

# 👇 요청 바디 스키마 정의
class WillCreateRequest(BaseModel):
    user_id: str
    friend_id: str
    will_title: str
    will_body: str
    is_writing: Literal["Y", "N"]

@router.post("/save")
async def save_will(will: WillCreateRequest, db: MySQLConnection = Depends(get_db)):
    try:
        print(f"[DEBUG] Request payload: {will.dict()}")
        cursor = db.cursor()
        print("[DEBUG] Cursor created")

        # ✅ (1) 유저 존재 여부 확인
        cursor.execute("SELECT 1 FROM users WHERE user_id = %s", (will.user_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail=f"user_id '{will.user_id}' not found in users table")

        # ✅ (2) 친구 존재 여부 확인
        cursor.execute("SELECT 1 FROM users WHERE user_id = %s", (will.friend_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail=f"friend_id '{will.friend_id}' not found in users table")

        # ✅ (3) 본격적인 INSERT 실행
        query = """
        INSERT INTO Will (user_id, friend_id, will_title, will_body, is_writing)
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            will_title = VALUES(will_title),
            will_body = VALUES(will_body),
            is_writing = VALUES(is_writing)
        """
        print("[DEBUG] Executing SQL...")
        cursor.execute(query, (
            will.user_id,
            will.friend_id,
            will.will_title,
            will.will_body,
            will.is_writing
        ))  
        print("[DEBUG] SQL executed successfully")

        db.commit()
        print("[DEBUG] Commit successful")

        return {"message": "Will saved successfully"}

    except Exception as e:
        db.rollback()
        print(f"[ERROR] DB Exception occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save will: {str(e)}")

    finally:
        cursor.close()
        print("[DEBUG] Cursor closed")




@router.put("/wills/update/{friend_id}")
def update_will(friend_id: str, payload: dict, current_user: dict = Depends(get_current_user)):
    conn = pymysql.connect(host='localhost', user='root', password='1234', db='yourdb', charset='utf8mb4')
    try:
        with conn.cursor() as cursor:
            # 1. 유언장 존재 여부 확인
            cursor.execute("""
                SELECT * FROM Will
                WHERE user_id=%s AND friend_id=%s AND is_writing='Y'
            """, (current_user['id'], friend_id))
            result = cursor.fetchone()
            if not result:
                raise HTTPException(status_code=404, detail="Draft not found")

            # 2. 수정 쿼리 실행
            cursor.execute("""
                UPDATE Will
                SET will_title=%s, will_body=%s, is_writing=%s
                WHERE user_id=%s AND friend_id=%s AND is_writing='Y'
            """, (
                payload['will_title'], payload['will_body'], payload['is_writing'],
                current_user['id'], friend_id
            ))
            conn.commit()
        return {"message": "Updated successfully"}
    finally:
        conn.close()