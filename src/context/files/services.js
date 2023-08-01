import config from '../../config';
import { request } from '../../libraries/request'

const upload = (data, token) => {
  console.log('SERVICES::FILES::upload', data, token);
  return request({
    url: config.BASE_API_URL + config.API.FILES,
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
  upload,
};
