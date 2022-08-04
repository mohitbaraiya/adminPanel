const express = require('express');
const passport = require('passport');
const routes = express.Router();
const userController = require('../controllers/userController');
const flash = require('connect-flash');

// for register
routes.get('/registerPage', userController.registerPage);
routes.post('/registerUser', userController.registerUser);

// for login
routes.get('/loginPage', userController.loginPage);
routes.post(
  '/loginUser',
  passport.authenticate('local', {
    failureRedirect: '/loginPage',
    successRedirect: '/',
    failureFlash: true,
  }),
  userController.loginUser
);

// for logout
routes.get('/logOut', userController.logoutUser);

module.exports = routes;
