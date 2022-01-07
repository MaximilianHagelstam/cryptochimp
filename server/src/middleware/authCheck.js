const User = require('../models/User');

const authCheck = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  }

  const { accessToken } = await User.findOne({ googleId: req.user.googleId });

  res.cookie('token', accessToken, {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none'
  });
  next();
};

module.exports = authCheck;
