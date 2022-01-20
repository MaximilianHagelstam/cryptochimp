const axios = require('axios');
const logger = require('../config/logger');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const getAllCoins = async (req, res) => {
  try {
    const { limit } = req.query;

    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=USD`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
      }
    );
    res.json(data.data);
  } catch (err) {
    logger.error(`Error getting all coins: ${err}`);
    res.json({ error: err });
  }
};

module.exports = { getAllCoins };
