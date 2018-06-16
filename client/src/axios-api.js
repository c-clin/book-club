import axios from 'axios';
const authInstance = axios.create({
  baseURL: `/api`,
  headers: {
    Authorization: ''
  }
});

export default authInstance;
