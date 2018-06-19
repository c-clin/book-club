import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
  isAuthenticated: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
