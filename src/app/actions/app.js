import * as actionTypes from './actionTypes'

const toggleNavigationDrawer = () => {
  return {
    type: actionTypes.TOGGLE_NAVIGATION_DRAWER
  }
}

const closeNavigationDrawer = () => {
  return {
    type: actionTypes.CLOSE_NAVIGATION_DRAWER
  }
}

export {
  closeNavigationDrawer,
  toggleNavigationDrawer
}
