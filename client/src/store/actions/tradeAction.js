import * as actionTypes from './actionTypes';
import axiosApi from '../../axios-api';
import { onLoadList } from './index';

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

// load user's trade/pending requests
export const onLoadTradeRequests = (id, reqType) => dispatch => {
  const reqData = {
    id, // _user id
    reqType // trade or pending
  };
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
    from_name: data.auth.user.name,
    to: data.owner,
    to_name: data.username,
    bookID: data.bookID,
    title: data.title
  };
  console.log(tradeData);
  axiosApi
    .post('/trade/trade-request', tradeData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => dispatch(onLoadBooksForTrade()))
    .catch(err => alert(err.response.data.err));
};

// toggle whether to put a book on user's list up for trade
export const onTradeBook = data => dispatch => {
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

  axiosApi
    .post('/trade/pending-response', reqData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => dispatch(onLoadTradeRequests(res.data, 'pending')))
    .catch(e => console.log(e));
};
