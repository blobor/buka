import { connect } from 'react-redux'

import { toggleNavigationDrawer } from '../actions/app'
import { changeSearchSkipassNumber } from '../actions/skipass'
import Header from '../components/Header'

const mapStateToProps = null

const mapDispatchToProps = dispatch => {
  return {
    handleToggle: () => {
      dispatch(toggleNavigationDrawer())
    },
    testCardNumberChange: (event, value) => {
      dispatch(changeSearchSkipassNumber(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
