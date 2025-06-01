from fastapi import APIRouter, HTTPException, Query
from app.core.models import SignUpForm, LoginForm
from app.src.user_service import create_user, is_user_id_taken, authenticate_user
from app.core.database import get_db_connection

router = APIRouter()

@router.post("/join")
async def signup(form: SignUpForm):
    if await is_user_id_taken(form.user_id):
        raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")
    await create_user(form)
    return {"success": True}

@router.post("/login")
async def login(form: LoginForm):
    success = await authenticate_user(form)
    if success:
        # ✅ 사용자 이름 조회
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            cur.execute("SELECT full_name FROM users WHERE user_id = %s", (form.user_id,))
            row = cur.fetchone()
            if row:
                full_name = row[0]
            else:
                full_name = "사용자"  # 혹시 full_name이 없을 경우 기본값
        finally:
            cur.close()
            conn.close()

        # ✅ full_name 포함해서 응답
        return {
            "message": "로그인 성공",
            "user_id": form.user_id,
            "full_name": full_name
        }

    raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 일치하지 않습니다.")

@router.get("/search")
async def search_users(query: str = "", exclude_user_id: str = ""):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB 연결 실패")
    
    try:
        cur = conn.cursor(dictionary=True)
        cur.execute(
            """
            SELECT user_id, full_name
            FROM users
            WHERE (user_id LIKE %s OR full_name LIKE %s)
              AND user_id != %s
            """,
            (f"%{query}%", f"%{query}%", exclude_user_id)
        )
        results = cur.fetchall()
        return {"results": results}
    finally:
        cur.close()
        conn.close()

