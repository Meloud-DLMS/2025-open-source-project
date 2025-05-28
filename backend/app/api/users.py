from fastapi import APIRouter, HTTPException
from app.core.models import SignUpForm
from app.src.user_service import create_user, is_username_taken

router = APIRouter()

@router.post("/join")
async def signup(form: SignUpForm):
    if await is_username_taken(form.user_id):
        raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")
    await create_user(form)
    return {"success": True}
