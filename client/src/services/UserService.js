import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const UserService = {
  getCurrentUser: async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/user`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      });

      return data;
    } catch (err) {
      return null;
    }
  },

  buyCoin: async (symbol, quantity) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/user/buy`,
        {
          symbol: symbol,
          quantity: quantity
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        }
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  },

  sellCoin: async (symbol) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/user/sell`,
        {
          symbol: symbol
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        }
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  },

  getWallet: async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/user/wallet`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      });

      return data.wallet;
    } catch (err) {
      console.error(err);
    }
  }
};

export default UserService;
