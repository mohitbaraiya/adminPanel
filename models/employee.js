const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

const imagePath = path.join('/uploads/avatar');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', imagePath));
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
    );
  },
});

employeeSchema.statics.upload = multer({
  storage: storage,
}).single('image');

employeeSchema.statics.imgPath = imagePath;

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
