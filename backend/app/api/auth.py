from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.core.models import Token, TokenData, LoginForm
from app.src.user_service import authenticate_user
from typing import Optional

SECRET_KEY = "your_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/token", response_model=Token)
async def login_for_access_token(
    response: Response,  # 쿠키 설정을 위해 Response 객체 추가
    form_data: OAuth2PasswordRequestForm = Depends()
):
    login_form = LoginForm(user_id=form_data.username, password=form_data.password)
    if not await authenticate_user(login_form):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="아이디 또는 비밀번호가 일치하지 않습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": login_form.user_id})

    # ✅ 쿠키에 토큰을 저장 (HTTP-Only, Secure 옵션 권장)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,   # JavaScript에서 접근 불가 → XSS 방지
        secure=True,     # HTTPS 환경에서만 전송 (개발 환경에서는 False로 설정 가능)
        samesite="none",  # CSRF 방지 옵션
        path="/",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    # 필요시 JSON에도 반환 (프론트에서 직접 저장할 경우)
    return {"access_token": access_token, "token_type": "bearer"}

# JWT 토큰을 쿠키에서 추출하는 함수
def get_token_from_cookie(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="쿠키에 access_token이 없습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token

# 인증된 사용자 추출 (쿠키에서 토큰 추출)
async def get_current_user(request: Request):
    token = get_token_from_cookie(request)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    return token_data.user_id

# 보호된 엔드포인트 예시
@router.get("/me")
async def read_users_me(current_user: str = Depends(get_current_user)):
    return {"user_id": current_user}
