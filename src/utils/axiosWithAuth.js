import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://allay-be-staging.herokuapp.com/api',
    headers: {
      authorization: token,
    },
  });
};
