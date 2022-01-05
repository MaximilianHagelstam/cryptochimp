const {
  updateCash,
  addCoin,
  updateCoin,
  getUser
} = require('../repositories/userRepository');
const { getPrice } = require('../helpers/coinMarketCap');
const logger = require('../config/logger');

const getCurrentUser = (req, res) => {
  res.send(req.user);
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
  const userOwnsCoin = user.wallet.some((data) => data.symbol === symbol);

  logger.info({ totalPrice, newCash, userOwnsCoin });

  if (newCash < 0) {
    message = 'Not enough cash';
    status = 'error';
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

module.exports = { getCurrentUser, buyCoin };
