const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pathController = require('../controllers/pathController')

//GET Home
router.get('/', pathController.home);

router.get('/about', pathController.about);
router.get('/login', pathController.login);

router.get('/register', userController.register)
router.post('/register', 
  userController.validateRegister,
  userController.registerPost,
  authController.login
)

//POST Login

router.get('/profile', userController.profile)

//GET About


//GET Login


router.post('/login', authController.login)

//GET Logout
router.get('/logout', authController.logout);

module.exports = router;




