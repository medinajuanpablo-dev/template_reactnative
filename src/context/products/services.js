import config from '../../config';
import { request } from '../../libraries/request'

const getAll = (params = {}, token) => {
  console.log('SERVICES::PRODUCTS::get', params, token);
  if (params && params.page_num && config.QUERIES_PAGE_SIZE) {
    params.page_size = config.QUERIES_PAGE_SIZE;
  }

  return request({
    url: config.BASE_API_URL + config.API.PRODUCTS_LIST,
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

const save = (data, token) => {
  console.log('SERVICES::PRODUCT::save', data, token);
  return request({
    url: config.BASE_API_URL + config.API.PRODUCTS_LIST,
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

const update = (data, token) => {
  console.log('SERVICES::PRODUCTS::update', data, token);
  return request({
    url: config.BASE_API_URL + config.API.PRODUCT.replace('{productId}', data.id),
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

const get = (id, token) => {
  console.log('SERVICES::PRODUCTS::get', id, token);
  return request({
    url: config.BASE_API_URL + config.API.PRODUCT.replace('{productId}', id),
    accessToken: token,
    // data: {},
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {

    }
    return response;
  })

}

const del = (id, token) => {
  console.log('SERVICES::PRODUCT::remove', id, token);
  return request({
    url: config.BASE_API_URL + config.API.PRODUCT.replace('{productId}', id),
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

export default {
  getAll,
  save,
  get,
  del,
  update,
};