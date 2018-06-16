import * as actionTypes from './actionTypes';
import axiosBooks from '../../axios-books';
import axiosApi from '../../axios-api';

const no_image_url =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

export const fetchBook = data => {
  return {
    type: actionTypes.SEARCH_BOOK,
    searchList: data
  };
};

export const onLoadList = () => dispatch => {
  axiosApi
    .get('/books/my-list', {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res =>
      dispatch({
        type: actionTypes.LOAD_BOOK_LIST,
        bookList: res.data
      })
    )
    .catch(err => console.log(err));
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
          let img_url = res.data.items[counter].volumeInfo.imageLinks
            ? res.data.items[counter].volumeInfo.imageLinks.thumbnail
            : no_image_url;

          bookList.push({
            title: res.data.items[counter].volumeInfo.title,
            author: res.data.items[counter].volumeInfo.authors,
            link: res.data.items[counter].volumeInfo.infoLink,
            image: img_url,
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
