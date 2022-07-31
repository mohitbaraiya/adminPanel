const express = require('express');

const app = express();

const port = 1923;

const host = 'localhost';

// database
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use('/uploads', express.static('./uploads'));
// ejs config
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/assets', express.static('./assets'));

// routes config
app.use('/', require('./routes/index'));

app.listen(port, host, (error) => {
  if (error) {
    console.log(`server error not connected`);
  }
  console.log(`server is running on http://${host}:${port}`);
});

console.log(`hello hii`);
