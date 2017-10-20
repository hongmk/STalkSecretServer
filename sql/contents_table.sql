
use restful;

drop table contents;

CREATE TABLE contents (
    row_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    nicname VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(5000) NOT NULL,
    comment_cnt INTEGER,
    like_cnt INTEGER,
    read_cnt INTEGER,
    delete_yn TINYINT,
    create_date DATETIME DEFAULT NOW(),
    last_modify_date DATETIME,
    delete_date DATETIME,
    PRIMARY KEY (row_id , user_id , nicname)
);

SELECT 
    *
FROM
    contents;