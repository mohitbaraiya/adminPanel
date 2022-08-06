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

module.exports.profilePage = (req, res) => {
  res.render('profilePage');
};

module.exports.passwordPage = (req, res) => {
  res.render('changePassword');
};

module.exports.changePassword = async (req, res) => {
  console.log(req.user.id);
  console.log(req.user);
  console.log(req.body);
  let db_current = await bcrypt.compare(req.body.currentPwd, req.user.password);
  console.log(db_current);
  if (db_current) {
    let current_new = await bcrypt.compare(
      req.body.currentPwd,
      req.body.newPwd
    );
    console.log(current_new);
    if (!current_new) {
      if (req.body.newPwd == req.body.confirmPwd) {
        let newpass = await bcrypt.hash(req.body.newPwd, 8);
        registerUser.findByIdAndUpdate(
          req.user.id,
          {
            password: newpass,
          },
          (error, record) => {
            if (error) {
              console.log(`update error`);
            }
            console.log(`update successfull`);
            return res.redirect('/');
          }
        );
      } else {
        console.log(`new confirm`);
      }
    } else {
      console.log(`old new`);
    }
  } else {
    console.log(`old`);
  }
};

// let db_current = bcrypt.compare(req.user.password, req.body.currentPwd);
//   let current_new = await bcrypt.compare(req.body.currentPwd, req.body.newPwd);
//   let new_confirm = await bcrypt.compare(req.body.newPwd, req.body.confirmPwd);

// registerUser.findOne({ _id: req.user.id }, async (error, match) => {
//   let db_current = bcrypt.compare(req.user.password, req.body.currentPwd);
//   let current_new = await bcrypt.compare(
//     req.body.currentPwd,
//     req.body.newPwd
//   );
//   if (match) {
//     if (db_current) {
//       if (!current_new) {
//         if (req.body.newPwd == req.body.confirmPwd) {
//           let newpass = await bcrypt.hash(req.body.newPwd, 8);
//           registerUser.findByIdAndUpdate(
//             req.user.id,
//             {
//               password: newpass,
//             },
//             (error, record) => {
//               if (record) {
//                 req.flash('success_message', 'Password Change Successfully');
//                 return res.redirect('/loginPage');
//               }
//               console.log(`not updated`);
//               return redirect('/loginPage');
//             }
//           );
//         } else {
//           req.flash(
//             'error_message',
//             'The password and confirmation password do not match.'
//           );
//           req.redirect('/passwordPage');
//         }
//       } else {
//         req.flash(
//           'error_message',
//           'It Seems You Have Entered Same Password As Old Password!!!"'
//         );
//         res.redirect('/passwordPage');
//       }
//     } else {
//       console.log(`old not match`);
//       req.flash('error_message', 'Old password doesnt match!');
//       res.redirect('/passwordPage');
//     }
//   } else {
//     return res.redirect('/passwordPage');
//   }
// });
