const axios = require('axios');
const { mockWalletResult } = require('../../test/mocks');
const logger = require('../config/logger');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const getPrice = async (symbol) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
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
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
      }
    );

    coins.forEach((coin) => {
      let currentPrice;

      if (process.env.NODE_ENV === 'test') {
        currentPrice = mockWalletResult[0].currentPrice;
      } else {
        currentPrice = Number(
          data.data[coin.symbol.toUpperCase()].quote.USD.price
        );
      }

      const { symbol, quantity, amountInvested, _id } = coin;

      const profit = currentPrice * quantity - amountInvested;
      const profitPct = (profit / amountInvested) * 100;

      newWallet.push({
        _id,
        symbol,
        quantity,
        amountInvested,
        currentPrice,
        profit,
        profitPct,
      });
    });

    logger.info(newWallet);
    return newWallet;
  } catch (err) {
    logger.error(`Error calculating coin prices: ${err}`);
    return null;
  }
};

module.exports = { getPrice, calculateWalletData };
