import { connect } from 'react-redux'

import { closeNavigationDrawer, toggleNavigationDrawer } from '../actions/app'
import NavigationDrawer from '../components/NavigationDrawer'

const mapStateToProps = state => {
  const { isNavigationDrawerOpen } = state.get('app').toJS()

  return {
    isOpen: isNavigationDrawerOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleToggle: () => {
      dispatch(toggleNavigationDrawer())
    },
    handleClose: () => {
      dispatch(closeNavigationDrawer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
