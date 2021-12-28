const app = require('./app');
const logger = require('./config/logger');
const { PORT } = require('./config/environment');

app.listen(PORT, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`),
);
