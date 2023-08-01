import types from './types';
import files from './services';

const upload = (params) => {

  function request() { return { type: types.UPLOAD_FILE_REQUEST } }
  function success(payload) { return { type: types.UPLOAD_FILE_SUCCESS, payload } }
  function failure(error) { return { type: types.UPLOAD_FILE_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::FILES::upload', params);
    dispatch(request());

    const response = await files.upload(params, getState().users.auth.token)
    console.log('ACTIONS::FILES::upload::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data.data));
    } else {
      // if (response.error && response.error.code === 'ERROR_401') {
      //   console.log('APP TOKEN NOT VALID');
      //   dispatch(oauth.removeToken());
      //   dispatch(oauth.accessToken());
      // } else {
        dispatch(failure(response.error));
      // }
    }
  };

}

export default {
  upload,
};