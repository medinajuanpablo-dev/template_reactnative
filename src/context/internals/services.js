import config from '../../config';
import { request } from '../../libraries/request'
const getClientIpInfo = (params, token) => {
  console.log('SERVICES::INTERNALS::getClientIpInfo', params, token);
  return request({
    url: config.BASE_API_URL + config.API.INTERNAL.INFO.IP.replace('{ip}', params.ip),
    accessToken: token,
  })
  .then(response => {
    console.log('RETURN FROM API::INTERNALS::getClientIpInfo', response);
    if (response.success) {

    }
    return response;
  })
}

export default {
  getClientIpInfo,
};
