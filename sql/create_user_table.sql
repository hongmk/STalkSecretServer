create database restful;

use restful;

create table user(
id integer primary key auto_increment,
user_id varchar(100) NOT NULL unique,
nicname varchar(50) NOT NULL unique,
password varchar(100) NOT NULL,
signup_date datetime default NOW(),
withdraw_date datetime
);

drop table user


ALTER TABLE user ADD  officemail varchar(100);
ALTER TABLE user DROP  officemail;

ALTER TABLE user ADD  nicname varchar(20);
ALTER TABLE user MODIFY nicname varchar(40);

select * from user;
