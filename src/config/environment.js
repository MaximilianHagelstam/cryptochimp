const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const MONGO_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

module.exports = { PORT, MONGO_URI };
