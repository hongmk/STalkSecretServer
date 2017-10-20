var express = require('express');
var router = express.Router();

router.get('/comments/list', function(req, res){
	var contentid = req.body.contentid;
	res.send(JSON.stringify({contentid:contentid}) + JSON.stringify([]));
});

router.post('/comments', function(req, res){
	//contentid, id, nicname, comment
	var contentid = req.body.contentid;
	var id = req.body.id;
	var nicname = req.body.nicname;
	var comment = req.body.comment;

	res.send(JSON.stringify({contentid:contentid, id:id, nicname:nicname, comment:comment}));
	//res.send(JSON.stringify({}));
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

router.delete('/comments/list', function(req, res) {
	//해당 게시글의 모든 댓글삭제함
	//contentid 
	var contentid = req.body.contentid;

	res.send(JSON.stringify({contentid:contentid}));
	//res.send(JSON.stringify({}));
});

router.get('/comments/commentlist', function(req, res){
	//사용자 작성글 리스트 조회
	//nicname 
	var nicname = req.query.nicname;
	res.send(JSON.stringify({nicname:nicname}) + JSON.stringify([]));
});

module.exports = router;