import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
  isAuthenticated: false,
  userName: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        userName: action.payload.name
      };
    default:
      return state;
  }
}
