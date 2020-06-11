import axios from 'axios';

const SERVER_URL = 'https://api.dev-xchat.com';

const accessToken = localStorage.getItem('token');

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
