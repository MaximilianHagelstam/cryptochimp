const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const connectDatabase = require('./config/connectDatabase');
const configurePassport = require('./config/passport');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const cryptoController = require('./controllers/cryptoController');
const indexController = require('./controllers/indexController');

const app = express();

connectDatabase();

configurePassport(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.set('trust proxy', 1);

const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: ONE_DAY_MILLIS
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexController);
app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/crypto', cryptoController);

module.exports = app;
