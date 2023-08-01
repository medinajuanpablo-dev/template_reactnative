import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import apiMiddleware from 'libraries/middlewares/api';
import rootReducer from '../context';

const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]

// const composedEnhancers = compose(...enhancers)

export const store = createStore(rootReducer, compose(...enhancers))



