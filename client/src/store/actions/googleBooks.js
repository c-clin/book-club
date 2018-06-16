import * as actionTypes from './actionTypes';
import axios from '../../axios-books';

export const fetchBook = data => {
  return {
    type: actionTypes.SEARCH_BOOK,
    bookList: data
  };
};

// `?q=${query}&key=AIzaSyCz-ivXjqdYUNr9T3Vpgg8oQkf7ZV7WoQM`;
export const onFetchBook = query => {
  return dispatch => {
    axios({
      method: 'get',
      url: `?q=${query}`,
      headers: {}
    })
      .then(res => {
        // console.log(res.data.items);
        let counter = 0;
        const bookList = [];
        while (counter < res.data.items.length) {
          bookList.push({
            title: res.data.items[counter].volumeInfo.title,
            author: res.data.items[counter].volumeInfo.authors,
            link: res.data.items[counter].volumeInfo.infoLink,
            image: res.data.items[counter].volumeInfo.imageLinks.thumbnail || ''
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
