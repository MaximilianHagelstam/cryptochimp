const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('cookie-session');

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
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    ttl: 60 * 60 * 24 * 30,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none'
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDatabase();

app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/crypto', cryptoController);

module.exports = app;
