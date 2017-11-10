var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var crypto = require('crypto');
var shasum = crypto.createHash('sha256');

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(__dirname+'/public'));

//Cross Domain 이슈 대응 (CORS)
var mysql = require('mysql');
//********** mysql connection **********
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'restful'
});
 
connection.connect();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/restful';
var dbObj = null;
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to mongodb server");
  dbObj = db;
});

var ObjectID = require('mongodb').ObjectID;


/* GET users listing. */
/////////////////////회원가입 및 로그인 구현///////////////////////////
var crypto  = require('crypto');

router.post('/',function(req,res){
	var password = req.body.password;
	var officemail = req.body.officemail;
	var phonenumber = req.body.phonenumber;
	var user_dept = req.body.user_dept;
	var hash = crypto.createHash('sha256').update(password).digest('base64');

	connection.query('insert into users(user_id, nicname, password, user_dept) values(?, ?, ?, ?)',
		[req.body.user_id, req.body.nicname, hash, user_dept],
		function(insert_err, insert_result) {
			if(insert_err){
				res.send(JSON.stringify(insert_err));
			} else {

				connection.query('update officemail set signup_yn = ? where mail=? and phonenumber=?',[1, officemail, phonenumber],
				function(update_err, update_result) {
					if(update_err){
						res.send(JSON.stringify({
							result:"false",
							insert_result:"true",
							update_result:"false",
							mail:officemail,
							phone:phonenumber,
							db_result:update_result,
							message:"회원등록 성공 / 메일가입정보 등록 실패"
						}));
					} else {
						res.send(JSON.stringify({
							result:"true",
							insert_result:"true",
							update_result:"true",
							message:"회원가입완료"
						}));
					}
				});
			}
		});

});

//사내메일인증
router.get('/auth/officemail', function(req, res) { 
	var officemail = req.query.officemail;
	var phonenumber = req.query.phonenumber;

	
	//기존에 미가입 회원만 가입하도록 함

	connection.query('select signup_yn, dept from officemail where mail=? and phonenumber=?',[officemail, phonenumber],
	function(err, result, fields) {
		if(err){
			res.send(JSON.stringify(err));
		} else {
			if(result.length == 0) {
				res.send(JSON.stringify({
					result:"false",
					result_code:-1,
					dept:0,
					message:"메일인증실패 메일 및 전화번호를 다시확인해주세요."
				}));

			} else if(result[0].signup_yn == 1) {
				res.send(JSON.stringify({
					result:"false",
					result_code:1,
					dept:0,
					message:"이미등록된 사용자입니다."
				}));

			} else {
				res.send(JSON.stringify({
					result:"true",
					result_code:0,
					dept:result[0].dept,
					message:"메일인증성공"
				}));
			}
		}
	});
});


var jwt = require('json-web-token');

router.post('/login',function(req,res){
	var password = req.body.password;
	var hash = crypto.createHash('sha256').update(password).digest('base64');

	connection.query('select row_id, nicname, user_dept from users where user_id = ? and password = ?', [req.body.user_id, hash], 
		function(err, results, fields) {
			if(err) {
				res.send(JSON.stringify(err));
			} else {
				if(results.length > 0) {
					//대상있음 -> 로그인성공
					var nicname = results[0].nicname;
					var user_dept = results[0].user_dept;

					var cur_date = new Date();
					var settingAddHeaders = {
						payload: {
							"iss":"shinhan",
							"aud":"mobile",
							"iat":cur_date.getTime(),
							"typ":"/online/transactionstatus/v2",
							"request":{
								"myTransactionId":req.body.user_id,
								"merchantTransctionId":hash,
								"status":"SUCCESS"
							}
						},
						header:{
							kid:'abcdefghijklmnopqrstuvwxyz1234567890'
						}
					};
					var secret = "SHINHANMOBILETOPSECRET!!!!";

					//위에서 SET한 정보로 토큰생성
					jwt.encode(secret, settingAddHeaders, 
						function(err, token){
							if(err) {
								res.send(JSON.stringify(err));
							} else {
								//토큰이 너무 길기때문에 변화가 있는 부분만 잘라서 사용
								var tokens = token.split(".");

								//토큰을 user_login 테이블에 저장함
								connection.query('insert into login_token(user_id, token) values(?,?)', [results[0].row_id, tokens[2]] , 
									function(err,result) {
										if(err) {
											res.send(JSON.stringify(err));
										} else {
											res.send(JSON.stringify( {
												result:true,
												nicname:nicname,
												user_dept:user_dept,
												token:tokens[2],
												db_result:result

											}));
										}
									});
							}
						});

				} else {
					//대상없음->로그인실패
					res.send(JSON.stringify({result:false}));
				}
			}
		});
});
///////////////////////////////////////////////////////////

