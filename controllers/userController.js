const registerUser = require('../models/registerUser');

// for register functionality

module.exports.registerPage = (req, res) => {
  if (req.cookies.userId) {
    return res.redirect('/');
  }
  res.render('registerUser');
};

module.exports.registerUser = (req, res) => {
  registerUser.findOne({ email: req.body.email }, (error, registerrecord) => {
    if (error) {
      console.log(`something wrong in register user `);
      return false;
    }
    if (registerrecord) {
      console.log(`email or username already exists`);
      return res.redirect('/loginPage');
    }
    registerUser.create(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      (error, record) => {
        if (error) {
          console.log(`error to register user`);
          return false;
        }
        console.log(`register successfully`);
        return res.redirect('/');
      }
    );
  });
};

// for login functionality

module.exports.loginPage = (req, res) => {
  if (req.cookies.userId) {
    return res.redirect('/');
  }
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
  res.cookie('userId', '');
  return res.redirect('/loginPage');
};
