const passport = require('passport');
const mongoose = require('../libs/mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());