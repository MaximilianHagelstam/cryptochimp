const mongoose = require('mongoose');
const { MONGO_URI } = require('./constants');
const logger = require('./logger');

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to database');
  } catch (err) {
    logger.error(`Error connecting to db: ${err}`);
  }
};

module.exports = connectDatabase;
