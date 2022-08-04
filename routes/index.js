const express = require('express');
const passport = require('passport');
const routes = express.Router();

const adminController = require('../controllers/adminController');

routes.get('/', adminController.home);
routes.get('/formLayout', passport.checkAuth, adminController.formLayout);
routes.post('/insertData', adminController.insertEmployee);
routes.get('/viewTable', passport.checkAuth, adminController.viewTable);
routes.get('/deleteData/:id', adminController.deleteData);
routes.get('/editData/:id', adminController.editData);
routes.post('/updateData', adminController.updateData);

// for login user and register user
routes.use('/', require('./admin'));

module.exports = routes;
