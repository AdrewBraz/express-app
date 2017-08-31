const express = require('express');
require('dotenv').config({ path: 'variables.env' });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('express-favicon');
const session = require('express-session');
const http = require('http');
const path = require('path');
const config = require('./config');
const errorhandler = require('errorhandler');
const logger = require('morgan');
const log = require('./libs/log')(module);
const app = express();
const routes = require('./routes/index');
const mongoose = require('./libs/mongoose');
const cors = require('cors');

console.log(process.env.DATA)
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), () => console.log(`App is running on port  ${config.get('port')}`));

app.options('*', cors())
app.use(cors());

app.use(session({
  secret: "best game with the ball",
  resave: true,
  saveUnitialized: false
}));

app.use((req, res, next) =>{
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

app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status:  err.status,
    error: {}
  });
});