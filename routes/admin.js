const express = require('express');
const passport = require('passport');
const routes = express.Router();
const adminController = require('../controllers/adminController');
const flash = require('connect-flash');

// for register
routes.get('/registerPage', passport.adminAuth, adminController.registerPage);
routes.post('/registerUser', adminController.registerUser);

// for login
routes.get('/loginPage', passport.adminAuth, adminController.loginPage);
routes.post(
  '/loginUser',
  passport.authenticate('local', {
    failureRedirect: '/loginPage',
    successRedirect: '/',
    failureFlash: true,
  }),
  adminController.loginUser
);

// for logout
routes.get('/logOut', adminController.logoutUser);
routes.get('/profilePage', passport.checkAuth, adminController.profilePage);
routes.get('/passwordPage', passport.checkAuth, adminController.passwordPage);
routes.post('/changePassword', adminController.changePassword);

module.exports = routes;
