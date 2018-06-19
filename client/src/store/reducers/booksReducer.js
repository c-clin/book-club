import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchList: [],
  bookList: [],
  availableBooks: [],
  tradeRequests: [],
  pendingRequests: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOK:
      return {
        ...state,
        searchList: action.searchList,
        loading: false
      };
    case actionTypes.LOAD_BOOK_LIST:
      return {
        ...state,
        bookList: action.bookList,
        loading: false
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
    case actionTypes.LOAD_PENDING_REQUESTS:
      return {
        ...state,
        pendingRequests: action.pendingRequests
      };
    default:
      return state;
  }
};

export default reducer;
