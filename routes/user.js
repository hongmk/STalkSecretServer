//회원정보관련
router.post('/user/login', function(req, res) {
	var id = req.body.id;
	var password = req.body.password;
	res.send(JSON.stringify({id:id, password}));
	//res.send(JSON.stringify({}));
});

router.get('/user/auth/mail', function(req, res) {
	var mail = req.query.mail;
	var phonenumber = req.query.phonenumber;
	res.send(JSON.stringify({mail:mail, phonenumber:phonenumber}));
	//res.send(JSON.stringify({}));
});

router.get('/user/auth/nicname', function(req, res) {
	var nicname = req.query.nicname;
	res.send(JSON.stringify({nicname:nicname}));
	//res.send(JSON.stringify({}));
});

router.post('/user', function(req, res) {
	var id = req.body.id;
	var password = req.body.password;
	var mail = req.body.mail;
	var nicname = req.body.nicname;
	res.send(JSON.stringify({id:id, password, mail:mail, nicname:nicname}));
	//res.send(JSON.stringify({}));
});

router.delete('/user', function(req, res) {
	var rowid = req.body.rowid;
	res.send(JSON.stringify({rowid:rowid}));
	//res.send(JSON.stringify({}));
});

router.get('/user', function(req, res) {
	var id = req.query.id;
	var password = req.query.password;
	res.send(JSON.stringify({id:id, password}));
	//res.send(JSON.stringify({}));
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
router.get('/user password', function(req, res) {
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

