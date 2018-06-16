import * as actionTypes from './actionTypes';
import axiosBooks from '../../axios-books';
import axiosApi from '../../axios-api';

export const fetchBook = data => {
  return {
    type: actionTypes.SEARCH_BOOK,
    bookList: data
  };
};

export const onFetchBook = query => {
  return dispatch => {
    axiosBooks({
      method: 'get',
      url: `?q=${query}&maxResults=20`,
      headers: {}
    })
      .then(res => {
        let counter = 0;
        const bookList = [];

        while (counter < res.data.items.length) {
          bookList.push({
            title: res.data.items[counter].volumeInfo.title,
            author: res.data.items[counter].volumeInfo.authors,
            link: res.data.items[counter].volumeInfo.infoLink,
            image:
              res.data.items[counter].volumeInfo.imageLinks.thumbnail || '',
            apiID: res.data.items[counter].id
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

export const onAddBook = bookData => dispatch => {
  // console.log(bookData);
  const finalData = {
    title: bookData.title,
    author: bookData.author,
    imgURL: bookData.image,
    apiID: bookData.apiID
  };

  axiosApi
    .post('/books/add-book', finalData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
