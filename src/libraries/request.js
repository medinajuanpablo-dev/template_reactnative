/* request wrapper for axios v0.0.1 */
const axios = require('axios');
const config = require('../config');

// Wrapper for api calls with axios
export const request = ({
  url = '',
  method = 'GET',
  data = null,
  accessToken = null,
  authType = 'Bearer',
  onSuccess = () => {},
  onFailure = () => {},
  headersOverride = null,
}) => {
  return Axios({
    url,
    method,
    data,
    accessToken,
    authType,
    onSuccess,
    onFailure,
    headersOverride,
  });
};

const Axios = action => {
  const {
    url,
    method,
    data,
    accessToken,
    authType,
    onSuccess,
    onFailure,
    headersOverride,
  } = action;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  console.log('REQUEST_ACTION START');
  
  console.log('Authorization::', accessToken);

  let headers = { 'Content-Type': 'application/json' };
  if (accessToken !== null) headers.Authorization = `${authType} ${accessToken}`;
  headers = { ...headers, ...headersOverride };
  console.log('REQUEST_HEADERS', headers);


  // AXIOS interceptor for 401 refresh token
  // axios.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   (error) => {
  //     return new Promise((resolve) => {
  //       const originalRequest = error.config
  //       // const refreshToken = localStorage.get('refresh_token')
  //       console.log('REQUEST REFRESH TOKEN', error, accessToken);
  //       if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest && accessToken) {
  //         originalRequest._retry = true
  
  //         const response = fetch(config.API.OAUTH, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             refresh_token: accessToken,
  //             grant_type: 'refresh_token',
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {
  //             console.log('REQUEST REFRESH TOKEN RESPONSE', res);
  //             localStorage.setItem(config.LOCALSTORAGE_APP_TOKEN, JSON.stringify(res.access_token));
  //             return axios(originalRequest)
  //           })
  //         resolve(response)
  //       }
  
  //       return Promise.reject(error)
  //     })
  //   },
  // )

  return axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({ data }) => {
      console.log('REQUEST_RESPONSE', data);
      if (typeof onSuccess === 'function') onSuccess(data);
      return { success: true, data: data, error: null };
    })
    .catch(err => {
      console.log('REQUEST_ERROR', err);
      let error = null;
      let data = null;
      if (err.response) {
        console.log('REQUEST_ERROR::RESPONSE', err.response.data.error);
        error = err.response.data.error;
      } else if (err.request) {
        console.log('REQUEST_ERROR::REQUEST', err.request);
        const message = err.message === 'Network Error' ? 'NETWORK_ERROR' : err.message;
        error = { code: 'ERROR_401', message };
      } else {
        console.log('REQUEST_ERROR::MESSAGE', err.message);
        error = err.message;
      }
      if (err.response && err.response.status === 401) {
        console.log("REQUEST_ERROR::ERROR_401", window.location.pathname);
        error = { code: 'ERROR_401', message: 'NOT_AUTHORIZED' };
      }
      if (err.response && err.response.status === 403) {
        console.log("REQUEST_ERROR::ERROR_403", window.location.pathname);
        error = { code: 'ERROR_403', message: 'REQUET_FORBIDEN' };
      }
      if (typeof onFailure === 'function') onFailure(data, error);
      return { success: false, data, error };
    })

};
