import { combineReducers } from 'redux';
import types from './types';

export const authentication = (state = {
  logged: false,
  loading: false,
  error: false,
  token: null,
  user: null,
}, action) => {
  // console.log('::::::REDUCER::USERS::authentication::', action);
  switch (action.type) {
    case types.GETPOINTS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.GETPOINTS_SUCCESS:
      return {
        ...state,
        error: false,
        user: {
          ...state.user,
          points: action.payload.data,
        } 
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        loggin: action.username,
      };
    case types.LOGIN_SUCCESS:
      return {
        logged: true,
        loading: false,
        error: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case types.LOGIN_FAILURE:
    case types.VERIFY_FAILURE:
        return { 
        ...state,
        loading: false,
        error: action.error,
        token: null,
        user: null,
      };
    case types.LOGOUT:
      return {
        ...state,
        logged: false,
        loading: false,
        token: null,
        user: null,
      };
    // case types.LOGGED:
    //   return {
    //     ...state,
    //     logged: true,
    //     loading: false,
    //     user: action.user
    //   };
    case types.GETPOINTS_REQUEST:
    default:
      return state
  }
}

export const registration = (state = {}, action) => {
  // console.log('::::::REDUCER::USERS::registration::', action);
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return { registering: true };
    case types.REGISTER_SUCCESS:
      return {};
    case types.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export const user = (state = {
  item: null,
  loading: false,
  error: null,
}, action) => {
  // console.log('::::::REDUCER::USERS::user::', action);
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

export const users = (state = {
  loading: false,
  items: [],
  error: null,
}, action) => {
  // console.log('::::::REDUCER::USERS::users::', action);
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
  auth: authentication,
  register: registration,
  current: user,
  list: users
});

