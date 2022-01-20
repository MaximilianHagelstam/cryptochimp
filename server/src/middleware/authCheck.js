const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'Unauthenticated request',
    });
  } else {
    next();
  }
};

module.exports = authCheck;
