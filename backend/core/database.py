import mysql.connector
from mysql.connector import Error

from .models import User_SCHEMA, FriendList, Email, AccountList, Will, Memorial, QuestionList, AnswerList

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='English124*'
        )
        if conn.is_connected():
            print("MySQL connection succeed")
            cursor = conn.cursor()
            db_name = "user_auth_db"
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            print(f"{db_name} Database is generated(or already exist)")
            cursor.close()
            conn = mysql.connector.connect(
                host='localhost',
                user='root',
                password='English124*',
                database=db_name
            )
            return conn
        else:
            print("MySQL server connection failed")
    except Error as e:
        print(f"MySQL connection Error: {e}")
        return None

def init_db():
    connection = get_db_connection()
    if connection:
        try:
            # 테이블 생성
            for sql in [User_SCHEMA, QuestionList, AnswerList, FriendList, Email, AccountList, Will, Memorial]:
                with connection.cursor() as cursor:
                    cursor.execute(sql)
            # testuser 추가
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE username = 'testuser'")
                _ = cursor.fetchone()  # 결과를 반드시 소비
                if not _:
                    cursor.execute("""
                        INSERT INTO users (username, email, full_name, hashed_password, disabled)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (
                        "testuser",
                        "test@example.com",
                        "Test User",
                        "$2b$12$Yi/SoazghpOU3EAmT20qSO/oR14urcJxyzgmn8zm15qRTYfo/HgFq",
                        False
                    ))
            connection.commit()
        except Error as e:
            print(f"데이터베이스 초기화 에러: {e}")
            connection.rollback()
        finally:
            connection.close()
