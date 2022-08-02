const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 1923;

const host = 'localhost';

// database
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

app.use(express.urlencoded());
app.use('/uploads', express.static('./uploads'));
app.use(cookieParser());

// ejs config
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/assets', express.static('./assets'));

app.use(
  session({
    name: 'userId',
    secret: 'admin7048',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.session());
app.use(passport.initialize());
// routes config
app.use('/', require('./routes/index'));

app.listen(port, host, (error) => {
  if (error) {
    console.log(`server error not connected`);
  }
  console.log(`server is running on http://${host}:${port}`);
});
