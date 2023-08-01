import types from './types';
import oauth from './services';

const accessToken = () => {
  console.log('ACTIONS::OAUTH::accessToken');

  const request = () => { return { type: types.ACCESS_TOKEN_REQUEST } };
  const success = (payload) => { return { type: types.ACCESS_TOKEN_SUCCESS, payload } }
  const failure = (error) => { return { type: types.ACCESS_TOKEN_FAILURE, error } }

  return dispatch => {
    dispatch(request());

    oauth.requestAccessToken()
      .then((response) => {
        console.log('RESPONSE FROM SERVIVE', response);
        if (response.success) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.error));
        }
      })
  };
}


const refreshAccessToken = (token) => {
  console.log('ACTIONS::OAUTH::refreshAccessToken');

  const request = () => { return { type: types.ACCESS_TOKEN_REQUEST } };
  const success = (payload) => { return { type: types.ACCESS_TOKEN_SUCCESS, payload } }
  const failure = (error) => { return { type: types.ACCESS_TOKEN_FAILURE, error } }

  return dispatch => {
    dispatch(request());

    oauth.refreshAccessToken(token)
      .then((response) => {
        console.log('RESPONSE FROM SERVIVE', response);
        if (response.success) {
          dispatch(success(response.data));
        } else {
          oauth.removeLocalAccessToken();
          dispatch(failure(response.error));
        }
      })
  };
}

const removeToken = () => {
  console.log('ACTIONS::OAUTH::removeToken');
  oauth.removeLocalAccessToken();
  return { type: types.REMOVE_ACCESS_TOKEN };
}

const getFromToken = () => {
  console.log('ACTIONS::OAUTH::getFromToken');

  const success = (payload) => { return { type: types.ACCESS_TOKEN_LOCAL, payload } };
  const failure = (error) => { return { type: types.REMOVE_ACCESS_TOKEN, error } }

  return (dispatch, getState) => {
    // console.log('getFromToken', getState());
    const token = oauth.getLocalAccessToken();
    console.log('APP TOKEN FROM LOCALSTORAGE', token);
    if (token) {
      dispatch(success({ access_token: token }));
      // dispatch(refreshAccessToken(token));
    } else {
      dispatch(failure('LOCAL_TOKEN_UNDEFINED'));
      dispatch(accessToken());
    }
  };  

}

export default {
  accessToken,
  removeToken,
  getFromToken,
  refreshAccessToken,
};