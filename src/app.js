const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const session = require('cookie-session');
const path = require('path');

const connectDatabase = require('./config/connectDatabase');
const configurePassport = require('./config/passport');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const cryptoController = require('./controllers/cryptoController');

configurePassport(passport);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

app.use(
  session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDatabase();

app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/crypto', cryptoController);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
