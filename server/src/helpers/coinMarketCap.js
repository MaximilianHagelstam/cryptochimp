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

const calculateWalletData = async (coins) => {
  try {
    const newWallet = [];
    const symbols = coins.map((coin) => coin.symbol);

    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbols}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY
        }
      }
    );

    coins.forEach((coin) => {
      const price = Number(
        data.data[coin.symbol.toUpperCase()].quote.USD.price
      );

      newWallet.push({
        symbol: coin.symbol,
        quantity: coin.quantity,
        amountInvested: coin.amountInvested,
        currentPrice: price
      });
    });

    return newWallet;
  } catch (err) {
    logger.error(`Error getting prices for ${symbols}: ${err}`);
    return null;
  }
};

module.exports = { getPrice, calculateWalletData };
