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

export const loadTradeRequests = data => {
  return {
    type: actionTypes.LOAD_TRADE_REQUESTS,
    tradeRequests: data
  };
};

export const loadPendingRequests = data => {
  return {
    type: actionTypes.LOAD_PENDING_REQUESTS,
    pendingRequests: data
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

// load available books
export const onLoadBooksForTrade = () => dispatch => {
  axiosApi
    .get('/trade/available-books')
    .then(res =>
      dispatch({
        type: actionTypes.LOAD_AVAILABLE_BOOKS,
        availableBooks: res.data
      })
    )
    .catch(err => err);
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
    ownerName: bookData.auth.user.name
  };

  axiosApi
    .post('/books/add-book', finalData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// load user's trade/pending requests
export const onLoadTradeRequests = (id, reqType) => dispatch => {
  const reqData = {
    id, // _user id
    reqType // trade or pending
  };
  console.log(reqData);
  axiosApi
    .post('/trade/requests', reqData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => {
      if (reqType === 'trade') {
        dispatch(loadTradeRequests(res.data));
      } else {
        dispatch(loadPendingRequests(res.data));
      }
    })
    .catch(err => console.log(err));
};

// making a trade request
// toggle the trade button to on hold
export const onTradeRequest = data => dispatch => {
  const tradeData = {
    from: data.auth.user.id,
    to: data.owner,
    bookID: data.bookID,
    title: data.title
  };
  axiosApi
    .post('/trade/trade-request', tradeData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => dispatch(onLoadBooksForTrade()))
    .catch(err => console.log(err));
};

// toggle whether to put a book on user's list up for trade
export const onTradeBook = data => dispatch => {
  // console.log(data);
  const tradeData = {
    _user: data.auth.user.id,
    apiID: data.apiID,
    status: data.status
  };

  axiosApi
    .post('/trade/update-trade', tradeData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => {
      dispatch(onLoadList());
    })
    .catch(err => console.log(err));
};

// accepting/rejecting trade requests
export const respondToRequests = (data, decision) => dispatch => {
  const reqData = {
    _id: data._id,
    from: data.from,
    to: data.to,
    bookID: data.book,
    decision: decision
  };

  console.log(reqData);
  axiosApi
    .post('/trade/trade-response', reqData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => {
      dispatch(onLoadTradeRequests(res.data, 'trade'));
    })
    .catch(err => console.log(err));
};

// canceling pending requests
export const cancelPendingRequests = data => dispatch => {
  console.log(data);
  const reqData = {
    _id: data._id,
    bookID: data.book,
    from: data.from
  };
  console.log(reqData);
  // need to return _user to dispatch onLoadTradeRequests(_user, pending)

  axiosApi
    .post('/trade/pending-response', reqData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => dispatch(onLoadTradeRequests(res.data, 'pending')))
    .catch(e => console.log(e));
};

// TODO: Add a working website from the google books api
