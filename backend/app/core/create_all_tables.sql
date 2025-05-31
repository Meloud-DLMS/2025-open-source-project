USE user_auth_db;

-- 회원관리
CREATE TABLE users (
    user_id VARCHAR(50) NOT NULL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    birth DATE,
    agree ENUM('Y', 'N') DEFAULT 'N',
    death ENUM('Y', 'N') DEFAULT 'N'
);


INSERT INTO users (user_id, full_name, hashed_password, birth, agree, death)
VALUES (
    'test@example.com',
    'Test User',
    '$2b$12$Yi/SoazghpOU3EAmT20qSO/oR14urcJxyzgmn8zm15qRTYfo/HgFq',
    '2003-04-17',
    'Y',
    'N'
);


-- 친구기능 
CREATE TABLE `user_auth_db`.`friend_list` (
  `user_id` VARCHAR(50) NOT NULL,
  `friend_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`, `friend_id`),
  INDEX `friend_id_idx` (`friend_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `friend_id`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    
-- 계정관리 
CREATE TABLE `user_auth_db`.`account_list` (
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
);

-- 메일
CREATE TABLE `user_auth_db`.`email` (
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
    
-- 유언장
CREATE TABLE `user_auth_db`.`will` (
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
    ON UPDATE NO ACTION);
    

-- 추모공간
CREATE TABLE `user_auth_db`.`memorial` (
  `user_id` VARCHAR(50) NOT NULL,
  `writer` VARCHAR(50) NOT NULL,
  `memorial_body` VARCHAR(255) NULL,
  PRIMARY KEY (`user_id`, `writer`),
  CONSTRAINT `fk_memorial_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user_auth_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- 챗복(질문)
CREATE TABLE `user_auth_db`.`question_list` (
  `question_num` INT NOT NULL,
  `question_content` VARCHAR(255) NULL,
  PRIMARY KEY (`question_num`));

-- 챗봇(답변)
CREATE TABLE `user_auth_db`.`answer_list` (
  `question_num` INT NOT NULL,
  `answer_num` INT NOT NULL,
  `answer_content` VARCHAR(50) NOT NULL,
  `next_question` INT NULL,
  PRIMARY KEY (`question_num`, `answer_num`),
  INDEX `k_answer_next_question_idx` (`next_question` ASC) VISIBLE,
  CONSTRAINT `fk_answer_question_num`
    FOREIGN KEY (`question_num`)
    REFERENCES `user_auth_db`.`question_list` (`question_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `k_answer_next_question`
    FOREIGN KEY (`next_question`)
    REFERENCES `user_auth_db`.`question_list` (`question_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
