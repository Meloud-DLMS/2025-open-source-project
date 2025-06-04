import mysql.connector
from mysql.connector import Error
from .models import User_SCHEMA, FriendList, Email, AccountList, Will, Memorial, QuestionList, AnswerList

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='English124*'  ##################### mysql password 입력하세요!!!!!!!!!!!!!!!!!!!!!!!
        )
        if conn.is_connected():
            print("MySQL connection succeed")
            cursor = conn.cursor()
            db_name = "user_auth_db"
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            print(f"{db_name} Database is generated(or already exist)")
            cursor.close()
            conn2 = mysql.connector.connect(
                host='localhost',
                user='root',
                password='English124*',  ##################### mysql password 입력하세요!!!!!!!!!!!!!!!!!!!!!!!
                database=db_name
            )
            return conn2
        else:
            print("MySQL server connection failed")
            return None
    except Error as e:
        print(f"MySQL connection Error: {e}")
        return None

def init_db():
    connection = get_db_connection()
    if not connection:
        print("Connection Failed")
        return
    try:
        for sql in [User_SCHEMA, FriendList, Email, AccountList, Will, Memorial, QuestionList, AnswerList]:
            with connection.cursor() as cursor:
                cursor.execute(sql)
            
            # 2. testuser가 없으면 추가
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE user_id = %s", ("testuser",))
            _ = cursor.fetchone()
            if not _:
                cursor.execute("""
                    INSERT INTO users (user_id, full_name, hashed_password)
                    VALUES (%s, %s, %s)
                """, (
                    "testuser",
                    "Test User",
                    "$2b$12$Yi/SoazghpOU3EAmT20qSO/oR14urcJxyzgmn8zm15qRTYfo/HgFq"
                ))
        connection.commit()

        # 3. AccountList 테이블에 데이터 추가
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM AccountList WHERE user_id = %s", ("testuser",))
            _ = cursor.fetchone()
            cursor.fetchall()
            if not _:
                cursor.execute("""
                    INSERT INTO AccountList (user_id, site_URL, site_name, is_auto, is_deleted, note)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    "testuser",
                    "eis.cbnu.ac.kr",
                    "충북대학교",
                    "Y",
                    "N",
                    " "
                ))
                connection.commit()
                cursor.execute("""
                    INSERT INTO AccountList (user_id, site_URL, site_name, is_auto, is_deleted, note)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    "testuser",
                    "accounts.kakao.com",
                    "(주)카카오",
                    "N",
                    "Y",
                    "민원처리 시 불이익 발생 웹사이트"
                ))
                connection.commit()
                cursor.execute("""
                    INSERT INTO AccountList (user_id, site_URL, site_name, is_auto, is_deleted, note)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    "testuser",
                    "baemin.com",
                    "(주)우아한형제들",
                    "N",
                    "Y",
                    "개인정보 미수집 웹사이트"
                ))
                connection.commit()
                cursor.execute("""
                    INSERT INTO AccountList (user_id, site_URL, site_name, is_auto, is_deleted, note)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    "testuser",
                    "card.nonghyup.com",
                    "NH농협카드",
                    "N",
                    "Y",
                    "민원처리 시 불이익 발생 웹사이트"
                ))
        connection.commit()
    except Error as e:
        print(f"데이터베이스 초기화 에러: {e}")
    finally:
        connection.close()

# uvicorn server:app --reload
# source venv/bin/activate

def AccountShow():
    connection = get_db_connection()
    if not connection:
        return []
    try:
        with connection.cursor(dictionary=True) as cursor:  # dictionary=True로 하면 dict로 반환
            cursor.execute("SELECT * FROM AccountList WHERE user_id = %s", ("testuser",))
            results = cursor.fetchall()  # 여러 행을 리스트로 반환
            return results
    except Error as e:
        print(f"AccountShow Error: {e}")
        return []
    finally:
        connection.close()

def delete_account_by_site_url(site_url: str) -> dict:

    if not site_url:
        return {"status": "fail", "message": "No site_URL provided"}

    connection = get_db_connection()
    if not connection:
        return {"status": "fail", "message": "DB connection failed"}

    try:
        with connection.cursor() as cursor:
            sql = "DELETE FROM AccountList WHERE site_URL = %s"
            cursor.execute(sql, (site_url,))
            connection.commit()
            deleted_count = cursor.rowcount
        return {"status": "success", "deleted_count": deleted_count}
    except Error as e:
        print(f"Delete Error: {e}")
        return {"status": "fail", "message": str(e)}
    finally:
        connection.close()

# uvicorn server:app --reload
# source venv/bin/activate