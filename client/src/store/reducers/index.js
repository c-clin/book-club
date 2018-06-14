import { combineReducers } from 'redux';
// import authReducer from  './authReducer';
import booksReducer from './booksReducer';

export default combineReducers({
  books: booksReducer
});
