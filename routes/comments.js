var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var crypto = require('crypto');
var shasum = crypto.createHash('sha256');

require('date-utils');
var dateTime = new Date();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));


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


router.get('/list/:content_id', function(req, res){
	var content_id = req.params.content_id;
	//console.log(req.query.sender_id);
	var comment = dbObj.collection('comments');
	var condition = {};
	if(content_id != undefined)
		condition = {content_id:content_id};

	comment.find(condition).toArray(function(err, results){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});
	//res.send(JSON.stringify({contentid:contentid}) + JSON.stringify([]));
});

router.get('/count/:content_id', function(req, res){
	var content_id = req.params.content_id;
	//console.log(req.query.sender_id);
	var comment = dbObj.collection('comments');
	var condition = {};
	if(content_id != undefined)
		condition = {content_id:content_id};

	comment.count(condition, function(err, numOfDocs) {
		if(err){
			res.send(JSON.stringify(err));
		} else {

			res.send(JSON.stringify({
				result:"true",
				count:numOfDocs,
				param:content_id
			}));
		}
  
	});

});


router.post('/', function(req, res){
	//contentid, id, nicname, comment
	var content_id = req.body.content_id;
	var nicname = req.body.nicname;
	var comment = req.body.comment;
	var delete_yn = 0;
	var delete_date ="";
	var create_date = dateTime.toFormat('YYYY-MM-DD HH24:MI:SS');
	var comment_obj = {content_id:content_id, 
						nicname:nicname, 
						comment:comment, 
						delete_yn:delete_yn, 
						create_date:create_date,
						delete_date:delete_date};
	var comment = dbObj.collection('comments');
	comment.save(comment_obj, function(err, result){

		if (err) {
			res.send(JSON.stringify(err));

		} else {
			//해당글 댓글 건수에 1추가
			connection.query('update contents set comment_cnt=comment_cnt+1  where row_id = ?',[content_id],
				function(err, result){
				if(err){
					res.send(JSON.stringify(err));
				} else {
					res.send(JSON.stringify(result));
				}
			});
		}
	});

});

router.put('/comments', function(req, res){
	//contentid, nicname, comment
	var contentid = req.body.contentid;
	var nicname = req.body.nicname;
	var comment = req.body.comment;

	res.send(JSON.stringify({contentid:contentid, nicname:nicname, comment:comment}));
	//res.send(JSON.stringify({}));
});

router.delete('/comments', function(req, res){
	//contentid, commentid
	var contentid = req.body.contentid;
	var commentid = req.body.commentid;

	res.send(JSON.stringify({contentid:contentid, commentid:commentid}));
	//res.send(JSON.stringify({}));
});

router.delete('/list', function(req, res) {
	//해당 게시글의 모든 댓글삭제함
	//contentid 
	var content_id = req.body.content_id;

	var comment = dbObj.collection('comments');
	var condition = {};
	
	condition = {content_id:content_id};
	
	comment.find(condition).toArray(function(err, results){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});

	//res.send(JSON.stringify({contentid:contentid}));
	//res.send(JSON.stringify({}));
});

router.get('/commentlist', function(req, res){
	//사용자 작성댓글 리스트 조회
	//nicname 
	var nicname = req.query.nicname;
	//console.log(req.query.sender_id);
	var comment = dbObj.collection('comments');
	var condition = {};
	
	condition = {nicname:nicname};
	

	comment.find(condition).toArray(function(err, results){
		if(err){
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});


	//res.send(JSON.stringify({nicname:nicname}) + JSON.stringify([]));
});

module.exports = router;