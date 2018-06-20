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

// load user's book list
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

// fetch a searched query
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
        dispatch(fetchBook(bookList));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// add a book to user's list
export const onAddBook = bookData => dispatch => {
  const finalData = {
    title: bookData.title,
    author: bookData.author,
    imgURL: bookData.image,
    apiID: bookData.apiID,
    link: bookData.link,
    ownerName: bookData.auth.user.name
  };

  axiosApi
    .post('/books/add-book', finalData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// delete a book from user's list
export const onDeleteBook = bookData => dispatch => {
  const finalData = {
    bookID: bookData
  };

  axiosApi
    .post('books/delete-book', finalData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => dispatch(onLoadList()))
    .catch(e => console.log(e));
};
