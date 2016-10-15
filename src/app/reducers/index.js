import { combineReducers } from 'redux-immutable'
import app from './app'
import searchSkipass from './searchSkipass'
import storedSkipasses from './stored-skipasses'

const rootReducer = combineReducers({
  app,
  searchSkipass,
  storedSkipasses
})

export default rootReducer
