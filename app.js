var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//중요!
var index = require('./routes/index');
var user = require('./routes/user'); 
var contents = require('./routes/contents'); 
var comments = require('./routes/comments'); 
var users = require('./routes/users'); 

var app = express();

var cors = require('cors')();
app.use(cors);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index); 		//중요! (루트경로로 요청되면 ./routes/index로 처리)
app.use('/user', user);
app.use('/contents', contents);
app.use('/comments', comments);
app.use('/users', users); 	//중요! (users경로로 요청되면 ./routes/users)
							//위에 정의가 안된 경로는 index로 처리됨

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
