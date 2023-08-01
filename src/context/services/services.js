import config from '../../config';
import { request } from '../../libraries/request'

const getAll = (params = {}, token) => {
  console.log('SERVICES::SERVICES::get', params, token);
  if (params && params.page_num && config.QUERIES_PAGE_SIZE) {
    params.page_size = config.QUERIES_PAGE_SIZE;
  }
  if (!params.order_by) { 
    params.order_by = 'products__updated_at';
    params.order_direction = 'DESC';
  }

  return request({
    url: config.BASE_API_URL + config.API.SERVICES,
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
  console.log('SERVICES::SERVICES::save', data, token);
  return request({
    url: config.BASE_API_URL + config.API.SERVICES,
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
  console.log('SERVICES::SERVICES::update', data, token);
  return request({
    url: config.BASE_API_URL + config.API.SERVICE.replace('{id}', data.id),
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
  console.log('SERVICES::SERVICES::get', id, token);
  return request({
    url: config.BASE_API_URL + config.API.SERVICE.replace('{id}', id),
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
  console.log('SERVICES::SERVICES::remove', id, token);
  return request({
    url: config.BASE_API_URL + config.API.SERVICE.replace('{id}', id),
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