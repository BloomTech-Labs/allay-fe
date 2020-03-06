import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: process.env.REACT_APP_databaseURL,
    headers: {
      authorization: token
    }
  });
};
export default axiosWithAuth;
