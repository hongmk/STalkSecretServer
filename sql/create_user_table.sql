use restful;

drop table user;

create table user(
id integer primary key auto_increment,
user_id text,
password text,
name text,
age integer
);

select * from user;
select * from user where user_id is null  ;

delete from user ;


create table user_login(
id integer primary key auto_increment,
user_real_id integer,
token text,
created_at DATETIME default current_timestamp
);

select * from user_login;

delete from user_login where id ='';