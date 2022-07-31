const express = require('express');

const routes = express.Router();

const adminController = require('../controllers/adminController');

routes.get('/', adminController.home);
routes.get('/formLayout', adminController.formLayout);
routes.post('/insertData', adminController.insertEmployee);
routes.get('/viewTable', adminController.viewTable);
routes.get('/deleteData/:id', adminController.deleteData);
routes.get('/editData/:id', adminController.editData);
routes.post('/updateData', adminController.updateData);

module.exports = routes;