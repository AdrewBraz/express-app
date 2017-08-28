const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware/middle');

//GET Home
router.get('/', (req, res, next) => {
  console.log(req.session.userId);
  return res.render('index', {title: 'Home'});
});

//POST HOME
router.post('/', (req, res, next) => {
  if( req.body.email && 
     req.body.name &&
     req.body.password &&
     req.body.confirmPassword &&
     req.body.favoriteTeam) {
       if(req.body.password !== req.body.confirmPassword ){
         let error = new Error('Passwords does not match');
         error.status = 400;
         return next(error);
       }
       let userData = {
         email: req.body.email,
         name: req.body.name,
         password: req.body.password,
         favoriteTeam: req.body.favoriteTeam
       };
       
       User.create(userData, (error, user) => {
         if(error){
           return next(error);
         } else {
             req.session.userId = user._id;
             return res.redirect('/profile');
         }
       })
       
     } else {
         let error = new Error('All fields are required!!!')
         error.status = 404;
         return  next(error);
      }
});

//POST Login
router.post('/login', function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, (error, user) => {
       if(error || !user){
         let err = new Error('Wrong email or password.');
         err.status = 401;
         return next(err);
       } else{
         req.session.userId = user._id;
         return res.redirect('profile');
       }
    }); 
  } else {
    let error = new Error('Email and password  are required.');
    error.status = 401;
    return next(error);
  }
})

//GET Profile
router.get('/profile', mid.reqLogin, (req, res, next) => {
  User.findById(req.session.userId)
      .exec(function(error, user){
        if(error){
          return next(error);
        } else{
          return res.render('profile', {title: 'Profile', name: user.name, team: user.favoriteTeam})
        }
      })
}) 

//GET About
router.get('/about', (req, res, next) => {
  return res.render('about', {title: 'About'});
});

//GET Login
router.get('/login', mid.logOut, (req, res, next) => {
  return res.render('login', {title: 'Log in'} )
})

//GET Logout
router.get('/logout', (req, res, next) => {
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      } else{
        return res.redirect('/');
      }
    })
  }
})

module.exports = router;




