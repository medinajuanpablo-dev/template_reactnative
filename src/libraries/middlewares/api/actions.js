import types from './types';

export const requestStart = label => ({
  type: types.API_START,
  payload: label,
});

export const requestEnd = label => ({
  type: types.API_END,
  payload: label,
});

export const accessDenied = url => ({
  type: types.API_ACCESS_DENIED,
  payload: { url },
});

export const requestError = error => ({
  type: types.API_ERROR,
  error: error,
});

// Wrapper for api calls from actions reducers
export const request = ({
  url = '',
  method = 'GET',
  data = null,
  accessToken = null,
  onSuccess = null, //() => {},
  onFailure = null, //() => {},
  label = '',
  headersOverride = null,
}) => {
  return {
    type: types.API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
    },
  };
};
