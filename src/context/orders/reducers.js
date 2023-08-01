import { combineReducers } from 'redux';
import types from './types';

export const order = (state = {
  item: null,
  loading: false,
  error: null,
}, action) => {
  console.log('::::::REDUCER::ORDER', action);
  switch (action.type) {
    case types.GET_REQUEST:
    case types.SAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_FAILURE:
    case types.SAVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.SAVE_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        loading: false,
        error: null,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        loading: false,
        error: null,
      };
    case types.CLEAR_CURRENT:
      return {
        ...state,
        item: null,
      }
    default:
      return state
  }
}


export const ordersList = (state = {
  loading: false,
  items: [],
  error: null,
}, action) => {
  console.log('::::::REDUCER::ORDERS', action);
  switch (action.type) {
    case types.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.data,
        query: action.payload.query
      };
    case types.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case types.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case types.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case types.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to item 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            // make copy of product without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of product with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })
      };
  
    default:
      return state
  }
}


export default combineReducers({
  current: order,
  list: ordersList
});

