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

export const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
