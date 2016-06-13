import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

const configureStore = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares))
}

export default configureStore
