import { combineReducers } from 'redux';
// import authReducer from  './authReducer';
import booksReducer from './booksReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  books: booksReducer
});
