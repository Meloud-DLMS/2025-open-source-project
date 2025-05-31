from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import init_db

# 순환참조 방지: 각 router를 직접 가져오기
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.users import router as login_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"]
)

# 라우터 등록
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(login_router, prefix="/login", tags=["login"])  # prefix는 선택

@app.get("/")
def read_root():
    return {"message": "FastAPI 서버 정상 작동 중!"}

@app.on_event("startup")
async def startup_event():
    init_db()

# source venv/bin/activate
# uvicorn server:app --reload