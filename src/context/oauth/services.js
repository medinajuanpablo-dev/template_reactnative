import config from '../../config';
import { request } from '../../libraries/request'

export default {
  requestAccessToken,
  removeLocalAccessToken,
  getLocalAccessToken,
  refreshAccessToken,
};

function requestAccessToken() {
  console.log('SERVICES::OAUTH::requestAccessToken');

  return request({
    url: config.BASE_API_URL + config.API.OAUTH,
    data: {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
    },
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {
      localStorage.setItem(config.LOCALSTORAGE_APP_TOKEN, JSON.stringify(response.data.access_token));
    }
    return response;
  })
}

function refreshAccessToken(token) {
  console.log('SERVICES::OAUTH::refreshAccessToken');

  return request({
    url: config.BASE_API_URL + config.API.OAUTH,
    data: {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      refresh_token: token,
    },
  })
  .then(response => {
    console.log('RETURN FROM API', response);
    if (response.success) {
      localStorage.setItem(config.LOCALSTORAGE_APP_TOKEN, JSON.stringify(response.data.access_token));
    }
    return response;
  })
}

function removeLocalAccessToken() {
  console.log('SERVICES::OAUTH::removeLocalAccessToken');
  // remove app token from local storage 
  localStorage.removeItem(config.LOCALSTORAGE_APP_TOKEN);
}

function getLocalAccessToken() {
  console.log('SERVICES::OAUTH::getLocalAccessToken' );
  let token = null;
  try {
    token = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_APP_TOKEN))
  } catch {
    console.log('INVALID TOKEN FROM LOCALSTORATE');
  }
  // get app token from local storage
  return token;
}
