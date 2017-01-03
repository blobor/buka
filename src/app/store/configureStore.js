import { applyMiddleware, createStore } from 'redux'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import * as config from '../../config.js'

const middlewares = [thunk]

if (config.development) {
  middlewares.push(createLogger({
    // Transform Symbol() action type to string
    actionTransformer: action => Object.assign(action, {
      type: String(action.type)
    })
  }))
}

const configureStore = initialState => {
  return createStore(rootReducer, fromJS(initialState), applyMiddleware(...middlewares))
}

export default configureStore
