import config from '../../config';
import { request } from '../../libraries/request'

const login = (user, token) => {
  console.log('SERVICES::USERS::login', user, token);
  return request({
    url: config.BASE_API_URL + config.API.LOGIN,
    accessToken: token,
    data: { ...user },
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {
      localStorage.setItem(config.LOCALSTORAGE_USER_TOKEN, JSON.stringify(response.data.token));
    }
    return response;
  })

}

const logout = () => {
  console.log('SERVICES::USERS::logout');
  // remove user token from local storage to log user out
  localStorage.removeItem(config.LOCALSTORAGE_USER_TOKEN);
}

const forgot = (params, token) => {
  console.log('SERVICES::USERS::forgot', params, token);
  return request({
    url: config.BASE_API_URL + config.API.FORGOT,
    accessToken: token,
    method: 'POST',
    data: params,    
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const verifyPIN = (params, token) => {
  console.log('SERVICES::USERS::verifyPIN', params, token);
  return request({
    url: config.BASE_API_URL + config.API.VERIFY,
    accessToken: token,
    method: 'POST',
    data: params,    
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const getToken = () => {
  console.log('SERVICES::USERS::getToken');
  let token = null;
  try {
    token = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_USER_TOKEN));
  } catch {
    console.log('INVALID USER TOKEN FROM LOCALSTORATE');
  }
  // get user token from local storage
  return token;
}

const verifyToken = (token) => {
  console.log('SERVICES::USERS::verifyToken', token);
  return request({
    url: config.BASE_API_URL + config.API.TOKEN,
    accessToken: token,
    method: 'POST',
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const loginSSO = (token) => {
  console.log('SERVICES::USERS::login SSO', token);
  return request({
    url: config.BASE_API_URL + config.API.LOGIN_SSO,
    withCredentials: true,
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {
      localStorage.setItem(config.LOCALSTORAGE_USER_TOKEN, JSON.stringify(response.data.token));
    }
    return response;
  })
}

const getAll = (params = {}, token) => {
  console.log('SERVICES::USERS::get', params, token);
  if (params && params.page_num && config.QUERIES_PAGE_SIZE) {
    params.page_size = config.QUERIES_PAGE_SIZE;
  }
  if (!params.order_by) { 
    params.order_by = 'name';
    params.order_direction = 'ASC';
  }
  return request({
    url: config.BASE_API_URL + config.API.USERS,
    accessToken: token,
    data: params,
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {
      response.data.query.page_size = config.QUERIES_PAGE_SIZE;
    }
    return response;
  })
}

const save = (data, action, token) => {
  console.log('SERVICES::USERS::save', data, token);
  return request({
    url: config.BASE_API_URL + (action === 'register' ?  config.API.REGISTER : config.API.USERS),
    accessToken: token,
    method: 'POST',
    data,
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const update = (data, action, token) => {
  console.log('SERVICES::USERS::update', data, token);
  return request({
    url: config.BASE_API_URL + config.API.USER.replace('{id}', data.id),
    accessToken: token,
    method: 'PATCH',
    data,
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const get = (params, token) => {
  console.log('SERVICES::USERS::get', params, token);

  let cfg = {
    accessToken: token,
  }
  if (params.id) cfg.url = config.BASE_API_URL + config.API.USER.replace('{id}', params.id);
  if (params.email) { 
    cfg.url = config.BASE_API_URL + config.API.SOCIAL;
    cfg.data = params;
    cfg.method = 'POST';
  }

  return request(cfg)
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const getFromHash = (params, token) => {
  console.log('SERVICES::USERS::getFromHash', params, token);
  return request({
    url: config.BASE_API_URL + config.API.HASH.replace('{hash}', params.hash),
    accessToken: token,
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const del = (id, token) => {
  console.log('SERVICES::USERS::remove', id, token);
  return request({
    url: config.BASE_API_URL + config.API.USER.replace('{id}', id),
    accessToken: token,
    method: 'DELETE',
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

const getPoints = (id, token) => {
  console.log('SERVICES::USERS::getPoints', id, token);
  return request({
    url: config.BASE_API_URL + config.API.POINTS.replace('{id}', id),
    accessToken: token,
  })
  .then(response => {
    console.log('RETURN FROM API::USERS::getPoints', response);
    if (response.success) {

    }
    return response;
  })
}

const getFromSocial = (data, token) => {
  console.log('SERVICES::USERS::getFromSocial', data, token);
  return request({
    url: config.BASE_API_URL + config.API.SOCIAL_LOGIN,
    accessToken: token,
    method: 'POST',
    data,    
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })
}

export default {
  login,
  logout,
  forgot,
  verifyPIN,
  verifyToken,
  getToken,
  save,
  update,
  del,
  getAll,
  get,
  getFromHash,
  getPoints,
  getFromSocial,
  loginSSO,
};
