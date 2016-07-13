import { combineReducers } from 'redux'
import app from './app'
import searchSkipass from './searchSkipass'

const rootReducer = combineReducers({
  app,
  searchSkipass
})

export default rootReducer
