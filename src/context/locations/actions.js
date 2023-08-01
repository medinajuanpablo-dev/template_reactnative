import types from './types';
import locations from './services';

const clearCurrent = () => {
  return (dispatch) => {
    dispatch({ type: types.CLEAR_CURRENT });
  }
}

const getAll = (params) => {

  function request() { return { type: types.GETALL_REQUEST } }
  function success(payload) { return { type: types.GETALL_SUCCESS, payload } }
  function failure(error) { return { type: types.GETALL_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::LOCATIONS::getAll', params);
    dispatch(request());
    const response = await locations.getAll(params, getState().users.auth.token)
    console.log('ACTIONS::LOCATIONS::getAll::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::LOCATIONS::get', id);

  const request = (id) => { return { type: types.GET_REQUEST, id } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } }
  const failure = (error) => { return { type: types.GET_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await locations.get(id, getState().users.auth.token)
    console.log('ACTIONS::LOCATIONS::get::RESPONSE FROM SERVIVE', response);
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

const saveOrUpdate = (location) => {
  console.log('ACTIONS::LOCATIONS::saveOrUpdate', location);
  function request(payload) { return { type: types.SAVE_REQUEST, payload } }
  function success(payload) { return { type: types.SAVE_SUCCESS, payload } }
  function failure(error) { return { type: types.SAVE_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::LOCATIONS::saveOrUpdate', location);
    dispatch(request(location));

    let response;
    if (location.id) {  // editing a existing record
      response = await locations.update(location, getState().users.auth.token)
    } else {
      response = await locations.save(location, getState().users.auth.token)
    }
    console.log('ACTIONS::LOCATIONS::saveOrUpdate::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::LOCATIONS::del', id);
 
  function request(id) { return { type: types.DELETE_REQUEST, id } }
  function success(id) { return { type: types.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await locations.del(id, getState().users.auth.token)
    console.log('ACTIONS::LOCATIONS::del::RESPONSE FROM SERVIVE', response);
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
  get,
  getAll,
  saveOrUpdate,
  del,
};