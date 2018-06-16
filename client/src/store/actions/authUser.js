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
        dispatch(setCurrentUser(decoded));
        console.log(decoded);
        history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };
};

export const logoutUser = () => dispatch => {
  console.log('logging out');
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch(setCurrentUser({}));
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(res => {
      console.log(res.data);
      alert(
        `Hi ${
          res.data.name
        }, you have successfully signed up! Please log in to continue.`
      );
      history.push('/login');
    })
    // TODO: change how the error is dispayed
    .catch(err => alert(err.response.data.email));
};