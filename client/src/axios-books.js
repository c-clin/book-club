import axios from 'axios';
const bookInstance = axios.create({
  baseURL: `https://www.googleapis.com/books/v1/volumes`,
  headers: {}
});

export default bookInstance;
