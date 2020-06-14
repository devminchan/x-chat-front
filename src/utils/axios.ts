import axios from 'axios';
import { SERVER_URL } from './constants';

const accessToken = localStorage.getItem('token');

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
