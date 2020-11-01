import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get('/api/items').then((response) => {
    dispatch({
      type: GET_ITEMS,
      payload: response.data,
    });
  });
};

export const addItem = (payload) => (dispatch) => {
  axios.post('/api/items', { ...payload }).then((res) => {
    console.log('res.data', res.data);
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  });
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};