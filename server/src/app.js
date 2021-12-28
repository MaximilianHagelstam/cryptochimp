const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDb = require('./utils/connectDb');
const personController = require('./controllers/personController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(morgan('tiny'));
app.use(helmet());

connectDb();

app.use('/api/persons', personController);

module.exports = app;
