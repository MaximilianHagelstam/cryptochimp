const axios = require('axios');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const getAllCoins = async (_req, res) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/listings/latest?start=1&limit=10&convert=USD`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY
        }
      }
    );
    res.send(data.data);
  } catch (err) {
    res.send({ error: 'Error fetching CoinMarketCap API', message: err });
  }
};

module.exports = { getAllCoins };
