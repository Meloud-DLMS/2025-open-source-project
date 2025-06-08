from fastapi import FastAPI, Request,Depends
from fastapi import FastAPI,Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.api.auth import get_current_user
from app.core.database import init_db,AccountShow,delete_account_by_site_url,update_is_deleted_by_site_url,save_star_to_db,MemorialShow
# from app.core.models import StarCreate

# 순환참조 방지: 각 router를 직접 가져오기
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.users import router as login_router
from app.api.friends import router as friends_router

class StarCreate(BaseModel):
    star_id: str
    title: str | None = None
    content: str | None = None
    author: str
    isPublic: bool
    password: str | None = None
    x: float
    y: float
    size: float


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
app.include_router(friends_router, prefix="/friends", tags=["friends"])

@app.get("/")
def read_root():
    return {"message": "FastAPI 서버 정상 작동 중!"}

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get('/accountShow')
def AutoAccountShow():
    print("dataFetched")
    data = AccountShow()
    return data

@app.get('/MemorialShow')
def AutoMemorialShow(current_user: str = Depends(get_current_user)):
    print("dataFetched")
    data = MemorialShow(current_user)
    return {
        "data": data
    }

# # 3. 문자열 기준으로 레코드를 삭제하는 엔드포인트
@app.post("/deleteAccountByString")
async def delete_account_by_string(request: Request):
    data = await request.json()
    site_url = data.get("site_URL")
    # 여기서 분리된 함수 호출
    result = delete_account_by_site_url(site_url)
    return result

@app.post("/requestAccountByString")
async def request_account_by_string(request: Request):
    data = await request.json()
    site_url = data.get("site_URL")
    # 입력값 검증
    if not site_url or not isinstance(site_url, list):
        return JSONResponse(content={"status": "fail", "message": "Invalid input"}, status_code=400)

    # DB 업데이트 함수 호출 (is_deleted는 함수 내부에서 직접 'Y'로 처리)
    result = update_is_deleted_by_site_url(site_url)
    return JSONResponse(content=result)

@app.post("/api/stars")
async def create_star(
    star: StarCreate,
    current_user: str = Depends(get_current_user)  # user_id 추출
):
    save_star_to_db(
        star_id=star.star_id,
        title=star.title,
        content=star.content,
        author=star.author,
        is_public=star.isPublic,
        password=star.password,
        x=star.x,
        y=star.y,
        size=star.size,
        user_id=current_user  # user_id 전달
    )
    return {"result": "success"}

@app.post("/logout")
async def logout(response: Response):
        response.delete_cookie("access_token")
        return {"status": "succcess"}

@app.post("/login")
async def login(response: Response):
    response.set_cookie(
        key="access_token",
        value="your_token_value",
        httponly=True,
        secure=True,      # 개발 환경에서는 False, 운영 환경에서는 True
        samesite="none",    # 개발 환경에서는 'lax' 또는 'none' 시도 가능, 실제로는 'none'은 secure=True 필요
        path="/"
    )
    return {"status": "success"}



# source venv/bin/activate
# uvicorn server:app --reload