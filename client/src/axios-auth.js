import axios from 'axios';
const authInstance = axios.create({
  baseURL: `/api/user`,
  headers: {
    Authorization: ''
  }
});

export default authInstance;
