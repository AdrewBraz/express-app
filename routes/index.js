const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware/middle');
const userController = require('../controllers/userController')

//GET Home
router.get('/', (req, res, next) => {
  req.flash('info', "flash finally works, hih")
  return res.render('index', {title: 'Home'});
});

router.get('/register', userController.register)
router.post('/register', userController.validateRegister, userController.registerPost)

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
// router.get('/profile', (req, res, next) => {
//   User.findById(req.session.userId)
//       .exec(function(error, user){
//         if(error){
//           return next(error);
//         } else{
//           return res.render('profile', {title: 'Profile', name: user.name, team: user.favoriteTeam})
//         }
//       })
// }) 

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




