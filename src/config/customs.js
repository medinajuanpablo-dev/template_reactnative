import config from './routes';

const customs =  {
  SUPPORTED_LANGUAGES: ['en', 'es'],
  DEFAULT_LANGUAGE: 'es',
  MONEY_SYMBOL: '$',
  MONEY_CODE: 'u$s',
  MONEY_POSITION: 'prefix', //'sufix'
  MONEY_SPACE: true,
  CURRENCIES: ['USD','ARS'],
  CURRENCY: 'ARS',
  LOCALE: 'es-ES',
  USER_TYPE: {
    REGULAR: 'regular',
    ADVANCED: 'advanced'
  },
  USER_ACCOUNTS_INTEGRATED: true,
  USER_ACCOUNTS: {
    TYPES: {
      OWNER: 'owner',
      GUEST: 'guest'
    },
    STATUS: {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
      REVOKED: 'revoked'
    }
  },  
  POINTS: {
    unit : 'lts',
    factor: 1,
  },
  TYPES: {
    SERVICES: 'services',
  },
  TRANSACTIONS: {
    TYPE: 'wash',
    SUB_TYPE: null,
    STATUS: {
      BOOKED: 'booked',
      CANCELED: 'canceled',
      ASSIGNED: 'assigned',
      REVIEW: 'review',
      COMPLETED: 'completed'
    }
  },
  OPTIONS: {
    VEHICLES: {
      TYPES: ['car', 'big_truck', 'suv', 'motocycle', 'bicycle'],
      BRANDS: ['ford', 'volkswagen', 'renault', 'toyota', 'honda', 'fiat', 'bmw', 'mercedes benz', 'nissan', 'peugeot', 'chevrolet', 'otra'],
      COLORS: ['White', 'Black', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Other'],
      SERVICES_VARIANTS_RELATION: 'enum:vehicles:types',
      VALIDATE_NO_BRAND: ['bicycle'],
      VALIDATE_NO_MODEL: ['bicycle'],
      VALIDATE_NO_PATENT: ['bicycle'],
    },
    ORDERS: {
      PAYMENT: {
        STRAIGHT_METHODS: ["Transferencia", "Efectivo"],
        CARD_METHODS: ["Mercado Pago", "Tarjeta de Crédito", "Tarjeta de Débito"],
        CUOTAS: ["1 cuota", "3 cuotas", "6 cuotas", "12 cuotas", "24 cuotas"],        
      },
    }
  },
  SIDEBAR: {
    MENU: {
      MAIN: [
        { icon: 'home', label: 'Book a wash', route: config.ROUTES.HOME },
        { icon: 'clean_inside', label: 'My vehicles', route: config.ROUTES.VEHICLES },
        { icon: 'my_washes_circle', label: 'My washes', route: config.ROUTES.WASHES },
        { icon: 'pin', label: 'My locations', route: config.ROUTES.LOCATIONS },
      ],
      SECONDARY: [
        // { icon: 'my_washes', label: 'Wash types', route: config.ROUTES.WASH_TYPES },
        { /* icon: 'help',*/ label: 'How works?', route: config.ROUTES.HOW_WORKS },
        { /*icon: 'phone',*/ label: 'Contact us', route: config.ROUTES.CONTACT_US },
        { /*icon: '',*/ label: 'Terms and conditions', route: config.ROUTES.TERMS },
        { /*icon: '',*/ label: 'Privacy policies', route: config.ROUTES.PRIVACY },
      ],
      ADMIN: [
      ],
    },
  },
  SLIDER: {
    SHOW: true,
    CONTENT: [
      {
        title: 'Give us your information',
        body: 'Tell us where is your vehicle',
        button: 'Next',
      },
      {
        title: 'Take a book',
        body: 'Select a day and a hour',
        button: 'Next',
      },
      {
        title: 'Clean your vehicle and your planet',
        body: `Enjoy your vehicle and the feel of saving water`,
        button: 'Start',
      },
    ]
  }
};
export default customs;