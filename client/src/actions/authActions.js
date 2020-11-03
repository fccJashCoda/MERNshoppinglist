import axios from 'axios';
import { getErrors } from './errorActions';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({
    type: USER_LOADING,
  });

  // get token form localStorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //  if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  axios
    .get('/api/auth/user', config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log('========');
      console.log(getErrors);
      console.log('========');
      dispatch(getErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
