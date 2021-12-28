import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const UserService = {
  isUserAuthenticated: async () => {
    try {
      const { status } = await axios.get(BASE_URL, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      });

      return status;
    } catch (err) {
      return false;
    }
  }
};

export default UserService;
