const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const logger = require('./logger');

const googleStrategyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const authenticateUser = async (_accessToken, _refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      logger.info(`${user.displayName} logged in`);
      done(null, user);
    } else {
      const newUser = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0].value,
        cash: 10000,
      });
      logger.info(`${newUser.displayName} signed up`);
      done(null, newUser);
    }
  } catch (err) {
    logger.error(`Error authenticating user: ${err}`);
  }
};

const passportConfig = (passport) => {
  passport.use(new GoogleStrategy(googleStrategyConfig, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;
