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

// register user
export const register = (body) => (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post('/api/users', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        getErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login
export const login = (body) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post('/api/auth', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        getErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(getErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// setup config/headers token
export const tokenConfig = (getState) => {
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

  return config;
};
