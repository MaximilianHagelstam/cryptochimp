import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const UserService = {
  getCurrentUser: async () => {
    try {
      const { data } = await axios.get(BASE_URL, {
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
  }
};

export default UserService;
