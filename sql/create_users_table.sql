create database restful;

set sql_safe_updates=0;

use restful;

drop table users;

delete from users;

CREATE TABLE users (
    row_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    nicname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_dept INTEGER DEFAULT 0,
    alert_recive_yn TINYINT DEFAULT 1,
    app_token TEXT,
    signup_date DATETIME DEFAULT NOW(),
    last_modify_date DATETIME DEFAULT NOW(),
    withdraw_date DATETIME,
    PRIMARY KEY (row_id, user_id , nicname),
    UNIQUE KEY (user_id, nicname)
);

select * from users;

update users
set user_dept = 1;

create table login_token(
row_id integer primary key auto_increment,
user_id integer,
token text,
created_at DATETIME default current_timestamp
);


select * from login_token;