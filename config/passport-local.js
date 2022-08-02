const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const registerUser = require('../models/registerUser');

passport.use(
  new passportLocal({ usernameField: 'email' }, (email, password, done) => {
    registerUser.findOne({ email: email }, (error, userData) => {
      if (error) {
        console.log(`record not found`);
        return done(null, error);
      }
      if (!userData || userData.password !== password) {
        console.log(`password or user not match`);
        return done(null, false);
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

module.exports = passport;
