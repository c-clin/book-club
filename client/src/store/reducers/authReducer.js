import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userName: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
        userName: action.payload.name
      };
    default:
      return state;
  }
}
