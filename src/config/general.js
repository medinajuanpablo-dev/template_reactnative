const dotenv = {
  production: {
    BASE_API_URL: 'https://api.lavadoelex.com/api/v1',
    DEBUG_MODE: false,
    ONESIGNAL_APPID: '53a79def-0c73-4b65-90a6-031298fdbe20',
    ONESIGNAL_SAFARI_WEB_ID: 'web.onesignal.auto.1881b8be-1ae3-4d80-a99d-32f491a07c07',
    GOOGLE_CLIENT_ID: '520136123472-i5vepn91smat0b57cditrlofatl8ggg9.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '157173182939708',
  },
  development: {
    BASE_API_URL: 'https://316c-2803-9800-a443-82a2-653d-3b65-ecf2-453a.ngrok-free.app/api/v1',
    DEBUG_MODE: true,
    ONESIGNAL_APPID: 'd6944e1c-e070-48e8-865d-790fd1cf83b0',
    ONESIGNAL_SAFARI_WEB_ID: 'web.onesignal.auto.166712e5-2aee-41ea-b95e-8df3d8',
    GOOGLE_CLIENT_ID: '520136123472-i5vepn91smat0b57cditrlofatl8ggg9.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '157173182939708',
  }
}

const vars = {
  VERSION: 'v20210129.001',
  CLIENT_ID: '11111111111',
  CLIENT_SECRET: 'qwetqutuqwteutuqwteuqwtuetqwyteuqt',
};

const { NODE_ENV } = process.env;
const dotenvVars = Object.assign(
  ...Object.keys(dotenv[NODE_ENV])
    .map( key => ({ [key]: dotenv[NODE_ENV][key] }) )
);
const general = { ...vars, ...dotenvVars };
export default general;