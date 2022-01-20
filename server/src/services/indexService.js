const healthCheck = (_req, res) => {
  res.json({ message: 'Server running' });
};

module.exports = { healthCheck };
