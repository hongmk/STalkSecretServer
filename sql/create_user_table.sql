use restful;

drop table user;

CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name text,
    age integer,
    PRIMARY KEY (id)
);