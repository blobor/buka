import { combineReducers } from 'redux-immutable'
import app from './app'
import searchSkipass from './search-skipass'
import skipasses from './skipasses'

const rootReducer = combineReducers({
  app,
  searchSkipass,
  skipasses
})

export default rootReducer
