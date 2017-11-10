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


router.get('/list/:board_id', function(req, res){
	var board_id = req.params.board_id;
	connection.query('select * from contents where board_id = ? and delete_yn = 0',[board_id],
		function(err, results, fields){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});
	//res.send(JSON.stringify({row_id:"1", nicname:"제작자"}));
	//res.send(JSON.stringify([]));
});

//글 1개 조회
router.get('/content/:content_id', function(req, res){

	var content_id = req.params.content_id;

	connection.query('select nicname, title, content, comment_cnt, last_modify_date from contents where row_id = ? and delete_yn = 0', [content_id],
		function(err, results, fields){
		if(err){
			res.send(JSON.stringify({result:"false", result_code:-1}));

		} else {
			if(results.length > 0 ) {

				res.send(JSON.stringify({	result:"true", 
											nicname:results[0].nicname, 
											title:results[0].title, 
											content:results[0].content, 
											comment_cnt:results[0].comment_cnt,
											like_cnt:results[0].like_cnt,
											last_modify_date:results[0].last_modify_date}));

			} else {
				res.send(JSON.stringify({result:"false", result_code:1}));
			}
		}
	});

	//res.send(JSON.stringify({row_id:row_id}));
	//res.send(JSON.stringify({}));
});


router.post('/', function(req, res) {
	//boardid, id, nicname, content
	var user_id = req.body.user_id;
	var nicname = req.body.nicname;
	var board_id = req.body.board_id;
	var title = req.body.title;
	var content = req.body.content;

	connection.query('insert into contents(user_id, nicname, board_id, title, content) values(?,?,?,?,?)',
						[user_id,nicname, board_id, title, content],
	function(err, result) {
		if(err){
			res.send(JSON.stringify({result:"false"}));
		} else {
			//res.send(JSON.stringify(result));
			res.send(JSON.stringify({result:"true", user_id:user_id, nicname:nicname, board_id:board_id, title:title, content:content}));
		}
	});

	
	//res.send(JSON.stringify({}));
});


//글수정
router.put('/content', function(req, res) {
	//contentid, content
	var content_id = req.body.content_id;
	var content = req.body.content;
	var last_modify_date = new Date();
	connection.query('update contents set content = ? , last_modify_date = ? where row_id = ?',[content, last_modify_date, content_id],
		function(err, result){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	});

	//res.send(JSON.stringify({content_id:content_id, content:content}));
	//res.send(JSON.stringify({}));
});

//글삭제
router.delete('/content', function(req, res) {
	//contentid
	var content_id = req.body.content_id;
	var last_modify_date = new Date();

	connection.query('update contents set delete_yn = ? , last_modify_date = ? where row_id = ?',[1, last_modify_date, content_id],
		function(err, result){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	});

	//res.send(JSON.stringify({content_id:content_id}));
	//res.send(JSON.stringify({}));
});

//사용자 작성글 리스트 조회
router.get('/contentlist', function(req, res){
	//nicname 
	var nicname = req.query.nicname;

	connection.query('select row_id, title, content, last_modify_date from contents where nicname = ? and delete_yn = 0',[nicname],
		function(err, results, fields){
		if(err){
			res.send(JSON.stringify({result:"false"}));
		} else {
			res.send(JSON.stringify(results));
		}
	});

	//res.send(JSON.stringify([]));
});

//글 Like
router.put('/content/like/:content_id', function(req, res) {
	//contentid, content
	var content_id = req.params.content_id;
	connection.query('update contents set like_cnt=like_cnt+1  where row_id = ?',[content_id],
		function(err, result){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(result));
		}
	});

	//res.send(JSON.stringify({content_id:content_id, content:content}));
	//res.send(JSON.stringify({}));
});


module.exports = router;