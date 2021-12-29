const getCurrentUser = (req, res) => {
  res.send(req.user);
};

module.exports = { getCurrentUser };
