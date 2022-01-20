const logger = require('../config/logger');

const redirectToClient = (_req, res) => {
  res.redirect(process.env.CLIENT_URL);
};

const logout = (req, res) => {
  req.logout();
  logger.info('User logged out');
  res.redirect(process.env.CLIENT_URL);
};

module.exports = { redirectToClient, logout };
