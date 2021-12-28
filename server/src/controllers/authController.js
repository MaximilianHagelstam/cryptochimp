const express = require('express');
const passport = require('passport');
const logger = require('../config/logger');

const authController = express.Router();

authController.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authController.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/browse`);
  }
);

authController.get('/logout', (req, res) => {
  req.logout();
  logger.info('User logged out');
  res.redirect(process.env.CLIENT_URL);
});

module.exports = authController;
