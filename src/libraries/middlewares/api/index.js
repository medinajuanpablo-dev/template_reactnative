import axios from 'axios';
import types from './types';
import {
  accessDenied,
  requestError,
  requestStart,
  requestEnd,
} from './actions';


const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== types.API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headersOverride,
  } = action.payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  console.log('Authorization::', accessToken);
  // axios default configs
  // axios.defaults.baseURL = config.BASE_API_URL || '';
  // axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  let headers = { 'Content-Type': 'application/json' };
  if (accessToken !== null) headers.Authorization = `Bearer ${accessToken}`;
  headers = { ...headers, ...headersOverride };
  console.log('HEADERS', headers);

  if (label) {
    dispatch(requestStart(label));
  }

  console.log("MIDDLEWARE START");
  return axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then((response) => {
      console.log("MIDDLEWARE RESPONSE", response);
      if (typeof onSuccess === 'function') dispatch(onSuccess(response.data));
    })
    .catch(error => {
      console.log("MIDDLEWARE ERROR", error);
      let returnedError = null;
      if (error.response) {
        console.log('ERROR RESPONSE', error.response);
        returnedError = error.response.data.error
          ? error.response.data.message
          : error.response.data.err;
      } else if (error.request) {
        console.log('ERROR REQUEST', error.request);
        returnedError = error.message;
      } else {
        console.log('ERROR MESSAGE', error.message);
        returnedError = error.message;
      }
      dispatch(requestError(returnedError));
      if (typeof onFailure === 'function') dispatch(onFailure(returnedError));
      if (error.response && error.response.status === 403) {
        console.log("MIDDLEWARE ERROR 403", window.location.pathname);
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      console.log("MIDDLEWARE FINALLY", label);
      if (label) {
        dispatch(requestEnd(label));
      }
    });
};

export default apiMiddleware;
