var express = require('express');
var router = express.Router();

router.get('/contents/list', function(req, res){
	var boardid = req.query.boardid;
	res.send(JSON.stringify([]));
});

router.get('/contents', function(req, res){
	var id = req.query.id;
	res.send(JSON.stringify({id:id}));
	//res.send(JSON.stringify({}));
});


router.post('/contents', function(req, res) {
	//boardid, id, nicname, content
	var boardid = req.body.boardid;
	var id = req.body.id;
	var nicname = req.body.nicname;
	var content_title = req.body.title;
	var content = req.body.content;

	res.send(JSON.stringify({boardid:boardid, id:id, nicname:nicname, content_title:content_title, content:content}));
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