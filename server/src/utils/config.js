const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const MONGO_URI =
  // eslint-disable-next-line no-nested-ternary
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI_DEV;

module.exports = { PORT, MONGO_URI };
