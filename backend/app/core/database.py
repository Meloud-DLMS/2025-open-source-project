import mysql.connector
from mysql.connector import Error
from .models import User_SCHEMA, FriendList, Email, AccountList, Will, Memorial, QuestionList, AnswerList

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='password'  ##################### mysql password 입력하세요!!!!!!!!!!!!!!!!!!!!!!!
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
                password='password',  ##################### mysql password 입력하세요!!!!!!!!!!!!!!!!!!!!!!!
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
            
            # testuser가 없으면 추가
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE user_id = %s", ("testuser",))
                _ = cursor.fetchone()  # 반드시 fetch로 결과를 소비
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
    except Error as e:
        print(f"데이터베이스 초기화 에러: {e}")
    finally:
        connection.close()

# uvicorn server:app --reload
# source venv/bin/activate
