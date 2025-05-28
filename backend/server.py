from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
from mysql.connector import Error
from core.database import get_db_connection, init_db
from core.models import User, UserInDB, Token, TokenData
from core.models import SignUpForm
# --- 설정 ---
SECRET_KEY = "YOUR_SECRET_KEY"  # 실제 서비스에서는 환경변수로 관리하세요
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- 비밀번호 해시 설정 ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- OAuth2 토큰 설정 ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- FastAPI 앱 초기화 ---
app = FastAPI()

# --- CORS 설정 (React 서버 연결 허용) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React, Vite 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Signup
@app.post("/join")
async def signup(form: SignUpForm):
    # 1. 중복 아이디 체크
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB 연결 실패")
    try:
        print("DB suceed")
        cur = conn.cursor(dictionary=True)
        cur.execute("SELECT * FROM users WHERE user_id=%s", (form.user_id,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")

        # 2. 비밀번호 해싱
        hashed_pw = pwd_context.hash(form.password)

        # 3. DB 저장
        cur.execute(
            "INSERT INTO users (user_id, full_name, hashed_password) VALUES (%s, %s, %s)",
            (form.user_id, form.name, hashed_pw)
        )
        conn.commit()
        return {"success": True}
    except Error as e:
        print("회원가입 에러:", e)
        raise HTTPException(status_code=500, detail="회원가입 중 오류 발생")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# --- 유틸 함수 ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user_from_db(username: str):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            user_data = cursor.fetchone()
            print(f"[DEBUG] DB에서 조회된 유저: {user_data}")
            if user_data:
                return UserInDB(**user_data)
        except Error as e:
            print(f"[ERROR] 사용자 조회 에러: {e}")
        finally:
            cursor.close()
            connection.close()
    else:
        print("[ERROR] DB 연결 실패")
    return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- 인증 관련 의존성 ---
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = get_user_from_db(token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# --- 로그인 엔드포인트 ---
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_from_db(form_data.username)
    if not user:
        print(f"[WARN] 사용자 없음: {form_data.username}")
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    print(f"[INFO] 로그인 성공: {user.username}")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- 로그인된 사용자 정보 가져오기 ---
@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# --- 테스트용 루트 경로 ---
@app.get("/")
def read_root():
    return {"message": "FastAPI 서버 정상 작동 중!"}

# --- 앱 시작 시 데이터베이스 초기화 ---
@app.on_event("startup")
async def startup_event():
    init_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


# source venv/bin/activate
