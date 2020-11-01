import { ADD_ITEM, DELETE_ITEM } from './types';

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
