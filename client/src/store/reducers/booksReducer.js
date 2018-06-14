import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bookList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOK:
      return {
        ...state,
        bookList: action.bookList
      };
    default:
      return state;
  }
};

export default reducer;
