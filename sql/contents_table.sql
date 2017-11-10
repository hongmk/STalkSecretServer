
use restful;

drop table contents;

CREATE TABLE contents (
    row_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    nicname VARCHAR(50) NOT NULL,
    board_id integer,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(5000) NOT NULL,
    comment_cnt INTEGER DEFAULT 0,
    like_cnt INTEGER DEFAULT 0,
    read_cnt INTEGER DEFAULT 0,
    delete_yn TINYINT DEFAULT 0,
    create_date DATETIME DEFAULT current_timestamp,
    last_modify_date DATETIME DEFAULT current_timestamp,
    delete_date DATETIME,
    PRIMARY KEY (row_id , user_id , nicname)
);

SELECT 
    *
FROM contents;

update
set
where nicname = STalk제작자





    
update contents
set like_cnt = 5, comment_cnt = 5 ;
