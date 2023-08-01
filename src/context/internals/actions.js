import types from './types';
import internals from './services';
import oauth from '../oauth/actions';

const getClientIpInfo = (params) => {
  console.log('ACTIONS::INTERNALS::getClientIpInfo', params);

  const request = (params) => { return { type: types.GETIPINFO_REQUEST, params } };
  const success = (payload) => { return { type: types.GETIPINFO_SUCCESS, payload } };
  const failure = (error) => { return { type: types.GETIPINFO_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request(params));
    const response = await internals.getClientIpInfo(params, getState().oauth.token);
    console.log('ACTIONS::INTERNALS::getClientIpInfo::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data));
    } else {
      if (response.error && response.error.code === 'ERROR_401_201') {
        console.log('APP TOKEN NOT VALID');
        dispatch(oauth.removeToken());
        dispatch(oauth.accessToken());
        dispatch(failure(response.error));
      } else {
        dispatch(failure(response.error));
      }
    }
  }
}

export default {
  getClientIpInfo,
};