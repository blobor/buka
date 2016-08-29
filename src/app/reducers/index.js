import { combineReducers } from 'redux-immutable'
import app from './app'
import searchSkipass from './searchSkipass'

const rootReducer = combineReducers({
  app,
  searchSkipass
})

export default rootReducer
