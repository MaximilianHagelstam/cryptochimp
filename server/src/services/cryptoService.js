const axios = require('axios');
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

const getAllCoins = async (req, res) => {
  try {
    const { limit } = req.query;
    const { data } = await axios.get(
      `${BASE_URL}/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=USD`,
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

const getPrice = async (req, res) => {
  try {
    const { coin } = req.query;

    const { data } = await CoinGeckoClient.coins.fetch(coin, {
      tickers: false,
      community_data: false,
      developer_data: false,
      localization: false
    });

    const responseObject = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      current_price_usd: data.market_data.current_price.usd
    };

    res.send(responseObject);
  } catch (err) {
    res.send({ error: 'Error fetching CoinGecko API', message: err });
  }
};

module.exports = { getAllCoins, getPrice };
