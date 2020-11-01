import { v4 as uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Steak' },
    { id: uuid(), name: 'Water' },
  ],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;
