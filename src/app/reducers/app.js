import { fromJS } from 'immutable'
import { appName, version } from '../../config.js'
import { CLOSE_NAVIGATION_DRAWER, TOGGLE_NAVIGATION_DRAWER } from '../actions/actionTypes'

const initialState = fromJS({
  name: appName,
  version: version,
  isNavigationDrawerOpen: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_NAVIGATION_DRAWER:
      return state.set('isNavigationDrawerOpen', false)
    case TOGGLE_NAVIGATION_DRAWER:
      return state.set('isNavigationDrawerOpen', !state.get('isNavigationDrawerOpen'))
    default:
      return state
  }
}
