import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://weight-lifting-journal-3.herokuapp.com/api',
    headers: {
      authorization: token,
    },
  });
};
