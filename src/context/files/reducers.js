import types from './types'; 

const reducer = (state = {
  error: false,
  files: null,
  uploading: false,
}, action) => {
  // console.log('::::::REDUCER::FILES::', action);
  switch(action.type) {
    case types.UPLOAD_FILE_REQUEST:
      return { ...state,
        uploading: true,
        error: false,
      };
    case types.UPLOAD_FILE_SUCCESS:
      return { ...state,
        files: action.payload,
        uploading: false,
        error: false,
      };
    case types.UPLOAD_FILE_FAILURE: 
      return { ...state,
        error: action.payload,
        uploading: false
      };
    default:
      return state;
  }
};

export default reducer;