//닉네임인증
router.get('/auth/nicname', function(req, res) { 
	var nicname = req.query.nicname;
	connection.query('select count(1) AS cnt from users where nicname=?',[nicname],
	function(err, result) {
		if(err){
			res.send(JSON.stringify({
				result:"false",
				result_code:-1,
				message:"닉네임 검증도중 시스템오류 발생. 다시시도하시기 바랍니다."
			}));
		} else {
			if(result[0].cnt==0) {
				res.send(JSON.stringify({
					result:"true",
					result_code:0,
					message:"등록가능한 닉네임입니다."
				}));
			} else {
				res.send(JSON.stringify({
					result:"false",
					result_code:1,
					message:"이미등록된 닉네임입니다."
				}));
			}
		}
	});

});

//ID인증
router.get('/auth/user_id', function(req, res) { 
	var user_id = req.query.user_id;
	connection.query('select count(1) AS cnt from users where user_id=?',[user_id],
	function(err, result) {
		if(err){
			res.send(JSON.stringify({
				result:"false",
				result_code:-1,
				message:"ID 검증도중 시스템오류 발생. 다시시도하시기 바랍니다."
			}));
		} else {
			if(result[0].cnt==0) {
				res.send(JSON.stringify({
					result:"true",
					result_code:1,
					message:"등록가능한 ID입니다."
				}));
			} else {
				res.send(JSON.stringify({
					result:"false",
					result_code:1,
					message:"이미등록된 ID입니다."
				}));
			}
		}
	});

});


//기존암호 검증
router.get('/auth/password', function(req, res) { 
	var user_id = req.query.user_id;
	var password = req.query.password;
	var hash = crypto.createHash('sha256').update(password).digest('base64');

	connection.query('select count(1) AS cnt from users where user_id=? and password = ?',[user_id, hash],
	function(err, result) {
		if(err){
			res.send(JSON.stringify({
				result:"false",
				result_code:-1
			}));
		} else {
			if(result[0].cnt==0) {
				res.send(JSON.stringify({
					result:"false",
					result_code:-1
				}));
			} else {
				res.send(JSON.stringify({
					result:"true",
					result_code:1
				}));
			}
		}
	});

});

router.put('/password', function(req, res) {
	//rowid, nicname
	var user_id  = req.body.user_id;
	var password = req.body.password;
	var new_password = req.body.new_password;
	var hash = crypto.createHash('sha256').update(password).digest('base64');
	var new_hash = crypto.createHash('sha256').update(new_password).digest('base64');

	connection.query('update users set password = ? where user_id = ? and password = ?',[new_hash, user_id, hash],
		function(err, result) {
			if(err){
				res.send(JSON.stringify({
					result:"false",
					dbresult:result
				}));
			} else {
				
				res.send(JSON.stringify({
					result:"true",
					pw:hash,
					new_pw:new_hash,
					dbresult:result
				}));

			}
	});
});

router.put('/nicname', function(req, res) {
	//rowid, nicname
	var user_id = req.body.user_id;
	var nicname = req.body.nicname;
	var new_nicname = req.body.new_nicname;

	connection.query('update users set nicname =? where user_id = ? and nicname = ?',[new_nicname, user_id, nicname],
		function(users_update_err, users_update_result) {
			if(users_update_err){
				res.send(JSON.stringify({
					result:"false"
				}));
			} else {
				connection.query('update contents set nicname = ? where user_id = ? and nicname = ?',[new_nicname, user_id, nicname],
					function(contents_update_err, contents_update_result) {
						if(contents_update_err){
							res.send(JSON.stringify({
								result:"false"
							}));
						} else {
							var comment = dbObj.collection('comments');
							var condition = {};
							var newvalue  = {};
							if(nicname != undefined && new_nicname !=undefined) {
								condition = {nicname:nicname};
								newvalue  = {$set: {nicname:new_nicname}};
								comment.updateMany(condition, newvalue, function(comments_update_err, comments_update_result){
									if(comments_update_err){
										res.send(JSON.stringify({
											result:"false"
										}));
									} else {
										res.send(JSON.stringify({
											result:"true",
											nicname:nicname,
											newnicname:new_nicname,
											dbresult:comments_update_result
										}));
									}
								});
							}

						}
				});

			}
	});

	//res.send(JSON.stringify({rowid:rowid, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

//현재 비밀번호 확인
router.get('/password', function(req, res) {
	//nicname, password
	var nicname = req.query.nicname;
	var password	= req.query.password;

	res.send(JSON.stringify({nicname:nicname, password: password}));
	//res.send(JSON.stringify({}));
});

//비밀번호 변경
router.put('/password', function(req, res) {
	//rowid, id, password
	var rowid = req.body.rowid;
	var id = req.body.id;
	var password = req.body.password;
	res.send(JSON.stringify({rowid:rowid, id:id, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

//알림설정
router.put('/setting', function(req, res) {
	//rowid, alertAgree
	var rowid = req.body.rowid;
	var alertAgree = req.body.alertAgree;
	res.send(JSON.stringify({rowid:rowid, alertAgree:alertAgree}));
	//res.send(JSON.stringify({}));
});


module.exports = router;
