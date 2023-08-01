import general from './general';
import api from './api';
import customs from './customs';
import routes from './routes';
import localStorage from './localStorage';

 const index = {
  ...general,
  ...api,
  ...routes,
  ...localStorage,
  ...customs,
};
export default index