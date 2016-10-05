import { connect } from 'react-redux'

import { closeNavigationDrawer } from '../actions/app'
import NavigationDrawer from '../components/NavigationDrawer'

const mapStateToProps = state => {
  const { isNavigationDrawerOpen } = state.get('app').toJS()

  return {
    isOpen: isNavigationDrawerOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => {
      dispatch(closeNavigationDrawer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
