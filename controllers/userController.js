const registerUser = require('../models/registerUser');
const bcrypt = require('bcryptjs');
// for register functionality

module.exports.registerPage = (req, res) => {
  res.render('registerUser');
};

module.exports.registerUser = async (req, res) => {
  let registerrecord = await registerUser.findOne({ email: req.body.email });

  if (registerrecord) {
    console.log(`email or username already exists`);
    req.flash(
      'error_message',
      'account already exists please log in to continue'
    );
    return res.redirect('back');
  }

  {
    let hashedpwd = await bcrypt.hash(req.body.password, 10);
    let record = await registerUser.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedpwd,
    });

    if (!record) {
      console.log(`error to register user`);
      req.flash('error_message', 'register error please try again !!');
      return res.redirect('back');
    }

    console.log(`register successfully`);
    req.flash(
      'success_message',
      'registered successfully. please login to continue !!'
    );
    return res.redirect('/loginPage');
  }
};

// for login functionality

module.exports.loginPage = (req, res) => {
  res.render('loginUser');
};

module.exports.loginUser = (req, res) => {
  // registerUser.findOne({ email: req.body.email }, (error, loginRecord) => {
  //   if (error) {
  //     console.log(`error in loginUser functionality`);
  //     return false;
  //   }
  //   if (!loginRecord) {
  //     console.log(`wrong email or username `);
  //     return res.redirect('/loginPage');
  //   } else if (loginRecord) {
  //     if (loginRecord.password == req.body.password) {
  //       res.cookie('userId', loginRecord.id);
  //       console.log(`login succesfully`);
  //       return res.redirect('/');
  //     }
  //     console.log(`wrong password`);
  //     return res.redirect('/loginPage');
  //   }
  // });
};

// logout function

module.exports.logoutUser = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error_message', 'You need to be logged in to log out!');
    return res.redirect('/loginPage');
  }
  req.logout((error) => {
    if (error) {
      console.log(`logout failed`);
    }
    req.flash('success_message', 'You have successfully logged out!');
    return res.redirect('/loginPage');
  });
};
