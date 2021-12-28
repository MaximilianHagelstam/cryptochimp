const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('cookie-session');

const connectDatabase = require('./config/connectDatabase');
const personController = require('./controllers/personController');
const authController = require('./controllers/authController');
const configurePassport = require('./config/passport');
const authCheck = require('./middleware/authCheck');

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

app.use('/api/persons', personController);
app.use('/api/auth', authController);

// TODO: temp
app.get('/', authCheck, (req, res) => {
  res.send(req.user);
});

module.exports = app;
