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

router.get('/content/:row_id', function(req, res){
	var row_id = req.params.row_id;
	res.send(JSON.stringify({row_id:row_id}));
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
			res.send(JSON.stringify(err));
		} else {
			//res.send(JSON.stringify(result));
			res.send(JSON.stringify({result:"true", user_id:user_id, nicname:nicname, board_id:board_id, title:title, content:content}));
		}
	});

	
	//res.send(JSON.stringify({}));
});

router.get('/contents/content', function(req, res){
	//contentid, nicname
	var contentid = req.query.contentid;
	var nicname = req.query.nicname;
	res.send(JSON.stringify({contentid:contentid, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

router.put('/contents/content', function(req, res) {
	//contentid, content
	var contentid = req.body.contentid;
	var content = req.body.content;

	res.send(JSON.stringify({contentid:contentid, content:content}));
	//res.send(JSON.stringify({}));
});

router.delete('/contents/content', function(req, res) {
	//contentid
	var contentid = req.body.contentid;

	res.send(JSON.stringify({contentid:contentid}));
	//res.send(JSON.stringify({}));
});

router.get('/contents/contentlist', function(req, res){
	//사용자 작성글 리스트 조회
	//nicname 
	var nicname = req.query.nicname;
	res.send(JSON.stringify([]));
});

module.exports = router;