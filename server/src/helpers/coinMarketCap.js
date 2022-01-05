const axios = require('axios');
const logger = require('../config/logger');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const getPrice = async (symbol) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY
        }
      }
    );

    return Number(data.data[symbol.toUpperCase()].quote.USD.price);
  } catch (err) {
    logger.error(`Error getting ${symbol} price: ${err}`);
    return null;
  }
};

module.exports = { getPrice };
