import types from './types';
import services from './services';

const clearCurrent = () => {
  return (dispatch) => {
    dispatch({ type: types.CLEAR_CURRENT });
  }
}

const clearAll = () => {
  return dispatch => {
    dispatch({type: types.CLEAR_ALL})
  }
}

const getAll = (params) => {
  console.log('ACTIONS::PRODUCTS::getAll', params);

  function request() { return { type: types.GETALL_REQUEST } }
  function success(payload) { return { type: types.GETALL_SUCCESS, payload } }
  function failure(error) { return { type: types.GETALL_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request());
    const response = await services.getAll(params, getState().users.auth.token)
    console.log('ACTIONS::PRODUCTS::getAll::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data));
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

const get = (id) => {
  console.log('ACTIONS::PRODUCT::get', id);

  const request = (id) => { return { type: types.GET_REQUEST, id } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } }
  const failure = (error) => { return { type: types.GET_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await services.get(id, getState().users.auth.token)
    console.log('ACTIONS::PRODUCT::get::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data));
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

const saveOrUpdate = (product) => {

  function request(payload) { return { type: types.SAVE_REQUEST, payload } }
  function success(payload) { return { type: types.SAVE_SUCCESS, payload } }
  function failure(error) { return { type: types.SAVE_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::PRODUCT::saveOrUpdate', product);
    dispatch(request(product));

    let response;
    if (product.id) {  // editing a existing record
      response = await services.update(product, getState().users.auth.token)
    } else {
      response = await services.save(product, getState().users.auth.token)
    }
    console.log('ACTIONS::PRODUCT::saveOrUpdate::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data));
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

const del = (id) => {
  console.log('ACTIONS::PRODUCT::del', id);
 
  function request(id) { return { type: types.DELETE_REQUEST, id } }
  function success(id) { return { type: types.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await services.del(id, getState().users.auth.token)
    console.log('ACTIONS::ORDERS::del::RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(id));
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
  clearCurrent,
  clearAll,
  get,
  getAll,
  saveOrUpdate,
  del,
};