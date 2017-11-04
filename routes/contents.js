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
router.get('/content/:row_id', function(req, res){
	var row_id = req.params.row_id;

	connection.query('select * from contents where row_id = ? and delete_yn = 0',[row_id],
		function(err, results, fields){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results[0]));
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
			res.send(JSON.stringify(err));
		} else {
			//res.send(JSON.stringify(result));
			res.send(JSON.stringify({result:"true", user_id:user_id, nicname:nicname, board_id:board_id, title:title, content:content}));
		}
	});

	
	//res.send(JSON.stringify({}));
});

router.get('/content/:content_id', function(req, res){
	//contentid, nicname
	var content_id = req.params.content_id;
	var nicname = req.query.nicname;
	res.send(JSON.stringify({content_id:content_id, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

router.put('/content', function(req, res) {
	//contentid, content
	var content_id = req.body.content_id;
	var content = req.body.content;

	res.send(JSON.stringify({content_id:content_id, content:content}));
	//res.send(JSON.stringify({}));
});

router.delete('/content', function(req, res) {
	//contentid
	var content_id = req.body.content_id;

	res.send(JSON.stringify({content_id:content_id}));
	//res.send(JSON.stringify({}));
});

router.get('/contentlist', function(req, res){
	//사용자 작성글 리스트 조회
	//nicname 
	var nicname = req.query.nicname;
	res.send(JSON.stringify([]));
});

module.exports = router;