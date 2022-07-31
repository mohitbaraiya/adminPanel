const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';

mongoose.connect(`${url}/adminpanel`);

const db = mongoose.connection;

db.on('error', console.error.bind('error', 'database error'));

db.once('open', (error) => {
  if (error) {
    console.log(`database connection error`);
  }
  console.log(`database connected`);
});

module.exports = db;
