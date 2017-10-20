create database restful;

use restful;

drop table user;

CREATE TABLE user (
    row_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    nicname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    alert_recive_yn TINYINT,
    app_token TEXT,
    signup_date DATETIME DEFAULT NOW(),
    last_modify_date DATETIME,
    withdraw_date DATETIME,
    PRIMARY KEY (row_id , user_id , nicname)
);

select * from user;

SELECT * 
  FROM USER_CONSTRAINTS 
 WHERE TABLE_NAME = 'user';