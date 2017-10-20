var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var crypto = require('crypto');
var shasum = crypto.createHash('sha256');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));

//Cross Domain 이슈 대응 (CORS)
var cors = require('cors')();
app.use(cors);

var mysql = require('mysql');
//********** mysql connection **********
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'restful'
});
 
connection.connect();

//********** mongodb connection **********
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/restful';
var dbObj = null;
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to mongodb server");
  dbObj = db;
});

//회원정보관련
router.post('/user/login', function(req, res) { //로그인
	var user_id = req.body.user_id;
	var password = req.body.password;
	//res.send(JSON.stringify({user_id:user_id, password:password}));
	//res.send(JSON.stringify({}));
	connection.query('select count(1) AS cnt from user where user_id=? and password=?',[user_id, password],
	function(err, result, fields) {
		if(err){
			res.send(JSON.stringify(err));
		} else {
			if(result[0].cnt == 0) {
				res.send(result[0].cnt +JSON.stringify(result)+"아이디, 비밀번호를 다시 확인하세요.");
			} else {
				res.send(result[0].cnt +JSON.stringify(result)+"로그인성공");
			}
		}
	});
});

router.get('/user/auth/officemail', function(req, res) { //사내메일인증
	var officemail = req.query.officemail;
	var phonenumber = req.query.phonenumber;
	//res.send(JSON.stringify({mail:mail, phonenumber:phonenumber}));
	//res.send(JSON.stringify({}));
	connection.query('select count(1) AS cnt from officemail where mail=? and phonenumber=?',[officemail, phonenumber],
	function(err, result, fields) {
		if(err){
			res.send(JSON.stringify(err));
		} else {
			if(result[0].cnt == 0) {
				res.send(JSON.stringify({
					cnt:result[0].cnt,
					result:result,
					message:"메일인증실패 메일 및 번호를 다시확인해주세요."
				}));
			} else {
				res.send(result[0].cnt +JSON.stringify(result)+"메일인증성공");
			}
		}
	});
});

router.get('/user/auth/nicname', function(req, res) { //닉네임인증
	var nicname = req.query.nicname;
	//res.send(JSON.stringify({nicname:nicname}));
	//res.send(JSON.stringify({}));
	connection.query('select nicname from user where nicname=?',[nicname],
	function(err, result) {
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result)+"는 이미 존재합니다.");
		}
	});

});

router.post('/user', function(req, res) { //회원가입
	var user_id = req.body.user_id;
	var nicname = req.body.nicname;
	var password = req.body.password;
	var officemail = req.body.officemail;
	// res.send(JSON.stringify({id:id, password, mail:mail, nicname:nicname}));
	//res.send(JSON.stringify({}));
	connection.query('insert into user(user_id, nicname, password) values(?, ?, ?)',
						[user_id,nicname,req.body.password],
	function(err, result) {
		if(err){
			res.send(JSON.stringify(err));
		} else {
			//res.send(JSON.stringify(result));

			connection.query('update officemail set signup_yn=1 where mail=?',[req.body.officemail],
			function(err, result) {
				if(err){
					res.send(JSON.stringify(err));
				} else {
					res.send(JSON.stringify(result));
				}
			});
		}
	});

});

router.delete('/user', function(req, res) {
	var rowid = req.body.rowid;
	res.send(JSON.stringify({rowid:rowid}));
	//res.send(JSON.stringify({}));
});

router.get('/user', function(req, res) {
	// var id = req.query.id;
	// var password = req.query.password;
	// res.send(JSON.stringify({id:id, password}));
	//res.send(JSON.stringify({}));
	connection.query('select * from user', function(err, results, fields){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});
});

router.post('/user/find', function(req, res) {
	//id, nicname, mail, phonenumber

	var id = req.body.id;
	var mail = req.body.mail;
	var nicname = req.body.nicname;
	var phonenumber = req.body.phonenumber;
	res.send(JSON.stringify({id:id, mail:mail, nicname:nicname,phonenumber:phonenumber}));
	//res.send(JSON.stringify({}));
});

//닉네임관련

router.get('/user/nicname', function(req, res) {
	//rowid, nicname
	var rowid = req.query.rowid;
	var nicname = req.query.nicname;
	res.send(JSON.stringify({rowid:rowid, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

router.put('/user/nicname', function(req, res) {
	//rowid, nicname
	var rowid = req.body.rowid;
	var nicname = req.body.nicname;
	res.send(JSON.stringify({rowid:rowid, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

//비밀번호 관련
router.get('/user/password', function(req, res) {
	//nicname, password
	var nicname = req.query.nicname;
	var password	= req.query.password;

	res.send(JSON.stringify({nicname:nicname, password: password}));
	//res.send(JSON.stringify({}));
});

router.put('/user/password', function(req, res) {
	//rowid, id, password
	var rowid = req.body.rowid;
	var id = req.body.id;
	var password = req.body.password;
	res.send(JSON.stringify({rowid:rowid, id:id, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

//설정관련

router.get('/user/setting', function(req, res) {
	//rowid 
	var rowid = req.query.rowid;
	var rowid	= req.query.rowid;

	res.send(JSON.stringify({nicname:nicname, password: password}));
	//res.send(JSON.stringify({}));
});

router.put('/user/setting', function(req, res) {
	//rowid, alertAgree
	var rowid = req.body.rowid;
	var alertAgree = req.body.alertAgree;
	res.send(JSON.stringify({rowid:rowid, alertAgree:alertAgree}));
	//res.send(JSON.stringify({}));
});

///////////mongodb/////////////////////
router.get('/user/message', function(req, res) {
	console.log(req.query.sender_id);
	var messages = dbObj.collection('messages');
	var condition = {};
	if(req.query.sender_id != undefined)
		condition = {sender_id:req.query.sender_id};

	messages.find(condition).toArray(function(err, results){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});
});

var ObjectID = require('mongodb').ObjectID;

module.exports = router;