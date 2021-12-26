const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDb = require('./utils/connectDb');
const personRoutes = require('./routes/personRoutes');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

connectDb();

app.use('/api/persons', personRoutes);

module.exports = app;
