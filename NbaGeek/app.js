var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('express-favicon');
var session = require('express-session');
var http = require('http');
var path = require('path');
var config = require('./config');
var errorhandler = require('errorhandler');
var logger = require('morgan');
var log = require('./libs/log')(module);
var app = express();
var routes = require('./routes/index');
var mongoose = require('./libs/mongoose');
var cors = require('cors');
var HttpError = require('./error').HttpError;

app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
  console.log("App is running on port " + config.get('port'))
})

app.options('*', cors())
app.use(cors());

app.use(session({
  secret: "best game with the ball",
  resave: true,
  saveUnitialized: false
}));

app.use(function(req, res, next){
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(favicon());
if(app.get('env') == 'development'){
  app.use(logger('dev'));
} else{
  app.use(logger('default'));
}

app.use(bodyParser());
app.use(bodyParser.urlencoded({extendded: false}));
app.use(cookieParser('smth'));

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
;

app.use('/', routes);

mongoose.connect;

app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status:  err.status,
    error: {}
  });
});