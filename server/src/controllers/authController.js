const express = require('express');
const passport = require('passport');
const authService = require('../services/authService');

const authController = express.Router();

authController.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authController.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  authService.redirectToClient
);

authController.get('/logout', authService.logout);

module.exports = authController;
