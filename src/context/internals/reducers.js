import types from './types';

export const reducer = (state = {
  error: false,
  loading: false,
  data: null,
}, action) => {
  // console.log('::::::REDUCER::INTERNALS::reducer::', action);
  switch (action.type) {
    case types.GETIPINFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.GETIPINFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case types.GETIPINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state
  }
}

export default reducer;

