var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'STalkSecretServer' });
});

router.post('/user/login', function(req, res) {
	// var id = req.body.id;
	// var pw = req.body.pw;
	// res.send(JSON.stringify({id:id, pw:pw}));
	res.send(JSON.stringify({}));
});

router.post('/user', function(req, res){
	// var id = req.body.id;
	// var pw = req.body.pw;
	// res.send(JSON.stringify({id:id, pw:pw}));
	res.send(JSON.stringify({}));
});

router.get('/user', function(req, res) {
	//var rowid = req.query.rowid;
	//res.send(JSON.stringify({rowid:rowid}));
	res.send(JSON.stringify({}));
});

router.put('/user', function(req, res){
	// var rowid = req.body.rowid;
	// var id = req.body.id;
	// var pw = req.body.pw;
	// res.send(JSON.stringify({rowid:rowid, id:id, pw:pw}));
	res.send(JSON.stringify({}));
});

router.delete('/user', function(req, res){
	//var rowid = req.body.rowid;
	//res.send(JSON.stringify({rowid:rowid}));
	res.send(JSON.stringify({}));
});

router.get('/user/list', function(req, res){
	res.send(JSON.stringify([]));
});

module.exports = router;
