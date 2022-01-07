const User = require('../models/User');
const logger = require('../config/logger');

const getUser = async (googleId) => {
  try {
    return await User.findOne({ googleId });
  } catch (err) {
    logger.error(`Error finding user: ${err}`);
  }
};

const addCoin = async (googleId, symbol, quantity, amountInvested) => {
  try {
    await User.updateOne(
      { googleId },
      {
        $push: {
          wallet: [
            {
              symbol,
              quantity,
              amountInvested
            }
          ]
        }
      }
    );
    logger.info(`Bought ${quantity} ${symbol} for $${amountInvested}`);
  } catch (err) {
    logger.error(`Error adding coin: ${err}`);
  }
};

const removeCoin = async (googleId, symbol) => {
  try {
    await User.updateOne(
      { googleId },
      {
        $pull: {
          wallet: { symbol }
        }
      },
      { safe: true }
    );

    logger.info(`Sold ${symbol}`);
  } catch (err) {
    logger.error(`Error removing coin: ${err}`);
  }
};

const updateCoin = async (googleId, symbol, quantity, amountInvested) => {
  try {
    await User.updateOne(
      { 'wallet.symbol': symbol, googleId },
      {
        $inc: {
          'wallet.$.quantity': quantity,
          'wallet.$.amountInvested': amountInvested
        }
      }
    );
    logger.info(`Bought ${quantity} more of ${symbol} for $${amountInvested}`);
  } catch (err) {
    logger.error(`Error updating coin: ${err}`);
  }
};

const updateCash = async (googleId, newCash) => {
  try {
    await User.updateOne({ googleId }, { cash: newCash });
    logger.info(`Updated cash with $${newCash}`);
  } catch (err) {
    logger.error(`Error updating cash: ${err}`);
  }
};

module.exports = {
  updateCash,
  addCoin,
  updateCoin,
  removeCoin,
  getUser
};
