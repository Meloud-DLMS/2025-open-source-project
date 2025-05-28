from pydantic import BaseModel,EmailStr
from typing import Optional

User_SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) NOT NULL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    birth DATE,
    agree ENUM('Y', 'N') DEFAULT 'N',
    death ENUM('Y', 'N') DEFAULT 'N'
);
"""

class SignUpForm(BaseModel):
    user_id: str
    password: str
    name: str

FriendList = """
CREATE TABLE IF NOT EXISTS friend_list (
    user_id VARCHAR(50) NOT NULL,
    friend_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
"""

Email = """ 
    CREATE TABLE IF NOT EXISTS Email(
    `user_id` VARCHAR(50) NOT NULL,
    `recipient` VARCHAR(50) NOT NULL,
    `email_title` VARCHAR(50) NULL,
    `email_body` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`, `recipient`),
    CONSTRAINT `fk_email_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
"""

AccountList = """
    CREATE TABLE IF NOT EXISTS AccountList(
    `user_id` VARCHAR(50) NOT NULL,
    `site_name` VARCHAR(45) NOT NULL,
    `is_auto` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `is_deleted` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    PRIMARY KEY (`user_id`, `site_name`),
    CONSTRAINT `fk_account_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);"""

Will = """
    CREATE TABLE IF NOT EXISTS Will(
    `user_id` VARCHAR(50) NOT NULL,
    `friend_id` VARCHAR(50) NOT NULL,
    `will_title` VARCHAR(50) NULL,
    `will_body` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`, `friend_id`),
    INDEX `fk_will_friend_id_idx` (`friend_id` ASC) VISIBLE,
    CONSTRAINT `fk_will_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_will_friend_id`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);"""

Memorial = """
    CREATE TABLE IF NOT EXISTS Memorial (
    `user_id` VARCHAR(50) NOT NULL,
    `writer` VARCHAR(50) NOT NULL,
    `memorial_body` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`, `writer`),
    CONSTRAINT `fk_memorial_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);"""

QuestionList = """
CREATE TABLE IF NOT EXISTS question_list (
    question_num INT NOT NULL PRIMARY KEY,
    question_content VARCHAR(255)
);
"""

# AnswerList 테이블 수정
AnswerList = """
CREATE TABLE IF NOT EXISTS answer_list (
    question_num INT NOT NULL,
    answer_num INT NOT NULL,
    answer_content VARCHAR(50) NOT NULL,
    next_question INT,
    PRIMARY KEY (question_num, answer_num),
    CONSTRAINT fk_answer_question_num 
        FOREIGN KEY (question_num) 
        REFERENCES question_list (question_num),
    CONSTRAINT k_answer_next_question 
        FOREIGN KEY (next_question) 
        REFERENCES question_list (question_num)
);
"""

    
# --- Pydantic 모델 ---
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None