const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  }
  next();
};

module.exports = authCheck;
