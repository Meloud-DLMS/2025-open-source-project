from fastapi import APIRouter

router = APIRouter()

@router.get("/login")
async def login():
    return {"msg": "로그인 API"}
