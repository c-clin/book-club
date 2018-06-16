// import * as actionTypes from './actionTypes';
import axiosApi from '../../axios-api';

export const onTradeRequest = data => dispatch => {
  console.log(data);
  // need bookID, from, to

  const tradeData = {
    from: data.auth.user.id,
    to: data.owner,
    bookID: data.bookID
  };
  axiosApi
    .post('/trade/trade-request', tradeData, {
      headers: { Authorization: localStorage.jwtToken }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
