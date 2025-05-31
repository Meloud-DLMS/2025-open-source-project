from app.core.database import get_db_connection
from app.core.security import get_password_hash, verify_password
from app.core.models import SignUpForm, LoginForm
from fastapi import HTTPException

#아이디 중복 여부 확인인
async def is_user_id_taken(user_id: str) -> bool:
    conn = get_db_connection()
    if not conn:
        raise Exception("DB 연결 실패")
    try:
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM users WHERE user_id=%s", (user_id,))
        return cur.fetchone() is not None
    finally:
        cur.close()
        conn.close()

#회원가입
async def create_user(form: SignUpForm):
    hashed_pw = get_password_hash(form.password)
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (user_id, full_name, hashed_password) VALUES (%s, %s, %s)",
            (form.user_id, form.name, hashed_pw)
        )
        conn.commit()
    finally:
        cur.close()
        conn.close()

#로그인
async def authenticate_user(form: LoginForm) -> bool:
    conn = get_db_connection()
    if not conn:
        raise Exception("DB 연결 실패")

    try:
        cur = conn.cursor()
        cur.execute("SELECT hashed_password FROM users WHERE user_id=%s", (form.user_id,))
        result = cur.fetchone()

        if result is None:
            print("❌ 사용자 ID 없음")
            raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 일치하지 않습니다.")

        hashed_pw = result[0]
        print("✅ DB에서 가져온 해시:", hashed_pw)
        print("✅ 사용자가 입력한 비밀번호:", form.password)

        if not verify_password(form.password, hashed_pw):
            print("❌ 비밀번호 불일치")
            raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 일치하지 않습니다.")

        print("✅ 로그인 성공")
        return True
    finally:
        cur.close()
        conn.close()

        