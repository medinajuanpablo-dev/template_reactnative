import types from './types';
import cells from './services';

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
    console.log('ACTIONS::CELLS::getAll', params);
    dispatch(request());
    const response = await cells.getAll(params, getState().users.auth.token)
    console.log('ACTIONS::CELLS::getAll::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::CELLS::get', id);

  const request = (id) => { return { type: types.GET_REQUEST, id } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } }
  const failure = (error) => { return { type: types.GET_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await cells.get(id, getState().users.auth.token)
    console.log('ACTIONS::CELLS::get::RESPONSE FROM SERVIVE', response);
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

const saveOrUpdate = (cell) => {

  function request(payload) { return { type: types.SAVE_REQUEST, payload } }
  function success(payload) { return { type: types.SAVE_SUCCESS, payload } }
  function failure(error) { return { type: types.SAVE_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::CELLS::saveOrUpdate', cell);
    dispatch(request(cell));

    let response;
    if (cell.id) {  // editing a existing record
      response = await cells.update(cell, getState().users.auth.token)
    } else {
      response = await cells.save(cell, getState().users.auth.token)
    }
    console.log('ACTIONS::CELLS::saveOrUpdate::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::CELLS::del', id);
 
  function request(id) { return { type: types.DELETE_REQUEST, id } }
  function success(id) { return { type: types.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await cells.del(id, getState().users.auth.token)
    console.log('ACTIONS::CELLS::del::RESPONSE FROM SERVIVE', response);
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