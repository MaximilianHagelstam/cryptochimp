const ping = (_req, res) => {
  res.json({ message: 'Server running' });
};

module.exports = { ping };
