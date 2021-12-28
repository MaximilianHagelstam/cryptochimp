const mongoose = require('mongoose');
const { MONGO_URI } = require('./environment');
const logger = require('./logger');

const connectDatabase = async () => {
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

module.exports = connectDatabase;
