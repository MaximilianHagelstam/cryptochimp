const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const IS_PROD = process.env.NODE_ENV === 'production';

const MONGO_URI = IS_PROD
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

module.exports = { PORT, MONGO_URI, IS_PROD };
