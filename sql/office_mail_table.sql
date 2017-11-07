use restful;
set sql_safe_updates=0;

drop table officemail;

CREATE TABLE officemail (
    row_id INTEGER AUTO_INCREMENT,
    mail VARCHAR(100),
    phonenumber VARCHAR(20),
    dept INTEGER DEFAULT 0,
    signup_yn TINYINT default 0,
    PRIMARY KEY (row_id , mail)
);

insert into officemail(mail, phonenumber) values("testmail5@shinhan.com", "01094441993");

select * from officemail;
 
update officemail
set signup_yn = 0;

update officemail
set phonenumber = '01094441993';

 
delete from officemail where row_id is null;