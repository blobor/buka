import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import * as config from '../../config.js'

const middlewares = [thunk]

if (config.development) {
  middlewares.push(createLogger())
}

const configureStore = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares))
}

export default configureStore
