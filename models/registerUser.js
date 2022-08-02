const mongoose = require('mongoose');

const registerUserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const registerUser = mongoose.model('registerUser', registerUserSchema);

module.exports = registerUser;
