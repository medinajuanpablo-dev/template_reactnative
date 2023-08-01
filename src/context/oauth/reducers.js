import types from './types';

const reducer = (state = {
  loading: false,
  granted: false,
  token: null,
  error: null,
}, action) => {
  // console.log('::::::REDUCER::OAUTH::', action);
  switch (action.type) {
    case types.ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ACCESS_TOKEN_LOCAL:
    case types.ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        granted: true,
        token: action.payload.access_token
      };
    case types.REMOVE_ACCESS_TOKEN:
      return {
        ...state,
        loading: false,
        granted: false,
        token: null,
      };
    case types.ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
