import { combineReducers } from 'redux'
import app from './app'
import skipass from './skipass'

const rootReducer = combineReducers({
  app,
  skipass
})

export default rootReducer
