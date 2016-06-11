import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}
