import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBook = data => {
  return {
    type: actionTypes.SEARCH_BOOK,
    bookList: data
  };
};

export const onFetchBook = query => {
  return dispatch => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(res => {
        // console.log(res.data.items);
        let counter = 0;
        const bookList = [];
        while (counter < res.data.items.length) {
          bookList.push({
            title: res.data.items[counter].volumeInfo.title,
            author: res.data.items[counter].volumeInfo.authors
          });
          counter++;
        }
        console.log(bookList);
        dispatch(fetchBook(bookList));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
