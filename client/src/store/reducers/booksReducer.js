import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchList: [],
  bookList: [],
  availableBooks: [],
  tradeRequests: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOK:
      return {
        ...state,
        searchList: action.searchList
      };
    case actionTypes.LOAD_BOOK_LIST:
      return {
        ...state,
        bookList: action.bookList
      };
    case actionTypes.LOAD_AVAILABLE_BOOKS:
      return {
        ...state,
        availableBooks: action.availableBooks
      };
    case actionTypes.LOAD_TRADE_REQUESTS:
      return {
        ...state,
        tradeRequests: action.tradeRequests
      };
    default:
      return state;
  }
};

export default reducer;
