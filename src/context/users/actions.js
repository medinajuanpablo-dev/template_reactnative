import types from './types';
import users from './services';
import oauth from '../oauth/actions'

const clearCurrent = () => {
  return (dispatch) => {
    dispatch({ type: types.CLEAR_CURRENT });
  }
}

const login = (user, from) => {
  console.log('ACTIONS::USERS::login', user, from);

  const request = (user) => { return { type: types.LOGIN_REQUEST, user } };
  const success = (payload) => { return { type: types.LOGIN_SUCCESS, payload } };
  const failure = (error) => { return { type: types.LOGIN_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request(user));
    let response = await users.login(user, getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success({ token: response.data.token, user: response.data.user }));
    } else {
      // users.removeLocalAccessToken();
      if (response.error && response.error.code === 'ERROR_401') {
        console.log('APP TOKEN NOT VALID');
        dispatch(oauth.removeToken());
        dispatch(oauth.accessToken());
      } else {
        dispatch(failure(response.error));
      }
    }
  }
}

const getFromToken = () => {
  console.log('ACTIONS::USERS::getFromToken');

  const request = (username) => { return { type: types.LOGIN_REQUEST, username } };
  const success = (payload) => { return { type: types.LOGIN_SUCCESS, payload } };
  const failure = (error) => { return { type: types.LOGIN_FAILURE, error } };

  return async dispatch => {
    dispatch(request('token'));    
    const token = users.getToken();
    console.log('USER TOKEN FROM LOCALSTORAGE', token);
    if (token) {
      // dispatch(success({ token }));
      const response = await users.verifyToken(token);
      console.log('RESPONSE FROM SERVIVE', response);
      if (response.success) {
        dispatch(success({ token: response.data.token, user: response.data.user }));
      } else {
        dispatch(failure(response.error));
      }

    } else {
      dispatch(failure());
    }
  }
}

const getFromSocial = (params) => {
  console.log('ACTIONS::USERS::getFromSocial');

  const request = (username) => { return { type: types.LOGIN_REQUEST, username } };
  const success = (payload) => { return { type: types.LOGIN_SUCCESS, payload } };
  const failure = (error) => { return { type: types.LOGIN_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request('social'));    
    const response = await users.getFromSocial(params, getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success({ token: response.data.token, user: response.data.user }));
    } else {
      dispatch(failure(response.error));
    }
  }
}

const loginSSO = () => {
  console.log('ACTIONS::USERS::login SSO');

  const request = (username) => { return { type: types.LOGIN_REQUEST, username } };
  const success = (payload) => { return { type: types.LOGIN_SUCCESS, payload } };
  const failure = (error) => { return { type: types.LOGIN_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request('SSO'));
    let response = await users.loginSSO(getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success({ token: response.data.token, user: response.data.user }));
    } else {
      // users.removeLocalAccessToken();
      // if (response.error && response.error.code === 'ERROR_401') {
      //   console.log('APP TOKEN NOT VALID');
      //   dispatch(oauth.removeToken());
      //   dispatch(oauth.accessToken());
      // } else {
        dispatch(failure(response.error));
      // }
    }
  }
}

const logout = () => {
  console.log('ACTIONS::USERS::logout');
  users.logout();
  return { type: types.LOGOUT };
}

const forgot = (params) => {
  console.log('ACTIONS::USERS::forgot');
  const request = () => { return { type: types.FORGOT } };
  const failure = (error) => { return { type: types.LOGIN_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request()); 
    const response = await users.forgot(params, getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.error) dispatch(failure(response.error));
  }
}

const verifyPIN = (params) => {
  console.log('ACTIONS::USERS::verifyPIN');

  const request = () => { return { type: types.VERIFY_REQUEST } };
  // const success = (payload) => { return { type: types.VERIFY_SUCCESS, payload } };
  const failure = (error) => { return { type: types.VERIFY_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request()); 
    const response = await users.verifyPIN(params, getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.error) dispatch(failure(response.error));
  }
}

const getFromHash = (params) => {
  console.log('ACTIONS::USERS::getFromHash');

  const request = (username) => { return { type: types.GET_REQUEST, username } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } };
  const failure = (error) => { return { type: types.GET_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request('hash'));    
    const response = await users.getFromHash(params, getState().oauth.token);
    console.log('RESPONSE FROM SERVIVE', response);
    if (response.success) {
      dispatch(success(response.data));
    } else {
      dispatch(failure(response.error));
    }
  }
}

const getAll = (params) => {
  console.log('ACTIONS::USERS::getAll', params);

  function request() { return { type: types.GETALL_REQUEST } };
  function success(payload) { return { type: types.GETALL_SUCCESS, payload } };
  function failure(error) { return { type: types.GETALL_FAILURE, error } };

  return async (dispatch, getState) => {
    console.log('ACTIONS::USERS::getAll', params);
    dispatch(request());
    const response = await users.getAll(params, getState().users.auth.token);
    console.log('ACTIONS::USERS::getAll::RESPONSE FROM SERVIVE', response);
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
  }
}

const get = (params) => {
  console.log('ACTIONS::USERS::get', params);

  const request = (params) => { return { type: types.GET_REQUEST, params } };
  const success = (payload) => { return { type: types.GET_SUCCESS, payload } };
  const failure = (error) => { return { type: types.GET_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request(params));
    const token = !params.id ? getState().oauth.token : getState().users.auth.token;

    const response = await users.get(params, token);
    console.log('ACTIONS::USERS::get::RESPONSE FROM SERVIVE', response);
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
  }
}

const saveOrUpdate = (user, action = 'save') => {

  function request(payload) { return { type: types.SAVE_REQUEST, payload } };
  function success(payload) { return { type: types.SAVE_SUCCESS, payload } };
  function failure(error) { return { type: types.SAVE_FAILURE, error } };

  return async (dispatch, getState) => {
    console.log('ACTIONS::USERS::saveOrUpdate', user);
    dispatch(request(user));

    const token = action === 'register' ? getState().oauth.token : getState().users.auth.token;
    let response;
    if (user.id) {  // editing a existing record
      response = await users.update(user, action, token);
    } else {
      response = await users.save(user, action, token);
    }
    console.log('ACTIONS::USERS::saveOrUpdate::RESPONSE FROM SERVIVE', response);
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
  }
}

const del = (id) => {
  console.log('ACTIONS::USERS::del', id);
 
  function request(id) { return { type: types.DELETE_REQUEST, id } };
  function success(id) { return { type: types.DELETE_SUCCESS, id } };
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } };

  return async (dispatch, getState) => {
    dispatch(request(id));
    let response = await users.del(id, getState().users.auth.token);
    console.log('ACTIONS::USERS::del::RESPONSE FROM SERVIVE', response);
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
  }
}

const getPoints = (id) => {
  console.log('ACTIONS::USERS::getPoints', id);

  const request = (id) => { return { type: types.GETPOINTS_REQUEST, id } };
  const success = (payload) => { return { type: types.GETPOINTS_SUCCESS, payload } };
  const failure = (error) => { return { type: types.GETPOINTS_FAILURE, error } };

  return async (dispatch, getState) => {
    dispatch(request(id));
    const response = await users.getPoints(id, getState().users.auth.token);
    console.log('ACTIONS::USERS::getPoints::RESPONSE FROM SERVIVE', response);
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
  }
}

export default {
  clearCurrent,
  login,
  logout,
  forgot,
  verifyPIN,
  saveOrUpdate,
  del,
  get,
  getAll,
  getFromToken,
  getFromHash,
  getPoints,
  getFromSocial,
  loginSSO,
};