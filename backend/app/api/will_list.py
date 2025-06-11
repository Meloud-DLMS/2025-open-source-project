from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from typing import Literal, List
from mysql.connector import MySQLConnection
from app.core.database import get_db

router = APIRouter(prefix="/wills", tags=["wills"])

class WillResponse(BaseModel):
    user_id: str
    friend_id: str
    will_title: str
    will_body: str
    is_writing: Literal["Y", "N"]

@router.get("/list", response_model=List[WillResponse])
async def get_wills(user_id: str, is_writing: Literal["Y", "N"], db: MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = """
        SELECT user_id, friend_id, will_title, wi   ll_body, is_writing
        FROM Will
        WHERE user_id = %s AND is_writing = %s
        ORDER BY friend_id DESC
        """
        cursor.execute(query, (user_id, is_writing))
        rows = cursor.fetchall()
        return rows
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()

