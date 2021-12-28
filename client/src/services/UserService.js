import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const UserService = {
  getCurrentUser: async () => await axios.get(BASE_URL)
};

export default UserService;
