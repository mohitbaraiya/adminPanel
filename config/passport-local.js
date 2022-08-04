const { name } = require('ejs');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const passportLocal = require('passport-local').Strategy;

const registerUser = require('../models/registerUser');

passport.use(
  new passportLocal({ usernameField: 'email' }, (email, password, done) => {
    registerUser.findOne({ email: email }, (error, userData) => {
      if (error) {
        console.log(`record not found`);
        return done(null, error);
      }
      if (!userData) {
        console.log(`user not exists`);
        return done(null, false, { message: 'User not exists...' });
      }
      const comparePassword = bcrypt.compareSync(password, userData.password);
      if (!comparePassword) {
        console.log(`wrong password`);
        return done(null, false, { message: 'Incorrect Password' });
      }
      return done(null, userData);
    });
  })
);

passport.serializeUser((userData, done) => {
  return done(null, userData.id);
});

passport.deserializeUser((id, done) => {
  registerUser.findById(id, (error, userData) => {
    if (error) {
      console.log(`deserialize error`);
      return done(null, error);
    }
    return done(null, userData);
  });
});

passport.checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_message', 'You must Login to view this page');
  return res.redirect('/loginPage');
};

let logUser = {
  username: 'hello User !',
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  if (!req.isAuthenticated()) {
    res.locals.user = logUser;
  }
  return next();
};

module.exports = passport;
