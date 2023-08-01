const routes = {
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    SIGNUP_FULL: '/social/signup',
    FORGOT: '/forgot',
    VERIFY: '/verify/:hash',
    PASSWORD: '/password/:hash',
    PASSWORD_CHANGE: '/password_change',
    PROFILE: '/profile',
    USERINFO: '/user_info',

    VEHICLES: '/vehicles',
    VEHICLE_NEW: '/vehicles/new',
    VEHICLE_EDIT: '/vehicles/:id',

    ORDERS_LIST: '/orders',
    ORDER_NEW: '/orders/new',
    ORDER_EDIT: '/orders/edit/:orderId',

    WASHES: '/washes',
    WASH: '/washes/:id',
    LOCATIONS: '/locations',
    
    BOOK: {
      VEHICLE: '/book/vehicle',
      SERVICE: '/book/clean',
      TIME: '/book/time',
      REVIEW: '/book/review',
      SUCCESS: '/book/success',
    },

    HELP: '/help',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    WASH_TYPES: '/wash_types',
    HOW_WORKS: '/how_works',
    CONTACT_US: '/contact_us',
  }
};
export default routes;