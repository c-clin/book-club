import * as actionTypes from './actionTypes';
import axios from '../../axios-api';
import jwt_decode from 'jwt-decode';

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

export const onError = err => {
  return {
    type: actionTypes.ERROR_MESSAGE,
    payload: err
  };
};

export const loginUser = (userData, history) => {
  return dispatch => {
    axios
      .post('/user/login', userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = token;
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err.response.data.error);
        const errMsg = err.response.data.error;
        dispatch(onError(errMsg));
      });
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch(setCurrentUser({}));
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/user/register', userData)
    .then(res => {
      alert(
        `Hi ${
          res.data.name
        }, you have successfully signed up! Please log in to continue.`
      );
      history.push('/login');
    })
    .catch(err => alert(err.response.data.email));
};
