const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');
const logger = require('./logger');

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to database');
  } catch (err) {
    logger.error(err);
  }
};

module.exports = connectDb;
