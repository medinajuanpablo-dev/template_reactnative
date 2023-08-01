import types from './types';
import bookings from './services';

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
    console.log('ACTIONS::BOOKINGS::getAll', params);
    dispatch(request());
    const response = await bookings.getAll(params, getState().users.auth.token)
    console.log('ACTIONS::BOOKINGS::getAll::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::BOOKINGS::get', id);

  const request = (id) => { return { type: types.GET_REQUEST, id } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } }
  const failure = (error) => { return { type: types.GET_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await bookings.get(id, getState().users.auth.token)
    console.log('ACTIONS::BOOKINGS::get::RESPONSE FROM SERVIVE', response);
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

const saveOrUpdate = (booking) => {

  function request(payload) { return { type: types.SAVE_REQUEST, payload } }
  function success(payload) { return { type: types.SAVE_SUCCESS, payload } }
  function failure(error) { return { type: types.SAVE_FAILURE, error } }

  return async (dispatch, getState) => {
    console.log('ACTIONS::BOOKINGS::saveOrUpdate', booking);
    dispatch(request(booking));

    let response;
    if (booking.id) {  // editing a existing record
      response = await bookings.update(booking, getState().users.auth.token)
    } else {
      response = await bookings.save(booking, getState().users.auth.token)
    }
    console.log('ACTIONS::BOOKINGS::saveOrUpdate::RESPONSE FROM SERVIVE', response);
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
  console.log('ACTIONS::BOOKINGS::del', id);
 
  function request(id) { return { type: types.DELETE_REQUEST, id } }
  function success(id) { return { type: types.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } }

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await bookings.del(id, getState().users.auth.token)
    console.log('ACTIONS::BOOKINGS::del::RESPONSE FROM SERVIVE', response);
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


const getAvailability = (params) => {
  console.log('ACTIONS::BOOKINGS::getAvailability', params);

  const request = (params) => { return { type: types.AVAILABILITY_REQUEST, params } };
  const success = (payload) => { return { type: types.AVAILABILITY_SUCCESS, payload } }
  const failure = (error) => { return { type: types.AVAILABILITY_FAILURE, error } }

  return async (dispatch, getState) => {
    dispatch(request(params));
    let response = await bookings.getAvailability(params, getState().users.auth.token)
    console.log('ACTIONS::BOOKINGS::getAvailability::RESPONSE FROM SERVIVE', response);
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

export default {
  clearCurrent,
  get,
  getAll,
  saveOrUpdate,
  del,
  getAvailability,
};