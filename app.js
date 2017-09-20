const express = require('express');
require('dotenv').config({ path: 'variables.env' });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('express-favicon');
const session = require('express-session');
const http = require('http');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const log = require('./libs/log')(module);
const app = express();
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./libs/mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
require('./models/user')
require('./helpers/passport');
const routes = require('./routes/index');
const errorHandler = require('./helpers/errorHandler');

app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), () => console.log(`App is running on port  ${config.get('port')}`));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));


app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('smth'));

app.options('*', cors())
app.use(expressValidator());


app.use(session({
  secret: "best game with the ball",
  key: 'Dwyane Wade',
  resave: false,
  saveUnitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use( (req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next()
})

app.use((req, res, next) =>{
  res.locals.currentUser = req.session.userId;
  next();
});


app.use('/', routes);
mongoose.Promise = global.Promise;
mongoose.connect;


app.use(errorHandler.flashValidationErrors);
