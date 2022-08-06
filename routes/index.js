const express = require('express');
const passport = require('passport');
const routes = express.Router();

const userController = require('../controllers/userController');

routes.get('/', userController.home);
routes.get('/formLayout', passport.checkAuth, userController.formLayout);
routes.post('/insertData', userController.insertEmployee);
routes.get('/viewTable', passport.checkAuth, userController.viewTable);
routes.get('/deleteData/:id', userController.deleteData);
routes.get('/editData/:id', userController.editData);
routes.post('/updateData', userController.updateData);

// for login user and register user
routes.use('/', require('./admin'));

module.exports = routes;
