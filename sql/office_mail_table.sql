use restful;

drop table officemail;

CREATE TABLE officemail (
    row_id INTEGER AUTO_INCREMENT,
    mail VARCHAR(100),
    phonenumber VARCHAR(20),
    signup_yn TINYINT,
    PRIMARY KEY (row_id , mail)
);

insert into officemail(mail, phonenumber) values("testmail3@shinhan.com", "01033332222");

select * from officemail;