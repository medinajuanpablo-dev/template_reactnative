import { combineReducers } from 'redux';

import users from './users';
import oauth from './oauth';
import files from './files';
import vehicles from './vehicles';
import locations from './locations';
import services from './services';
import cells from './cells';
import transactions from './transactions';
import bookings from './bookings';
import internals from './internals';
import orders from "./orders";
import products from "./products";

export default combineReducers({
  users: users.reducers,
  oauth: oauth.reducers,
  files: files.reducers,
  vehicles: vehicles.reducers,
  locations: locations.reducers,
  services: services.reducers,
  cells: cells.reducers,
  transactions: transactions.reducers,
  bookings: bookings.reducers,
  internals: internals.reducers,
  orders: orders.reducers,
  products: products.reducers,
});
