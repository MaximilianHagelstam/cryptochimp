const {
  updateCash,
  addCoin,
  updateCoin,
  getUser,
  removeCoin
} = require('../repositories/userRepository');
const { getPrice, getPricesArray } = require('../helpers/coinMarketCap');
const logger = require('../config/logger');

const getCurrentUser = async (req, res) => {
  const user = await getUser(req.user.googleId);
  res.send(user);
};

const buyCoin = async (req, res) => {
  const { googleId } = req.user;
  let { symbol, quantity } = req.body;

  symbol = symbol.toUpperCase();
  quantity = Number(quantity);

  let message;
  let status;

  const price = await getPrice(symbol);

  if (!price) {
    message = 'Symbol not found';
    status = 'error';
    return res.send({ message, status });
  }

  const user = await getUser(googleId);

  const totalPrice = price * quantity;
  const newCash = user.cash - totalPrice;
  const userOwnsCoin = user.wallet.some((coin) => coin.symbol === symbol);

  logger.info({ symbol, price, quantity, totalPrice, newCash, userOwnsCoin });

  if (newCash < 0) {
    message = 'Not enough cash';
    status = 'error';

    logger.info('Not enough cash');
  } else if (userOwnsCoin) {
    await updateCoin(googleId, symbol, quantity, totalPrice);
    await updateCash(googleId, newCash);

    message = `Bought ${quantity} ${symbol}`;
    status = 'success';
  } else {
    await addCoin(googleId, symbol, quantity, totalPrice);
    await updateCash(googleId, newCash);

    message = `Bought ${quantity} ${symbol}`;
    status = 'success';
  }

  res.send({ message, status });
};

const sellCoin = async (req, res) => {
  const { googleId } = req.user;
  let { symbol } = req.body;
  symbol = symbol.toUpperCase();

  const user = await getUser(googleId);
  const price = await getPrice(symbol);

  let { quantity } = user.wallet.find((coin) => coin.symbol === symbol);
  quantity = Number(quantity);

  const totalPrice = price * quantity;
  const newCash = user.cash + totalPrice;

  logger.info({ symbol, quantity, price, totalPrice, newCash });

  await removeCoin(googleId, symbol);
  await updateCash(googleId, newCash);

  res.send({ message: `Sold ${symbol}`, status: 'success' });
};

const getWalletData = async (req, res) => {
  const { wallet } = await getUser(req.user.googleId);
  const prices = await getPricesArray(['ETH', 'XRP', 'DOGE']);
  console.log(prices);
  res.send({ wallet });
};

module.exports = { getCurrentUser, buyCoin, sellCoin, getWalletData };
