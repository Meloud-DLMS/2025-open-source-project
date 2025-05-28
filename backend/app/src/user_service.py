from app.core.database import get_db_connection
from app.core.security import get_password_hash
from app.core.models import SignUpForm

async def is_username_taken(user_id: str) -> bool:
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
