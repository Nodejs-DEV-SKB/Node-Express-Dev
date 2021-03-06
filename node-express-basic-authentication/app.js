var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req, res, next){
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if(!authHeader){
    var err = new Error('Unauthorized User !!!');
    err.status = 401;
    res.setHeader('WWW-Authenticate', 'Basic');
    next(err);
  }else{
    var authData = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var userName = authData[0];
    var password = authData[1];
    if(userName === 'admin' && password === '12345'){
      next();
    }else{
      var err = new Error('Unauthorized User !!!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }
  }
  next();
}

app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
