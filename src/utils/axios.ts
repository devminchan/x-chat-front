import axios from 'axios';

const SERVER_URL =
  'http://x-chat-elb-966956558.ap-northeast-2.elb.amazonaws.com';

const accessToken = localStorage.getItem('token');

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
