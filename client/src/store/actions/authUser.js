import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = (userData, history) => {
  return dispatch => {
    axios
      .post('/api/user/login', userData)
      .then(res => {
        const { token } = res.data;
        // const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        const decoded = jwt_decode(token);
        console.log(decoded);
        dispatch(setCurrentUser(decoded));
        history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };
};

// const logoutUser = () => dispatch => {
//     localStorage.removeItem('jwtToken');
//     setAuthToken(false);

// };
