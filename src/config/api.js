const api = {
  LOCALSTORAGE_APP_TOKEN: 'LOCALSTORAGE_APP_TOKEN',
  LOCALSTORAGE_USER_TOKEN: 'REACT_USER_TOKEN_AUTH',

  QUERIES_PAGE_SIZE: 10,
  API: {
    OAUTH: '/oauth/token',
    INTERNAL: {
      INFO: {
        IP: '/internal/ip/{ip}',
      },
    },
    FILES: '/files/upload',
    SETTINGS: '/settings',
    TOKEN: '/users/token',
    LOGIN: '/users/login',
    SOCIAL_LOGIN: '/users/login/social',
    REGISTER: '/users/register',
    FORGOT: '/users/forgot',
    VERIFY: '/users/verify',
    USER: '/users/{id}',
    USERS: '/users',
    HASH: '/users/hash/{hash}',
    SOCIAL: '/users/social',
    POINTS: '/users/{id}/points',

    VEHICLE: '/vehicles/{id}',
    VEHICLES: '/vehicles',

    ORDERS_LIST: "/orders",
    ORDER: "/orders/{orderId}",

    PRODUCTS_LIST: "/products",
    PRODUCT: "/products/{productId}",

    LOCATION: '/locations/{id}',
    LOCATIONS: '/locations',
    SERVICE: '/products/{id}',
    SERVICES: '/products',
    CELL: '/cells/{id}',
    CELLS: '/cells',
    TRANSACTION: '/transactions/{id}',
    TRANSACTIONS: '/transactions',
    BOOKING: '/bookings/{id}',
    BOOKINGS: '/bookings',
    AVAILABILITY: '/bookings/{owner}/availability',
  },
};
export default api;