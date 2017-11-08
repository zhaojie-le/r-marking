var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mock数据
var combineUser = require('./routes/combineUser');
var combineRole = require('./routes/combineRole');
var combineResource = require('./routes/combineResource');
var combineAbtest = require('./routes/combineAbtest');
var combineAbtestCategory = require('./routes/combineAbtestCategory');
var combineToolBox = require('./routes/combineToolBox');

var app = express();
var preview = process.env.preview;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.use('/api/user', combineUser);
app.use('/api/role', combineRole);
app.use('/api/resource', combineResource);
app.use('/api/abtest-baseinfo', combineAbtest);
app.use('/api/abtest-category', combineAbtestCategory);
app.use('/api/sem-keyword', combineToolBox);

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